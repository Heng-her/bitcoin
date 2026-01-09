<template>
	<view class="container">
		<!-- Timeframe Tabs -->
		<view class="timeframe-bar">
			<view
				v-for="tf in timeframes"
				:key="tf"
				class="timeframe-item"
				:class="{ active: currentTimeframe === tf }"
				@click="changeTimeframe(tf)"
			>
				{{ tf }}
			</view>
		</view>

		<!-- Chart Placeholder (simulated as "candle area") -->
		<view class="chart-box">
			<text class="chart-text">Candlestick Chart ({{ currentTimeframe }})</text>
			<!-- In real app, replace this with <canvas> or a charting lib like uCharts -->
		</view>

		<!-- Trade Data List styled like mini candles -->
		<view class="trade-list">
			<view v-for="(item, index) in currentTrades" :key="index" class="trade-item">
				<view class="trade-header">
					<text class="time">{{ item.time || item.date }}</text>
					<text :class="['trend', { up: item.close >= item.open, down: item.close < item.open }]">
						{{ item.close >= item.open ? '▲' : '▼' }}
					</text>
				</view>
				<view class="ohlc-row">
					<text class="label">O:</text>
					<text class="value">{{ item.open.toFixed(2) }}</text>
					<text class="label">H:</text>
					<text class="value high">{{ item.high.toFixed(2) }}</text>
				</view>
				<view class="ohlc-row">
					<text class="label">L:</text>
					<text class="value low">{{ item.low.toFixed(2) }}</text>
					<text class="label">C:</text>
					<text :class="['value', { up: item.close >= item.open, down: item.close < item.open }]">
						{{ item.close.toFixed(2) }}
					</text>
				</view>
				<view class="volume-row">
					<text class="volume-label">Vol:</text>
					<text class="volume-value">{{ formatVolume(item.volume) }}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				timeframes: ["1m", "4m", "15m", "30m", "1h", "2h", "4h", "1d"],
				tradeData: {
					"1m": [{
							time: "10:00",
							open: 100,
							high: 101,
							low: 99,
							close: 100.5,
							volume: 120
						},
						{
							time: "10:01",
							open: 100.5,
							high: 102,
							low: 100,
							close: 101.8,
							volume: 98
						}
					],
					"4m": [{
							time: "10:00",
							open: 100,
							high: 103,
							low: 99,
							close: 102,
							volume: 450
						},
						{
							time: "10:04",
							open: 102,
							high: 104,
							low: 101,
							close: 103.5,
							volume: 380
						}
					],
					"15m": [{
							time: "10:00",
							open: 100,
							high: 105,
							low: 99,
							close: 104,
							volume: 1500
						},
						{
							time: "10:15",
							open: 104,
							high: 106,
							low: 102,
							close: 103,
							volume: 1320
						}
					],
					"30m": [{
							time: "10:00",
							open: 100,
							high: 108,
							low: 99,
							close: 106,
							volume: 3100
						},
						{
							time: "10:30",
							open: 106,
							high: 109,
							low: 104,
							close: 107,
							volume: 2800
						}
					],
					"1h": [{
							time: "10:00",
							open: 100,
							high: 110,
							low: 98,
							close: 108,
							volume: 6200
						},
						{
							time: "11:00",
							open: 108,
							high: 112,
							low: 106,
							close: 110,
							volume: 5900
						}
					],
					"2h": [{
							time: "10:00",
							open: 100,
							high: 115,
							low: 98,
							close: 112,
							volume: 12000
						},
						{
							time: "12:00",
							open: 112,
							high: 118,
							low: 110,
							close: 116,
							volume: 11000
						}
					],
					"4h": [{
							time: "08:00",
							open: 95,
							high: 120,
							low: 94,
							close: 118,
							volume: 24000
						},
						{
							time: "12:00",
							open: 118,
							high: 125,
							low: 115,
							close: 122,
							volume: 22000
						}
					],
					"1d": [{
							date: "2026-01-07",
							open: 90,
							high: 125,
							low: 88,
							close: 120,
							volume: 98000
						},
						{
							date: "2026-01-08",
							open: 120,
							high: 130,
							low: 115,
							close: 128,
							volume: 105000
						}
					]
				},
				currentTimeframe: "1m"
			}
		},
		computed: {
			currentTrades() {
				return this.tradeData[this.currentTimeframe] || [];
			}
		},
		methods: {
			changeTimeframe(tf) {
				this.currentTimeframe = tf;
			},
			formatVolume(vol) {
				if (vol >= 1e6) return (vol / 1e6).toFixed(1) + 'M';
				if (vol >= 1e3) return (vol / 1e3).toFixed(1) + 'K';
				return vol.toString();
			}
		}
	}
</script>
<style lang="scss">
.container {
	padding: 24rpx;
	background: #0f172a; /* slate-900 */
	min-height: 100vh;
	color: #e2e8f0; /* slate-200 */
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* === Timeframe Bar === */
.timeframe-bar {
	display: flex;
	gap: 12rpx;
	background: #1e293b; /* slate-800 */
	padding: 16rpx;
	border-radius: 14rpx;
	margin-bottom: 24rpx;

	.timeframe-item {
		flex: 1;
		text-align: center;
		padding: 12rpx 0;
		border-radius: 10rpx;
		font-size: 26rpx;
		font-weight: 600;
		color: #94a3b8; /* slate-400 */
		transition: all 0.2s ease;

		&.active {
			background: #10b981; /* emerald-500 */
			color: #064e3b; /* emerald-900 */
			font-weight: bold;
		}

		&:not(.active):hover {
			background: #334155; /* slate-700 */
			color: #cbd5e1; /* slate-200 */
		}
	}
}

/* === Chart Box === */
.chart-box {
	height: 360rpx;
	background: #020617; /* slate-950 */
	border-radius: 16rpx;
	margin-bottom: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1rpx solid #1e293b;

	.chart-text {
		color: #64748b; /* slate-500 */
		font-size: 28rpx;
		opacity: 0.8;
	}
}

/* === Trade List === */
.trade-list {
	.trade-item {
		background: #1e293b; /* slate-800 */
		padding: 20rpx;
		border-radius: 14rpx;
		margin-bottom: 20rpx;
		border-left: 4rpx solid transparent;

		&:first-child {
			border-left-color: #10b981; /* emerald-500 */
		}
	}

	.trade-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 14rpx;

		.time {
			font-size: 24rpx;
			color: #94a3b8;
		}

		.trend {
			font-size: 20rpx;
			font-weight: bold;
		}

		.up {
			color: #10b981; /* green */
		}

		.down {
			color: #ef4444; /* red */
		}
	}

	.ohlc-row {
		display: flex;
		gap: 16rpx;
		margin-bottom: 6rpx;
		font-size: 24rpx;
	}

	.label {
		color: #94a3b8;
		min-width: 30rpx;
	}

	.value {
		color: #e2e8f0;
		font-family: monospace;
	}

	.high {
		color: #10b981;
	}

	.low {
		color: #ef4444;
	}

	.up {
		color: #10b981 !important;
	}

	.down {
		color: #ef4444 !important;
	}

	.volume-row {
		display: flex;
		gap: 12rpx;
		margin-top: 8rpx;
		font-size: 22rpx;
	}

	.volume-label {
		color: #64748b;
	}

	.volume-value {
		color: #38bdf8; /* sky-400 */
		font-family: monospace;
	}
}
</style>