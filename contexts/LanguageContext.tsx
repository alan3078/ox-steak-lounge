"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    home: "Home",
    menu: "Menu",
    blog: "Blog",
    contact: "Contact",
    reserveTable: "Reserve Table",
    
    // Hero Banner
    heroTitle: "Experience",
    heroPrime: "Prime Perfection",
    heroDescription: "OX Steak Lounge combines British elegance with premium steaks in a golden ox-themed setting. Each dish is crafted with precision and passion, offering you an immersive British steakhouse experience.",
    exploreMenu: "Explore Menu",
    reserveNow: "Reserve Now",
    
    // Features
    awardWinningChefs: "Award-Winning Chefs",
    premiumAgedSteaks: "Premium Aged Steaks",
    fiveStarExcellence: "5-Star Excellence",
    
    // Menu Section
    ourMenu: "Our Menu",
    menuSubtitle: "Discover Our Premium Selection",
    premiumCuts: "Premium Cuts",
    appetizers: "Appetizers",
    desserts: "Desserts",
    beverages: "Beverages",
    
    // Blog Section
    latestNews: "Latest News & Events",
    blogSubtitle: "Stay Updated with Our Stories",
    readMore: "Read More",
    
    // Footer
    brand: "OX Steak Lounge",
    footerDescription: "Experience the finest steaks and exceptional service in an elegant atmosphere.",
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    reservations: "Reservations",
    privateEvents: "Private Events",
    careers: "Careers",
    giftCards: "Gift Cards",
    contactUs: "Contact Us",
    
    // Contact Info
    address: "Shop 1, G/F, Yuet Fat Building, 9 Kwu Uk Lane, Tai Po Old Market",
    phone: "+852 1234 5678",
    email: "info@oxsteaklounge.com",
    hours: "Mon-Sun: 12:00 PM - 11:00 PM",
    
    // Newsletter
    newsletter: "Subscribe to Our Newsletter",
    newsletterDescription: "Get the latest updates on special menus and exclusive offers",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    
    // Copyright
    copyright: "OX Steak Lounge. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
  },
  zh: {
    // Navbar
    home: "主頁",
    menu: "菜單",
    blog: "博客",
    contact: "聯絡",
    reserveTable: "預訂座位",
    
    // Hero Banner
    heroTitle: "體驗",
    heroPrime: "頂級完美",
    heroDescription: "OX Steak Lounge，金碧輝煌的金牛角裝飾，集英倫風情與頂級牛排於一身。每道菜品都注入了精心設計與用心烹飪，更是一個能讓你盡情沉浸於英式扒房文化的絕佳場所。",
    exploreMenu: "探索菜單",
    reserveNow: "立即預訂",
    
    // Features
    awardWinningChefs: "獲獎廚師",
    premiumAgedSteaks: "優質熟成牛排",
    fiveStarExcellence: "五星卓越",
    
    // Menu Section
    ourMenu: "我們的菜單",
    menuSubtitle: "探索我們的精選美食",
    premiumCuts: "精選牛排",
    appetizers: "前菜",
    desserts: "甜點",
    beverages: "飲品",
    
    // Blog Section
    latestNews: "最新消息與活動",
    blogSubtitle: "緊貼我們的故事",
    readMore: "閱讀更多",
    
    // Footer
    brand: "OX 牛扒廊",
    footerDescription: "在優雅的氛圍中體驗最優質的牛排和卓越的服務。",
    quickLinks: "快速連結",
    aboutUs: "關於我們",
    reservations: "預訂",
    privateEvents: "私人活動",
    careers: "職位空缺",
    giftCards: "禮品卡",
    contactUs: "聯絡我們",
    
    // Contact Info
    address: "大埔舊墟直街9號粵發大廈地下1號舖",
    phone: "+852 1234 5678",
    email: "info@oxsteaklounge.com",
    hours: "星期一至日：12:00 - 23:00",
    
    // Newsletter
    newsletter: "訂閱我們的通訊",
    newsletterDescription: "獲取特別菜單和獨家優惠的最新資訊",
    emailPlaceholder: "輸入您的電郵地址",
    subscribe: "訂閱",
    
    // Copyright
    copyright: "OX 牛扒廊。版權所有。",
    privacyPolicy: "私隱政策",
    termsOfService: "服務條款",
    cookiePolicy: "Cookie 政策",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
