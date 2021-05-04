<template>
  <div class="history-order">
    <loading :active.sync="isLoading"></loading>
    <Header :carts-len="cartsLen" />

    <div class="order container">
      <h2>歷史訂單</h2>
      <div class="table-responsive">
        <table class="table table-hover w-100">
          <thead>
            <tr>
              <th scope="col" width="130">時間</th>
              <th scope="col" width="50%">商品名稱</th>
              <th scope="col" width="60" class="text-center">張數</th>
              <th scope="col" class="text-right">總金額</th>
              <th scope="col" class="text-center">付款狀態</th>
              <th scope="col" class="text-center">訂單資訊</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of orderFilter">
              <th scope="row">{{new Date(item.create_at *1000).toLocaleDateString()}}<br>{{new Date(item.create_at
                *1000).toLocaleTimeString()}}</th>
              <td>
                <ul>
                  <li v-for='product of item.products'>
                    {{product.product.title}}
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li v-for='product of item.products' class="text-center">
                    {{product.qty}}
                  </li>
                </ul>
              </td>
              <td class="text-right">{{item.total}}</td>
              <td class="text-center">
                <span class="text-success" v-if="item.is_paid">已付款</span>
                <span v-else class="text-danger">未付款</span>
              </td>
              <td class="text-center">
                <a href="" @click.prevent="payOrder(item.id)"><i class="fas fa-file-alt"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/Header";
  import Footer from "../../components/Footer";
  import firebase from "firebase/app";

  export default {
    components: {
      Header,
      Footer
    },

    data() {
      return {
        cartsLen: 0,
        isLoading: false,
        orders: [],
        newOrder: [],
        userEmail: '',
      }
    },

    methods: {
      getCart() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          // console.log(response.data);
          this.carts = response.data.data;
          this.cartsLen = response.data.data.carts.length;
          this.isLoading = false;
        });
      },

      getOrder() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=page`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          this.isLoading = false;
          if (response.data.pagination.total_pages > 0) {
            for (let i = 1; i < response.data.pagination.total_pages + 1; i++) {
              let page = i;
              const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
              this.$http.get(api).then((response) => {
                // console.log(response.data)
                this.orders.push(response.data.orders)
                // console.log(this.orders)
                this.newOrder = [].concat.apply([], this.orders);
                // console.log(this.newOrder)
              })
            }
          }
          this.isLoading = false;
        });
      },

      currentUser() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.userEmail = user.email
            // console.log(this.userEmail)
          } else {
            // console.log(3)
          }
        });
      },

      payOrder(id) {
        this.$router.push({
          name: 'CustomerCheckout',
          params: { orderId: id }
        })
      }
    },

    computed: {
      orderFilter() {
        if (this.orders.length > 1) {
          let email = this.userEmail
          return this.newOrder.filter(function (item) {
            return item.user.email === email
          })
        }
      }
    },

    created() {
      this.currentUser()
      this.getCart()
      this.getOrder()
    },

  }
</script>