// vue.config.js
module.exports = {
  // Dev server configuration (only affects H5 dev mode: Run → Run to Browser)
  devServer: {
    // ✅ Critical: Allow Cloudflare Tunnel, ngrok, etc.
    disableHostCheck: true,
    
    // Allow access from phone, other devices on same network
    host: '0.0.0.0',
    
    // Port must match your dev server (default: 8080)
    port: 8080
  }
};