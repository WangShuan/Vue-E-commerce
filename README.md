# Vue 出一個電商網站

## 1. 開啟

打開終端機輸入 `npm run build` 執行後產生 `dist` 資料夾 

使用 `VS code` 套件開啟 `dist` 資料夾並通過 `Go Live` 套件開啟 `index.html`

## 2. 資料夾結構說明

`src/main.js` 檔案為入口文件 裡面處理各種插件的配置

`src/router/index.js` 處理所有路由元件

`src/App.vue` 是整個 vue 實例(下方樣式標籤中放實例需用到的所有樣式)

`src/assets` 放需要用到的樣式檔案與圖片檔案

`src/components/Dashboard.vue` 後台管理系統的主要版型 該頁面包含處理登入的 cookie

`src/components/Navbar.vue` 與 `src/components/Sidebar.vue` 後台管理系統的導覽列與左邊選單列

`src/bus.js` event Bus ，用來給 vue 創建新的原生方法(處理錯誤訊息時需要) 

`src/components/messageAlert.vue` 結合 `bus.js` 檔案 用來處理頁面上提示訊息的互動式窗

* 客戶端

`src/components/Home.vue` 首頁版型 顯示所有產品 路徑為 `/`

`src/components/pages/Product.vue` 顯示單個產品的元件 路徑為 `/product/:id`

`src/components/pages/Cart.vue` 顯示購物車頁面 路徑為 `/cart`

`src/components/pages/ClientCoupous.vue` 顯示優惠券頁面 路徑為 `/coupons`

`src/components/pages/Checkout.vue` 建立訂單頁面 路徑為 `/checkout`

`src/components/pages/TestOrders.vue` 結帳頁面 路徑為 `/checkout/:orderId`

`src/components/pages/Like.vue` 顯示喜好項目頁面 路徑為 `/like`

* 後台管理系統

`src/components/pages/Login.vue` 登入頁面 路徑為 `/login`

`src/components/pages/Products.vue` 產品管理 需登入 路徑為 `/admin/products`

`src/components/pages/Coupons.vue` 優惠券管理 需登入 路徑為 `/admin/coupons`

`src/components/pages/Orders.vue` 訂單管理 需登入 路徑為 `/admin/orders`

`src/components/pages/TestOrders.vue` 後台的模擬訂單功能 路徑為 `/test/test_orders`

`src/components/pages/TestOrders.vue` 後台的模擬訂單功能的結帳頁面 路徑為 `/test/test_checkout/:orderId`

* 其他元件

`src/components/Pagination.vue` 分頁元件

`src/components/Cards.vue` 產品卡片元件