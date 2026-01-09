<script>
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
		logout() {
			uni.removeStorageSync('isLogin')
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
	},
};
</script>