<template>
	<view class="page">
		<view class="container">

			<!-- Top App Bar -->
			<view class="top-bar">
				<view class="icon-btn" @click="backhome">
					<uni-icons type="left" size="22" />
				</view>

				<text class="title">{{ $t('settings') }}</text>

				<view class="icon-btn placeholder"></view>
			</view>

			<!-- Profile Card -->
			<view class="profile-wrapper">
				<view class="profile-card">
					<view class="profile-left">
						<view class="avatar-wrapper">
							<image class="avatar" src="/static/profile/user.png" mode="aspectFill" />
							<view class="online-dot"></view>
						</view>

						<view class="profile-text">
							<text class="name">Alex Morgan</text>
							<text class="role">Pro Trader Account</text>
						</view>
					</view>

					<view class="qr-btn" @click="open">
						<uni-icons type="scan" size="20" />
					</view>

				</view>
			</view>

			<!-- Preferences -->
			<view class="section">
				<text class="section-title">{{ $t('preferences') }}</text>

				<view class="card">
					<view class="row">
						<view class="row-icon">
							<image src="/static/languages.png" style="width: 40rpx; height: 40rpx;" />
						</view>
						<text class="row-text">{{ $t('language') }}</text>
						<view class="row-right">
							<text class="row-sub">English (US)</text>
							<uni-icons type="right" size="16" />
						</view>
					</view>

					<view class="divider" />

					<view class="row">
						<view class="row-icon">
							<uni-icons type="wallet" size="20" />
						</view>
						<text class="row-text">Base Currency</text>
						<view class="row-right">
							<text class="row-sub">USD ($)</text>
							<uni-icons type="right" size="16" />
						</view>
					</view>

					<view class="divider" />

					<view class="row">
						<view class="row-icon">
							<image src="/static/profile/light_dark.png" style="width: 40rpx; height: 40rpx;" />
						</view>
						<text class="row-text">{{ $t('dark_mode') }}</text>
						<switch />
					</view>
				</view>
			</view>

			<!-- Security -->
			<view class="section">
				<text class="section-title">{{ $t('security') }}</text>

				<view class="card">
					<view class="row">
						<view class="row-icon">
							<uni-icons type="contact" size="20" />
						</view>
						<text class="row-text">Face ID</text>
						<switch checked />
					</view>

					<view class="divider" />

					<view class="row clickable">
						<view class="row-icon">
							<uni-icons type="locked" size="20" />
						</view>
						<text class="row-text">{{ $t('two_factor_auth') }}</text>
						<view class="row-right">
							<text class="enabled">Enabled</text>
							<uni-icons type="right" size="16" />
						</view>
					</view>
				</view>
			</view>

			<!-- Support -->
			<view class="section">
				<text class="section-title">Support</text>

				<view class="card">
					<view class="row clickable">
						<view class="row-icon">
							<uni-icons type="help" size="20" />
						</view>
						<text class="row-text">Help Center</text>
						<uni-icons type="forward" size="16" />
					</view>

					<view class="divider" />

					<view class="row logout" @click="$confirmLogout">
						<view class="row-icon danger">
							<image src="/static/logout.png" style="width: 40rpx; height: 40rpx;" />
						</view>
						<text class="row-text danger-text">{{ $t('logout') }}</text>
					</view>
				</view>
			</view>

			<!-- Footer -->
			<view class="footer">
				<text>App Version 2.4.1 (Build 204)</text>
				<text class="copyright">© 2024 TradePro Inc.</text>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :mask-click="false" class="qr-overlay" @click="close()">
			<view class="qr-dialog">
				<view class="close-icon" @click="close">
					<uni-icons type="closeempty" size="50rpx"></uni-icons>
				</view>

				<text class="qr-title">{{ $t('my_qr_code') }}</text>
				<canvas id="qrcode"></canvas>

			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniTransition from '@/uni_modules/uni-transition/components/uni-transition/uni-transition.vue'
	import {
		$t,
		getCurrentLanguage
	} from '../../utils/i18n'
	import QRCode from 'qrcodejs2'

	export default {
		components: {
			uniTransition
		},
		data() {
			return {
				randomId: null,
				currentLang: getCurrentLanguage() // Get current language
			}
		},
		created() {
			// Listen for language changes from AppLayout
			this.$on && this.$on('language-changed', (lang) => {
				this.currentLang = lang;
				this.$forceUpdate && this.$forceUpdate();
			});

			// Alternative: use global event bus
			uni.$on && uni.$on('language-changed', (lang) => {
				this.currentLang = lang;
				this.$forceUpdate && this.$forceUpdate();
			});
		},
		methods: {
			// Add $t method to use in template
			$t(key) {
				return $t(key, this.currentLang);
			},

			backhome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			open() {
				this.$refs.popup.open('top');
				this.$nextTick(() => {
					new QRCode('qrcode', {
						text: this.randomId
					})
				})
			},
			close() {
				this.$refs.popup.close()
			},
			generateRandomId() {
				if (window.crypto && window.crypto.getRandomValues) {
					const array = new Uint32Array(1)
					window.crypto.getRandomValues(array)
					this.randomId = array[0]
				} else {
					this.randomId = Math.floor(Math.random() * 1e9)
				}
			}
		},
		computed: {
			currentLanguage() {
				return this.currentLang === 'km' ? 'ខ្មែរ' : 'English';
			}
		},
		mounted() {
			this.generateRandomId()
			console.log('random id:', this.randomId)
		}
	}
