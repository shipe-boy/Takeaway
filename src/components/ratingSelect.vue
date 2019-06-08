<!--  -->
<template>
  <div class="rating-select" >
      <div class="rating-type">
          <span @click="select(2)" class="block all" :class="{'active': selectType == 2}">{{ desc.all }}<span class="count"> {{ ratings.length }} </span></span>
          <span @click="select(0)" class="block positive" :class="{'active': selectType == 0}">{{ desc.positive }}<span class="count"> {{positives.length}} </span></span>
          <span @click="select(1)" class="block negative" :class="{'active': selectType == 1}">{{ desc.negative }}<span class="count"> {{ negatives.length }} </span></span>
      </div>
      <div @click="only" class="switch" :class="{'active': onlyContent}">
          <i class="icon-check_circle"></i>
          <span class="text">只看有内容的评价</span>
      </div>

  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props:{
        ratings:{
            type: Array,
            default(){
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default(){
                return{
                    all: '全部',
                    positive: "满意",
                    negative: "不满意"
                }
            }
        }
    },
  data () {
    return {
    }
  },
  computed:{
      positives(){
          return this.ratings.filter((item) => {
              return item.rateType === POSITIVE
          })
      },
      negatives(){
          return this.ratings.filter((item) => {
              return item.rateType === NEGATIVE
          })
      }
  },
  methods: {
      select(type){
          this.$emit('selectChange', type)
      },
      only(){
          //不能直接修改props，通知父组件修改
        //   this.onlyContent = !this.onlyContent;
        this.$emit('onlyChange')
      }
  }
}

</script>
<style scoped>

.rating-select .rating-type{
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
    /* border: 1px solid rgba(7, 17, 27, .1) */
}
.rating-select .rating-type .block{
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 2px;
    color: rgb(77, 85, 93);
    font-size: 12px;
    line-height: 16px;
}
.rating-type .block .count{
    font-size: 8px;
    margin-left: 2px;
}
.block.all{
    background-color: rgba(0, 160, 220, .2);
}
.block.positive{
    background-color: rgba(0, 160, 220, .2);
}
.block.negative{
    background-color: rgba(77, 80, 93, .2);
}
.rating-type .block.active{
    color: #fff;
}
.all.active{
    background-color: rgb(0, 160, 220);
}
.positive.active{
    background-color: rgb(0, 160, 220);
}
.negative.active{
    background-color: rgb(77, 80, 93);
}

.switch{
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    color: rgb(147, 153, 159);
    font-size: 0;
}
.switch .icon-check_circle{
    font-size: 24px;
    margin-right: 4px;
    vertical-align: top;
}
.switch.active .icon-check_circle{
    color: #00c850;
}
.switch .text{
    vertical-align: top;
    font-size: 12px;
    
}
</style>