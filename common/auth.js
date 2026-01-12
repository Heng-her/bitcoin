export function confirmLogout() {
  uni.showModal({
    title: 'Confirm logout',
    content: 'Are you sure you want to log out?',
    confirmText: 'Logout',
    cancelText: 'Cancel',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('isLogin')

        uni.showToast({
          title: 'Logged out successfully',
          icon: 'success',
          duration: 1500
        })

        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/login'
          })
        }, 1500)
      }
    }
  })
}
