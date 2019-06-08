<!--  -->
<template>
  <div class="star" :class="starType">
      <span v-for="(itemClass,index) in classes" :key="index" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    props:{
        sizes: {
            type: Number
        },
        score: {
            type: Number
        }
    },
  data () {
    return {
    }
  },
  computed: {
      starType(){
          return 'star-' + this.sizes;
      },
      classes(){
          let result = [];
          let score = Math.floor(this.score*2)/2
          //4.3  =>  8.6  =>  8/2  => 4
          //4.5  =>  9  => 9/2  => 4.5
          //4.8  =>  9.6  => 9/2 => 4.5

          let hasDecimal = score % 1 !== 0; //判断是否有小数
          let integer = Math.floor(score);
          for(let i = 0; i < integer; i++){
              result.push(CLS_ON);
          }
          if(hasDecimal){
              result.push(CLS_HALF)
          }
          while (result.length < LENGTH){
              result.push(CLS_OFF);
          }
          return result
      }
      
  }
}

</script>
<style scoped>
.star{
    font-size: 0;
}
.star-item{
    display: inline-block;
    width: 20px;
    background-repeat: no-repeat;
}
.star.star-48 .star-item{
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
}
.star.star-48 .star-item:last-child{
    margin-right: 0;
}
.star.star-48 .star-item.on{
    background-image: url('../../static/img/star48_on@2x.png');
}
.star.star-48 .star-item.half{
    background-image: url('../../static/img/star48_half@2x.png');
}
.star.star-48 .star-item.off{
    background-image: url('../../static/img/star48_off@2x.png');
}
.star.star-36 .star-item{
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
}
.star.star-36 .star-item:last-child{
    margin-right: 0;
}
.star.star-36 .star-item.on{
    background-image: url('../../static/img/star36_on@2x.png');
}
.star.star-36 .star-item.half{
    background-image: url('../../static/img/star36_half@2x.png');
}
.star.star-36 .star-item.off{
    background-image: url('../../static/img/star36_off@2x.png');
}
.star.star-24 .star-item{
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
}
.star.star-24 .star-item:last-child{
    margin-right: 0;
}
.star.star-24 .star-item.on{
    background-image: url('../../static/img/star24_on@2x.png');
}
.star.star-24 .star-item.half{
    background-image: url('../../static/img/star24_half@2x.png');
}
.star.star-24 .star-item.off{
    background-image: url('../../static/img/star24_off@2x.png');
}
</style>