</script>
<style lang="scss" scoped>
	$page-bg: #f7f8fa;
	$card-bg: #ffffff;
	$text-main: #111;
	$text-sub: #6b7280;
	$primary: #2563eb;
	$danger: #ef4444;

	.page {
		background-color: $page-bg;
		min-height: 100vh;
	}

	.container {
		max-width: 750rpx;
		margin: 0 auto;
	}

	/* Top Bar */
	.top-bar {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
	}

	.icon-btn {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		&:active {
			background: rgba(0, 0, 0, 0.05);
		}

		&.placeholder {
			opacity: 0;
			pointer-events: none;
		}
	}

	.title {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-size: 32rpx;
		font-weight: 700;
		color: $text-main;
	}

	/* Profile */
	.profile-wrapper {
		padding: 24rpx;
	}

	.profile-card {
		background: $card-bg;
		border-radius: 24rpx;
		padding: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.profile-left {
		display: flex;
		gap: 24rpx;
		align-items: center;
	}

	.avatar-wrapper {
		position: relative;
	}

	.avatar {
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
	}

	.online-dot {
		position: absolute;
		bottom: 6rpx;
		right: 6rpx;
		width: 20rpx;
		height: 20rpx;
		background: $primary;
		border-radius: 50%;
		border: 4rpx solid #fff;
	}

	.profile-text {
		display: flex;
		flex-direction: column;
	}

	.name {
		font-size: 32rpx;
		font-weight: 700;
	}

	.role {
		font-size: 24rpx;
		color: $text-sub;
	}

	.qr-btn {
		width: 64rpx;
		height: 64rpx;
		background: #f3f4f6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Sections */
	.section {
		padding: 0 24rpx 24rpx;
	}

	.section-title {
		font-size: 20rpx;
		color: $text-sub;
		font-weight: 700;
		margin: 16rpx 8rpx;
		text-transform: uppercase;
	}

	/* Cards */
	.card {
		background: $card-bg;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 24rpx;
		padding: 28rpx;

		&.clickable:active {
			background: #f9fafb;
		}

		&.logout {
			background: #fff5f5;
		}
	}

	.row-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
		background: #f3f4f6;
		display: flex;
		align-items: center;
		justify-content: center;

		&.danger {
			background: #fee2e2;
		}
	}

	.row-text {
		flex: 1;
		font-size: 28rpx;
		font-weight: 500;
	}

	.row-right {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.row-sub {
		font-size: 24rpx;
		color: $text-sub;
	}

	.enabled {
		color: $primary;
		font-weight: 600;
	}

	.danger-text {
		color: $danger;
	}

	.divider {
		height: 1rpx;
		background: #e5e7eb;
		margin-left: 128rpx;
	}

	/* Footer */
	.footer {
		padding: 48rpx 0;
		text-align: center;
		font-size: 20rpx;
		color: #9ca3af;

		.copyright {
			margin-top: 8rpx;
			font-size: 18rpx;
		}
	}

	/* Full screen overlay */
	.qr-overlay {
		position: absolute;
		display: flex;
		width: 100%;
		height: 50%;
		background-color: #00000090;
		align-items: center;
		justify-content: center;
	}

	.qr-dialog {
		background-color: white;
		height: 630rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: 80rpx;
		margin-inline: 80rpx;
	}

	.qr-title {
		font-size: 28rpx;
		font-weight: 700;
		padding: 24rpx;
	}

	/* X close icon */
	.close-icon {
		position: absolute;
		top: 20rpx;
		right: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 28rpx;
		color: #666;
	}
</style>