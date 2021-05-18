<template>
  <div class="header">
    <div class="secheader bg-primary">
      <div class="container">
        <div class="row align-items-center py-1">
          <div class="col-md-6 social-media">
            <a href="" class="text-light p-3"><i class="fab fa-instagram"></i></a>
            <a href="" class="text-light p-3"><i class="fab fa-facebook-square"></i></a>
            <a href="" class="text-light p-3"><i class="fab fa-line"></i></a>
            <a href="https://github.com/takeryang/booticket-SC" class="text-light p-3"><i class="fab fa-github"></i></a>
          </div>
          <div class="col-md-6 text-right userlink d-flex justify-content-around justify-content-md-end">
            <router-link class="text-light p-2" to="/customer_login" v-if="userEmail === null"><i
                class="fas fa-user mr-1"></i>會員登入
            </router-link>
            <div class="d-flex align-items-center" v-else>
              <a href="#" class="m-0 text-light mr-2 dropdown-toggle" data-toggle="dropdown"
                data-reference="parent">您好&ensp;{{userEmail}}</a>
              <div class="dropdown-menu">
                <router-link class="dropdown-item" to="history_order">查詢訂單</router-link>
                <a href="" class="dropdown-item" @click.prevent="signOut">會員登出</a>
              </div>
            </div>
            <router-link class="text-light p-2 mr-3" to="/admin_login"><i class="fas fa-user-cog mr-1"></i>管理員登入
            </router-link>
            <!-- <div class="d-flex align-items-center" v-else>
              <a href="#" class="m-0 text-light mr-2 dropdown-toggle" data-toggle="dropdown"
                data-reference="parent">您好&ensp;{{userEmail}}</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">歷史訂單</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
              <a href="" class="text-light p-2 mr-5" @click.prevent="signOut"><i
                  class="fas fa-sign-out-alt"></i>會員登出</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="mainheader container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <h1 class="m-0">
          <router-link class="navbar-brand title mr-4" to="/"><i class="fab fa-bootstrap text-primary mr-2"></i>boo售票網
          </router-link>
        </h1>
        <div class="d-lg-none ml-auto mr-3 cart-lg"><a href="" class="align-middle" @click.prevent="loginCheck"><i
              class="fas fa-shopping-cart"></i></a></div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_music'><i
                  class="fas fa-music"></i>音樂</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_drama'><i
                  class="fas fa-theater-masks"></i>戲劇</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_sport'><i
                  class="fas fa-basketball-ball"></i>運動</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_expo'><i
                  class="fas fa-palette"></i>展覽</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_concert'><i
                  class="fas fa-microphone-alt"></i>演唱會</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_movie'><i
                  class="fas fa-video"></i></i>電影</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_family'><i
                  class="fas fa-child"></i>親子</router-link>
            </li>
          </ul>
        </div>
        <div class="cart">
          <router-link to="/customer_order"><i class="fas fa-shopping-cart mr-1"></i>購物車({{cartsLen}})
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import firebase from "firebase/app";
  import $ from 'jquery';

  export default {
    props: {
      cartsLen: Number,
    },

    data() {
      return {
        userEmail: null,
        status: {
          online: false,
        },
        a: '',
      }
    },

    methods: {
      signOut() {
        // [START auth_sign_out]
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          // console.log('success')
          if (this.$route.path !== '/') {
            this.$router.push('/')
          } else {
            window.location.reload();
          }
        }).catch((error) => {
          // An error happened.
        });
        // [END auth_sign_out]
      },

      userOnline() {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user !== null) {
            let b = user.email
            console.log(user)
          } else {
            // No user is signed in.
            console.log("NO")
          }
        });
      },

      loginCheck() {
        if (this.userEmail !== null) {
          this.$router.push('/customer_order')
        } else {
          alert("請先登入會員")
          this.$router.push('/customer_login')
        }
      },

      currentUser() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // console.log("userEmail", user.email)
            // console.log(user)
            this.userEmail = user.email.split('@')[0];
            // console.log(this.userEmail)
            // User is signed in.
          } else {
            // No user is signed in.
            // console.log(3)
          }
        });
      },

      // online() {
      //   var user = firebase.auth().currentUser;
      //   if (user) {
      //     // User is signed in.
      //     this.userEmail = user.email.split('@')[0];
      //     console.log(this.userEmail)
      //   } else {
      //     // No user is signed in.
      //     console.log(0)
      //   }
      // },
    },

    created() {
      this.currentUser()
      // this.online()
    },

  }
</script>