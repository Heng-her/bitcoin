<template>
	<AppLayoutVue>
		<view class="">
			<echarts-vue :onInit="initChart" />
		</view>
	</AppLayoutVue>
</template>

<script>
	import echartsVue from '@/uni_modules/mpvue-echarts/components/echarts.vue';
	import * as echarts from '@/uni_modules/mpvue-echarts/components/echarts.esm.min.js';
	import AppLayoutVue from '../../components/AppLayout.vue';
	export default {
		components: {
			echartsVue,
			AppLayoutVue
		},
		methods: {
			initChart(canvas, width, height) {
				const chart = echarts.init(canvas, null, {
					width: width,
					height: height
				});

				const option = {
					title: {
						text: 'Sales Example'
					},
					tooltip: {},
					xAxis: {
						data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
					},
					yAxis: {},
					series: [{
						name: 'Sales',
						type: 'bar',
						data: [5, 20, 36, 10, 13, 20]
					}]
				};

				chart.setOption(option);
				return chart; // must return chart instance
			}
		}
	}
</script>