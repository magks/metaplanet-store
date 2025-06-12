import Footer from 'components/shared/layout/footer';
import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';

export default function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  console.log(`pageLayout::locale=${locale}`);

  return (
    <>
      <div className="w-full">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
}
