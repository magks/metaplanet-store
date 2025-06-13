
import { getMenu } from 'lib/shopify';

// i18n
import { getLocale, getTranslations } from 'next-intl/server';


const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const currentYear = new Date().getFullYear();
  //const copyrightDate = 1999 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightDate = currentYear;
  const skeleton = 'w-full h-6 animate-pulse rounded-sm bg-neutral-200 ignoredark:bg-neutral-700';
  //const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';
  return (
    <footer className="`w-full -pb-4 mt-auto bg-background">

      <div
        className={`container mx-auto text-center text-sm flex flex-col md:flex-row gap-4 items-end justify-center ${ "text-foreground/50"} /* ""}*/`}
      >
        <div>
          <div className="block md:inline">
            ©️ {currentYear} Metaplanet Inc.
          </div>
          <div className="block md:inline">All Rights Reserved.</div>
          <div className="block md:inline">
            「Registered Trademark―登録商標」
          </div>
        </div>
        <div className="flex gap-3">
          <div>
            <a href="/about/contact-us" className="hover:text-foreground/70">
              Contact Us
            </a>
          </div>
          <div>
            <a href={`/privacy-policy`} className="hover:text-foreground/70">
              Privacy Policy
            </a>
          </div>
          <div>
            <a
              href="https://aqsmixvnbavrufgttwsn.supabase.co/storage/v1/object/public/media-kit/Media_Kit_Metaplanet.zip"
              download
              className="hover:text-foreground/70"
            >
              Media Kit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


