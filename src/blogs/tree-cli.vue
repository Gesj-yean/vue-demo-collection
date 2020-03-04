<template>
   <div>
       <div class="title">tree-cli使用记录</div>
       <p class="desc">由于写README.md时需要用到展示目录树的功能，在搜索了一番后发现tree-cli这个插件符合要求，
           够美观了。遂决定使用它~
       </p>
       <p class="desc">但是在使用过程中，按照github上的使用说明或者npm上的使用方法都
           <span class="highlight">不能忽略node_modules文件夹。</span></p>
       <p class="desc">最终尝试了多种格式后，终于成功~效果如下~</p>
       <img src="../common/images/tree-cli.png" class="img-wrapper">
       <div class="small-title">安装</div>
       <div class="desc">我安装的版本是0.6.4。</div>
       <pre class="code" v-highlightjs><code class="html">npm i tree-cli</code></pre>
        <div class="small-title">选项</div>
        <div class="desc">
            1. 在options中看到的命令说明如下（仅列举常用）：
            <ul class="desc-ul">
                <li>--help: outputs a verbose usage listing.</li>
                <li>--version: outputs the version of tree-cli.</li>
                <li>--ignore: ignores directory or file you specify -
                    <span class="highlight">arrays as comma-delimited strings: 'node_modules/, .git/, .gitignore'</span></li>
                <li>-l: max display depth of the directory tree.</li>
                <li>-o: send output to filename.</li>
            </ul>
        </div>
        <div class="desc">
            2. 使用命令treee --help看到的说明如下（仅列举常用）：
            <ul class="desc-ul">
                <li>--help, -h: outputs a verbose usage listing.</li>
                <li>--version: outputs the version of tree-cli.</li>
                <li>--ignore: ignores directory or file you specify.</li>
                <li>-l: max display depth of the directory tree.</li>
                <li>-o: send output to filename.</li>
            </ul>
            并示例：
             <pre class="code" v-highlightjs><code class="html">tree -l 2, -o out.txt --ignore [node_modules, test] -d --noreport</code></pre>
        </div>
        <div class="small-title">踩坑</div>
        <div class="desc">尝试以上两种方法，都无法成功的忽略node_modules文件夹。</div>
        <div class="desc">遂搜索。。。又发现了tree -I “node_modules”，尝试后依然失败。</div>
        <div class="desc">最后使用了三种结合的方法，终于成功。<span class="highlight">要用双引号才行~</span></div>
        <pre class="code" v-highlightjs><code class="html">tree -l 2, -o out.txt --ignore "node_modules/"</code></pre>
        <div class="desc">注：在Windows下应该用treee代替tree。</div>
   </div>
</template>

<script type='text/ecmascript-6'>
export default {}
</script>

<style lang="stylus">
.img-wrapper
    width 100%
    height 580px
</style>
