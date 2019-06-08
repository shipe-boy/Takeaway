<!--  -->
<template>
  <div class="control">
      <transition name="move">
        <div v-if="food.count" class="decrease" @click.stop.prevent="decrease">
            <span class="inner in icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div v-if="food.count" class="count">{{ food.count }}</div>
      <div class="add icon-add_circle" @click.stop.prevent="add"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import connect from './connect'
export default {
    props: {
        food: {
            type: Object
        }
    },
  data () {
    return {
    }
  },
  mounted(){
    //   console.log(this.food)
  },
  methods: {
      add(e){
        //   console.log(this.food)
          if(!this.food.count){ //没有时count是不存在的
            //直接赋值vue监听不到
            Vue.set(this.food,'count' ,1)
          }else{
              this.food.count ++;
          }
        connect.$emit('drop', e.target)
      },
      decrease(){
          if(this.food.count){ 
            this.food.count --;
          }
      }
  }
}

</script>
<style scoped>
.control{
    font-size: 0;
}
.control .decrease{
    display: inline-block;
    padding: 6px;
}
.control .decrease .inner{
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
}
.inner.in{
    animation: rotate 0.4s;
}
@keyframes rotate {
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(180deg);
    }
}
/*动画*/
.move-enter-active{ 
    transition: all .4s; 
}
.move-enter{
    opacity: 1;
    transform: translate3d(24px,0,0)
}
.move-leave-active{
    transition: all .4s;
    opacity: 0;
    transform: translate3d(24px,0,0)
}


.control .count{
    display: inline-block;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
    vertical-align: top;
}
.control .add{
    display: inline-block;
     padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220)
}


</style>