<template>
  <app-layout>
    <!-- Search Bar -->
    <div class="search-container">
      <label class="search-label">
        <div class="search-input-wrapper">
          <div class="search-icon">
            <uni-icons type="search"></uni-icons>
          </div>
          <input
            type="text"
            class="search-input"
            placeholder="Search assets..."
            v-model="searchQuery"
          />
        </div>
      </label>
    </div>

    <!-- Tabs (static for now) -->
    <div class="tabs-container">
      <a href="#" class="tab active-tab">
        <div class="tab-content">
          <span class="material-symbols-outlined">star</span>
          <p>Favorites</p>
        </div>
      </a>
      <a href="#" class="tab">All</a>
      <a href="#" class="tab">Crypto</a>
      <a href="#" class="tab">Forex</a>
      <a href="#" class="tab">Stocks</a>
    </div>

    <!-- Market Content: Loop over filtered assets -->
    <main class="market-content">
      <div
        v-for="asset in filteredAssets"
        :key="asset.id"
        class="asset-item"
      >
        <div class="asset-info">
          <div :class="['asset-logo-bg', asset.bgClass]">
            <image :src="asset.icon" class="asset-logo" mode="aspectFit" />
          </div>
          <div class="asset-text">
            <span>{{ asset.symbol }}</span>
            <span class="asset-subtitle">{{ asset.name }}</span>
          </div>
        </div>

        <!-- Sparkline (static path per asset) -->
        <div class="sparkline">
          <svg
            viewBox="0 0 100 40"
            :class="['sparkline-svg', asset.change >= 0 ? 'up' : 'down']"
          >
            <path :d="asset.sparkPath" />
          </svg>
        </div>

        <div class="asset-price">
          <span>{{ asset.formattedPrice }}</span>
          <span
            :class="['price-change', asset.change >= 0 ? 'up' : 'down']"
          >
            {{ asset.change >= 0 ? '+' : '' }}{{ asset.change }}%
          </span>
        </div>
      </div>
    </main>
  </app-layout>
</template>

<script>
import AppLayout from '../../components/AppLayout.vue';

