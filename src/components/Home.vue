<template>
  <div class="content">
    <loading :active.sync="isLoading">
      <transition name="fade"></transition>
    </loading>
    <Alert></Alert>

    <!-- PC 版頭部 -->
    <nav class="pc navbar navbar-light bg-light">
      <h4>
        <router-link class="float-left text-secondary mt-2" to="/">
          <i class="fa fa-gamepad" aria-hidden="true"></i>
          遊戲天堂
        </router-link>
      </h4>

      <div class="btn-group">
        <router-link to="/cart" class="text-success mr-1">
          <div v-if="num > 0" class="position">{{ num }}</div>
          <i class="fa fa-lg fa-shopping-cart" aria-hidden="true"></i>
        </router-link>

        <div>
          <a
            href="#"
            class="dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            data-display="static"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="sr-only">Toggle Dropdown</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg-right">
            <router-link class="dropdown-item" to="/like">喜好項目</router-link>
            <router-link class="dropdown-item" to="/checkout">訂單確認</router-link>
            <router-link class="dropdown-item" to="/coupons">優惠券專區</router-link>
            <router-link class="dropdown-item" to="/login">管理員登入</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 手機版頭部 -->
    <div class="nav-mobile">
      <div class="navbar navbar-light bg-light shadow-sm">
        <div class="container d-flex justify-content-between p-0">
          <h4 class="m-0 p-0">
            <a class="float-left text-secondary mt-2" href="#" @click.prevent="$router.push('/')">
              <i class="fa fa-gamepad" aria-hidden="true"></i>
              遊戲天堂
            </a>
          </h4>
          <div class="bg-light" id="navbarHeader">
            <div class="float-right">
              <ul class="list-unstyled align-center m-0">
                <li>
                  <div class="btn-group dropleft">
                    <a
                      class="text-primary"
                      data-toggle="dropdown"
                      data-display="static"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fa fa-caret-left text-warning" aria-hidden="true"></i>
                      選單
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg-left">
                      <router-link
                        class="dropdown-item"
                        :class="{ active: $route.path == '/' }"
                        to="/"
                      >商品列表</router-link>
                      <router-link
                        class="dropdown-item"
                        :class="{ active: $route.path == '/cart' }"
                        to="/cart"
                      >
                        購物車
                        <div v-if="num > 0" class="badge badge-secondary">{{ num }}</div>
                      </router-link>
                      <router-link
                        class="dropdown-item"
                        :class="{ active: $route.path == '/like' }"
                        to="/like"
                      >喜好項目</router-link>
                      <router-link
                        class="dropdown-item"
                        to="/checkout"
                        :class="{ active: $route.path == '/checkout' }"
                      >訂單確認</router-link>
                      <router-link
                        class="dropdown-item"
                        :class="{ active: $route.path == '/login' }"
                        to="/login"
                      >管理員登入</router-link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 首頁大圖 -->
    <div v-if="this.$route.path == '/'" class="main-bg">
      <div class="pt-5 text-primary">
        <h1 class="font-weight-bold main-title pt-3">
          遊戲不是小孩的專屬權利
          <br />
          <p class="main-span pt-2 pb-3 font-weight-normal">在遊戲天堂裡，大人、小孩的遊戲應有盡有，還不手刀買起來！</p>
        </h1>
      </div>
    </div>

    <!-- 手機版輪播圖 -->
    <div v-if="this.$route.path == '/'" class="mobile">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="item in coupons"
            :key="item.id"
            :class="{active:item.id==1}"
          >
            <div class="d-block w-100">
              <div class="border-0 p-3 test-bg" :class="item.bg">
                <div class="m-3 text-info">
                  <div class="h4">
                    <div class="big-icon">
                      <i aria-hidden="true" class="fa text-light fa-gamepad"></i>
                    </div>
                    <div class="big-icon1">
                      <i aria-hidden="true" class="fa text-light fa-usd"></i>
                    </div>
                    <div class="big-icon2">
                      <i aria-hidden="true" class="fa text-light fa-ticket"></i>
                    </div>
                    <div class="big-icon3">
                      <i aria-hidden="true" class="fa text-light fa-puzzle-piece"></i>
                    </div>
                    <div class="big-icon4">
                      <i aria-hidden="true" class="fa text-light fa-gift"></i>
                    </div>
                    <div class="big-icon5">
                      <i aria-hidden="true" class="fa text-light fa-cube"></i>
                    </div>
                    <h4 class="mb-2 text-shadow text-light">{{ item.title }}</h4>
                    <p class="text-warning small">使用期限至 {{ item.due_date }}</p>
                  </div>
                  <i class="text-info">立即點擊複製優惠碼:</i>
                  <br />
                  <input
                    type="text"
                    class="text-center text-warning input-bg"
                    @focus="copy"
                    v-model="item.code"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <div class="py-3 container">
      <div class="row">
        <!-- 分類選單 -->
        <ul
          v-if="
            this.$route.path === '/' ||
            this.$route.path.indexOf('/product') !== -1
          "
          class="list-group pc category-pc col-md-3 mb-5 px-3"
        >
          <h5 class="my-4 text-primary">分類選單</h5>
          <li
            class="list-group-item myhover d-flex justify-content-between align-items-center"
            v-for="item in categories"
            :key="item.title"
            :class="{
              active: item.title === now,
            }"
            @click.prevent="getProducts(item)"
          >
            {{ item.title }}
            <span class="badge badge-primary badge-pill">{{ item.num }}</span>
          </li>
        </ul>

        <!-- 用戶選單 -->
        <ul v-else class="pc list-group col-md-3 mb-5 px-3">
          <h5 class="my-4 text-primary">用戶選單</h5>
          <router-link
            class="list-group-item"
            :class="{ active: $route.path == '/cart' }"
            to="/cart"
          >購物車</router-link>
          <router-link
            class="list-group-item"
            :class="{ active: $route.path == '/like' }"
            to="/like"
          >喜好項目</router-link>
          <router-link
            class="list-group-item"
            to="/checkout"
            :class="{ active: $route.path == '/checkout' }"
          >訂單確認</router-link>
          <router-link
            class="list-group-item"
            to="/coupons"
            :class="{ active: $route.path == '/coupons' }"
          >優惠券專區</router-link>
          <router-link class="list-group-item" to="/">回商品列表</router-link>
        </ul>

        <div class="col-md-9 p-2 mycontent text-primary">
          <div class="box" v-if="this.$route.path == '/'">
            <!-- 電腦版商品列表 -->
            <h4 class="my-3 cards-pc">商品列表</h4>
            <div class="card-columns cards-pc">
              <transition-group>
                <div
                  :class="{ 'text-dark': item.is_enabled !== 1 }"
                  class="card p-1"
                  v-for="item in products"
                  :key="item.id"
                  @click="getProduct(item)"
                >
                  <img :src="item.imageUrl" alt class="card-img-top" />
                  <div class="card-body">
                    <h5>{{ item.title }}</h5>
                    <p class="card-text">{{ item.content }}</p>
                  </div>
                  <div class="mb-2">
                    <h4 v-if="item.is_enabled == 1" class="text-center">
                      <template v-if="item.price > 0">
                        <del class="h6">原價 {{ item.origin_price }} 元</del>
                        <h3 class="ml-2">
                          <b class="text-red p-1">{{ item.price }}元</b>
                        </h3>
                      </template>
                      <h3 v-else>
                        <b class="text-danger p-1">{{ item.origin_price }}元</b>
                      </h3>
                    </h4>

                    <h5 class="text-danger" v-if="item.is_enabled !== 1">
                      <i>商品缺貨中</i>
                    </h5>
                  </div>
                </div>
              </transition-group>
            </div>

            <!-- 手機版商品列表 -->
            <div class="cards-mobile">
              <div class="btn-group text-dark mb-2">
                <h6>當前商品類別：</h6>
                <a
                  class="text-primary h6"
                  data-toggle="dropdown"
                  data-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{now}}
                  <i class="fa fa-caret-down text-warning" aria-hidden="true"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-lg-right">
                  <button
                    v-for="item in categories"
                    :key="item.title"
                    :class="{active: item.title === now}"
                    @click.prevent="getProducts(item)"
                    class="dropdown-item"
                    type="button"
                  >{{item.title}}</button>
                </div>
              </div>
              <ul class="list-unstyled m-0">
                <transition-group>
                  <li
                    class="media py-1 border mb-1"
                    :class="{ 'text-dark': item.is_enabled !== 1 }"
                    v-for="item in products"
                    :key="item.id"
                    @click="getProduct(item)"
                  >
                    <img :src="item.imageUrl" class="mx-1 align-self-center media-img" />
                    <div class="media-body ml-1 text-left align-self-center">
                      <h6 class="mt-2 mb-1">{{item.title}}</h6>
                      {{item.content}}
                      <div class="border-top pt-2 mt-2">
                        <div v-if="item.is_enabled == 1">
                          <template v-if="item.price > 0">
                            <del class="float-left">
                              <small>原價 {{ item.origin_price }} 元</small>
                            </del>
                            <h4 class="ml-2 mb-0 float-right">
                              <b class="text-red p-1">{{ item.price }}元</b>
                            </h4>
                          </template>
                          <template v-else>
                            <small class="float-left">售價</small>
                            <h4 class="ml-2 mb-0 float-right">
                              <b class="text-danger p-1">{{ item.origin_price }}元</b>
                            </h4>
                          </template>
                        </div>

                        <h6 class="text-danger text-center" v-if="item.is_enabled !== 1">
                          ! 無法選購
                          <i class="small">(缺貨/已售完)</i> !
                        </h6>
                      </div>
                    </div>
                  </li>
                </transition-group>
              </ul>
            </div>
          </div>

          <!-- 巢狀路由元件 -->
          <div v-else>
            <transition name="fade">
              <router-view :key="$route.params.id"></router-view>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部導覽列 -->
    <footer class="border-top footer bg-light py-4">
      <div class="row">
        <div class="col-md-12">
          聯絡我們:
          <ul class="nav justify-content-center mb-2">
            <li class="nav-item">
              <a class="nav-link p-1 text-dark" href="#">
                <i class="fa fa-lg fa-facebook-official" aria-hidden="true"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link p-1 text-dark" href="#">
                <i class="fa fa-lg fa-github" aria-hidden="true"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link p-1 text-dark" href="#">
                <i class="fa fa-lg fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link p-1 text-dark" href="#">
                <i class="fa fa-lg fa-twitter-square" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-12 col-md">
          <small class="d-block mb-1 text-dark">
            © Company 2020 Made with
            <a
              class="text-dark"
              href="https://bootstrap.hexschool.com/"
            >Bootstrap4</a>
          </small>
          <i>本網頁僅供學習使用 無任何商業用途</i>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Alert from "./messageAlert";
