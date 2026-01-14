<template>
	<app-layout>
		<view id="qrcode"></view>
	</app-layout>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import AppLayout from '../../components/AppLayout.vue';
	export default {
		data() {
			return {

			}
		},
		methods: {
	
		},
		mounted() {
			this.$nextTick(() => {
				new QRCode('qrcode', {
					text: 'https://example.com',
					width: 200,
					height: 200,
					colorDark: '#000000',
					colorLight: '#ffffff'
				})
			})
		},
		components: {
			AppLayout
		}
	}
</script>