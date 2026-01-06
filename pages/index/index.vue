<template>
	<AppLayout title="home" username="bunheng">
		<!-- <MyButton @click="logout">Logout</MyButton> -->
		<view class="main">
			<!-- Promo carousel -->
			<view class="promo">
				<view class="promo-card" :style="{ backgroundImage: `url(${promo.bg})` }">
					<!-- Overlay -->
					<view class="promo-overlay"></view>

					<!-- Content -->
					<view class="promo-content">
						<text class="promo-badge">{{ promo.badge }}</text>
						<text class="promo-title">{{ promo.title }}</text>
						<text class="promo-desc">{{ promo.desc }}</text>
						<view class="promo-btn">Check Now</view>
					</view>
				</view>
			</view>

			<!-- Quick Actions  -->
			<view class="actions">
				<view class="action-item" v-for="(item, i) in actions" :key="i">
					<view class="action-icon">
						<uni-icons :type="item.icon" size="28" color="#2bee79" />
					</view>
					<text class="action-text">{{item.label}}</text>
				</view>
			</view>
			<!-- Market list -->
			<view class="market">
				<view class="market-header">
					<text class="market-title">Market List</text>
					<view class="tabs">
						<text v-for="(tab, i) in tabs" :key="i" :class="['tab', {active: activeTab === tab}]">
							{{tab}}
						</text>
					</view>
				</view>
				<view class="market-row" v-for="(coin, i) in markets" :key="i">
					<view class="market-col">
						<view class="icon">
							<view class="coin-icon" :style="{background: coin.color}">
								{{coin.symbol}}
							</view>
							
						</view>
						<view style="display: grid;">
							<text class="coin-name">
								{{coin.name}}
								<text class="pair">/USDT</text>
							</text>
							<text class="volume">Vol {{coin.vol}}</text>
						</view>
					</view>
					<view class="price">
						<text class="value">{{coin.price}}</text>
						<text class="change" :class="coin.change > 0 ? 'up':'down'">
							{{coin.change}}%
						</text>
					</view>
				</view>
			</view>
		</view>
	</AppLayout>
