import Breadcrumb from '@/app/components/shared/Breadcrumb';

type InfoCard = {
  title: string;
  body: string;
};

interface StaticInfoPageProps {
  currentLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  cards: InfoCard[];
  sectionTitle: string;
  sectionParagraphs?: string[];
  sectionList?: string[];
}

export default function StaticInfoPage({
  currentLabel,
  eyebrow,
  title,
  intro,
  cards,
  sectionTitle,
  sectionParagraphs = [],
  sectionList = [],
}: StaticInfoPageProps) {
  return (
    <div className="pb-16">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: currentLabel },
        ]}
      />

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-2 sm:px-6 md:px-[39px]">
        <div className="rounded-[28px] border border-black/8 bg-white px-6 py-10 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:px-8 sm:py-12">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-black/45">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-[720px] text-[36px] font-semibold leading-[1.05] text-black sm:text-[48px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[760px] text-[16px] leading-7 text-black/65 sm:text-[18px]">
            {intro}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[24px] border border-black/8 bg-white px-6 py-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)]"
            >
              <h2 className="text-[20px] font-semibold text-black">{card.title}</h2>
              <p className="mt-3 text-[15px] leading-7 text-black/60">{card.body}</p>
            </article>
          ))}
        </div>

        <section className="rounded-[28px] border border-black/8 bg-white px-6 py-8 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:px-8">
          <h2 className="text-[26px] font-semibold text-black">{sectionTitle}</h2>

          {sectionParagraphs.length > 0 ? (
            <div className="mt-4 grid gap-4 text-[15px] leading-7 text-black/65 sm:grid-cols-2">
              {sectionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          {sectionList.length > 0 ? (
            <ul className="mt-4 grid gap-3 text-[15px] leading-7 text-black/65 sm:grid-cols-2">
              {sectionList.map((item) => (
                <li
                  key={item}
                  className="rounded-[18px] border border-black/8 bg-black/[0.02] px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </section>
    </div>
  );
}
