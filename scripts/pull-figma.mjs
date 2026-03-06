import fs from 'node:fs/promises';
import path from 'node:path';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const token = process.env.FIGMA_API_KEY || await readEnvLocalToken();

if (!token) {
  console.error('Missing FIGMA_API_KEY in environment.');
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));
const input = args.file || args._[0];
const parsedInput = extractFigmaInput(input);
const fileKey = parsedInput.fileKey;

if (!fileKey) {
  console.error('Usage: npm run figma:pull -- <figma-file-url-or-key> [--node-id 123:456]');
  process.exit(1);
}

const targetNodeId = normalizeNodeId(args['node-id'] || args.nodeId || args.n || parsedInput.nodeId || null);
const syncRoot = path.resolve(process.cwd(), 'figma-sync', fileKey);
const renderRoot = path.resolve(process.cwd(), 'public', 'figma-files', fileKey);

await fs.mkdir(syncRoot, { recursive: true });
await fs.mkdir(renderRoot, { recursive: true });

console.log(`Pulling Figma file ${fileKey}${targetNodeId ? ` (target node ${targetNodeId})` : ''}...`);

const file = await figmaJson(`/files/${fileKey}`);
const collected = collectNodes(file.document);

await writeJson(path.join(syncRoot, 'file.json'), file);
await writeJson(path.join(syncRoot, 'node-map.json'), collected.nodeMap);
await writeJson(path.join(syncRoot, 'pages.json'), summarizePages(file.document.children ?? []));
await writeJson(path.join(syncRoot, 'components.json'), file.components ?? {});
await writeJson(path.join(syncRoot, 'component-sets.json'), file.componentSets ?? {});
await writeJson(path.join(syncRoot, 'styles.json'), file.styles ?? {});

const variables = await tryFigmaJson(`/files/${fileKey}/variables/local`);
if (variables) {
  await writeJson(path.join(syncRoot, 'variables-local.json'), variables);
}

const publishedStyles = await tryFigmaJson(`/files/${fileKey}/styles`);
if (publishedStyles) {
  await writeJson(path.join(syncRoot, 'published-styles.json'), publishedStyles);
}

if (targetNodeId) {
  const nodeDetails = await figmaJson(`/files/${fileKey}/nodes?ids=${encodeURIComponent(targetNodeId)}&geometry=paths`);
  await writeJson(path.join(syncRoot, 'target-node.json'), nodeDetails);
}

const imageFillRefs = Array.from(collected.imageRefToNodes.keys());
let imageFillManifest = {};

if (imageFillRefs.length > 0) {
  console.log(`Found ${imageFillRefs.length} image fills. Downloading originals from Figma...`);
  imageFillManifest = await downloadImageFills(fileKey, imageFillRefs, collected.imageRefToNodes, syncRoot);
  await writeJson(path.join(syncRoot, 'image-fills.json'), imageFillManifest);
}

const renderCandidates = buildRenderCandidates(file.document.children ?? [], collected.nodeById, targetNodeId);
const pngManifest = await exportNodeImages(fileKey, renderCandidates.png, renderRoot, 'png', 4);
const svgManifest = await exportNodeImages(fileKey, renderCandidates.svg, renderRoot, 'svg', 1);

await writeJson(path.join(syncRoot, 'renders.json'), {
  png: pngManifest,
  svg: svgManifest,
});

const summary = {
  fileKey,
  targetNodeId,
  pulledAt: new Date().toISOString(),
  pageCount: (file.document.children ?? []).length,
  nodeCount: collected.nodeMap.length,
  imageFillCount: imageFillRefs.length,
  pngRenderCount: pngManifest.length,
  svgRenderCount: svgManifest.length,
  syncRoot,
  renderRoot,
};

await writeJson(path.join(syncRoot, 'summary.json'), summary);

console.log('Done.');
console.log(JSON.stringify(summary, null, 2));

function parseArgs(argv) {
  const parsed = { _: [] };

  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (!value.startsWith('--')) {
      parsed._.push(value);
      continue;
    }

    const [rawKey, inlineValue] = value.slice(2).split('=');
    if (inlineValue !== undefined) {
      parsed[rawKey] = inlineValue;
      continue;
    }

    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      parsed[rawKey] = true;
      continue;
    }

    parsed[rawKey] = next;
    i += 1;
  }

  return parsed;
}

function extractFigmaInput(input) {
  if (!input) return { fileKey: null, nodeId: null };
  if (!input.includes('figma.com')) {
    return {
      fileKey: input.trim(),
      nodeId: null,
    };
  }

  try {
    const url = new URL(input);
    const parts = url.pathname.split('/').filter(Boolean);
    const designIndex = parts.findIndex((part) => part === 'design' || part === 'file');
    if (designIndex === -1) return { fileKey: null, nodeId: null };
    return {
      fileKey: parts[designIndex + 1] ?? null,
      nodeId: normalizeNodeId(url.searchParams.get('node-id')),
    };
  } catch {
    return { fileKey: null, nodeId: null };
  }
}

