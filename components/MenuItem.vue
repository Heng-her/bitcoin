<template>
  <view class="menu-item">
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
  props: ['icon', 'title', 'desc']
};
</script>