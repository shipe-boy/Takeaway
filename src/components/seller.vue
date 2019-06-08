<!--  -->
<template>
  <div class="seller" ref="sellerList">
      <div class="seller-list">
          <div class="overview">
              <h1 class="title"> {{ seller.name }} </h1>
              <div class="desc">
                  <star :sizes="36" :score="seller.score"></star>
                    <span class="text"> ({{seller.ratingCount}}) </span>
                    <span class="text"> 月售{{seller.sellCount}}单 </span>
              </div>
              <ul class="remark">
                  <li class="block">
                      <h2>起送价</h2>
                      <div class="content">
                          <span class="stress">{{ seller.minPrice }}</span>元
                      </div>
                  </li>
                  <li class="block">
                      <h2>商家配送</h2>
                      <div class="content">
                          <span class="stress">{{ seller.deliveryPrice }}</span>元
                      </div>
                  </li>
                  <li class="block">
                      <h2>平均配送时间</h2>
                      <div class="content">
                          <span class="stress">{{ seller.deliveryTime }}</span>分钟
                      </div>
                  </li>
              </ul>
              <div class="favorite" @click="toggleFavorite">
                  <i class="icon-favorite" :class="{'active':favorite}"></i>
                  <span class="text">{{favoriteText}}</span>
              </div>
          </div>
          <line-width></line-width>
          <div class="bulletin">
              <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content"> {{seller.bulletin}} </p>
                </div>
                <ul v-if="seller.supports && seller.supports.length" class="support">
                    <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
          </div>
          <line-width></line-width>
          <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(item,index) in seller.pics" :key="index">
                            <img :src="item" width="120" height="90" alt="">
                        </li>
                    </ul>
                </div>
          </div>
          <line-width></line-width>
          <div class="info">
              <h1 class="title">商家信息</h1>
              <ul>
                  <li class="info-item" v-for="(item,index) in seller.infos" :key="index">{{item}}</li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import {saveToLocal,loadFromLocal} from '../uitls/store'
import BScroll from 'better-scroll'
import Star from './star'
import LineWidth from './line'
export default {
    props: ['seller'],
    components:{
        Star,
        LineWidth
    },
  data () {
    return {
        classMap: ['decrease','discount','guarantee','invoice','special'],
        favorite: (()=>{
            return loadFromLocal(this.seller.id,'favorite',false)
        })()
    }
  },
  computed: {
    favoriteText(){
        return this.favorite? '已收藏':'收藏';
    }
  },
  watch:{
      seller(){
          this.init();
      }
  },
  methods:{
      init(){
        if(!this.scroll){
            this.scroll = new BScroll(this.$refs.sellerList,{
                click: true
            })
        }else{
            this.scroll.refresh();
        }
        
        if(this.seller.pics){
            let picWidth = 120;
            let picMar = 6;
            let width = (picWidth + picMar)* this.seller.pics.length - picMar;
            this.$refs.picList.style.width = width + 'px';

            let wrapper = document.querySelector('.pic-wrapper');

            if(!this.picScroll){
                this.picScroll = new BScroll(wrapper,{
                    scrollX: true,
                    eventPassthrough: 'vertical'
                })
            }else{
                this.picScroll.refresh();
            }  
        }
      },
      toggleFavorite(e){
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id,'favorite',this.favorite)
      }
  },
  mounted(){
      this.init();
  }
}

</script>
<style scoped>
.seller{
    overflow: hidden;
    position: absolute;
    top: 174px;
    bottom: 0px;
    left: 0;
    right: 0;
    width: 100%;
}
.seller .overview{
    position: relative;
    padding: 18px;
}
.overview .title{
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
}
.overview .desc{
    padding-bottom: 18px;    
    font-size: 0px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.overview .desc .star{
    display: inline-block;
    margin-right: 8px;
    vertical-align: top;
}
.overview .desc .text{
    margin-right: 12px;
    line-height: 18px;
    font-size: 10px;
    color: rgb(77, 85, 93);
    vertical-align: top;
}
.overview .remark{
    display: flex;
    padding-top: 18px;
}
.overview .remark .block{
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, .1);

}
.overview .remark .block:last-child{
    border: none;
}
.overview .remark .block h2{
    margin-bottom: 4px;
    line-height: 10px;
    color: rgb(147, 153, 159);
    font-size: 10px;
}
.overview .remark .block .content{
    line-height: 24px;
    font-size: 10px;
    font-weight: 200;
    color: rgb(7, 17, 27);
}
.overview .remark .block .content .stress{
    font-size: 24px;
}
.overview .favorite{
    position: absolute;
    right: 11px;
    top: 18px;
    width: 50px;
    text-align: center;
}
.favorite i{
    display: block;
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 24px;
    color: #d4d6d9;
}
.favorite i.active{
    color: rgb(240 , 20, 20);
}
.favorite .text{
    font-size: 10px;
    line-height: 10px;
    color: rgb(77, 85, 93);
}


.seller .bulletin{
    padding: 18px 18px 0 18px;
}
.bulletin .title{
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
}
.bulletin .content-wrapper{
    padding: 0 12px 16px 12px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.bulletin .content-wrapper .content{
    line-height: 24px;
    font-size: 12px;
    color: rgb(240 , 20, 20);
}

.support .supports-item{
    padding: 16px 12px;
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.support .supports-item:last-child{
    border: none;
}
.support .supports-item .icon{
    display: inline-block;
    width: 16px;
    height:16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
}
.support .icon.decrease{
    background-image: url('../../static/img/decrease_1@3x.png');
}
.support .icon.discount{
    background-image: url('../../static/img/discount_1@3x.png');
}
.support .icon.guarantee{
    background-image: url('../../static/img/guarantee_1@3x.png');
}
.support .icon.invoice{
    background-image: url('../../static/img/invoice_1@3x.png');
}
.support .icon.special{
    background-image: url('../../static/img/special_1@3x.png');
}
.support .supports-item .text{
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}

.seller .pics{
    padding: 18px;
}
.pics .title{
    margin-bottom: 12px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
}
.pics .pic-wrapper{
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
}
.pics .pic-wrapper .pic-list{
    font-size: 0px;
}
.pic-list .pic-item{
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
}
.pic-list .pic-item:last-child{
    margin-right: 0;
}

.info{
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
}
.info .title{
    padding-bottom: 12px;
    line-height: 14px;
    font-size: 14px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.info .info-item{
    padding: 16px 12px;
    line-height: 16px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    font-size: 12px; 
}
.info .info-item:last-child{
    border: none;
}
</style>