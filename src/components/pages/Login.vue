<template>
  <div class="mt-5">
    <loading :active.sync="isLoading">
      <h4>登入中 請稍候...</h4>
    </loading>
    <h1>
      <router-link class="text-secondary mt-2" to="/">
        <i class="fa fa-gamepad" aria-hidden="true"></i>
        遊戲天堂
      </router-link>
    </h1>
    <form class="mt-5 form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">後台登入</h1>
      <label for="inputEmail" class="sr-only">請輸入信箱</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="請輸入信箱"
        required
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">請輸入密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="請輸入密碼"
        required
        v-model="user.password"
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" v-model="remember" value="remember-me" />
          自動填入
        </label>
      </div>
      <button class="btn btn-lg btn-primary mt-3 btn-block" type="submit">登入</button>
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isLoading: false,
      remember: false,
    };
  },
  methods: {
    signin() {
      const vm = this;
      vm.isLoading = true;
      const api = process.env.APIPATH + "admin/signin";
      this.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          const token = res.data.token;
          const expired = res.data.expired;
          this.$router.push("/admin/products");
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          vm.isLoading = false;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
  },
  watch: {
    remember: function (newV, oldV) {
      const vm = this;
      if (newV) {
        vm.user = { username: "loveabo103103@gmail.com", password: "John1007" };
      } else {
        vm.user = { username: "", password: "" };
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>