</template>
<script>
	import MyButton from '../../components/MyButton.vue'
	import AppLayout from '../../components/AppLayout.vue'
	export default {
		data() {
			return {
				activeTab: 'Hot',

				promo: {
					badge: 'New Feature',
					title: 'Contract Transaction',
					desc: 'Easy and Simple Transaction with 0% fees',
					bg: './static/signal.png'
				},

				actions: [{
						label: 'Deposit',
						icon: 'wallet'
					},
					{
						label: 'Withdraw',
						icon: 'paperplane'
					},
					{
						label: 'Mining',
						icon: 'vip'
					},
					{
						label: 'Identity',
						icon: 'contact'
					},
					{
						label: 'Messages',
						icon: 'chat'
					},
					{
						label: 'Live Agent',
						icon: 'headphones'
					},
					{
						label: 'App',
						icon: 'phone'
					},
					{
						label: 'More',
						icon: 'more-filled'
					}
				],

				tabs: ['Gainers', 'Vol'],

				markets: [{
						name: 'BTC',
						symbol: '₿',
						vol: '2.4B',
						price: '43,210.50',
						change: 1.2,
						color: '#F7931A'
					},
					{
						name: 'ETH',
						symbol: 'Ξ',
						vol: '980M',
						price: '2,240.10',
						change: -0.5,
						color: '#627EEA'
					},
					{
						name: 'XAU',
						symbol: 'XAU',
						vol: '120M',
						price: '1,980.00',
						change: 0.1,
						color: '#D4AF37'
					},
					{
						name: 'SOL',
						symbol: 'SOL',
						vol: '850M',
						price: '98.45',
						change: 5.43,
						color: '#000'
					},
					{
						name: 'XRP',
						symbol: 'XRP',
						vol: '320M',
						price: '0.6240',
						change: -1.15,
						color: '#23292F'
					}
				]
			}
		},
		onShow() {
			const isLogin = uni.getStorageSync('isLogin')
			if (!isLogin) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
		},
		methods: {
			logout() {
				uni.removeStorageSync('isLogin')
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		},
		components: {
			AppLayout,
			MyButton
		}

	}
</script>
<style lang="scss" scoped>
	.main {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
		padding-bottom: 40rpx;
	}

	/* PROMO CARD */
	.promo-card {
		position: relative;
		border-radius: 36rpx;
		overflow: hidden;
		padding: 44rpx;
		min-height: 220rpx;
		background-size: cover;
		background-position: center;
		color: #fff;
		box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.25);
	}

	/* Gradient Overlay */
	.promo-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(120deg,
				rgba(16, 34, 23, 0.95) 0%,
				rgba(31, 66, 46, 0.85) 50%,
				rgba(16, 34, 23, 0.4) 100%);
		z-index: 1;
	}

	/* Content */
	.promo-content {
		position: relative;
		z-index: 2;
		max-width: 75%;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}

	/* Badge */
	.promo-badge {
		width: fit-content;
		background: rgba(43, 238, 121, 0.2);
		color: #2bee79;
		font-size: 18rpx;
		font-weight: 700;
		padding: 6rpx 14rpx;
		border-radius: 10rpx;
		text-transform: uppercase;
		letter-spacing: 1rpx;
	}

	/* Title */
	.promo-title {
		font-size: 42rpx;
		font-weight: 800;
		line-height: 1.2;
	}

	/* Description */
	.promo-desc {
		font-size: 22rpx;
		color: #d1d5db;
		line-height: 1.5;
	}

	/* Button */
	.promo-btn {
		margin-top: 12rpx;
		width: fit-content;
		padding: 14rpx 36rpx;
		border-radius: 999rpx;
		background: linear-gradient(135deg, #2bee79, #1ddf6b);
		color: #102217;
		font-size: 22rpx;
		font-weight: 800;
		box-shadow: 0 12rpx 24rpx rgba(43, 238, 121, 0.35);
		transition: all 0.15s ease;
	}

	/* Pressed state */
	.promo-btn:active {
		transform: scale(0.96);
		box-shadow: 0 6rpx 12rpx rgba(43, 238, 121, 0.25);
		background: linear-gradient(135deg, #24d86b, #18c960);
	}



	// Action
	.actions {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		row-gap: 32rpx;
	}

	.action-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12rpx;
	}

	.action-icon {
		width: 112rpx;
		height: 112rpx;
		background: #fff;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-item {
		font-size: 20rpx;
		color: #374151;
	}

	// market
	.market-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 8rpx;
	}

	.market-title {
		font-size: 32rpx;
		font-weight: 700;
	}

	.tabs {
		display: flex;
		gap: 40px;
		padding-right: 10px;
		font-weight: 700;
	}

	.tab {
		padding: 8rpx 20rpx;
		border-radius: 999rpx;
		font-size: 20rpx;
		color: #6b7280;
	}

	.tab:active {
		background: rgba(43, 238, 121, 0.15);
		color: #2bee79;
		font-weight: 700;
	}

	.market-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 0;
		border-bottom: 1rpx solid #eee;
	}
	.market-col{
		display: flex;
		gap: 10rpx;
	}

	.coin-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		color: #fff;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 8pt;
	}

	.coin-name {
		font-weight: 700;
		font-size: 28rpx;
	}

	.pair {
		font-size: 20rpx;
		color: #9ca3af;
		margin-left: 8rpx;
	}
	.volume{
		font-size: 20rpx;
		color: #6b7280;
	}
	.price{
		text-align: right;
		gap: 20rpx;
		display: flex;
	}
	.value {
		font-weight: 700;
	}
	
	.change {
		font-size: 20rpx;
		padding: 8px 20px;
		justify-items: center;
		border-radius: 8rpx;
		font-weight: 700;
	}
	
	.change.up {
		background: rgba(43, 238, 121, 0.2);
		color: #0a3a20;
		width: 30px;
	}
	
	.change.down {
		background: rgba(231, 42, 8, 0.45);
		color: #e72a08;
		width: 30px;
	}
</style>