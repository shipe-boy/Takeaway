<template>
  <div id="app">
      <header-nav :seller=seller></header-nav>
      <div class="tab">
      <div class="tab-item">
        <router-link :to="{name: 'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name: 'ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name: 'seller'}">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" keep-alive />
  </div>
</template>

<script>
import {urlParse} from './uitls/url'
import HeaderNav from './components/headerNav'
export default {
  name: 'App',
  data(){
      return{
          seller: {
              id: (() => {
                  let queryParam = this.$route.query.id;
                //   let queryParam = urlParse();   也可以
                  return queryParam;
              })()
          }    //这样可以根据不同参数找不同的商家，header数据也不一样
      }
  },
  components: {
      HeaderNav
  },
  methods: {
      init(){
          this.$http.get('/api/seller?id='+this.seller.id)
                .then(res => {
                    // console.log(res.body)
                    this.seller = res.body;
                    this.seller = Object.assign({},this.seller,{id:123})
                    // console.log(this.seller.id)
                })
                .catch(err => {
                    console.log(err)
                })
      }
      
  },
  mounted(){
    this.init(); 
    // console.log(this.$route.query)   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #app .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  #app .tab .tab-item {
    flex: 1;
  }
  #app .tab .tab-item a {
      display: block;
      font-size: 14px;
      color: rgb(77,85,93);
  }
  #app .tab .tab-item a.router-link-active{
      color: rgb(240, 20, 20)
  }

</style>

