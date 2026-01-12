<template>
	<view class="page">
		<!-- Top Bar -->
		<view class="top-bar">
			<view class="icon-btn" @click="backhome">
				<uni-icons type="left" size="22" />
			</view>
			<text class="title">Profile</text>
			<view class="icon-btn" @click="setting">
				<uni-icons type="gear" size="22" />
			</view>
		</view>

		<!-- Profile Header -->
		<view class="profile-header">
			<view class="avatar-box">
				<image class="avatar" src="/static/profile/user.png" mode="aspectFill" />
			</view>

			<view class="name-row">
				<text class="name">Bunheng</text>
				<image src="/static/profile/verified.png" style="width: 25px; height: 25px;" />
			</view>

			<view class="account-id" @click="copyToClipboard">
				<text>ACCT-849302</text>
				<image :src="iscopy ? '/static/profile/copy.png' : '/static/profile/check.png'" class="copy-icon" />
			</view>
		</view>

		<!-- Equity Card -->
		<view class="card">
			<view class="equity-row">
				<view style="display: grid;">
					<text class="muted">Total Equity</text>
					<text class="equity">$14,250.00</text>
				</view>
				<view class="pnl">
					<text class="muted">Today</text>
					<view class="pnl-badge">
						<image src="/static/profile/up.png" style="width: 15px; height: 15px;" />
						<text>+$120.50</text>
					</view>
					<text class="pnl-percent">+0.8%</text>
				</view>
			</view>

			<view class="progress">
				<view class="progress-item">
					<view class="progress-label">
						<text>Crypto</text>
						<text>$9,262.50</text>
					</view>
					<view class="bar">
						<view class="bar-fill crypto"></view>
					</view>
				</view>

				<view class="progress-item">
					<view class="progress-label">
						<text>Forex</text>
						<text>$4,987.50</text>
					</view>
					<view class="bar">
						<view class="bar-fill forex"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- Account Menu -->
		<view class="section">
			<text class="section-title">Account</text>
			<view class="menu">
				<MenuItem icon="locked" title="Security" desc="2FA, Password" />
				<MenuItem icon="creditcard" title="Payment Methods" desc="Visa •••• 4242" />
				<MenuItem icon="time" title="Trading History" desc="Statements" />
			</view>
		</view>

		<!-- App Menu -->
		<view class="section">
			<text class="section-title">App</text>

			<view class="menu">
				<MenuItem icon="notification" title="Notifications" />
				<MenuItem icon="help" title="Support" />
			</view>
		</view>

		<!-- Logout -->
		<view class="logout" @click="$confirmLogout">
			<view class="logout-btn">
				<uni-icons type="logout" size="18" />
				Log Out
			</view>
			<text class="version">Version 2.4.1</text>
		</view>

	</view>
</template>

<script>
	import MenuItem from '../../components/MenuItem.vue';
	export default {
		data() {
			return {
				iscopy: true
			}
		},
		methods: {
			backhome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			setting() {
				uni.navigateTo({
					url: '/pages/setting/setting'
				});
			},
			copyToClipboard() {
				this.iscopy = false;
				uni.setClipboardData({
					data: 'ACCT-849302',
					success: () => {
						uni.showToast({
							title: 'coped'
						})
					}
				});
				// Reset icon after 2 seconds
				setTimeout(() => {
					this.iscopy = true;
				}, 2000);
			}
		},
		components: {
			MenuItem
		}
	}
</script>

<style scoped>
	.page {
		padding-bottom: 120rpx;
	}

	/* Top Bar */
	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.icon-btn {
		width: 64rpx;
		height: 64rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Profile */
	.profile-header {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		padding: 24rpx;
	}

	.avatar-box {
		position: relative;
	}

	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		border: 5rpx solid #2bee79;
		overflow: hidden;
	}

	.name-row {
		display: flex;
		align-items: center;
		gap: 4rpx;
		font-size: 36rpx;
		font-weight: bold;
	}

	.account-id {
		display: flex;
		align-items: center;
		gap: 8rpx;
		background: #eee;
		padding: 6rpx 16rpx;
		border-radius: 999rpx;
		font-size: 22rpx;
	}

	.copy-icon {
		width: 24rpx;
		height: 24rpx;
		margin-left: 10rpx;
	}

	.level {
		color: #2bee79;
		font-size: 24rpx;
	}

	/* Card */
	.card {
		margin: 24rpx;
		padding: 24rpx;
		border-radius: 24rpx;
		background: #fff;
	}

	.equity-row {
		display: flex;
		justify-content: space-between;
	}

	.muted {
		color: #888;
		font-size: 22rpx;
	}

	.equity {
		font-size: 48rpx;
		font-weight: bold;
	}

	.pnl {
		text-align: right;
	}

	.pnl-badge {
		display: flex;
		align-items: center;
		gap: 8rpx;
		background: rgba(43, 238, 121, 0.15);
		padding: 6rpx 12rpx;
		border-radius: 12rpx;
		color: #2bee79;
	}

	.pnl-percent {
		color: #2bee79;
		font-size: 22rpx;
	}

	/* Progress */
	.progress {
		margin-top: 24rpx;
	}

	.progress-item {
		margin-bottom: 20rpx;
	}

	.progress-label {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
	}

	.bar {
		height: 14rpx;
		background: #eee;
		border-radius: 999rpx;
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
	}

	.crypto {
		width: 65%;
		background: orange;
	}

	.forex {
		width: 35%;
		background: #3b82f6;
	}

	/* Menu */
	.section {
		margin: 24rpx;
	}

	.section-title {
		font-size: 22rpx;
		color: #888;
		margin-bottom: 12rpx;
	}

	.menu {
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.menu-item {
		display: flex;
		align-items: center;
		padding: 24rpx;
		border-bottom: 1px solid #f0f0f0;
	}

	.menu-item:last-child {
		border-bottom: none;
	}

	.menu-icon {
		width: 64rpx;
		height: 64rpx;
		border-radius: 16rpx;
		background: #f3f3f3;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 16rpx;
	}

	.menu-text {
		flex: 1;
	}

	.menu-title {
		font-size: 28rpx;
	}

	.menu-desc {
		font-size: 22rpx;
		color: #888;
	}

	/* Logout */
	.logout {
		padding: 24rpx;
		text-align: center;
	}

	.logout-btn {
		color: #ef4444;
		border: 2rpx solid #ef4444;
		padding: 20rpx;
		border-radius: 20rpx;
		font-weight: bold;
		display: flex;
		justify-content: center;
		gap: 8rpx;
	}

	.version {
		font-size: 20rpx;
		color: #aaa;
		margin-top: 12rpx;
	}
</style>