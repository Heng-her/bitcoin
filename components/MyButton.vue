<template>
  <view class="my-btn" @click="handleClick">
    <slot>Default Button</slot>
  </view>
</template>

<script>
export default {
  name: 'MyButton',
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.my-btn {
  background-color: #2bee79;
  color: #102217;
  font-weight: bold;
  text-align: center;
  padding: 24rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8rpx;
  box-shadow: 0 10rpx 20rpx rgba(43,238,121,0.25);
  transition: 0.2s;

  &:active {
    transform: scale(0.98);
  }
}
</style>
