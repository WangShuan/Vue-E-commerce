<template>
  <div class>
    <div class="pc">
      <h3>優惠券專區</h3>
      <div class="row m-5">
        <div class="col-sm-6 mb-4" v-for="item in coupons" :key="item.id">
          <div id="tv" class="card border-0 bg-light">
            <div class="card-body index">
              <h5 class="card-title text-success">{{ item.title }}</h5>
              <hr />
              <p class="card-text text-dark">
                全館不限金額享
                <span class="text-danger font-width-bolder">{{ item.percent }} 折</span>
                優惠
                <br />
                使用期限至 {{ item.due_date }}
                <br />
                <br />
                <span class="text-primary">立即點擊複製下方優惠碼並在結帳時使用</span>
              </p>
              <input type="text" class="text-center input-bg" @focus="copy" v-model="item.code" />
            </div>
            <div class="bg-icon text-success">
              <i data-v-8dc7cce2 aria-hidden="true" class="fa icon-big fa-ticket"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-3 mobile">
      <h5>優惠券專區</h5>
      <div class="my-4" v-for="item in coupons" :key="item.id">
        <div class="card mb-5 border-0 bg-light">
          <div class="card-body index">
            <h5 class="card-title h6 text-success">{{ item.title }}</h5>
            <hr />
            <p class="card-text text-dark">
              全館不限金額享
              <span class="text-danger font-width-bolder">{{ item.percent }} 折</span>
              優惠
              <br />
              使用期限至 {{ item.due_date }}
              <br />
              <br />
              <span class="text-primary">立即點擊複製下方優惠碼並在結帳時使用</span>
            </p>
            <input type="text" class="text-center input-bg" @focus="copy" v-model="item.code" />
          </div>
          <div class="bg-icon text-success">
            <i data-v-8dc7cce2 aria-hidden="true" class="fa icon-big fa-ticket"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupons: [
        {
          code: "test2",
          due_date: "2020/10/31",
          percent: "9",
          title: "週年慶全館九折優惠券",
          id: 1,
        },
        {
          code: "test1",
          due_date: "2020/11/26",
          percent: "8",
          title: "遊戲天堂八週年優惠",
          id: 2,
        },
        {
          code: "test3",
          due_date: "2020/12/23",
          percent: "75",
          title: "佛心優惠券限時搶購",
          id: 3,
        },
      ],
    };
  },
  methods: {
    copy(e) {
      e.currentTarget.select();
      document.execCommand("Copy");
      this.$bus.$emit("message:push", "複製成功", "success");
    },
  },
};
</script>

<style scoped>
.card {
  overflow: hidden;
  position: relative;
  border-radius: 0% 0% 50% 50% / 0% 0% 15% 5%;
  box-shadow: 10px 10px rgba(0, 0, 0, 0.15);
}
.index {
  z-index: 1;
}
.bg-icon {
  opacity: 0.15;
  position: absolute;
  right: -25px;
  bottom: -25px;
  z-index: 0;
  transform: rotate(-15deg);
}
.icon-big {
  font-size: 150px;
}
.input-bg {
  background: transparent;
  font-size: 1.5em;
  width: 70px;
  border: #2e6290 2px dashed;
  cursor: pointer;
  border-radius: 3px;
  color: #2e6290;
  font-weight: bolder;
}

.input-bg:hover {
  background-color: #2e6290;
  border-color: azure;
  color: azure;
}

.mobile {
  display: none;
}

@media screen and (max-width: 420px) {
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>