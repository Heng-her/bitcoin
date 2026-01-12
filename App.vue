<script>
	import { confirmLogout } from './common/auth';
export default {
	onLaunch() {
		console.log('App Launch');
	},
	onShow() {
		console.log('App Show');
	},
	onHide() {
		console.log('App Hide');
	},
	methods: {
		confirmLogout
	},
};
</script>