'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { Language, getLanguage, setLanguage, t } from '@/lib/translations';

export const LanguageToggle = () => {
  const [currentLang, setCurrentLang] = useState<Language>('th');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLang(getLanguage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrentLang(lang);
    setIsOpen(false);
    // Trigger a page refresh to update all translations
    window.location.reload();
  };

  const languages = [
    { code: 'th' as Language, name: 'ไทย', flag: '🇹🇭' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguageData = languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <motion.div
        className="relative"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-3 bg-background/80 backdrop-blur-md border border-border/50 rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-lg">{currentLanguageData.flag}</span>
            <span className="text-sm font-medium text-foreground hidden group-hover:block transition-all duration-200">
              {currentLanguageData.name}
            </span>
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b border-border/30">
                  {t('language_toggle_i18n', currentLang)}
                </div>
                {languages.map((language) => (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                      currentLang === language.code
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent/50 text-foreground'
                    }`}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{language.name}</div>
                      {language.code === 'th' && <div className="text-xs text-muted-foreground">ภาษาไทย</div>}
                      {language.code === 'en' && <div className="text-xs text-muted-foreground">English</div>}
                    </div>
                    {currentLang === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default LanguageToggle;
