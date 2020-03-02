<template>
<div>
  <div class="small-title">1. 半透明边框</div>
  <div class="border">
    <div class="content"></div>
  </div>
  <div class="small-title">2. 多重边框 </div>
  <div class="multiple-border"></div>
  <div class="small-title">3. 灵活的背景定位</div>
  <div class="position"></div>
  <div class="small-title">4. 边框内圆角</div>
  <div class="border-inner"></div>
  <div class="small-title">5. 条纹背景</div>
  <div class="linear-bg linear1"></div>
  <div class="linear-bg linear2"></div>
  <div class="small-title">6. 复杂的背景图案</div>
  <div class="net"></div>
  <div class="small-title">7. 伪随机背景</div>
  <div class="random"></div>
  <div class="random2"></div>
  <div class="small-title">8. 连续的图像边框</div>
  <div class="img-border"></div>
  <div class="small-title">9. 自适应的椭圆</div>
  <div class="circle"></div>
  <div class="small-title">10. 平行四边形</div>
  <div class="four-border">内容</div>
  <div class="small-title">11. 菱形</div>
  <div class="diamond">
    <img src="https://img3.mukewang.com/szimg/5df8852609e0762d12000676-360-202.png" alt="">
  </div>
  <div class="small-title">12. 切角效果</div>
  <div class="horn"></div>
  <div class="small-title">13. 梯形标签页</div>
  <div class="trapezoid">内容</div>
  <div class="small-title">14. 简单的饼图</div>
  <div class="bie"></div>
</div>
</template>

<script type='text/ecmascript-6'>
export default {}
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixin'
.border
  position relative
  margin 20px auto
  background: #7F7FD5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height 180px
  width 300px
  .content
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    background #ffffff
    background-clip padding-box // 通过background-clip属性来调整，初始值是border-box，意味着背景会被元素的border  box（边框的外沿框）裁切掉
    border 20px solid rgba(255,255,255, 0.3)
    height 100px
    width 100px

.multiple-border
  background: #C6FFDD;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f7797d, #FBD786); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height 180px
  width 300px
  margin 40px auto
  box-shadow 0 0 0 10px rgba(102,102,102, .3),
             0 0 0 20px rgba(102,102,102, .1)
  outline 2px dashed white
  outline-offset -10px

.position
  height 180px
  width 300px
  margin 40px auto
  background: url(../common/images/arrow-right.png) no-repeat bottom right #FFFDE4 // bottom right是background-position的回退方案
  background-position: calc(100% - 20px) calc(100% - 10px)
  padding 10px
  background-origin: content-box // 使图片跟着内容层走

.border-inner
  height 180px
  width 300px
  margin 40px auto
  background: #6190E8;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #A7BFE8, #6190E8);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #A7BFE8, #6190E8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius 30px
  box-shadow 0 0 0 15px #ccc
  outline 15px solid #ccc

.linear-bg
  height 180px
  width 300px
  margin 40px auto
.linear1
  background linear-gradient(#fb3 50%, #58a 50%)
  background-size 100% 30px
.linear2
  background: repeating-linear-gradient(60deg, #fb3, #fb3 15px, #58a 0, #58a 30px)

.net
  height 180px
  width 300px
  margin 40px auto
  background: white
  background-image: linear-gradient(90deg, rgba(200,0,0,.5) 50%, transparent 0),
                    linear-gradient(rgba(200,0,0,.5) 50%, transparent 0)
  background-size: 30px 30px

.random
  height 180px
  width 300px
  margin 40px auto
  background: linear-gradient(90deg, #fb3 15%, #655 0, #655 40%, #ab4 0, #ab4 65%, hsl(20, 40%, 90%) 0)
  background-size: 80px 100%
.random2
  height 180px
  width 300px
  margin 40px auto
  background: hsl(20, 40%, 90%)
  background-image: linear-gradient(90deg, #fb3 10px, transparent 0),
                    linear-gradient(90deg, #ab4 20px, transparent 0),
                    linear-gradient(90deg, #655 20px, transparent 0)
  background-size: 80px 100%, 60px 100%, 40px 100%;

.img-border
  height 180px
  width 300px
  margin 40px auto
  padding: 10px
  border: 10px solid transparent
  background: linear-gradient(white, white) padding-box,url(https://img3.mukewang.com/szimg/5df8852609e0762d12000676-360-202.png) border-box 0 / cover

// 自适应的椭圆
.circle
  height 180px
  width 300px
  margin 40px auto
  background #fccc
  border-radius 50% / 100% 100%  0 0

// 平行四边形
.four-border
  position relative
  height 180px
  width 300px
  margin 40px auto
  &::before
    content: ''
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: -1
    background: #678
    transform: skew(10deg)

// 菱形
.diamond
  margin 40px auto
  text-align center
.diamond > img
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);

// 切角效果
.horn
  height 180px
  width 300px
  margin 40px auto
  beveled-corners(#58a, 15px)

// 梯形标签页
.trapezoid
  height 100px
  width 200px
  margin 40px 50%
  transform translate(-50%)
  padding 50px
  color #fff
  position relative
  display inline-block
  &::before
    content: ''
    position: absolute
    top 0
    right 0
    bottom 0
    left 0
    z-index -1
    background #58a
    transform perspective(50) rotateX(5deg)

// 简单的饼图
.bie
  height 180px
  width 180px
  margin 40px auto
  border-radius 50%
  background: conic-gradient(#eea2a2 20%, #bbc1bf  0, #bbc1bf  30%, #57c6e1 0);
</style>
