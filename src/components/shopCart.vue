<!--  -->
<template>
<div>
    <div class="shop-cart">
        <div class="content" @click="openList">
        <div class="content-left">
            <div class="logo-wrapper">
            <div class="logo" :class="{'active': totalCount > 0}">
                <i class="icon-shopping_cart" :class="{'active': totalCount > 0}"></i>
            </div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
            </div>
            <div class="price" :class="{'active': totalPrice > 0}">￥{{ totalPrice }}</div>
            <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
            <div class="pay" :class="{'active': totalPrice >= minPrice}">{{ payDesc }}</div>
        </div>
        </div>
        <!-- 小球动画 -->
        <div class="ball-container">
        <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-for="(ball) in balls" :key="ball.id" v-if="ball.show">
            <div class="inner inner-hook"></div>
            </div>
        </transition-group>
        </div>
        <!-- 购物车列表 -->
        <transition name="up">
            <div class="list" v-if="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="(item,index) in selectFoods" :key="index">
                            <span class="name">{{item.name}}</span>
                            <div class="price">
                            <span>￥{{ item.price * item.count }}</span>
                            </div>
                            <div class="control-cart">
                            <cart-constorl  :food="item"></cart-constorl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
    <transition name="fade">
        <div @click="open = false" class="list-mask" v-if="listShow"></div>
    </transition>
</div>
  
</template>

<script>
import BScroll from 'better-scroll'
  import CartConstorl from './cartControl'
  import connect from './connect'
  export default {
    components: {
      CartConstorl
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [{
            id: 1,
            show: false,
          },
          {
            id: 2,
            show: false,
          },
          {
            id: 3,
            show: false,
          },
          {
            id: 4,
            show: false,
          },
          {
            id: 5,
            show: false,
          }
        ],
        dropBall: [],
        open: false
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach(item => {
          total += item.price * item.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach(item => {
          count += item.count;
        });
        return count;
      },
      listShow() { //购物车列表的控制
        if (!this.totalCount) { //无数量，不显示
          this.open = false;
          return false;
        }
        if(this.open){  //展开再获取
            setTimeout(() =>{
                let el = this.$refs.listContent;
                // console.log(this.$refs)
                // console.log(el)
                this.$nextTick(() => {
                    if(!this.scroll){
                        // console.log(111)
                        this.scroll = new BScroll(el,{
                            click: true
                        })
                    }else{
                        
                        this.scroll.refresh()
                        // this.scroll.refresh()
                    }
                })
            },0)
            
        }
        return this.open;

      },
      payDesc() {
        if (this.totalPrice == 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差${this.minPrice - this.totalPrice}元起送`
        } else {
          return `去结算`
        }
      }
    },
    methods: {
      drop(dom) {
        //   console.log(dom)
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = dom;
            this.dropBall.push(ball)
            return
          }

        }
      },
      beforeEnter(el) {
        //   console.log('beforeEnter')
        // console.log(el)
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            //需要移动多少
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            // console.log(x,rect.top, y)
            // console.log(x,y)
            el.style.display = 'block';
            el.style.webkitTransform = `translate3d(0,${y-50}px,0)`;
            el.style.transform = `translate3d(0,${y-50}px,0)`;

            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x+30}px,0,0)`;
            inner.style.transform = `translate3d(${x+30}px,0,0)`;
            
          }
        }

      },
      enter(el) {
        //   console.log('enter')
        //触发浏览器重绘
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = `translate3d(0,0,0)`;
          el.style.transform = `translate3d(0,0,0)`;

          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(0,0,0)`;
          inner.style.transform = `translate3d(0,0,0)`;
        })
      },
      afterEnter(el) {
        //   console.log('afterEnter')
        let ball = this.dropBall.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      openList() {
        if (!this.totalCount) { //没有商品直接出去
          return;
        }
        this.open = !this.open;
      },
      empty(){
          this.selectFoods.forEach((item) =>{
              item.count = 0;
          })
      },
      pay(){
          if(this.totalPrice < this.minPrice){
              return;
          }
          window.alert(`需要支付￥${this.totalPrice}`)
      }
    },
    mounted() {
      connect.$on('drop', (dom) => {
        //   console.log("shopCart",dom)
        this.drop(dom)
      })

    }
  }

</script>
<style scoped>
  .shop-cart {
    position: fixed;
    z-index: 50;
    left: 0;
    bottom: 0;
    height: 48px;
    width: 100%;
  }

  .shop-cart .content {
    display: flex;
    background-color: #141d27;
    color: rgba(255, 255, 255, .4);
  }

  .content .content-left {
    flex: 1;
    font-size: 0;
  }

  .content-left .logo-wrapper {
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    top: -10px;
    width: 56px;
    height: 56px;
    margin: 0 12px;
    padding: 6px;
    vertical-align: top;
    border-radius: 50%;
    background-color: #141d27;
  }

  .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 400;
    color: #fff;
    background-color: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
  }

  .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 50%;
    background-color: #2b343c;
  }

  .logo-wrapper .logo.active {
    background-color: rgb(0, 160, 220);
  }

  .logo-wrapper .logo .icon-shopping_cart {
    font-size: 24px;
    line-height: 42px;
    color: #80858a;
  }

  .logo .icon-shopping_cart.active {
    color: #fff;
  }

  .content-left .price {
    box-sizing: border-box;
    display: inline-block;
    margin-top: 12px;
    padding-right: 12px;
    vertical-align: top;
    line-height: 24px;
    font-size: 16px;
    font-weight: 700;
    border-right: 1px solid rgba(255, 255, 255, .1)
  }

  .content-left .price.active {
    color: #fff;
  }

  .content-left .desc {
    display: inline-block;
    margin: 12px 0 0 12px;
    vertical-align: top;
    font-size: 10px;
    line-height: 24px;
  }

  .content .content-right {
    flex: 0 0 105px;
    width: 105px;
  }

  .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    background-color: #2b333b;
  }

  .content-right .pay.active {
    background-color: #00b43c;
    color: #fff;
  }


  .ball-wrapper .ball {
    position: fixed;
    z-index: 200;
    left: 32px;
    bottom: 22px;
  }

  .ball .inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(0, 160, 220);
    transition: all .4s;
  }

  /*动画*/
  .drop-enter-active {
    /* transition: all 2s;  */
    transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }

  /*购物车列表*/
.list{
    position: absolute;
    z-index: -1;
    left: 0;
    top:0;
    width: 100%;
    transform: translate3d(0,-100%,0)
}
.list-header{
    height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;
    line-height: 40px;
    border-bottom: 1px solid  rgba(7, 17, 27,0.1)
}
.list-header .title{
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27)
}
.list-header .empty{
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
}
.list .list-content{
    overflow: hidden;
    padding: 0 18px;
    max-height: 217px;
    background-color: #fff;
}
.list .list-content .food{
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border: 1px solid rgba(7, 17, 27,0.1)
}
.list-content .food .name{
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.list-content .food .price{
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20)
}
.list-content .food .control-cart{
    position: absolute;
    right: 0;
    bottom: 6px;
}

/* 遮罩层 */
.list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background-color: rgba(7, 17, 27, .6);
}

/*动画*/
.up-enter-active{ 
    transition: all .4s; 
}
.up-enter{
    transform: translate3d(0,0,0)
}
.up-leave-active{
    transition: all .4s;
    transform: translate3d(0,0,0)
}
.fade-enter-active{ 
    transition: all .4s; 
}
.fade-enter{
    opacity: 0;
}
.fade-leave-active{
    transition: all .4s;
    opacity: 0;
}
</style>
