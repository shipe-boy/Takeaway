<!--  -->
<template>
  <div class="ratings" ref="ratings">
      <div class="ratings-content">
          <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :sizes="36" :score="seller.serviceScore"></star>
                        <span class="score"> {{seller.serviceScore}} </span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :sizes="36" :score="seller.foodScore"></star>
                        <span class="score"> {{seller.foodScore}} </span>
                    </div>
                    <div class="delivery-time">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{ seller.deliveryTime }}分</span>
                    </div>
                </div>
          </div>
          <line-width></line-width>
          <rating-select @selectChange="changeType" @onlyChange="changeOnly" :ratings="ratings" :select-type="selectType" :onlyContent="onlyContent"></rating-select>
          <div class="rating-list">
              <ul>
                  <li class="rating-item" v-for="(item,index) in ratings" :key="index"  v-if="needShow(item.rateType,item.text)">
                      <div class="avatar">
                          <img width="28" height="28" :src="item.avatar" alt="">
                      </div>
                      <div class="content">
                            <h1 class="name">{{ item.username }}</h1>
                            <div class="star-wrapper">
                                <star :sizes="24" :score="item.score"></star>
                                <span v-if="item.deliveryTime" class="delivery"> {{ item.deliveryTime }} </span>
                            </div>
                            <p class="text">{{ item.text }}</p>
                            <div v-if="item.recommend" class="recommend">
                                <i class="icon-thumb_up"></i>
                                <span class="item" v-for="(item1,index1) in item.recommend" :key="index1">{{item1}}</span>
                            </div>
                            <div class="time">{{item.rateTime | filterTime}}</div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
const ALL = 2;

import Star from './star'
import lineWidth from './line'
import ratingSelect from './ratingSelect'

import BScroll from 'better-scroll'
export default {
    props: ['seller'],
    components:{
        Star,
        lineWidth,
        ratingSelect
    },
  data () {
    return {
        ratings: [],
        selectType: ALL,
        onlyContent: false
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
    init() {
        this.$http.get('/api/ratings')
          .then(res => {
            this.ratings = res.body;
            // console.log(this.ratings)
            this.$nextTick(() => { //this.ratings赋值完成后执行
                this.scroll = new BScroll(this.$refs.ratings,{
                    click: true
                })
            })

          })
          .catch(err => {
            console.log(err)
          })
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
  mounted(){
      this.init()
    //   console.log(this.seller)
  }
}

</script>
<style scoped>
.ratings{
    overflow: hidden;
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    right: 0;
}
.ratings .overview{
    display: flex;
    padding: 18px 0;
}
.ratings .overview .overview-left{
    flex: 0 0 137px;
    padding: 6px 0;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, .1);
    text-align: center;
}
.ratings .overview .overview-right{
    flex: 1;
    padding: 6px 0 6px 24px;
}
@media only screen and (max-width: 320px) {
    .ratings .overview .overview-left{
        flex: 0 0 120px;
        width: 120px;
    }
    .ratings .overview .overview-right{
        padding: 6px 0 6px 6px;
    }
}
.overview .overview-left .score{
    margin-bottom: 6px;
    line-height: 28px;
    font-size: 24px;
    color: rgb(255, 153, 0);
}
.overview .overview-left .title{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}
.overview .overview-left .rank{  
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
}

.overview-right .score-wrapper{
    
    margin-bottom: 8px;
    font-size: 0;
}
.score-wrapper .title, .delivery-time .title{
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    vertical-align: top;
}
.score-wrapper .star{
    display: inline-block;
    margin: 0 12px;
    vertical-align: top;
}
.score-wrapper .score{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    line-height: 18px;
    color: rgb(255, 153, 0);
}
.delivery-time{
    font-size: 0;
}
.delivery-time .delivery{
    margin-left: 12px;
    font-size: 12px;
    line-height: 18px;
    color: rgb(147, 153, 159);
    vertical-align: top;
}

.rating-list{
    padding: 0 18px;
}
.rating-list .rating-item{
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.rating-item .avatar{
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px;
    border-radius: 50%;
}
.rating-item .content{
    position: relative;
    flex: 1;

}
.content .name{
    line-height: 12px;
    font-size: 10px;
    color: rgb(7, 17, 27);
    margin-bottom: 4px;
}
.content .star-wrapper{
    margin-bottom: 6px;
    font-size: 0px;
}
.content .star-wrapper .star{
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
}
.content .star-wrapper .delivery{
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
.content .text{
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
    margin-bottom: 8px;
}
.content .recommend{
    line-height: 16px;
    font-size: 0px;
}
.content .recommend .icon-thumb_up{
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
    color: rgb(0, 160, 220);
}
.content .recommend .item{
    display: inline-block;
    padding: 0 6px;
    margin: 0 8px 4px 0;
    border: 1px solid rgba(7, 17, 27, .1);
    font-size: 9px;
    color: rgb(147, 153, 159);
    background-color: #fff;
    border-radius: 1px;
}
.content .time{
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;
    line-height: 12px;
    color: rgb(147, 153, 159);
}
</style>