'use client';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type ReactElement } from 'react';

import { usePathnameIntl } from '@/navigation';
import LangDropdown from '@/ui/LangDropdown/LangDropdown';

const Header = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathnameIntl();
  const t = useTranslations('Header');

  const handleScroll = (): void => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return (): void => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      position="sticky"
      className={`z-50 transition-all duration-300 ${isScrolled ? 'bg-black/30 shadow-lg' : 'bg-transparent'}`}
    >
      <NavbarContent>
        <Link href="/">
          <Image src="/images/logo.png" width={48} height={48} alt="logo" />
        </Link>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center"></NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem>
          <Link href="/#work">{t('work')}</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about">{t('about')}</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact">{t('contact')}</Link>
        </NavbarItem>
        <NavbarItem>
          <LangDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem className="flex flex-col justify-center items-center h-full gap-10">
          <Link
            href="/#work"
            className="text-3xl"
            onPress={() => {
              if (isMenuOpen) setIsMenuOpen(false);
            }}
          >
            {t('work')}
          </Link>
          <Link href="/about" className="text-3xl">
            {t('about')}
          </Link>
          <Link href="/contact" className="text-3xl">
            {t('contact')}
          </Link>
          <LangDropdown />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
