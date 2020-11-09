<template>
  <div class="box">
    <loading :active.sync="isLoading">
      <transition name="fade"></transition>
    </loading>
    <div class="cart-pc">
      <h3 class="py-3 text-primary">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i> 購物車清單
      </h3>
      <div v-if="cart.total === 0">
        <h4 class="mt-5">
          您的購物車沒有任何商品，
          <a href="/" class="text-danger">回商品列表</a>
          選購。
        </h4>
      </div>
      <div class="cart-pc" v-else>
        <table class="table table-striped table-bordered text-dark mt-4">
          <thead class="thead">
            <th width="80">操作</th>
            <th width="320">商品連結</th>
            <th width="200">數量</th>
            <th width="200">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="delCart(item.id)"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
              <td class="align-middle">
                {{
                item.product.title
                }}
                <div class="text-success" v-if="cart.final_total !== cart.total">已套用優惠券</div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">
                <del v-if="cart.final_total !== cart.total">
                  {{
                  item.total | numFormat | dollarSign
                  }}
                </del>
                <template v-else>
                  {{
                  item.total | numFormat | dollarSign
                  }}
                </template>
                <div class="text-success" v-if="cart.final_total !== cart.total">
                  折扣後
                  {{ item.final_total | numFormat | dollarSign }}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total | numFormat | dollarSign }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total | numFormat | dollarSign }}</td>
            </tr>
          </tfoot>
        </table>

        <div class="input-group mb-5 input-group-sm col-5 float-right pr-0">
          <input type="text" class="form-control" :placeholder="hint" v-model="couponCode" />
          <div class="input-group-append">
            <button class="btn btn-primary font-weight-bold" type="button" @click="addCoupon">套用</button>
            <button class="btn btn-danger font-weight-bold" @click="$router.push('/checkout')">結帳</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-mobile" v-if="cart.total > 0">
      <h5>
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>購物車清單
      </h5>
      <table class="table table-striped table-bordered text-dark mt-4">
        <thead class="thead">
          <th width="67">操作</th>
          <th>商品內容</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="delCart(item.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
            <td class="text-center">
              <div class="float-left">{{ item.product.title }}×{{ item.qty }}</div>

              <div class="float-right">
                <del
                  class="text-info"
                  v-if="cart.final_total !== cart.total"
                >{{ item.total | numFormat | dollarSign }}</del>
                <template v-else>
                  {{
                  item.total | numFormat | dollarSign
                  }}
                </template>
                <div class="text-success" v-if="cart.final_total !== cart.total">
                  折扣後
                  {{ item.final_total | numFormat | dollarSign }}
                </div>
              </div>
              <div class="text-success" v-if="cart.final_total !== cart.total">已套用優惠券</div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="1" class="text-right">總計</td>
            <td class="text-right">{{ cart.total | numFormat | dollarSign }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="1" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total | numFormat | dollarSign }}</td>
          </tr>
        </tfoot>
      </table>
      <h5>
        <i aria-hidden="true" class="fa fa-ticket"></i>
        優惠券
      </h5>
      <div class="input-group input-group-sm p-0">
        <input
          type="text"
          class="form-control text-center"
          :placeholder="hint"
          v-model="couponCode"
        />
      </div>
      <div class="input-group row input-group-sm mx-0 mb-2">
        <button
          class="btn btn-primary rounded-0 col-6 btn-sm font-weight-bold"
          type="button"
          @click="addCoupon"
        >套用優惠碼</button>
        <button
          class="btn btn-danger rounded-0 col-6 btn-sm font-weight-bold"
          @click="$router.push('/checkout')"
        >立即結帳</button>
      </div>
    </div>
    <div class="cart-mobile" v-if="cart.total === 0">
      <h5>
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>購物車清單
      </h5>
      <h6 class="mt-5">
        您的購物車目前沒有任何商品，
        <br />請
        <a href="/" class="text-danger">回商品列表</a>
        選購。
      </h6>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      isLoading: false,
      cart: [],
      couponCode: "",
      hint: "請輸入優惠碼",
    };
  },
  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.cart = res.data.data;
          if (vm.cart.final_total == vm.cart.total) {
            vm.hint = "請輸入優惠碼";
          } else {
            vm.hint = "再次點選套用即可清除當前折扣";
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
    },
    delCart(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart/${id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit("message:push", res.data.message, "success");
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
        vm.getCart();
      });
    },
    addCoupon() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/coupon`;
      if (vm.couponCode == "") {
        vm.couponCode = "false";
      }
      this.$http.post(api, { data: { code: vm.couponCode } }).then((res) => {
        if (res.data.success) {
          vm.cart.final_total = res.data.final_total;
          if (vm.couponCode === "false") {
            vm.hint = "請輸入優惠碼";
            vm.$bus.$emit("message:push", "已移除優惠券", "success");
          } else {
            vm.hint = "再次點選套用即可清除當前折扣";
            vm.$bus.$emit("message:push", "已套用優惠券", "success");
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.couponCode = "";
        vm.getCart();
        vm.isLoading = false;
      });
    },
  },
  watch: {
    $route: function () {
      this.getCart();
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style scoped>
.cart-mobile {
  display: none;
}

.box {
  min-height: calc(100vh - 250px);
}

@media screen and (max-width: 420px) {
  .cart-pc {
    display: none;
  }
  .cart-mobile {
    display: block;
  }
}
</style>