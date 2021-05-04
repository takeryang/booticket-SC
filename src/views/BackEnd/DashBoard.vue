<template>
  <div>
    <div class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap shadow back-nav py-2 align-items-center">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 font-weight-bold order-0" href="/">boo售票網管理後台</a>
      <input class="form-control form-control-dark order-2 order-md-1" type="text" placeholder="搜尋相關資料"
        v-model="search">
      <button class="btn btn-outline-light order-1 order-md-2" @click.prevent="signout">登出</button>
    </div>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <SideBar></SideBar>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view :search="search"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  // import NavBar from "../components/NavBar";
  import SideBar from "../../components/SideBar";
  import $ from "jquery";
  import Alert from "../../components/AlertMessage";

  export default {

    components: {
      // NavBar,
      SideBar,
      Alert,
    },

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
      const mycookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common['Authorization'] = mycookie;
    },
  }
</script>