'use client';

import Link from 'next/link';

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: <FacebookIcon /> },
  { label: 'LinkedIn', href: '#', icon: <LinkedInIcon /> },
  { label: 'WeChat', href: '#', icon: <WeChatIcon /> },
  { label: 'Twitter', href: '#', icon: <TwitterIcon /> },
  { label: 'WhatsApp', href: '#', icon: <WhatsAppIcon /> },
];

export default function TopBar() {
  return (
    <div
      data-shell-topbar
      className="w-full text-white"
      style={{ backgroundColor: '#12151C', minHeight: '40px', display: 'flex', alignItems: 'center' }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-end px-4 py-2 sm:px-6 md:justify-between md:px-[39px]">
        <div className="hidden items-center md:flex" style={{ gap: '8px' }}>
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="social-icon flex items-center justify-center transition-all duration-200"
              style={{ color: '#fff', width: '24px', height: '24px' }}
            >
              {icon}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-[3px] overflow-x-auto whitespace-nowrap scrollbar-hide">
          <TopBarButton label="EN" />
          <div className="hidden items-center sm:flex" style={{ gap: '3px' }}>
            <VerticalDivider />
            <TopBarButton label="UAE Dirham (AED)" />
          </div>
          <VerticalDivider />
          <TopBarButton label="Dubai" flag />
        </div>
      </div>

      <style>{`
        .social-icon:hover svg path,
        .social-icon:hover svg circle {
          fill: #B8F04F;
          transition: fill 0.2s;
        }
      `}</style>
    </div>
  );
}

function TopBarButton({ label, flag = false }: { label: string; flag?: boolean }) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: '6px',
        fontFamily: 'var(--font-tt-norms)',
        fontSize: 'clamp(12px, 1.6vw, 16px)',
        fontWeight: 500,
        color: '#fff',
        padding: '0 4px',
        whiteSpace: 'nowrap',
      }}
    >
      {flag && <UAEFlag />}
      <span>{label}</span>
    </div>
  );
}

function VerticalDivider() {
  return (
    <div
      style={{
        width: '1.5px',
        height: '15px',
        backgroundColor: 'rgba(255,255,255,0.10)',
        flexShrink: 0,
      }}
    />
  );
}

function UAEFlag() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <defs>
        <clipPath id="circle-clip">
          <circle cx="9" cy="9" r="9" />
        </clipPath>
      </defs>
      <circle cx="9" cy="9" r="9" fill="#fff" />
      <rect x="0" y="0" width="5" height="18" fill="#00732F" clipPath="url(#circle-clip)" />
      <rect x="5" y="0" width="13" height="6" fill="#FFFFFF" clipPath="url(#circle-clip)" />
      <rect x="5" y="6" width="13" height="6" fill="#000000" clipPath="url(#circle-clip)" />
      <rect x="5" y="12" width="13" height="6" fill="#FF0000" clipPath="url(#circle-clip)" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" fill="white" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.94 5a2 2 0 1 1-4-.002A2 2 0 0 1 6.94 5zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" fill="white" />
    </svg>
  );
}

function WeChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 4C4.36 4 1 6.92 1 10.5c0 2.04 1.07 3.87 2.75 5.06L3 18l2.75-1.38C6.47 16.83 7.46 17 8.5 17c.17 0 .34 0 .5-.01A5.97 5.97 0 0 1 9 15c0-3.31 3.13-6 7-6h.5C15.67 6.42 12.36 4 8.5 4zM6 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5.5 4c-3.04 0-5.5 1.79-5.5 4s2.46 4 5.5 4c.73 0 1.43-.12 2.06-.33L21 22l-.69-2.08A3.93 3.93 0 0 0 22 17.5c0-2.21-2.46-4-5.5-4zm-2 3.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm4 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="white" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.737-8.857L1.999 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" fill="white" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="white" />
    </svg>
  );
}
