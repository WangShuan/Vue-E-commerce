<template>
  <div class="box">
    <loading :active.sync="isLoading">
      <transition name="fade"></transition>
    </loading>
    <div class="row mb-3 media">
      <img :src="product.imageUrl" class="img-fluid col-md-6 align-self-center" alt="..." />
      <div class="media-body px-3">
        <div class="text-justify mt-3">
          <h3 class="text-primary">{{ product.title }}</h3>
          <div class="input-group mb-2">
            <button v-if="isLiked" class="btn btn-sm btn-danger" @click="liked(product.id)">
              <i class="fa fa-heart" aria-hidden="true"></i>
              喜歡 ( 987 )
            </button>
            <button v-else class="btn btn-sm btn-outline-danger" @click="liked(product.id)">
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              喜歡 ( 986 )
            </button>
          </div>
          <div class="text-dark">已售出 876 {{ product.unit }} | 剩餘數量 9999</div>
          <hr />

          <div class="mt-2 mb-3">
            <select class="input-group p-2" v-model="product.num">
              <option v-for="num in 10" :key="num" :value="num">選購 {{ num }} {{ product.unit }}</option>
            </select>
            <div class="input-group m-0 row">
              <button
                class="btn btn-success col-6 rounded-0"
                @click="addCart(product.id, product.num)"
              >加入購物車</button>
              <button
                @click="buyNow(product.id,product.num)"
                class="btn btn-danger col-6 rounded-0"
              >立即購買</button>
            </div>
          </div>

          <h3 class="float-right" v-if="!product.price">
            <b>售價 {{ product.origin_price }} 元</b>
          </h3>
          <h5 class="float-right" v-if="product.price">
            <del class="float-right text-dark h6">原價 {{ product.origin_price }} 元</del>
            <br />
            <p class="float-left h5 text-danger mt-2">現在只要</p>
            <h3 class="float-right ml-2">
              <b class="text-danger p-1">{{ product.price }}元</b>
            </h3>
          </h5>
        </div>
      </div>
      <div class="col-md-12 mt-2 text-left text-dark">
        <h5 class="bg-info text-dark p-2">商品內容：</h5>
        <p class="m-3">{{ product.content }}</p>
        <h5 class="bg-info text-dark p-2">商品描述：</h5>
        <pre v-html="product.description" class="m-3"></pre>
      </div>
      <div class="col-md-12">
        <h5 class="bg-info text-left text-dark p-2">類似商品：</h5>
        <button
          class="btn float-left btn-success m-2"
          v-for="item in products"
          :key="item.id"
          @click="$router.push(`/product/${item.id}`)"
          :class="{
            'btn-danger': item.is_enabled !== 1,
            'd-none': item.id === product.id,
          }"
          :disabled="item.is_enabled !== 1"
        >{{ item.title }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: "",
      isLoading: false,
      products: [],
      isLiked: false,
      category: "",
    };
  },
  methods: {
    getProduct(id = this.$route.params.id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/product/${id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.product = res.data.product;
          vm.product.num = 1;
          vm.category = vm.product.category;
          const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
          this.$http.get(api).then((res) => {
            vm.isLoading = false;
            if (res.data.success) {
              vm.products = res.data.products.filter(function (item) {
                return item.category === vm.product.category;
              });
              if (document.cookie.indexOf(vm.$route.params.id) !== -1) {
                vm.isLiked = true;
              }
            } else {
              vm.$bus.$emit("message:push", res.data.message, "danger");
            }
          });
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
    buyNow(id, num = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http
        .post(api, { data: { product_id: id, qty: num } })
        .then((res) => {
          vm.isLoading = false;
          if (res.data.success) {
            vm.$bus.$emit("message:push", res.data.message, "success");
            vm.$router.push("/cart");
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },
    liked(id = this.$route.params.id) {
      const vm = this;
      let cookieObj = {};
      let cookieAry = document.cookie.split(";");
      let cookie;
      let arr;
      for (let i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = cookieAry[i].trim();
        cookie = cookie.split("=");
        if (cookie[0] === "like") {
          arr = cookie[1];
          if (arr.indexOf(id) !== -1) {
            arr = arr.split(",");
            if (arr.length <= 1) {
              document.cookie = "like=;expires=7;path=/";
            } else {
              arr.splice(arr.indexOf(id), 1);
              document.cookie = `like=${arr};expires=7;path=/`;
            }
            vm.$bus.$emit("message:push", "已移除喜好項目", "danger");
            vm.isLiked = false;
          } else if (arr.indexOf(id) == -1) {
            if (arr.length !== 0) {
              arr = arr + "," + id;
            } else {
              arr = id;
            }
            document.cookie = `like=${arr};expires=7;path=/`;
            vm.$bus.$emit("message:push", "已加入喜好項目", "success");
            vm.isLiked = true;
          }
        } else if (document.cookie.indexOf("like") == -1) {
          document.cookie = `like=${id};expires=7;path=/`;
          vm.$bus.$emit("message:push", "已加入喜好項目", "success");
          vm.isLiked = true;
        }
      }
    },
  },
  watch: {
    $route: function () {
      this.getProduct();
    },
  },
  created() {
    const vm = this;
    vm.getProduct();
  },
};
</script>

<style scoped>
p {
  font-size: 16px !important;
}

.box {
  min-height: calc(100vh - 250px);
}

.fade-enter-active {
  transition: all 1s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
