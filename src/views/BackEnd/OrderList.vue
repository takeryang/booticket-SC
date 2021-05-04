<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="table-responsive my-4 h-all">
      <table class="table mt-4">
        <thead>
          <th width="120">購買時間</th>
          <th width="120">訂購人姓名</th>
          <th>購買品項</th>
          <th width="60">張數</th>
          <th class="text-right" width="100">付款金額</th>
          <th class="text-right" width="100">是否付款</th>
        </thead>
        <tbody>
          <tr v-for="item of filterOrder(searchVal)" :key="item.id">
            <td>{{new Date(item.create_at *1000).toLocaleDateString()}}<br>{{new Date(item.create_at
              *1000).toLocaleTimeString()}}</td>
            <td>{{item.user.name}}</td>
            <td>
              <ul class="order-list">
                <li v-for="product of item.products">{{product.product.title}}
                </li>
              </ul>
            </td>
            <td>
              <ul class="order-list">
                <li v-for="product of item.products" class="text-center">{{product.qty}}
                </li>
              </ul>
            </td>
            <td class="text-right">{{item.total}}</td>
            <td class="text-right">
              <span class="text-success" v-if="item.is_paid">已付款</span>
              <span v-else class="text-danger">未付款</span>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @changePage="getOrderList(page)" />

    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getOrderList(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page of pagination.total_pages" :key="page"
          :class="{'active': pagination.current_page == page}"><a class="page-link" href="#"
            @click.prevent="getOrderList(page)">{{page}}</a></li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getOrderList(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->
  </div>
</template>


<script>
  import Pagination from "../../components/Pagination";

  export default {
    props: ['search'],

    components: {
      Pagination,
    },

    data() {
      return {
        isLoading: false,
        orders: [],
        pagination: {},
        searchVal: '',
      }
    },

    watch: {
      search(val) {
        this.searchVal = val
      }
    },


    methods: {
      getOrderList(page = 1) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          // console.log(response.data);
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
          this.isLoading = false;
        });
      },

      filterOrder(val) {

        return this.orders.filter(function (item) {
          return item.user.name.toLowerCase().match(val)
        })
      },
    },

    created() {
      this.getOrderList()
    },
  }

</script>