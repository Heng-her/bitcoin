const translations = {
  en: {
    app_name: 'TradeApp',
    welcome: 'Welcome back',
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    menu: 'Menu'
  },
  km: {
    app_name: 'TradeApp',
    welcome: 'សូម​ស្វាគមន៍​វិញ',
    home: 'ទំព័រ​ដើម',
    profile: 'គណនី',
    settings: 'ការ​កំណត់',
    logout: 'ចាកចេញ',
    menu: 'ម៉ឺនុយ'
  }
};

// Export function that accepts lang
export function $t(key, lang = 'en') {
  return translations[lang]?.[key] || translations.en[key] || key;
}