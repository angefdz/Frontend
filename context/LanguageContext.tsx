import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppLanguage, TranslationKey, translations, uiEnglish } from '@/i18n/translations';
import { generalCategoryNamesEn, generalPictogramNamesEn } from '@/data/generalTranslations.en';

type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: (key: TranslationKey) => string;
  tr: (spanish: string) => string;
  localize: (item: { id?: string | number; nombre: string; tipo?: string; pictogramas?: unknown[]; traducciones?: Partial<Record<AppLanguage, string>> }) => string;
  localizeCategory: (item: { id?: number; nombre: string; traducciones?: Partial<Record<AppLanguage, string>> }) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getDeviceLanguage(): AppLanguage {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
    return locale.startsWith('en') ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

export function LanguageProvider({ children }: { readonly children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(getDeviceLanguage);

  useEffect(() => { AsyncStorage.getItem('app-language').then(value => {
    if (value === 'es' || value === 'en') setLanguageState(value);
  }); }, []);

  const setLanguage = (value: AppLanguage) => {
    setLanguageState(value);
    void AsyncStorage.setItem('app-language', value);
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key: TranslationKey) => translations[language][key],
    tr: (spanish: string) => language === 'en' ? (uiEnglish[spanish] || spanish) : spanish,
    localize: (item: { id?: string | number; nombre: string; tipo?: string; pictogramas?: unknown[]; traducciones?: Partial<Record<AppLanguage, string>> }) => {
      if (item.traducciones?.[language]) return item.traducciones[language]!;
      if (language === 'en' && typeof item.id === 'number') {
        const bundled = generalPictogramNamesEn[item.id];
        if (bundled) return bundled;
      }
      return item.nombre;
    },
    localizeCategory: (item: { id?: number; nombre: string; traducciones?: Partial<Record<AppLanguage, string>> }) =>
      item.traducciones?.[language] ||
      (language === 'en' && item.id != null ? generalCategoryNamesEn[item.id] : undefined) ||
      item.nombre,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
