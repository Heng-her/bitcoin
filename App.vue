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
	}
};
</script>

<style>
/* ✅ GLOBAL FONT — LOAD ONCE */
@font-face {
	font-family: 'CustomFont';
	src: url('/static/font/fontello.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

/* Optional: make it default for icons */
.icon {
	font-family: 'CustomFont';
}
</style>