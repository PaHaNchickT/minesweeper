'use client';

import { Button, Link } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import { GithubOutlineIcon } from '@/ui/Icons/GithubOutlineIcon';

export const Footer = (): ReactElement => {
  const t = useTranslations('Footer');

  return (
    <footer className="z-5 bg-black/30 border-t-1 border-t-default-300 w-full flex justify-center backdrop-blur-lg backdrop-saturate-150">
      <div className="px-6 py-10 gap-10 w-full flex flex-col max-w-[1024px]">
        <div className="flex justify-between">
          <div className="flex gap-10 flex-wrap sm:gap-28">
            <div className="flex flex-col gap-5">
              <p>{t('headers.contact')}</p>
              <Link href="https://vk.com/ternopavel" target="_blank">
                {t('links.vk')}
              </Link>
              <Link href="https://t.me/pahanchickt" target="_blank">
                {t('links.tg')}
              </Link>
              <Link href="mailto: pt1999@mail.ru" target="_blank">
                pt1999@mail.ru
              </Link>
            </div>
            <div className="flex flex-col gap-5">
              <p>{t('headers.navigation')}</p>
              <Link href="/#work">{t('links.work')}</Link>
              <Link href="/about">{t('links.about')}</Link>
              <Link href="/contact">{t('links.contact')}</Link>
            </div>
          </div>
          <Button
            color="primary"
            className="text-background rounded-full min-w-0 font-black"
            onPress={() => {
              if (window) window.scrollTo(0, 0);
            }}
          >
            ↑
          </Button>
        </div>
        <div className="flex justify-between items-end flex-wrap gap-5">
          <Link href="https://github.com/PaHaNchickT" target="_blank" className="flex gap-2">
            <p>GitHub</p>
            <GithubOutlineIcon />
          </Link>
          <p className="text-sm">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
