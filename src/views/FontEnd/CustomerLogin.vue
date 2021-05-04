<template>
  <div class="customer-login">
    <div class="login-content mx-auto">
      <div class="title">
        <h2 class="text-center">會員登入</h2>
      </div>
      <div class="login bg-light">
        <form class="customer" @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">會員帳號</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="請輸入電子郵件" v-model="loginEmail">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">會員密碼</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="請輸入會員密碼"
              v-model="loginPassword">
          </div>
          <div>
            <div class="mb-2 d-flex justify-content-between">
              <router-link to="/">回首頁</router-link>
              <a href="" data-toggle="modal" data-target="#PasswordResetModal">忘記密碼?</a>
            </div>
            <button type="submit" class="btn btn-primary w-100"><i class="fas fa-sign-in-alt mr-2"></i>登入</button>
          </div>
        </form>
        <div class="separate"><i class="fas fa-chevron-circle-right"></i></div>
        <div class="socialmedia-login">
          <div class="mb-4">
            <p>使用Facebook登入</p>
            <button type="submit" class="btn btn-primary w-100 fb-button" @click.prevent="fbLogin"><i
                class="fab fa-facebook-square mr-2"></i>Facebook登入</button>
          </div>
          <div class="mb-4">
            <p>使用Google登入</p>
            <button type="submit" class="btn btn-primary w-100 google-button" @click.prevent="googleLogin"><i
                class="fab fa-google mr-2"></i>Google登入</button>
          </div>
          <div>
            <p>註冊帳戶</p>
            <button type="submit" class="btn btn-primary w-100 register-button" data-toggle="modal"
              data-target="#registerModal"><i class="fas fa-user-plus mr-2"></i>建立新帳戶</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title text-light" id="exampleModalCenterTitle">建立新帳戶</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="registerEmail">會員帳號</label>
                <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp"
                  placeholder="請輸入電子郵件" v-model="registerEmail">
              </div>
              <div class="form-group hidden-word">
                <label for="registerPassword">設定密碼</label>
                <input :type="status.setInput" class="form-control" id="registerPassword" placeholder="請輸入密碼"
                  v-model="registerPassword" pattern="^[A-Z]{1}[a-zA-Z0-9]+$" minlength="8"
                  title="請輸入第一字為大寫英文之8-12數字英文">
                <a href="" @click.prevent="setPassword">
                  <i class="fas fa-eye-slash" v-if="status.setEye"></i>
                  <i class="fas fa-eye" v-else></i>
                </a>
              </div>
              <div class="form-group hidden-word">
                <label for="confirmPassword">確認密碼</label> <span class="text-danger ml-1"
                  v-if="registerPassword !== confirmPassword">密碼不符</span>
                <input :type="status.checkInput" class="form-control" id="confirmPassword" placeholder="請輸入密碼"
                  v-model="confirmPassword">
                <a href="" @click.prevent="checkPassword">
                  <i class="fas fa-eye-slash" v-if="status.checkEye"></i>
                  <i class="fas fa-eye" v-else></i>
                </a>
              </div>
              <div class="text-right"><button type="submit" class="btn btn-primary">確認</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="PasswordResetModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title text-light" id="exampleModalCenterTitle">重新設定密碼</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="sendPassword">
              <div class="form-group">
                <label for="sendEmail">會員帳號</label>
                <input type="email" class="form-control" id="sendEmail" aria-describedby="emailHelp"
                  placeholder="請輸入電子郵件" v-model="passwordReset">
              </div>
              <div class="text-right"><button type="submit" class="btn btn-primary">確認</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import firebase from "firebase/app";
  import $ from "jquery";

  export default {


    data() {
      return {
        loginEmail: '',
        loginPassword: '',
        registerEmail: '',
        registerPassword: '',
        confirmPassword: '',
        passwordReset: '',


        status: {
          setEye: true,
          checkEye: true,
          setInput: 'password',
          checkInput: 'password',
        }
      };
    },


    methods: {

      login() {
        firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
          .then((userCredential) => {
            // Signed in
            // console.log(userCredential)
            this.$router.push("/")
            // ...
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            // console.log(errorMessage)
            alert('帳號或密碼錯誤')
          });
      },
      fbLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
            this.$router.push("/")
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
      },

      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            this.$router.push("/")
            // ...
          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      },

      register() {
        if (this.registerPassword === this.confirmPassword) {
          firebase.auth().createUserWithEmailAndPassword(this.registerEmail, this.registerPassword)
            .then(() => {
              alert('註冊成功請登入');
              // this.$router.push('/customer_login');
              $('#registerModal').modal('hide')
            })
            .catch(error => {
              alert(error.message);
            });
        }
      },

      setPassword() {
        if (this.status.setEye) {
          this.status.setEye = false;
          this.status.setInput = 'text';
        } else {
          this.status.setEye = true;
          this.status.setInput = 'password';
        }
      },

      checkPassword() {
        if (this.status.checkEye) {
          this.status.checkEye = false;
          this.status.checkInput = 'text';
        } else {
          this.status.checkEye = true;
          this.status.checkInput = 'password';
        }
      },

      sendPassword() {
        let auth = firebase.auth();
        auth.sendPasswordResetEmail(this.passwordReset).then(function () {
          // Email sent.
          // console.log(1)
        }).catch(function (error) {
          // An error happened.
          // console.log(0)
        });
      }
    },
  }
</script>