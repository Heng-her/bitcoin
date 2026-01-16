const translations = {
	en: {
		app_name: 'TradeApp',
		welcome: 'Welcome back',
		home: 'Home',
		profile: 'Profile',
		settings: 'Settings',
		logout: 'Log Out',
		menu: 'Menu',
		language_changed: 'Language changed',
		change_language: 'Change Language',

		// Settings Page
		preferences: 'Preferences',
		language: 'Language',
		base_currency: 'Base Currency',
		dark_mode: 'Dark Mode',

		security: 'Security',
		face_id: 'Face ID',
		two_factor_auth: '2-Factor Auth',
		enabled: 'Enabled',

		support: 'Support',
		help_center: 'Help Center',

		my_qr_code: 'My QR Code',
		pro_trader_account: 'Pro Trader Account',

		app_version: 'App Version',
		copyright: '© 2024 TradePro Inc.',

		// home page
		deposit: 'Deposit',
		withdraw: 'Withdraw',
		mining: 'Mining',
		identity: 'Identity',
		messages: 'Messages',
		live_agent: 'Live Agent',
		app: 'App',
		more: 'More',
	},

	km: {
		app_name: 'TradeApp',
		welcome: 'សូម​ស្វាគមន៍​វិញ',
		home: 'ទំព័រ​ដើម',
		profile: 'គណនី',
		settings: 'ការ​កំណត់',
		logout: 'ចាកចេញ',
		menu: 'ម៉ឺនុយ',
		language_changed: 'បាន​ផ្លាស់ប្ដូរ​ភាសា',
		change_language: 'ផ្លាស់ប្តូរភាសា',

		// Settings Page
		preferences: 'ចំណូលចិត្ត',
		language: 'ភាសា',
		base_currency: 'រូបិយប័ណ្ណ​មូលដ្ឋាន',
		dark_mode: 'របៀបងងឹត',

		security: 'សុវត្ថិភាព',
		face_id: 'មុខសម្គាល់',
		two_factor_auth: 'ការផ្ទៀងផ្ទាត់ ២ ជំហាន',
		enabled: 'បានបើក',

		support: 'គាំទ្រ',
		help_center: 'មជ្ឈមណ្ឌល​ជំនួយ',

		my_qr_code: 'កូដ QR របស់ខ្ញុំ',
		pro_trader_account: 'គណនី​ពាណិជ្ជករ​ជំនាញ',

		app_version: 'កំណែ​កម្មវិធី',
		copyright: '© 2024 TradePro Inc.',

		// home page 
		deposit: 'ដាក់ប្រាក់',
		withdraw: 'ដកប្រាក់',
		mining: 'រ៉ែ',
		identity: 'អត្តសញ្ញាណ',
		messages: 'សារ',
		live_agent: 'ភ្នាក់ងារផ្ទាល់',
		app: 'កម្មវិធី',
		more: 'ច្រើនទៀត',
	}
};

// Get current language
export function getCurrentLanguage() {
	return uni.getStorageSync('APP_LANG') || 'en';
}

// Set language
export function setLanguage(lang) {
	uni.setStorageSync('APP_LANG', lang);
}

// Translation function
export function $t(key, lang = null) {
	const currentLang = lang || getCurrentLanguage();
	return translations[currentLang]?.[key] || translations.en[key] || key;
}