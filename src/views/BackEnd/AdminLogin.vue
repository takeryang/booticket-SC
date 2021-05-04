<template>
  <div class="text-center admin-login">
    <div class="icon mb-3"><i class="fab fa-bootstrap text-primary mr-2"></i></div>
    <h1 class="h3 mb-3 font-weight-normal">boo售票網管理後台</h1>
    <form class="form-signin" @submit.prevent="signin">
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.username"
        required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password"
        required>
      <div class="text-right mb-1">
        <router-link to="/">回首頁</router-link>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
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
        }
      }
    },

    methods: {
      signin() {
        const api = `${process.env.VUE_APP_APIPATH}admin/signin`;
        this.$http.post(api, this.user).then((response) => {
          // console.log(response.data);
          if (response.data.success) {
            const token = response.data.token;
            const expired = response.data.expired;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
            this.$router.push('/admin');
          } else {
            alert('帳號密碼錯誤')
          }
        });
      },
    }
  }
</script>