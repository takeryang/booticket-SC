<template>
  <div id="go-top" class="home">
    <loading :active.sync="isLoading"></loading>
    <Header :carts-len="cartsLen" />

    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" :class="{'active': index === 0}" v-for="(product,index) of carouselShowAry"
          :key="product.id">
          <img :src="product.imageUrl" class="d-block w-100" alt="...">
          <div class="carousel-caption text-left px-2">
            <h2 class="font-weight-bold mb-2">{{product.title}}</h2>
            <p class="font-weight-bold mb-4 d-none d-md-block">01 JUN - 31 OCT</p>
            <div class="d-flex justify-content-around justify-content-md-start">
              <button class="btn btn-primary mr-2 banner-btn" @click="getProduct(product.id)">立即購票</button>
              <button class="btn btn-outline-secondary banner-btn" @click="getProductDetail(product.id)">
                詳細資訊</button>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <div class="container popular-show">
      <h2 class="font-weight-bold popular-show">
        熱門節目
      </h2>
      <div class="row">
        <div class="col-12 d-flex mb-5 lg-config" v-for="product of hotShowAry" :key="product.id"
          v-if="product.is_enabled === 1" data-aos="zoom-in-up">
          <div class="product-img"><img :src="product.imageUrl" alt="" class="img-fluid">
          </div>
          <div class="d-flex product">
            <div class="d-flex flex-column justify-content-between product-content w-100">
              <div>
                <div class="d-flex align-items-center mb-3">
                  <h3 class="font-weight-bold">{{product.title}}
                    <span class="category" style="background-color: #F9539D;"
                      v-if="product.category === '音樂'">{{product.category}}</span>
                    <span class="category" style="background-color: #00D2FF;"
                      v-else-if="product.category === '戲劇'">{{product.category}}</span>
                    <span class="category" style="background-color: #E55A23;"
                      v-else-if="product.category === '運動'">{{product.category}}</span>
                    <span class="category" style="background-color: #C500FF;"
                      v-else-if="product.category === '展覽'">{{product.category}}</span>
                    <span class="category" style="background-color: #3FA72A;"
                      v-else-if="product.category === '演唱會'">{{product.category}}</span>
                    <span class="category" style="background-color: #CC0000;"
                      v-else-if="product.category === '電影'">{{product.category}}</span>
                    <span class="category" style="background-color: #2721E4;" v-else>{{product.category}}</span>
                  </h3>
                </div>
                <p class="mb-2 font-weight-bold price">${{product.price}}</p>
                <p class="font-weight-bold line-clamp">
                  {{product.description}}
                </p>
              </div>
              <div class="d-flex">
                <button class="btn btn-primary mr-2" @click="getProduct(product.id)">立即購票</button>
                <button class="btn btn-outline-secondary" @click="getProductDetail(product.id)">詳細資訊</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container more-show">
      <h2 class="font-weight-bold">更多節目</h2>
      <div class="row">
        <div class="col-lg-6 mb-3" v-for="product of moreShowAry" data-aos="fade-up">
          <div class="card">
            <div class="product-img">
              <a href="" @click.prevent="getProductDetail(product.id)">
                <img :src="product.imageUrl" class="card-img-top" alt="...">
              </a>
            </div>
            <div class="card-body">
              <h5 class="card-title product"><a href=""
                  @click.prevent="getProductDetail(product.id)">{{product.title}}</a></h5>
              <p class="card-text line-clamp">{{product.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" data-backdrop="static">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary ">
            <h5 class="modal-title text-light" id="exampleModalCenterTitle">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="ticketCount = 1">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="modalUrl" alt="" class="img-fluid mb-3">
            <div>
              <p>{{product.description}}</p>
            </div>
            <div class="d-flex">
              <div class="ticket-l d-flex flex-column w-50">
                <div class="count text-center d-flex flex-column justify-content-center align-items-center">
                  <div class="ticket-count d-flex mb-6">
                    <button @click="minusTicket"><i class="fas fa-minus-circle"></i></button>
                    <p class="mx-5">{{ticketCount}}</p>
                    <button @click="ticketCount++"><i class="fas fa-plus-circle"></i></button>
                  </div>
                  <div>
                    <p class="small-text">張</p>
                  </div>
                </div>
              </div>
              <div class="ticket-r d-flex flex-column w-50">
                <div class="modal-price text-center d-flex flex-column justify-content-center">
                  <div class="mb-6">
                    <p>NT${{product.price}}</p>
                  </div>
                  <div>
                    <p class="small-text">票價</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowarp">
              小計 <strong> {{ticketCount * product.price}}</strong> 元
            </div>
            <button type="button" class="ml-auto btn btn-outline-secondary" data-dismiss="modal"
              @click="ticketCount = 1">取消選購</button>
            <button type="button" class="btn btn-primary" @click="addtoCart(product.id,product.num)"><i
                class="fas fa-spinner fa-spin mr-1" v-if="status.loadingItem === product.id"></i>加入購物車</button>
          </div>
        </div>
      </div>
    </div>

    <div class="alsrtInfo" :style="{display: displayStsates}">
      <div class="profPrompt_test">
        <p class="m-0">結帳時輸入<span class="text-primary">NEWOPEN</span>享9折優惠</p>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Header from "../../components/Header";
  import Footer from "../../components/Footer";
  import $ from 'jquery';

  export default {
    components: {
      Header,
      Footer,
    },

    data() {
      return {
        ticketCount: 1,
        products: [],
        product: {},
        carts: {},
        status: {
          loadingItem: '',
        },
        isLoading: false,
        cartsLen: 0,
        modalUrl: '',
        aletMsg: '輸入優惠碼 NEWOPEN 即享全站商品9折優惠',
        displayStsates: 'none',
        moreShowAry: [],
        carouselShowAry: [],
        hotShowAry: [],

      }
    },

    methods: {
      getProducts() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          // console.log(response.data);
          this.products = response.data.products;
          this.isLoading = false;
          this.carouselShow();
          this.moreShow();
          this.hotShow();
        });
      },

      getProduct(id) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          // console.log(response.data);
          this.product = response.data.product;
          this.modalUrl = response.data.product.imageUrl;
          this.isLoading = false;
          $('#productModal').modal('show');
        });
      },

      getProductDetail(id) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          // console.log(response.data);
          if (response.data.success) {
            this.$router.push({ path: '/product', query: { id: `${response.data.product.id}` } })
          }
          this.isLoading = false;
        });
      },

      addtoCart(id, qty) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        this.status.loadingItem = id;
        const cart = {
          product_id: id,
          qty: this.ticketCount,
        }
        this.$http.post(api, { data: cart }).then((response) => {
          // console.log(response.data);
          this.status.loadingItem = '';
          this.getCart();
          $('#productModal').modal('hide');
        });
      },

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

      minusTicket() {
        if (this.ticketCount > 1) {
          this.ticketCount--
        }
      },

      moreShow() {
        function getRandom(x) {
          return Math.floor(Math.random() * x);
        }
        let n = 0;
        const tempary = [];
        if (this.products.length > 0) {
          n = getRandom(this.products.length);
          for (let i = 0; i < 6; i += 1) {
            n = getRandom(this.products.length);
            tempary.push(n);
          }
          const result = tempary.filter((item, index, ary) => {
            return ary.indexOf(item) === index;
          });
          if (result.length < 6) {
            const num = result[4];
            const addnum = num + 1;
            for (let i = 0; i < 6; i++) {
              if (result[i] !== addnum) {
                result.push(addnum);
              }
            }
          }
          for (let i = 0; i < 6; i++) {
            this.moreShowAry.push(this.products[result[i]])
          }
        }
      },

      carouselShow() {
        function getRandom(x) {
          return Math.floor(Math.random() * x);
        }
        let n = 0;
        const tempary = [];
        if (this.products.length > 0) {
          n = getRandom(this.products.length);
          for (let i = 0; i < 3; i += 1) {
            n = getRandom(this.products.length);
            tempary.push(n);
          }
          const result = tempary.filter((item, index, ary) => {
            return ary.indexOf(item) === index;
          });
          if (result.length < 3) {
            const num = result[1];
            const addnum = num + 1;

            if (result[0] !== addnum || result[1] !== addnum) {
              result.push(addnum);
            }
          }
          this.carouselShowAry = [this.products[result[0]],
          this.products[result[1]],
          this.products[result[2]]];
        }
      },

      hotShow() {
        function getRandom(x) {
          return Math.floor(Math.random() * x);
        }
        let n = 0;
        const tempary = [];
        if (this.products.length > 0) {
          for (let i = 0; i < 4; i += 1) {
            n = getRandom(this.products.length);
            tempary.push(n);
          }
          const result = tempary.filter((item, index, ary) => {
            return ary.indexOf(item) === index;
          });
          if (result.length < 4) {
            const num = result[2];
            const addnum = num + 1;
            for (let i = 0; i < 4; i++) {
              if (result[i] !== addnum) {
                result.push(addnum);
              }
            }
          }
          for (let i = 0; i < 4; i++) {
            this.hotShowAry.push(this.products[result[i]])
          }
        }
      },

      alertDia() {
        this.displayStsates = 'block'
        window.setTimeout(() => {
          this.displayStsates = 'none'
        }, 2500)
      },
    },

    // computed: {

    //   moreShow() {
    //     if (this.products.length > 0) {
    //       function getRandom(x) {
    //         return Math.floor(Math.random() * x);
    //       }
    //       let moreShowAry = [];
    //       let n = 0;
    //       const tempary = [];
    //       n = getRandom(this.products.length);
    //       for (let i = 0; i < 6; i += 1) {
    //         n = getRandom(this.products.length);
    //         tempary.push(n);
    //       }
    //       // eslint-disable-next-line
    //       const result = tempary.filter((item, index, ary) => {
    //         return ary.indexOf(item) === index;
    //       });
    //       if (result.length < 6) {
    //         const num = result[4];
    //         const addnum = num + 1;
    //         for (let i = 0; i < 6; i++) {
    //           if (result[i] !== addnum) {
    //             result.push(addnum);
    //           }
    //         }
    //         // if (result[0] !== addnum || result[1] !== addnum || result[2] !== addnum || result[3] !== addnum || result[4] !== addnum) {
    //         //   result.push(addnum);
    //         // }
    //       }

    //       for (let i = 0; i < 6; i++) {
    //         moreShowAry.push(this.products[result[i]])
    //       }
    //       // moreShowAry = [this.products[result[0]],
    //       // this.products[result[1]],
    //       // this.products[result[2]],
    //       // this.products[result[3]],
    //       // this.products[result[4]],
    //       // this.products[result[5]]];
    //       return moreShowAry;
    //     }
    //   },

    //   carouselShow() {
    //     if (this.products.length > 0) {
    //       function getRandom(x) {
    //         return Math.floor(Math.random() * x);
    //       }
    //       let carouselShowAry = [];
    //       let n = 0;
    //       const tempary = [];
    //       n = getRandom(this.products.length);
    //       for (let i = 0; i < 3; i += 1) {
    //         n = getRandom(this.products.length);
    //         tempary.push(n);
    //       }
    //       // eslint-disable-next-line
    //       const result = tempary.filter((item, index, ary) => {
    //         return ary.indexOf(item) === index;
    //       });
    //       if (result.length < 3) {
    //         const num = result[1];
    //         const addnum = num + 1;

    //         if (result[0] !== addnum || result[1] !== addnum) {
    //           result.push(addnum);
    //         }
    //       }
    //       carouselShowAry = [this.products[result[0]],
    //       this.products[result[1]],
    //       this.products[result[2]]];
    //       return carouselShowAry;
    //     }
    //   },

    //   hotShow() {
    //     if (this.products.length > 0) {
    //       function getRandom(x) {
    //         return Math.floor(Math.random() * x);
    //       }
    //       let hotShowAry = [];
    //       let n = 0;
    //       const tempary = [];
    //       for (let i = 0; i < 4; i += 1) {
    //         n = getRandom(this.products.length);
    //         tempary.push(n);
    //       }
    //       // eslint-disable-next-line
    //       const result = tempary.filter((item, index, ary) => {
    //         return ary.indexOf(item) === index;
    //       });
    //       if (result.length < 4) {
    //         const num = result[2];
    //         const addnum = num + 1;
    //         for (let i = 0; i < 4; i++) {
    //           if (result[i] !== addnum) {
    //             result.push(addnum);
    //           }
    //         }
    //         // if (result[0] !== addnum || result[1] !== addnum || result[2] !== addnum) {
    //         //   result.push(addnum);
    //         // }
    //       }
    //       for (let i = 0; i < 4; i++) {
    //         hotShowAry.push(this.products[result[i]])
    //       }
    //       // hotShowAry = [this.products[result[0]],
    //       // this.products[result[1]],
    //       // this.products[result[2]],
    //       // this.products[result[3]]];
    //       return hotShowAry;
    //     }
    //   },
    // },



    created() {
      this.getProducts()
      this.getCart()
      this.alertDia()
    }
  }
</script>