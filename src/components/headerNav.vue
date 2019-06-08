<!--  -->
<template>
  <div class="header">
      <div class="content-wrapper">
          <div class="avatar">
              <img :src="seller.avatar" alt="" width="64" height="64">
          </div>
          <div class="content">
              <div class="title">
                  <span class="brand"></span>
                  <span class="name">{{ seller.name }}</span>
              </div>
              <div class="description">
                  {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
              </div>
              <div class="support" v-if="seller.supports && seller.supports.length">
                  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                  <span class="text">{{ seller.supports[0].description }}</span>
              </div>
          </div>
          <div v-if="seller.supports && seller.supports.length" class="support-count" @click="isShow = true">
              <span class="count">{{ seller.supports.length }}个</span>
              <i class="icon-keyboard_arrow_right"></i>
          </div>
      </div>
      <div class="bullentin-wrapper"  @click="isShow = true">
          <span class="bullentin-title"></span>
          <span class="bullentin-text">{{ seller.bulletin }}</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="bg">
          <img :src="seller.avatar" width='100%' alt="">
      </div>
      <transition name="fade">
      <v-details :seller="seller" v-if="isShow" @on-close="close"></v-details>
      </transition>
  </div>
</template>

<script>
import VDetails from './details'
export default {
    components:{
        VDetails
    },
    props: {
        seller:{
            type: Object,
            default: {}
        }
    },
  data () {
    return {
        classMap: ['decrease','discount','guarantee','invoice','special'],
        isShow: false
    }
  },
  methods:{
      close(){
          this.isShow = false;
      }
  }
}

</script>
<style scoped>
.header{
    overflow: hidden;
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, .5);
    /* blur: 10px; */
}
.header .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
}
.content-wrapper .avatar{
    display: inline-block;
    vertical-align: top;
}
.content-wrapper .avatar img{
    border-radius: 2px;
}
.content-wrapper .content{
    display: inline-block;
    margin-left: 16px;
    font-size: 14px;
}
.content-wrapper .content .title{
    margin: 2px 0 8px 0;
}
.content .title .brand{
    display: inline-block;
    width: 30px;
    height: 18px;
    background: url('../../static/img/brand@2x.png');
    background-size: 30px 18px;
    vertical-align: bottom;
}
.content .title .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
}
.content .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
}
.support{
    font-size: 0;
}
.support .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    vertical-align: top;
}
.support .icon.decrease{
    background-image: url('../../static/img/decrease_1@2x.png');
}
.support .icon.discount{
    background-image: url('../../static/img/discount_1@2x.png');
}
.support .icon.guarantee{
    background-image: url('../../static/img/guarantee_1@2x.png');
}
.support .icon.invoice{
    background-image: url('../../static/img/invoice_1@2x.png');
}
.support .icon.special{
    background-image: url('../../static/img/special_1@2x.png');
}
.support .text{
    font-size: 10px;
    line-height: 12px;
}
.support-count{
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, .2);
    text-align: center;
}
.support-count span{
    font-size: 10px;
    vertical-align: top;
}
.support-count i{
    margin-left: 2px;
    line-height: 24px;
    font-size: 10px;
}

.bullentin-wrapper{
    position: relative;
    height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7, 17, 27, .2);
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.bullentin-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    background-image: url('../../static/img/bulletin@2x.png');
    background-size: 22px 12px;
    vertical-align: middle;
}
.bullentin-text{
    margin: 0 4px;
    font-size: 10px;
    vertical-align: middle;
}
.bullentin-wrapper i{
    position: absolute;
    right: 12px;
    top: 6px;
}

.bg{
    overflow: hidden;
    position: absolute;
    z-index: -1;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
}

.fade-enter-active{
    transition: all 0.5s;
}
.fade-enter{
    opacity: 0;
}
.fade-leave-active{
    transition: all 0.5s;
    opacity: 0;
}
</style>