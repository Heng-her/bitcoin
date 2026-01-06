<template>
	<view class="layout">
		<!-- Header -->
		<view class="header">
			<!-- Left -->
			<view class="header-left">
				<view class="logo" @click="goProfile">
					<image :src="Image" class="logo-img" mode="aspectFit" />
				</view>

				<view class="user">
					<text class="app-name">TradeApp</text>
					<text class="welcome">{{ welcome }}, {{ username }}</text>
				</view>
			</view>

			<!-- Right -->
			<view class="header-right">
				<view class="lang-btn" @click.stop="changelang">
					<text class="lang-text">EN</text>
					<!-- Use inline SVG or image (already works) -->
					<image src="/static/languages.png" class="lang-icon" />
				</view>
				<view class="menu-btn" @click.stop="toggleDrawer">
					<uni-icons type="bars"></uni-icons>
				</view>
			</view>
		</view>

		<!-- Page Content -->
		<view class="content">
			<slot />
		</view>

		<!-- Footer -->
		<FooterVue @open-trade="handleOpenTrade" />

		<!-- Drawer Mask -->
		<view v-show="drawerVisible" class="drawer-mask" @click="closeDrawer"></view>

		<!-- Drawer Panel -->
		<transition name="slide">
			<view v-show="drawerVisible" class="drawer">
				<view class="drawer-header">
					<text class="drawer-title">Menu</text>
					<view class="close-btn" @click="closeDrawer">×</view>
				</view>
				<view class="drawer-body">
					<view class="menu-item" @click="navTo('/pages/index/index')">
						<uni-icons type="home" size="20"></uni-icons> <text>Home</text>
					</view>
					<view class="menu-item" @click="navTo('/pages/profile/profile')">
						<uni-icons type="contact-filled" size="20"></uni-icons> <text>Profile</text>
					</view>
					<view class="menu-item" @click="navTo('/pages/settings/settings')">
						<uni-icons type="gear-filled" size="20"></uni-icons> ️ <text>Settings</text>
					</view>
					<view class="menu-item" @click="logout">
						<uni-icons type="gear-filled" size="20"></uni-icons> ️ <text>Logout</text>
					</view>
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	import FooterVue from './Footer.vue';

	export default {
		name: 'AppLayout',
		components: {
			FooterVue
		},
		props: {
			welcome: {
				type: String,
				default: 'Welcome back'
			},
			username: {
				type: String,
				default: 'bunheng'
			},
			Image: {
				type: String,
				default: '/static/bitcoin.png'
			}
		},

		data() {
			return {
				drawerVisible: false,
				actionSheetOpen: false
			};
		},

		methods: {
			toggleDrawer() {
				this.drawerVisible = !this.drawerVisible;
			},
			closeDrawer() {
				this.drawerVisible = false;
			},
			navTo(url) {
				this.closeDrawer();
				uni.navigateTo({
					url
				});
			},
			logout() {
				this.closeDrawer();
				uni.showModal({
					title: 'Logout',
					content: 'Are you sure?',
					success: (res) => {
						if (res.confirm) {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}
					}
				});
			},

			// 🔐 Action Sheet Guard
			openActionSheet(options) {
				if (this.actionSheetOpen) return;
				this.actionSheetOpen = true;
				uni.showActionSheet({
					...options,
					complete: () => {
						this.actionSheetOpen = false;
					}
				});
			},

			changelang() {
				this.openActionSheet({
					itemList: ['EN', 'CN', 'PH'],
					success: (res) => {
						console.log('Language:', ['EN', 'CN', 'PH'][res.tapIndex]);
					}
				});
			},

			handleOpenTrade() {
				this.openActionSheet({
					itemList: ['Buy', 'Sell', 'Trade History'],
					success: (res) => {
						console.log('Trade:', ['Buy', 'Sell', 'History'][res.tapIndex]);
					}
				});
			},

			goProfile() {
				uni.navigateTo({
					url: '/pages/profile/profile'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	// ✅ Ensure font works — define here (or better: in App.vue globally)
	@font-face {
		font-family: 'CustomFont';
		src: url('/static/font/fontello.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}

	// Base reset
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f6f8f7;
		color: #111814;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'CustomFont', sans-serif;
	}

	/* ===== HEADER ===== */
	.header {
		position: sticky;
		top: 0;
		z-index: 20;
		padding: 24rpx 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(246, 248, 247, 0.95);
		backdrop-filter: blur(12px);
		border-bottom: 1rpx solid #e5e7eb;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}

	.logo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: #2bee79;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;

		.logo-img {
			width: 55rpx;
			height: 55rpx;
		}
	}

	.user {
		display: flex;
		flex-direction: column;

		.app-name {
			font-size: 30rpx;
			font-weight: 700;
			line-height: 1.1;
		}

		.welcome {
			font-size: 20rpx;
			color: #6b7280;
		}
	}

	/* ===== RIGHT BUTTONS ===== */
	.header-right {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.lang-btn {
		display: flex;
		align-items: center;
		gap: 8rpx;
		padding: 12rpx 20rpx;
		border-radius: 999rpx;
		background: #fff;
		border: 1rpx solid #e5e7eb;

		.lang-text {
			font-size: 22rpx;
			font-weight: 600;
		}

		.lang-icon {
			width: 30rpx;
			height: 30rpx;
		}
	}

	.menu-btn {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: #fff;
		border: 1rpx solid #e5e7eb;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	/* ===== CONTENT ===== */
	.content {
		flex: 1;
		padding: 20rpx;
		margin-bottom: 30px; // Leave space for Footer
	}

	/* ===== DRAWER ===== */
	.drawer-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 1000;
	}

	.drawer {
		position: fixed;
		top: 0;
		left: 0;
		width: 450rpx;
		height: 100vh;
		background: #fff;
		z-index: 1001;
		box-shadow: 2px 0 12px rgba(0, 0, 0, 0.15);
	}

	.drawer-header {
		padding: 24rpx 24rpx 16rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #eee;

		.drawer-title {
			font-size: 34rpx;
			font-weight: bold;
		}

		.close-btn {
			font-size: 40rpx;
			padding: 8rpx 16rpx;
			border-radius: 50%;

			&:active {
				background: #f0f0f0;
			}
		}
	}

	.drawer-body {
		padding: 16rpx 0;

		.menu-item {
			padding: 28rpx 32rpx;
			font-size: 32rpx;
			border-bottom: 1rpx solid #f0f0f0;

			&:last-child {
				border-bottom: none;
			}

			&:active {
				background: #f9fafb;
			}
		}
	}

	/* Animation */
	.slide-enter-active,
	.slide-leave-active {
		transition: transform 0.25s ease;
	}

	.slide-enter-from,
	.slide-leave-to {
		transform: translateX(-100%);
	}
</style>