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
  <div class="small-title">15. 单侧投影</div>
  <div class="side-shadow"></div>
  <div class="small-title">16. 不规则投影</div>
  <div class="irregular">ABCDEFG</div>
  <div class="small-title">17. 染色效果</div>
  <div class="dye"></div>
  <div class="small-title">18. 毛玻璃效果</div>
  <div class="glass">
    <div class="main">ABCDEFG</div>
  </div>
  <div class="small-title">19. 折角效果</div>
  <div class="fold-angle"></div>
  <div class="small-title">20. 连字符断行</div>
  <div class="desc">注：chrom、IE11上还不支持这个属性，在fiiefox上支持</div>
  <div class="break-line">The errors were caused by special characters and line breaks in description fields ( R2).</div>
  <div class="small-title">21. 插入换行</div>
  <div class="desc">书中使用dl dt dd来展示效果，现在flex布局可以完成的更好，就不介绍了。</div>
  <div class="small-title">22. 文本行的斑马纹</div>
  <div class="stripe">每个自定义列表项以开始。每个自定义列表项的定义以开始。 4 不同类型的有序列表 本例演示不同类型的有序列表。 5 这就是我们常用到的HTML...</div>
  <div class="small-title">23. 调整tab的宽度</div>
  <pre  class="tab">
    pre,	code{
			font-family: monospace;
    }
    pre {
			display: block;
			margin: 1em 0;
			white-space: pre;
    }
  </pre>
  <div class="small-title">24. 连字</div>
	<div class="ligature">Difficult waffles</div>
  <div class="small-title">25. 华丽的&符号</div>
	<div class="symbol">略。。</div>
  <div class="small-title">26. 自定义下划线</div>
	<div class="underline">font-variant-ligatures: no-common-ligatures;</div>
  <div class="small-title">27. 现实中的文字效果</div>
	<div class="print">凸版印刷效果</div>
	<div class="hollow">空心字效果</div>
	<div class="light">文字外发光效果</div>
	<div class="bulge">文字凸起效果</div>
  <div class="small-title">28. 环形文字</div>
	<div class="circular">
		<svg viewBox="0 0 300 300">
			<path d="M 100,100 a 50,50 0 1,1 0,1 z" id="circle" />
			<text>
				<textPath xlink:href="#circle">circular reasoning works because</textPath>
			</text>
		</svg>
	</div>
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

// 单侧投影
.side-shadow
  height 180px
  width 300px
  margin 40px auto
  background-image: linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%);
  box-shadow 0 8px 3px -3px rgba(0,0,0,.5)
// 不规则投影
.irregular
  height 180px
  width 300px
  margin 40px auto
  color #666
  text-align center
  font-size 50px
  line-height 180px
  border dashed 10px orange
  filter drop-shadow(0 5px 3px #678)
// 染色效果
.dye
  height: 180px
  width: 300px
  margin 40px auto
  background-image url(https://img1.mukewang.com/szimg/5d9c62fb0907ccf012000676-360-202.png)
  background-size: cover
  background-color: hsl(335, 100%, 50%)
  background-blend-mode: luminosity
  transition: .5s background-color
  &:hover
    background-color: transparent

// 折角效果
.fold-angle
  height: 180px
  width: 300px
  margin 40px auto
  folded-corner(#58a, 30px, 30deg)

// 毛玻璃效果
.glass
  position relative
  height: 180px
  width: 300px
  margin 40px auto
  font-size 50px
  text-align center
  background-size cover
  background-image url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583310555581&di=17d19c3f990900846ab8cdba69d2aed8&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F30%2F48%2F16pic_3048628_b.jpg)
  .main
    position absolute
    height 120px
    width 240px
    top 30px
    left 30px
    border-radius 7px
    box-shadow 0 0 5px #666
    background hsla(0,0%,100%,.3)
    overflow hidden
    z-index 100
    &:before
      content ''
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      background-image url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583310555581&di=17d19c3f990900846ab8cdba69d2aed8&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F30%2F48%2F16pic_3048628_b.jpg)
      filter blur(10px)
      z-index -1
      background-size cover
      margin -30px  // 防止边缘效果减弱

// 连字符断行
.break-line
  height: 180px
  width: 300px
  margin 40px auto
  border solid 1px #666
  hyphens auto

// 文本行的斑马条纹
.stripe
  height: 180px
  width: 300px
  margin 40px auto
  line-height 25px
  background-image linear-gradient(to bottom, #f222 50%, #fff 0)
  background-size auto 50px

// 调整tab宽度
.tab
  tab-size 4

// 连字
.ligature
	font-variant-ligatures: normal
// 下划线
.underline
	background: linear-gradient(to right, red, blue) no-repeat // 颜色
	background-size: 100% 1px // 下划线长度和宽度
	background-position: 0 15px // 下划线未知
	text-shadow: 1px 0 white, -1px 0 white // 设置g,y这种下划线不会穿过字母

// 凸版印刷效果
.print
	line-height 30px
	margin 10px
	background hsl(210, 13%, 40%)
	color hsl(210, 13%, 75%)
	text-shadow 0 -1px 1px black

// 空心字效果
.hollow
	line-height 30px
	margin 10px
	background: deeppink
	color: white
	text-shadow: 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black

// 文字外发光效果
.light
	line-height 30px
	margin 10px
	background: #203
	color: #ffc
	text-shadow: 0 0 2px, 0 0 3px

// 文字凸起效果
.bulge
	line-height 30px
	margin 10px
	background #58a
	color white
	text-shadow 0 1px hsl(0,0%,85%),0 2px hsl(0,0%,80%),0 3px hsl(0,0%,75%), 0 4px hsl(0,0%,70%),0 5px hsl(0,0%,65%),0 5px 10px black // 底部加一层阴影

.circular
	width 300px
	height 300px
	margin 3px auto 0
	path
		fill none
.circular svg
	display block
	overflow visible
</style>
