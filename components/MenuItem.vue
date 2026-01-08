<template>
	<view class="menu-item" @click="handleClick">
		<view class="menu-icon">
			<uni-icons :type="icon" size="20" />
		</view>

		<view class="menu-text">
			<text class="menu-title">{{ title }}</text>
			<text v-if="desc" class="menu-desc">{{ desc }}</text>
		</view>

		<uni-icons type="arrowright" size="16" color="#bbb" />
	</view>
</template>
<script>
	export default {
		mane: 'MenuItem',
		props: {
			icon: String,
			title: String,
			desc: String
		},
		methods: {
			handleClick() {
				this.$emit('click')
			}
		}
	}
</script>