export default {
  name: 'MarketView',
  components: {
    AppLayout
  },
  data() {
    return {
      searchQuery: '',
      assets: [
        {
          id: 1,
          symbol: 'BTC/USD',
          name: 'Bitcoin',
          icon: '/static/market/bitcon.png',
          bgClass: 'orange-bg',
          price: 64231.5,
          change: 2.45,
          sparkPath: 'M0 30 Q 15 10, 30 25 T 60 15 T 100 5'
        },
        {
          id: 2,
          symbol: 'ETH/USD',
          name: 'Ethereum',
          icon: '/static/market/eth.png',
          bgClass: 'blue-bg',
          price: 3450.12,
          change: -1.2,
          sparkPath: 'M0 10 Q 20 35, 40 20 T 70 30 T 100 35'
        },
        {
          id: 3,
          symbol: 'EUR/USD',
          name: 'Euro / US Dollar',
          icon: '/static/market/EUR.png',
          bgClass: 'light-blue-bg',
          price: 1.0842,
          change: 0.05,
          sparkPath: 'M0 25 Q 25 20, 50 22 T 100 18'
        },
        {
          id: 4,
          symbol: 'GBP/JPY',
          name: 'Pound / Yen',
          icon: '/static/market/GBP.png',
          bgClass: 'light-red-bg',
          price: 191.24,
          change: -0.32,
          sparkPath: 'M0 10 L 20 20 L 40 15 L 60 30 L 100 38'
        },
        {
          id: 5,
          symbol: 'SOL/USD',
          name: 'Solana',
          icon: '/static/market/solana.png',
          bgClass: 'purple-bg',
          price: 142.89,
          change: 5.12,
          sparkPath: 'M0 35 L 20 10 L 40 25 L 70 5 L 100 12'
        },
        {
          id: 6,
          symbol: 'XAU/USD',
          name: 'Gold Ounce',
          icon: '/static/withdraw.png',
          bgClass: 'yellow-bg',
          price: 2341.1,
          change: 0.88,
          sparkPath: 'M0 20 Q 50 0, 100 15'
        }
      ]
    };
  },
  computed: {
    filteredAssets() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) return this.assets;

      return this.assets.filter(asset => {
        return (
          asset.symbol.toLowerCase().includes(query) ||
          asset.name.toLowerCase().includes(query)
        );
      });
    }
  },
  methods: {
    // Optional: format price based on type (crypto vs forex)
    formatPrice(price, symbol) {
      if (symbol.includes('USD') && !symbol.startsWith('XAU')) {
        return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      } else if (symbol === 'XAU/USD') {
        return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      } else {
        // Forex like EUR/USD, GBP/JPY
        return price.toFixed(4);
      }
    }
  },
  // Pre-format prices on mount or use computed in template
  mounted() {
    // Optional: pre-format if you prefer
    this.assets.forEach(asset => {
      if (asset.symbol.includes('/') && !asset.symbol.startsWith('XAU')) {
        if (asset.symbol.split('/')[1] === 'USD') {
          asset.formattedPrice = `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
          asset.formattedPrice = asset.price.toFixed(4);
        }
      } else {
        asset.formattedPrice = `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    });
  }
};
</script>

<style scoped>
.search-container {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.market-content {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Search Input */
.search-label {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.search-input-wrapper {
  display: flex;
  align-items: stretch;
  height: 2.75rem; /* 11 * 0.25rem = 2.75rem */
  background-color: #ffffff;
  border: 1px solid #e0e6eb;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  color: #9ca3af;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1f2937;
  font-weight: 400;
  padding: 0 0.5rem;
  margin-top: 4rpx;
  outline: none;
  height: 70rpx;
}

.search-input::placeholder {
  color: #9ca3af;
}

/* Tabs */
.tabs-container {
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding-bottom: 0;
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}

.tabs-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.75rem;
  flex-shrink: 0;
  text-decoration: none;
  color: #6b7280;
  font-weight: 700;
  font-size: 0.875rem;
  border-bottom: 2px solid transparent;
}

.tab.active-tab {
  color: #1d4ed8; /* primary */
  border-bottom-color: #1d4ed8;
}

.tab-content {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

/* Asset Items */
.asset-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.asset-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.asset-logo-bg {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.asset-logo-bg image{
	width: 75rpx;
	height: 75rpx;
}

.asset-logo {
  width: 2.5rem;
  height: 2.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 9999px;
}

.orange-bg { background-color: #ffedd5; }
.blue-bg { background-color: #dbeafe; }
.light-blue-bg { background-color: #eff6ff; }
.light-red-bg { background-color: #fef2f2; }
.purple-bg { background-color: #ede9fe; }
.yellow-bg { background-color: #fef9c3; }

.gold-icon {
  color: #ca8a04;
  font-size: 20px;
}

.asset-text {
  display: flex;
  flex-direction: column;
}

.asset-text > span:first-child {
  font-weight: 700;
  font-size: 0.875rem;
  color: #111827;
}

.asset-subtitle {
  font-size: 0.75rem;
  color: #6b7280;
}

.sparkline {
  width: 4rem;
  height: 2rem;
  opacity: 0.8;
}

.sparkline-svg.up {
  stroke: #1d4ed8; /* primary */
}

.sparkline-svg.down {
  stroke: #ef4444; /* danger */
}

.sparkline path {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
}

.asset-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.asset-price > span:first-child {
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
}

.price-change {
  margin-top: 0.25rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.625rem;
  font-weight: 700;
}

.price-change.up {
  background-color: #dbeafe; /* primary/10 */
  color: #1d4ed8;
}

.price-change.down {
  background-color: #fee2e2; /* danger/10 */
  color: #ef4444;
}
</style>