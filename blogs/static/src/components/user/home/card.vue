<template>
    <div class="box-card">
        <div class="mask" @click="award" :data-id="content._id"></div>
        <img :src='content.url' alt="">
        <span class="category">分类:{{content.category}}</span>
        <ul class="time_eye">
            <li><i class="iconfont icon-yanjing"></i>阅读:{{content.views}}</li>
            <li><i class="iconfont icon-xinheart118"></i>点赞:{{content.giveLike}}</li>
            <li><i class="iconfont icon-shijian"></i>发布时间:{{time}}</li>
        </ul>
        <p class="title">{{content.title}}</p>
        <div class="container" v-html="H5content">
        </div>
     </div>
</template>
<script>
export default {
  name: "card",
  props: ["content"],
  computed: {
    time() {
      return this.content.time.split("T")[0];
    },
    H5content() {
      return this.$marked(this.content.content);
    }
  },
  methods:{
    award(e){
      this.$router.push({path:'/article/view',query:{id:e.target.getAttribute('data-id')}})
    }
  },
  created() {
    console.log(this.content.url)
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  width: 32%;
  height: 280px;
  float: left;
  background: #eeeeee;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 10px;
  color: #333;
  cursor: pointer;
  position: relative;
}
.mask{
  width: 100%;
  height: 280px;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
}
img {
  width: 92%;
  height: 160px;
  padding-left: 4%;
  margin-top: 5px;
}
.category {
  margin-top: 10px;
  margin-left: 4%;
  font-size: 12px;
  color: #777777;
}
.time_eye {
  padding: 5px 0 2px;
  width: 92%;
  margin-left: 4%;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px dashed #000000;
  li {
    float: left;
    height: 15px;
    line-height: 15px;
    color: #777777;
  }
}
.title {
  width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 4%;
  font-size: 16px;
  font-weight: 700;
}
.container {
  width: 92%;
  margin-top: 3px;
  margin-left: 4%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
}
</style>
