'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, UtensilsCrossed, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReservationModal } from '@/components/ReservationModal';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Determine if we should use inverted colors (dark text on light bg)
  const textColor = isScrolled ? 'text-black' : 'text-white';
  const hoverColor = isScrolled ? 'hover:text-primary' : 'hover:text-secondary';
  const iconColor = isScrolled ? 'text-primary' : 'text-secondary';
  const underlineColor = isScrolled ? 'bg-primary' : 'bg-secondary';
  const bgColor = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg'
    : 'bg-black/95 backdrop-blur-md shadow-sm';

  // : isBlogDetailPage
  //   ? "bg-black/95 backdrop-blur-sm"
  //   : "bg-transparent";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('home'), href: '#home', isHash: true },
    { label: t('menu'), href: '/menu', isHash: false },
    { label: t('blog'), href: '/blog', isHash: false },
    { label: t('contact'), href: '#footer', isHash: true },
  ];

  const handleNavigation = (href: string, isHash: boolean) => {
    if (!isHash) {
      // Direct page navigation using Link
      const link = document.createElement('a');
      link.href = href;
      link.click();
      return;
    }

    if (!isHomePage) {
      // Navigate to home page with hash
      const link = document.createElement('a');
      link.href = '/' + href;
      link.click();
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor}`}>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='flex items-center gap-2 cursor-pointer'>
              <UtensilsCrossed className={`w-8 h-8 transition-colors ${iconColor}`} />
              <span className={`text-2xl font-bold transition-colors ${textColor}`}>
                OX <span className={`transition-colors ${iconColor}`}>Steak Lounge</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='hidden md:flex items-center gap-8'>
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => handleNavigation(item.href, item.isHash)}
                className={`${textColor} ${hoverColor} transition-colors font-medium relative group`}>
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${underlineColor}`}
                />
              </motion.button>
            ))}
            <Button
              className='bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold'
              onClick={() => setIsReservationModalOpen(true)}>
              {t('reserveTable')}
            </Button>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={toggleLanguage}
              className={`${textColor} ${hoverColor} transition-colors flex items-center gap-2`}>
              <Languages className='w-5 h-5' />
              <span className='text-sm font-medium'>{language === 'en' ? '中' : 'EN'}</span>
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden bg-black/98 backdrop-blur-md'>
            <div className='container mx-auto px-4 py-6 flex flex-col gap-4'>
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavigation(item.href, item.isHash)}
                  className='text-white hover:text-secondary transition-colors text-left py-2'>
                  {item.label}
                </motion.button>
              ))}
              <Button
                className='bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold w-full'
                onClick={() => {
                  setIsReservationModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}>
                {t('reserveTable')}
              </Button>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={toggleLanguage}
                className='text-white hover:text-secondary transition-colors flex items-center gap-2 py-2'>
                <Languages className='w-5 h-5' />
                <span className='font-medium'>
                  {language === 'en' ? '切換至中文' : 'Switch to English'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation Modal */}
      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
      />
    </motion.nav>
  );
}