function normalizeNodeId(nodeId) {
  if (!nodeId) return null;
  return String(nodeId).replace(/-/g, ':');
}

async function figmaJson(endpoint, attempt = 0) {
  const response = await fetch(`${FIGMA_API_BASE}${endpoint}`, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (response.status === 429 && attempt < 5) {
    const delayMs = (Number(response.headers.get('retry-after')) || 2 ** attempt) * 1000;
    console.log(`Rate limited by Figma. Retrying in ${Math.ceil(delayMs / 1000)}s...`);
    await wait(delayMs);
    return figmaJson(endpoint, attempt + 1);
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Figma API error ${response.status} for ${endpoint}: ${text}`);
  }

  return response.json();
}

async function tryFigmaJson(endpoint) {
  try {
    return await figmaJson(endpoint);
  } catch (error) {
    console.warn(`Skipping ${endpoint}: ${error.message}`);
    return null;
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readEnvLocalToken() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const content = await fs.readFile(envPath, 'utf8');
    const match = content.match(/^FIGMA_API_KEY=(.+)$/m);
    return match?.[1]?.trim() || null;
  } catch {
    return null;
  }
}

function collectNodes(root) {
  const nodeMap = [];
  const nodeById = new Map();
  const imageRefToNodes = new Map();

  walk(root, null, 0);

  return { nodeMap, nodeById, imageRefToNodes };

  function walk(node, parentId, depth) {
    nodeById.set(node.id, node);

    nodeMap.push({
      id: node.id,
      name: node.name,
      type: node.type,
      parentId,
      depth,
      width: node.absoluteBoundingBox?.width ?? null,
      height: node.absoluteBoundingBox?.height ?? null,
      x: node.absoluteBoundingBox?.x ?? null,
      y: node.absoluteBoundingBox?.y ?? null,
    });

    for (const paint of node.fills ?? []) {
      if (paint?.type === 'IMAGE' && paint.imageRef) {
        const refs = imageRefToNodes.get(paint.imageRef) ?? [];
        refs.push({
          nodeId: node.id,
          nodeName: node.name,
          scaleMode: paint.scaleMode ?? null,
        });
        imageRefToNodes.set(paint.imageRef, refs);
      }
    }

    for (const child of node.children ?? []) {
      walk(child, node.id, depth + 1);
    }
  }
}

function summarizePages(pages) {
  return pages.map((page) => ({
    id: page.id,
    name: page.name,
    type: page.type,
    childCount: page.children?.length ?? 0,
    children: (page.children ?? []).map((child) => ({
      id: child.id,
      name: child.name,
      type: child.type,
      width: child.absoluteBoundingBox?.width ?? null,
      height: child.absoluteBoundingBox?.height ?? null,
    })),
  }));
}

async function downloadImageFills(fileKey, imageRefs, imageRefToNodes, outRoot) {
  const imageDir = path.join(outRoot, 'image-fills');
  await fs.mkdir(imageDir, { recursive: true });

  const manifest = {};
  for (const batch of chunk(imageRefs, 50)) {
    const query = batch.map((ref) => `ids=${encodeURIComponent(ref)}`).join('&');
    const response = await figmaJson(`/files/${fileKey}/images?${query}`);
    const images = response.meta?.images ?? {};

    for (const imageRef of batch) {
      const imageUrl = images[imageRef];
      if (!imageUrl) continue;

      const refs = imageRefToNodes.get(imageRef) ?? [];
      const baseName = sanitizeFileName(refs[0]?.nodeName || imageRef);
      const ext = extensionFromUrl(imageUrl);
      const fileName = `${baseName}__${shortId(imageRef)}.${ext}`;
      const destination = path.join(imageDir, fileName);

      await downloadBinary(imageUrl, destination);

      manifest[imageRef] = {
        file: relativePath(destination),
        url: imageUrl,
        usedBy: refs,
      };
    }
  }

  return manifest;
}

function buildRenderCandidates(pages, nodeById, targetNodeId) {
  const png = [];
  const svg = [];
  const seen = new Set();

  for (const page of pages) {
    for (const child of page.children ?? []) {
      const width = child.absoluteBoundingBox?.width ?? 0;
      const height = child.absoluteBoundingBox?.height ?? 0;
      const exportableTopLevel = ['FRAME', 'GROUP', 'SECTION', 'COMPONENT', 'COMPONENT_SET', 'INSTANCE'].includes(child.type);

      if (!exportableTopLevel || width < 100 || height < 100) continue;

      pushCandidate(png, child, `${page.name}/${child.name}`, seen);

      if (page.name.toLowerCase().includes('component') || child.type === 'COMPONENT' || child.type === 'COMPONENT_SET') {
        pushCandidate(svg, child, `${page.name}/${child.name}`, seen, 'svg');
      }
    }
  }

  if (targetNodeId && nodeById.has(targetNodeId)) {
    const node = nodeById.get(targetNodeId);
    pushCandidate(png, node, `target/${node.name}`, seen);
    pushCandidate(svg, node, `target/${node.name}`, seen, 'svg');
  }

  return { png, svg };
}

function pushCandidate(list, node, label, seen, kind = 'png') {
  const key = `${kind}:${node.id}`;
  if (seen.has(key)) return;
  seen.add(key);

  list.push({
    id: node.id,
    name: node.name,
    label,
    type: node.type,
    width: node.absoluteBoundingBox?.width ?? null,
    height: node.absoluteBoundingBox?.height ?? null,
  });
}

async function exportNodeImages(fileKey, nodes, outRoot, format, scale) {
  if (nodes.length === 0) return [];

  const exportDir = path.join(outRoot, format === 'svg' ? 'svg' : 'renders');
  await fs.mkdir(exportDir, { recursive: true });

  const manifest = [];

  if (format === 'svg') {
    for (const batch of chunk(nodes, 8)) {
      const ids = batch.map((node) => node.id).join(',');
      const params = new URLSearchParams({
        ids,
        format,
        use_absolute_bounds: 'true',
      });
      const response = await figmaJson(`/images/${fileKey}?${params.toString()}`);
      const images = response.images ?? {};

      for (const node of batch) {
        const imageUrl = images[node.id];
        if (!imageUrl) continue;

        const fileName = `${sanitizeFileName(node.label)}__${normalizeNodeId(node.id).replace(/:/g, '-')}.${format}`;
        const destination = path.join(exportDir, fileName);

      await downloadBinary(imageUrl, destination);

      manifest.push({
          id: node.id,
          name: node.name,
          type: node.type,
          file: relativePath(destination),
          url: imageUrl,
          scale: 1,
        });

        await writeJson(path.join(outRoot, `${format}-renders.partial.json`), manifest);
      }
    }

    return manifest;
  }

  for (const node of nodes) {
    const effectiveScale = choosePngScale(node, scale);
    const params = new URLSearchParams({
      ids: node.id,
      format,
      use_absolute_bounds: 'true',
      scale: String(effectiveScale),
    });

    const response = await figmaJson(`/images/${fileKey}?${params.toString()}`);
    const imageUrl = response.images?.[node.id];
    if (!imageUrl) continue;

    const fileName = `${sanitizeFileName(node.label)}__${normalizeNodeId(node.id).replace(/:/g, '-')}.${format}`;
    const destination = path.join(exportDir, fileName);

    await downloadBinary(imageUrl, destination);

    manifest.push({
      id: node.id,
      name: node.name,
      type: node.type,
      file: relativePath(destination),
      url: imageUrl,
      scale: effectiveScale,
    });

    await writeJson(path.join(outRoot, `${format}-renders.partial.json`), manifest);
  }

  return manifest;
}

function choosePngScale(node, preferredScale) {
  const width = node.width ?? 0;
  const height = node.height ?? 0;
  const area = width * height;

  if (!area) return 1;

  const maxPixels = 32_000_000;
  const maxScale = Math.max(1, Math.floor(Math.sqrt(maxPixels / area)));
  return Math.max(1, Math.min(preferredScale, maxScale));
}

async function downloadBinary(url, destination, attempt = 0) {
  try {
    await fs.access(destination);
    return;
  } catch {
    // File does not exist yet.
  }

  const response = await fetch(url);

  if (response.status === 429 && attempt < 5) {
    const delayMs = (2 ** attempt) * 1000;
    await wait(delayMs);
    return downloadBinary(url, destination, attempt + 1);
  }

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(destination, Buffer.from(arrayBuffer));
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function chunk(items, size) {
  const batches = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

function sanitizeFileName(input) {
  return input
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s/g, '-')
    .slice(0, 120) || 'unnamed';
}

function extensionFromUrl(url) {
  const pathname = new URL(url).pathname.toLowerCase();
  if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) return 'jpg';
  if (pathname.endsWith('.webp')) return 'webp';
  if (pathname.endsWith('.svg')) return 'svg';
  return 'png';
}

function shortId(input) {
  return input.replace(/[^a-z0-9]/gi, '').slice(0, 12);
}

function relativePath(filePath) {
  return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
}
