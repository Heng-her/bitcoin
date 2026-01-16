// mixins/i18nMixin.js
import { $t, getCurrentLanguage } from '../utils/i18n';

export default {
	data() {
		return {
			currentLang: getCurrentLanguage()
		};
	},
	created() {
		// Listen for language changes
		this.$on('language-changed', (lang) => {
			this.currentLang = lang;
			this.$forceUpdate();
		});
	},
	methods: {
		$t(key) {
			return $t(key, this.currentLang);
		}
	}
};