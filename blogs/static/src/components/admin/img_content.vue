<template>
    <div class="img_content">
      <div class="maskDiv" :data="content._id" @click="awardId"></div>
                <img :src='content.url' alt="">
                <div class="right_content">
                    <div class="title">{{content.title}}</div>
                    <ul class="time_eye">
                        <li><i class="el-icon-document"></i>分类:{{content.category}}</li>
                        <li><i class="iconfont icon-yanjing"></i>阅读:{{content.views}}</li>
                        <li><i class="iconfont icon-pinglun"></i>评论:{{commitlength}}</li>
                        <li><i class="iconfont icon-xinheart118"></i>点赞:{{content.giveLike}}</li>
                        <li><i class="iconfont icon-shijian"></i>发布时间:{{time}}</li>
                    </ul>
                    <div class="main_content" v-html="H5content">
                    </div>
                </div>
            </div>
</template>
<script>

export default {
  props: ["content"],
  data() {
    return {};
  },
  mounted() {
   
  },
  methods: {
    awardId(event) {
      // console.log(event.target.getAttribute('data'));
      this.$router.push({
        path: "/management/view",
        query: { id: event.target.getAttribute("data") }
      });
    }
  },
  computed: {
    time() {
      if (!this.content.time) return "";
      return this.content.time.split("T")[0];
    },
    commitlength() {
      return this.content.comments.length;
    },
    H5content() {
      return this.$marked(this.content.content);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-icon-document:before {
  color: orange;
}
.img_content {
  position: relative;
  cursor: pointer;
  width: 80%;
  height: 230px;
  margin: 0 auto;
  margin-top: 2px;
  border-bottom: 0.2px solid #000;
  box-shadow: 0 2px 3px #000000;
  padding: 0px 1%;
  box-sizing: border-box;
  .maskDiv {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
  }
  img {
    width: 32%;
    height: 220px;
    margin-top: 5px;
  }
  .right_content {
    width: 67%;
    height: 220px;
    padding-top: 10px;
    color: #000;
    font-size: 14px;
    overflow: hidden;
    float: right;
    .title {
      font-size: 1.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 700;
    }
    .time_eye {
      margin: 5px 0;
      padding-bottom: 3px;
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
    .main_content {
      width: 100%;
      max-height: 146px;
      text-indent: 16px;
      font-size: 14px;
      line-height: 21px;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
    }
  }
}
</style>

