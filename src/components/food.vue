<!--  -->
<template>
  <div class="food" ref="food">
    <div class="food-content">
      <div class="img-header">
        <img :src="food.image" alt="">
        <div class="back" @click="close">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <div class="title">{{ food.name }}</div>
        <div class="detial">
          <span class="sell-count"> 月售{{ food.sellCount }}份 </span>
          <span class="rating">好评率{{ food.rating }}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{ food.price }}</span>
          <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="control-wrapper">
          <cart-control :food="food"></cart-control>
        </div>
        <div class="buy" v-if="!food.count|| food.count==0" @click.stop.prevent="add">加入购物车</div>
      </div>
        <line-width v-if="food.info"></line-width>
        <div class="info" v-if="food.info">
            <h2 class="title">商品信息</h2>
            <p class="text">{{food.info}}</p>
        </div>
        <line-width></line-width>
        <div class="rating">
            <h1 class="title">商品评价</h1>
            <rating-select @selectChange="changeType" @onlyChange="changeOnly" :ratings="food.ratings" :select-type="selectType" :desc="desc" :onlyContent="onlyContent"></rating-select>
            <div class="rating-wrapper">
                <ul v-if="food.ratings && food.ratings.length">
                    <li class="rating-item" v-for="(item,index) in food.ratings" :key="index" v-if="needShow(item.rateType,item.text)">
                        <div class="user">
                            <span class="name"> {{item.username}} </span>
                            <img :src="item.avatar" width="12" height="12" alt="" class="avatar">
                        </div>
                        <div class="time">{{item.rateTime | filterTime}}</div>
                        <p class="text">
                            <i :class="{'icon-thumb_up' : item.rateType == 0 ,'icon-thumb_down' : item.rateType == 1}"></i>{{item.text}}
                        </p>
                    </li>
                </ul>
                <div class="no-rating" v-if="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

    import Vue from 'vue'
    import connect from './connect'
  import BScroll from 'better-scroll'
  import CartControl from './cartControl'
  import LineWidth from './line'
  import RatingSelect from './ratingSelect'

  import '../../static/js/time.js'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
      CartControl,
      LineWidth,
      RatingSelect
    },
    data() {
      return {
          selectType: ALL,
          onlyContent: false,
          desc:{
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
          }
      }
    },
    filters:{
        filterTime(value){
            let time = new Date(value).Format('yyyy-MM-dd hh:mm:ss');
            // console.log(time)
            return time
        }
    },
    methods: {
      close() {
        this.$emit('food-close')
      },
      add(e){
          Vue.set(this.food, 'count', 1)
          connect.$emit('drop', e.target)
      },
      changeType(type){
        //   console.log(type)
          this.selectType = type;
        //   console.log(this.selectType)
      },
      changeOnly(){
          this.onlyContent = !this.onlyContent;
      },
      needShow(type,text){
          //判断内容
          if(this.onlyContent && !text){    //只看内容，但没有内容
              return false
          }
          //判断类型
          if(this.selectType === ALL ){
              return true
          }else{
              return type === this.selectType;
          }
      }
    },
    mounted() {
      this.$nextTick(() => {
        //   console.log(this.$refs.food)
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        }else{
            this.scroll.refresh()
        }
      })

        // console.log(new Date().Format)
        
    }
  }

</script>
<style scoped>
  .food {
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    background-color: #fff;
  }

  .food .img-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }

  .food .img-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 0px;
  }

  .back .icon-arrow_lift {
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }

  .food .content {
    position: relative;
    padding: 18px;
  }

  .content .title {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
    line-height: 14px;
  }

  .content .detial {
    height: 10px;
    margin-bottom: 18px;
    line-height: 10px;
    font-size: 0;
  }

  .content .detial span {
    font-size: 10px;
    color: rgb(147, 153, 159)
  }

  .content .detial span.sell-count {
    margin-right: 12px;
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

  .food .control-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }

  .buy {
    box-sizing: border-box;
    position: absolute;
    z-index: 10;
    right: 18px;
    bottom: 18px;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    font-size: 10px;
    border-radius: 12px;
    background-color: rgb(0, 160, 220);
    color: #fff;
  }

    .info{
        padding: 18px;
    }
    .info .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .info .text{
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
    }

    .rating{
        padding-top: 18px;
    }
    .rating .title{
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .rating-wrapper{
        padding: 0 18px;
    }
    .rating-wrapper .rating-item{
        position: relative;
        padding: 16px 0;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
    }
    .rating-item .user{
        position: absolute;
        right: 0;
        top: 16px;
        line-height: 12px;
        font-size: 0;
    }
    .rating-item .user .name{
        margin-right: 6px;
        vertical-align: top;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .rating-item .user .avatar{
        border-radius: 50%;
    }
    .rating-item .time{
        margin-bottom: 6px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .rating-item .text{
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
    .rating-item .text i{
        line-height: 24px;
        margin-right: 4px;
        font-size: 12px;
    }
    .rating-item .text i.icon-thumb_up{
        color: rgb(0, 160, 220);
    }
    .rating-item .text i.icon-thumb_down{
        color: rgb(147, 153, 159);
    }
    .rating-wrapper .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }
</style>