import $ from "jquery";

export default {
  data() {
    return {
      categories: [],
      products: [],
      isLoading: false,
      num: 0,
      now: "All",
      coupons: [
        {
          code: "test2",
          due_date: "2020/10/31",
          percent: "9",
          title: "週年慶全館九折優惠券",
          bg: "text-info bg-secondary",
          id: 1,
        },
        {
          code: "test1",
          due_date: "2020/11/26",
          percent: "8",
          title: "遊戲天堂八週年優惠",
          bg: "text-info bg-success",
          id: 2,
        },
        {
          code: "test3",
          due_date: "2020/12/23",
          percent: "75",
          title: "佛心優惠券限時搶購",
          bg: "text-info bg-dark",
          id: 3,
        },
      ],
    };
  },
  components: { Alert },
  methods: {
    copy(e) {
      e.currentTarget.select();
      document.execCommand("Copy");
      this.$bus.$emit("message:push", "複製成功", "success");
    },
    getcategories() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          let arr = res.data.products;
          const set = new Set();
          arr.filter((item) =>
            !set.has(item.category) ? set.add(item.category) : false
          );
          let temCategory = [...set];
          temCategory.forEach(function (item) {
            vm.categories.push({ title: item, num: 0 });
          });
          vm.categories.unshift({ title: "All", num: 0 });
          let arr2 = [];
          for (let i = 1; i < vm.categories.length; i++) {
            let arr = res.data.products.filter(function (item) {
              return item.category === vm.categories[i].title;
            });
            arr2.push(arr.length);
          }
          arr2.unshift(arr.length);
          for (let j = 0; j < arr2.length; j++) {
            vm.categories[j].num = arr2[j];
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
      vm.getProducts(vm.now);
    },
    getProducts(category = "All") {
      const vm = this;
      vm.isLoading = true;
      vm.$router.push("/").catch((err) => err);
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          if (category === "All" || category.title === "All") {
            vm.products = res.data.products;
            vm.now = "All";
          } else {
            var arr = res.data.products.filter(function (item) {
              return item.category === category.title;
            });
            vm.products = arr;
            vm.now = category.title;
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    getProduct(item) {
      if (item.is_enabled !== 1) {
        this.$bus.$emit("message:push", "無法前往未啟用之商品頁面", "danger");
        return false;
      }
      this.$router.push(`/product/${item.id}`);
    },
    getNum() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.num = res.data.data.carts.length;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    addCart(id, num = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http
        .post(api, { data: { product_id: id, qty: num } })
        .then((res) => {
          vm.isLoading = false;
          if (res.data.success) {
            vm.$bus.$emit("message:push", res.data.message, "success");
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },
  },
  watch: {
    $route: function (to, from) {
      const vm = this;
      if (vm.$route.path.indexOf("product") !== -1) {
        if (to.path == "/") {
          vm.getProducts();
        }
        const api = `${process.env.APIPATH}api/${process.env.MYPATH}/product/${vm.$route.params.id}`;
        this.$http.get(api).then((res) => {
          if (res.data.success) {
            vm.now = res.data.product.category;
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
      } else if (from.path.indexOf("product") == -1 && to.path == "/") {
        vm.now = "All";
        vm.getProducts();
      }
      vm.getNum();
    },
  },
  created() {
    this.getcategories();
    this.getNum();
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)like\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 首頁大圖 */
.main-bg {
  background-size: cover;
  background-position: center;
  height: 550px;
  opacity: 0.7;
  background-image: url(https://images.unsplash.com/photo-1500995617113-cf789362a3e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
}
/* 首頁大圖的主標字 */
.main-title {
  margin-top: 210px;
  background-color: #fff;
}
/* 首頁大圖的副標字 */
.main-span {
  font-size: 20px;
}
/* 整個頁面容器 */
.content {
  overflow: hidden;
}
/* 首頁商品列表圖片 */
.card-img {
  height: 200px;
}
/* 頭部導覽列購物車旁邊數字標籤 */
.position {
  position: absolute;
  top: -10px;
  left: 12px;
  font-size: 12px;
  font-weight: bolder;
  background-color: darkred;
  color: #fff;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  border-radius: 15px;
  padding-top: 1px;
}
/* 所有連結標籤（包含路由連結） */
a {
  text-decoration: none;
}
/* 選單列的選中狀態 */

.myhover {
  cursor: pointer;
  color: #2e6092;
}

/* 選單列的 hover */
.myhover:hover,
.active:hover {
  background-color: #f6f9fc;
  color: #2e6092;
}

.card:hover {
  cursor: pointer;
  color: red;
}

.mycontent {
  margin-bottom: 150px;
}

.footer {
  margin-top: -150px;
  height: 150px;
  width: 100%;
}

.media-img {
  width: 100px;
  height: 100px;
}

.cards-mobile,
.nav-mobile,
.mobile {
  display: none;
}

.text-red {
  color: red;
}

.input-bg {
  background: transparent;
  font-size: 1.5em;
  width: 65px;
  border: 0;
  cursor: pointer;
  color: azure;
  font-weight: bolder;
  padding: 0;
  text-shadow: 1px 1px dimgrey;
}

.text-shadow {
  text-shadow: 2px 1px 1px black;
}

.input-bg:hover {
  background-color: #2e6290;
  border-color: azure;
}

.big-icon {
  font-size: 100px;
  position: absolute;
  right: -20px;
  bottom: -35px;
  z-index: 0;
  opacity: 0.2;
  overflow: hidden;
  text-shadow: 3px 3px black;
  transform: rotate(-30deg);
}

.big-icon1 {
  font-size: 100px;
  position: absolute;
  right: 0;
  bottom: 50%;
  z-index: 0;
  opacity: 0.2;
  overflow: hidden;
  text-shadow: 3px 3px black;
  transform: rotate(20deg);
}

.big-icon2 {
  font-size: 160px;
  position: absolute;
  left: -20px;
  top: -45px;
  z-index: 0;
  opacity: 0.2;
  text-shadow: 3px 3px black;
  overflow: hidden;
  transform: rotate(-95deg);
}

.big-icon3 {
  font-size: 60px;
  position: absolute;
  right: 30%;
  top: -20px;
  z-index: 0;
  opacity: 0.2;
  overflow: hidden;
  text-shadow: 3px 3px black;
  transform: rotate(-45deg);
}

.big-icon4 {
  font-size: 100px;
  position: absolute;
  left: 45%;
  bottom: 10px;
  z-index: 0;
  opacity: 0.2;
  overflow: hidden;
  text-shadow: 3px 3px black;
  transform: rotate(30deg);
}

.big-icon5 {
  font-size: 80px;
  position: absolute;
  left: 30px;
  top: 70%;
  z-index: 0;
  opacity: 0.2;
  overflow: hidden;
  text-shadow: 3px 3px rgb(0, 0, 0);
  transform: rotate(100deg);
  padding: 30px;
  margin: -30px;
}

.box {
  min-height: calc(100vh - 250px);
}

.fade-enter-active {
  transition: all 2s ease;
}

.fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter, .fade-leave-to
/* .fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}

/* RWD */
@media screen and (max-width: 420px) {
  .pc,
  .category-pc,
  .cards-pc,
  .main-bg {
    display: none;
  }

  .cards-mobile,
  .nav-mobile,
  .mobile {
    display: block;
  }
}
</style>
