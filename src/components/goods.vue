<!--  -->
<template>
  <div class="goods">
    <div class="menu">
      <ul>
        <li class="menu-item" v-for="(item,index) in goodsList" :key="index" :class="{'active': currentIndex == index}"
          @click="selectMenu(index,$event)">
          <span class="text"><span class="icon" v-if="item.type > 0"
              :class="classMap[item.type]"></span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="foods">
      <ul>
        <li class="list-item" v-for="(item1,index1) in goodsList" :key="index1">
          <h1 class="title"> {{ item1.name }}</h1>
          <ul>
            <li class="foods-item" v-for="(item,index) in item1.foods" :key="index" @click="food(item,$event)">
              <div class="food-icon">
                <img width="57" height="57" :src="item.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc"> {{ item.description }} </p>
                <div class="extar">
                  <span class="count"> 月售{{item.sellCount}}份 </span>
                  <span>好评率{{ item.rating }}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{ item.price }}</span>
                    <span class="old" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
                </div>
                <div class="control-wrapper">
                    <cart-control :food="item"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice"  :min-price="seller.minPrice"></shop-cart>
    <transition name="move">
        <food-detial v-if="showFlag" :food="selectFood" @food-close="close"></food-detial>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  import connect from './connect'

  import ShopCart from './shopCart'
  import cartControl from './cartControl'
  import FoodDetial from './food'

  export default {
    props: ['seller'],
    components: {
      ShopCart,
      cartControl,
      FoodDetial
    },
    data() {
      return {
        goodsList: [],
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        listHeight: [],
        scrollY: 0, //默认初始高度 0
        selectFood: {},
        showFlag: false
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1]; //如果i是最后一个，height2就是undefined
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
          let goods = [];
          this.goodsList.forEach(good => {  //每一个分类
              good.foods.forEach(item => {  //每个分类下面的食物
                if(item.count > 0){
                    goods.push(item)
                }
              })
          })
          return goods;
      }
    },
    methods: {
      init() {
        this.$http.get('/api/goods')
          .then(res => {
            this.goodsList = res.body;
            // console.log(this.goodsList)
            this.$nextTick(() => { //this.goodsList赋值完成后执行
              this.initScroll();
              this.typeHeight();
            })

          })
          .catch(err => {
            console.log(err)
          })
      },
      initScroll() { //better-scroll应用
        let meunDom = document.querySelector('.goods .menu');
        let foodDom = document.querySelector('.goods .foods');
        this.menuScroll = new BScroll(meunDom, {
          click: true //可以触发点击事件
        })
        this.foodScroll = new BScroll(foodDom, {
           click: true, //可以触发点击事件
          probeType: 3 //监听
        })

        //钩子函数
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      typeHeight() { //计算每个类型的高度，滚动能自动选择类型
        let aLi = document.querySelectorAll('.goods .foods .list-item');
        // console.log(aLi)
        let height = 0;
        this.listHeight.push(height) //加进第一个高度
        for (let i = 0; i < aLi.length; i++) {
          height += aLi[i].clientHeight;
          // height += aLi[i].offsetHeight;   //也可以
          this.listHeight.push(height);
        }
      },
      selectMenu(index, e) {
        let aLi = document.querySelectorAll('.goods .foods .list-item');
        let dom = aLi[index];
        //   console.log(aLi,dom)
        this.foodScroll.scrollToElement(dom, 300) //滚动到指定dom，300毫秒
      },
      food(food,e){
          this.selectFood = food;
          this.showFlag = true;
      },
      close(){
          this.showFlag = false;
      }
    },
    mounted() {
      this.init();
    }
  }

</script>
<style scoped>
  .goods {
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
  }

  .goods .menu {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
  }

  .goods .menu .menu-item {
    display: table;
    height: 54px;
    width: 56px;
    padding: 0 12px;
    line-height: 14px;
    border-bottom: 1px solid rgba(147, 153, 159, .1)
  }

  .menu .menu-item .text {
    display: table-cell;
    width: 56px;
    font-size: 12px;
    vertical-align: middle;
  }

  .menu .menu-item.active {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background-color: #fff;
    /* font-weight: 700; */
    border: none;
  }

  .goods .foods {
    flex: 1;
  }

  .foods .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    background-color: #f3f5f7;
    font-size: 12px;
    color: rgb(147, 153, 159)
  }

  .foods .foods-item {
    position: relative;
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid #f3f5f7;
  }

  .foods .foods-item:last-child {
    border: none;
    margin-bottom: 0;
  }

  .foods-item .food-icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .content .name {
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .content .desc {
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .content .extar {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .content .extar .count {
    margin-right: 10px;
  }

  .content .price {
    font-weight: 400;
    line-height: 24px;
  }

  .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20)
  }

  .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .control-wrapper{
      position: absolute;
      right: 0;
      bottom: 12px;
  }

  .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
  }

  .icon.decrease {
    background-image: url('../../static/img/decrease_1@3x.png');
  }

  .icon.discount {
    background-image: url('../../static/img/discount_1@3x.png');
  }

  .icon.guarantee {
    background-image: url('../../static/img/guarantee_1@3x.png');
  }

  .icon.invoice {
    background-image: url('../../static/img/invoice_1@3x.png');
  }

  .icon.special {
    background-image: url('../../static/img/special_1@3x.png');
  }

  /*动画*/
.move-enter-active{ 
    transition: all .4s; 
}
.move-enter{
    transform: translate3d(100%,0,0)
}
.move-leave-active{
    transition: all .4s;
    transform: translate3d(100%,0,0)
}

</style>
