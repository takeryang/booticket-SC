<template>
  <div class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap shadow back-nav py-2 align-items-center">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 font-weight-bold order-0" href="/">boo售票網管理後台</a>
    <input class="form-control form-control-dark order-2 order-md-1" type="text" placeholder="搜尋分類或商品名稱"
      v-model="search">
    <button class="btn btn-outline-light order-1 order-md-2" @click.prevent="signout">登出</button>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        search: '',
      }
    },

    methods: {
      signout() {
        const api = `${process.env.VUE_APP_APIPATH}logout`;
        this.$http.post(api).then((response) => {
          // console.log(response.data);
          if (response.data.success) {
            this.$router.push("/");
          }
        });
      },
    },

    created() {
      this.$emit('handler', this.search);
    },
  };
</script>