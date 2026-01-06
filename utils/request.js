// utils/request.js
const BASE_URL = process.env.UNI_APP_API_BASE_URL || 'https://www.mock-api.cloud/api'
const TIMEOUT = parseInt(process.env.VUE_APP_TIMEOUT, 10) || 10000

// Optional: get token from storage
function getAuthToken() {
	return uni.getStorageSync('token') || ''
}

export function request(options = {}) {
	const {
		url,
		method = 'GET',
		data = {},
		showLoading = true,
		loadingText = 'Loading...'
	} = options

	return new Promise((resolve, reject) => {
		// Show loading (optional)
		if (showLoading) {
			uni.showLoading({
				title: loadingText,
				mask: true
			})
		}

		uni.request({
			url: BASE_URL + url,
			method,
			data,
			header: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getAuthToken()}`
			},
			timeout: TIMEOUT,
			success: (res) => {
				const {
					statusCode,
					data: responseData
				} = res

				if (showLoading) uni.hideLoading()

				// Handle HTTP errors
				if (statusCode !== 200) {
					let msg = `Request failed: ${statusCode}`
					if (responseData?.message) msg = responseData.message
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					})
					return reject(new Error(msg))
				}

				// Assume your API returns { code: 200, data: ..., msg: 'ok' }
				// Adjust logic based on your backend format
				if (responseData.code === 200 || responseData.success) {
					resolve(responseData.data || responseData)
				} else {
					const errorMsg = responseData.msg || 'Unknown error'
					uni.showToast({
						title: errorMsg,
						icon: 'none',
						duration: 2000
					})
					reject(new Error(errorMsg))
				}
			},
			fail: (err) => {
				if (showLoading) uni.hideLoading()
				const msg = err.errMsg || 'Network error'
				uni.showToast({
					title: 'Network error',
					icon: 'none',
					duration: 2000
				})
				reject(err)
			}
		})
	})
}

// Convenience methods
export const get = (url, data, config) => request({
	...config,
	url,
	method: 'GET',
	data
})
export const post = (url, data, config) => request({
	...config,
	url,
	method: 'POST',
	data
})