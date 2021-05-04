<template>
  <div class="col-md-3 col-lg-2 d-md-block bg-light sidebar pb-4">
    <div class="sidebar-sticky">
      <div class="d-flex align-items-center justify-content-between mt-4" data-toggle="collapse" href="#product"
        role="button" :class="[chevronUp.product?'collapse-animation-end':'collapse-animation-start']"
        @click="chevronUp.product = !chevronUp.product">
        <h5>商品管理</h5>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="collapse" id="product">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/admin/productsManagement">
              <i class="fas fa-box-open mr-2"></i>
              商品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to='/admin/orderlist'>
              <i class="fas fa-clipboard-list mr-2"></i>
              訂單列表
            </router-link>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center justify-content-between mt-4" data-toggle="collapse" href="#discount"
        role="button" :class="[chevronUp.discount?'collapse-animation-end':'collapse-animation-start']"
        @click="chevronUp.discount = !chevronUp.discount">
        <h5>折扣管理</h5>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="collapse" id="discount">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to='/admin/coupons'>
              <i class="fas fa-birthday-cake mr-2"></i>
              優惠券列表
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        chevronUp: {
          product: false,
          discount: false,
        }
      }
    }
  }
</script>