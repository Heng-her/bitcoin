<template>
	<app-layout>
		<text>
			Wallet
		</text>
		 <uni-icons :type="CustomFont" :size="26"></uni-icons>
	</app-layout>
</template>

<script>
	import AppLayout from '../../components/AppLayout.vue';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components:{
			AppLayout
		}
	}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: CustomFont;
  src: url('/static/font/fontello.ttf');
  font-weight: normal;
  font-style: normal;
}
</style>
