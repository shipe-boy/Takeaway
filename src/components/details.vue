<template>
  <div class="details">
    <div class="details-wrapper clearfix">
        <div class="details-mian">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
                <star :sizes="48" :score="seller.score"></star>
            </div>
            <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
            </div>
            <ul v-if="seller.supports && seller.supports.length" class="support">
                <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{item.description}}</span>
                </li>
            </ul>
            <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
            </div>
            <div class="bulletin">
                <p class="content">{{ seller.bulletin }}</p>
            </div>
        </div>
    </div>
    <div class="details-close" >
        <i class="icon-close"  @click="close"></i>
    </div>
  </div>
</template>

<script>
import Star from './star'
  export default {
      props: {
        seller:{
            type: Object,
            default: {}
        }
    },
    components:{
        Star
    },
    data() {
      return {
        classMap: ['decrease','discount','guarantee','invoice','special']
      }
    },
    methods: {
        close(){
            this.$emit('on-close')
        }
    }
  }

</script>
<style scoped>
.details{
    position: fixed;
    top:0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, .8);
    -webkit-backdrop-filter: blur(10px);
}
.details-wrapper{
    width: 100%;
    min-height: 100%;
}
.details-mian{
    margin-top: 64px;
    padding-bottom: 64px;
}
.details-mian h1.name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
}
.details-mian .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
}

.details-wrapper .title{
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;
}
.title .line{
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, .2)
}
.title .text{
    padding: 0 12px;
    font-weight: 700;
    font-size: 14px;
}

.details-wrapper .support{
    width: 80%;
    margin: 0 auto;
}
.support .supports-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
}
.support .supports-item:last-child{
    margin-bottom: 0;
}
.icon{
    display: inline-block;
    width: 16px;
    height:16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
}
.supports-item .text{
    line-height: 16px;
    font-size: 12px;

}
.details-wrapper .bulletin{
    width: 80%;
    margin: 0 auto;
}
.bulletin .content{
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
}

.details-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    font-size: 32px;
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
</style>

