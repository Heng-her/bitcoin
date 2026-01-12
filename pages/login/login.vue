<template>
	<view class="login-container">
		<!-- Background Circles -->
		<view class="bg-circle top-circle"></view>
		<view class="bg-circle bottom-circle"></view>

		<view class="content">
			<!-- Header -->
			<view class="header">
				<view class="logo">
					<image src="/static/bitcoin.png" class="logo-img" mode="aspectFit"></image>
				</view>
				<text class="title">Welcome Back</text>
				<text class="subtitle">Securely access your portfolio</text>
			</view>

			<!-- Form -->
			<view class="form">
				<!-- Email -->
				<view class="input-group">
					<uni-icons type="email" size="24" color="#618971" class="icon" />
					<input type="text" placeholder="Enter your email" v-model="email" class="input"
						style="height: 20px; font-size: 12pt;" />
				</view>

				<!-- Password -->
				<view class="input-group">
					<uni-icons type="locked" size="24" color="#618971" class="icon" />

					<input :type="ispassword ? 'password' : 'text'" placeholder="Enter your password" v-model="password"
						class="input" style="height: 20px; font-size: 12pt;" />

					<uni-icons :type="ispassword ? 'eye-slash' : 'eye'" size="24" color="#618971" class="show-pass"
						@click="togglePassword" />
				</view>


				<!-- Forgot Password -->
				<view class="forgot">
					<text @click="forgotPassword">Forgot Password?</text>
				</view>

				<!-- Login Button -->
				<MyButton @click="handleLogin">
					<view v-if="!loading" style="display: flex; gap: 5px;">
						<text>Log In</text>
						<uni-icons type="arrow-right" size="20" />
					</view>
					<uni-icons v-else type="spinner-cycle" size="20" class="animate-spin" />
				</MyButton>

				<!-- Biometric Login -->
				<view class="biometric">
					<button class="faceid-btn">
						<uni-icons type="contact" size="48" color="#618971" />
					</button>
					<text class="bio-text">Tap to use FaceID</text>
				</view>
			</view>

			<!-- Signup -->
			<view class="signup">
				<text>
					Don't have an account?
					<text class="link">Create an Account</text>
				</text>
			</view>
		</view>

		<!-- Bottom Decoration -->
		<view class="bottom-deco"></view>
	</view>
</template>

<script>
	import MyButton from '@/components/MyButton.vue'

	export default {
		components: {
			MyButton
		},
		data() {
			return {
				email: 'admin@gmail.com',
				password: 'admin123',
				ispassword: true,
				loading: false,
			}
		},
		methods: {
			togglePassword() {
				this.ispassword = !this.ispassword
			},
			handleLogin() {
				if (!this.email || !this.password) {
					uni.showToast({
						title: 'Please fill all fields',
						icon: 'none'
					})
					return
				}
				if (this.email === 'admin@gmail.com' && this.password === 'admin123') {
					uni.showToast({
						title: 'Login successfully',
						icon: 'success',
						duration: 1500
					})
					uni.setStorageSync('isLogin', true)
					this.loading = true;
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 1000)
				} else {
					uni.showToast({
						title: 'Invalid email or password',
						icon: 'none'
					})
				}
			},
			forgotPassword() {
				uni.showToast({
					title: 'Feature coming soon',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		position: relative;
		min-height: 100vh;
		background: linear-gradient(135deg, rgba(43, 238, 121, 0.1) 0%, #f6f8f7 50%, #f6f8f7 100%);
		font-family: 'Inter', sans-serif;
		color: #111814;

		&.dark {
			background: linear-gradient(135deg, rgba(16, 34, 23, 0.95) 0%, #102217 100%);
			color: #fff;
		}

		.bg-circle {
			position: absolute;
			border-radius: 50%;
			pointer-events: none;

			&.top-circle {
				width: 300px;
				height: 300px;
				top: -10%;
				right: -10%;
				background-color: rgba(43, 238, 121, 0.2);
				filter: blur(80px);
			}

			&.bottom-circle {
				width: 250px;
				height: 250px;
				bottom: -10%;
				left: -10%;
				background-color: rgba(0, 122, 255, 0.1);
				filter: blur(60px);
			}
		}

		.content {
			position: relative;
			margin: 0 auto;
			padding: 120rpx 40rpx 80rpx;
			display: flex;
			flex-direction: column;
			height: 100%;
			justify-content: space-between;

			.header {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 50rpx 0;

				.logo {
					width: 128rpx;
					height: 128rpx;
					background-color: #2bee79;
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 24rpx;
					box-shadow: 0 10rpx 20rpx rgba(43, 238, 121, 0.2);
				}

				.title {
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 8rpx;
					text-align: center;
				}

				.subtitle {
					font-size: 20rpx;
					color: #618971;
					text-align: center;
				}
			}

			.form {
				display: flex;
				flex-direction: column;
				gap: 30rpx;

				.input-group {
					position: relative;
					display: flex;
					align-items: center;

					.icon {
						position: absolute;
						left: 10rpx;
						margin-top: 2px;
					}

					.input {
						width: 100%;
						padding: 20rpx 16rpx 20rpx 64rpx;
						border: 1rpx solid #ddd;
						border-radius: 16rpx;
						background-color: #fff;
						color: #111814;
					}

					.show-pass {
						position: absolute;
						right: 10rpx;
						background: none;
						border: none;
					}
				}

				.forgot {
					text-align: right;
					text-decoration: underline;
					color: #618971;
					font-size: 20rpx;
				}

				.biometric {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 16rpx;

					.faceid-btn {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						background: #f0f0f0;
					}

					.bio-text {
						font-size: 16rpx;
						color: #618971;
					}
				}
			}

			.signup {
				text-align: center;
				font-size: 20rpx;

				.link {
					font-weight: bold;
					color: #2bee79;
					text-decoration: underline;
				}
			}
		}

		.bottom-deco {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 8rpx;
			background: linear-gradient(to right, transparent, #2bee79, transparent);
			opacity: 0.5;
		}
	}

	.logo-img {
		width: 60px;
		height: 60px;
	}
</style>