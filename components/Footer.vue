<template>
	<view class="custom-tabbar">
		<!-- Home -->
		<view class="tab-item" @click="switchTab('/pages/index/index')">
			<image :src="currentTab === '/pages/index/index' ? activeIcons.home : icons.home" />
			<text :class="{ active: currentTab === '/pages/index/index' }">Home</text>
		</view>

		<!-- Market -->
		<view class="tab-item" @click="switchTab('/pages/market/market')">
			<image :src="currentTab === '/pages/market/market' ? activeIcons.market : icons.market" />
			<text :class="{ active: currentTab === '/pages/market/market' }">Market</text>
		</view>

		<!-- Center FAB -->
		<view class="center-fab" @click.stop="openTrade">
			<image src="/static/tab/switch.png" mode="aspectFit" />
		</view>

		<!-- Futures -->
		<view class="tab-item" @click="switchTab('/pages/futures/futures')">
			<image :src="currentTab === '/pages/futures/futures' ? activeIcons.futures : icons.futures" />
			<text :class="{ active: currentTab === '/pages/futures/futures' }">Futures</text>
		</view>

		<!-- Wallet -->
		<view class="tab-item" @click="switchTab('/pages/wallet/wallet')">
			<image :src="currentTab === '/pages/wallet/wallet' ? activeIcons.wallet : icons.wallet" />
			<text :class="{ active: currentTab === '/pages/wallet/wallet' }">Wallet</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentTab: '',
			icons: {
				home: '/static/tab/home.png',
				market: '/static/tab/market.png',
				futures: '/static/tab/futures.png',
				wallet: '/static/tab/wallet.png'
			},
			activeIcons: {
				home: '/static/tab/home_active.png',
				market: '/static/tab/market_active.png',
				futures: '/static/tab/futures_active.png',
				wallet: '/static/tab/wallet_active.png'
			}
		}
	},

	mounted() {
		this.updateCurrentTab()
	},

	methods: {
		updateCurrentTab() {
			const pages = getCurrentPages()
			if (pages.length) {
				this.currentTab = '/' + pages[pages.length - 1].route
			}
		},

		switchTab(path) {
			if (this.currentTab === path) return
			uni.switchTab({ url: path })
		},

		openTrade() {
			this.$emit('open-trade')
		}
	}
}
</script>

<style scoped>
	.custom-tabbar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 60px;
		background-color: #fff;
		border-top: 1px solid #eee;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.tab-item image {
		width: 24px;
		height: 24px;
	}

	.tab-item text {
		font-size: 12px;
		color: #9ca3af;
		margin-top: 4px;
	}

	.tab-item text.active {
		color: #22c55e;
		font-weight: 500;
	}

	.center-fab {
		width: 40px;
		height: 40px;
		border-radius: 28px;
		background-color: #22c55e;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
		position: relative;
		z-index: 10;
		margin-top: 0px;
		/* lifts it up above the bar */
	}

	.center-fab image {
		width: 20px;
		height: 20px;
	}
</style>