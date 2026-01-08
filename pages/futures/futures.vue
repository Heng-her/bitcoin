<template>
	<AppLayout>
		<view class="container">
		
			<!-- Header -->
			<view class="header">
				<view class="icon-btn">
					<uni-icons type="arrowleft" size="22" />
				</view>
		
				<view class="coin-info">
					<view class="coin-icon">
						<uni-icons type="staff" size="18" color="#fff" />
					</view>
					<view>
						<text class="coin-pair">BTC/USD</text>
						<text class="coin-name">Bitcoin</text>
					</view>
				</view>
		
				<view class="icon-btn">
					<uni-icons type="star" size="22" />
				</view>
			</view>
		
			<!-- Price -->
			<view class="price-box">
				<text class="label">Current Price</text>
				<text class="price">$42,394.50</text>
		
				<view class="change">
					<uni-icons type="arrowup" size="14" color="#2bee79" />
					<text class="change-text">+1.25%</text>
					<text class="change-time">24h</text>
				</view>
			</view>
		
			<!-- Timeframes -->
			<view class="timeframes">
				<view v-for="t in timeframes" :key="t" :class="['time-btn', activeTime === t && 'active']"
					@click="activeTime = t">
					{{ t }}
				</view>
			</view>
		
			<!-- Chart Placeholder -->
			<view class="chart-box">
				<text class="chart-text">Chart Placeholder</text>
			</view>
		
			<!-- Market Stats -->
			<view class="stats">
				<view class="stat-card">
					<text class="stat-label">24h High</text>
					<text class="stat-value">$43,100.00</text>
				</view>
				<view class="stat-card">
					<text class="stat-label">24h Low</text>
					<text class="stat-value">$41,200.00</text>
				</view>
				<view class="stat-card">
					<text class="stat-label">Volume (24h)</text>
					<text class="stat-value">2.1B USD</text>
				</view>
				<view class="stat-card">
					<text class="stat-label">Market Cap</text>
					<text class="stat-value">829.4B USD</text>
				</view>
			</view>
		
			<!-- About -->
			<view class="about">
				<text class="about-title">About Bitcoin</text>
				<text class="about-text">
					Bitcoin is a decentralized digital currency that allows peer-to-peer
					transactions without intermediaries.
				</text>
			</view>
		
			<!-- Bottom Actions -->
			<view class="bottom-bar">
				<view class="sell-btn">
					<uni-icons type="minus" size="16" />
					Sell
				</view>
				<view class="buy-btn">
					<uni-icons type="plus" size="16" />
					Buy
				</view>
			</view>
		</view>
	</AppLayout>
</template>

<script>
	import AppLayout from '../../components/AppLayout.vue';
	export default {
		data() {
			return {
				timeframes: ['1H', '1D', '1W', '1M', '1Y'],
				activeTime: '1H'
			}
		},
		components:{
			AppLayout
		}
	}
</script>

<style scoped>
	.container {
		padding-bottom: 220rpx;
	}

	/* Header */
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx;
	}

	.icon-btn {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.coin-info {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}

	.coin-icon {
		width: 56rpx;
		height: 56rpx;
		border-radius: 50%;
		background: #f7931a;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.coin-pair {
		font-size: 32rpx;
		font-weight: bold;
	}

	.coin-name {
		font-size: 22rpx;
		color: #888;
	}

	/* Price */
	.price-box {
		text-align: center;
		padding: 32rpx 0;
	}

	.label {
		font-size: 22rpx;
		color: #888;
	}

	.price {
		font-size: 56rpx;
		font-weight: 800;
		margin: 12rpx 0;
	}

	.change {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		color: #2bee79;
	}

	.change-time {
		color: #888;
		font-size: 22rpx;
	}

	/* Timeframes */
	.timeframes {
		display: flex;
		justify-content: space-around;
		margin: 24rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 8rpx;
	}

	.time-btn {
		padding: 12rpx 24rpx;
		font-size: 22rpx;
		color: #888;
	}

	.time-btn.active {
		background: #f0f0f0;
		border-radius: 12rpx;
		color: #000;
		font-weight: bold;
	}

	/* Chart */
	.chart-box {
		height: 360rpx;
		margin: 24rpx;
		border-radius: 20rpx;
		background: #f6f8f7;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #aaa;
	}

	/* Stats */
	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16rpx;
		padding: 24rpx;
	}

	.stat-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 24rpx;
	}

	.stat-label {
		font-size: 22rpx;
		color: #888;
	}

	.stat-value {
		font-size: 26rpx;
		font-weight: bold;
	}

	/* About */
	.about {
		padding: 24rpx;
	}

	.about-title {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 12rpx;
	}

	.about-text {
		font-size: 24rpx;
		color: #666;
		line-height: 1.6;
	}

	/* Bottom Bar */
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		gap: 24rpx;
		padding: 24rpx;
		background: #fff;
	}

	.sell-btn,
	.buy-btn {
		flex: 1;
		height: 88rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-weight: bold;
	}

	.sell-btn {
		border: 2rpx solid #ff4d4d;
		color: #ff4d4d;
	}

	.buy-btn {
		background: #2bee79;
		color: #000;
	}
</style>