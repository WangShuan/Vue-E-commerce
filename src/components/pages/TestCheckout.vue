<template>
  <div v-if="order.id">
    <loading :active.sync="isLoading">
      <div class="loadingio-spinner-spin-ur5grgaunp">
        <div class="ldio-dwsbgiuamos">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </loading>
    <div>
      <div>
        <h4 class="mt-3 text-danger">結帳確認</h4>

        <div class="mt-3 row justify-content-center">
          <form class="col-md-8" @submit.prevent="payOrder">
            <h5 class="mt-4">收件人資料</h5>
            <table class="table text-dark text-right">
              <tbody>
                <tr>
                  <th width="100">Email</th>
                  <td width>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td class="font-weight-bolder">
                    <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <h5 class="mt-5">購物車內容</h5>
            <table class="table text-dark">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle text-left">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td
                    class="align-middle text-right"
                  >{{ item.final_total | numFormat | dollarSign }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ order.total | numFormat | dollarSign }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-right" v-if="order.is_paid === false">
              <button class="btn btn-danger my-3 mb-4">確認付款</button>
            </div>
            <div class="text-right" v-else>
              <button
                @click.prevent="$router.push('/')"
                class="btn btn-outline-success my-3 mb-4"
                v-if="$route.path.indexOf('/test/') == -1"
              >
                繼續逛逛
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      orderId: "",
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/order/${vm.orderId}`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.order = res.data.order;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    payOrder() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/pay/${vm.orderId}`;
      this.$http.post(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.$bus.$emit("message:push", res.data.message, "success");
          vm.getOrder();
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
