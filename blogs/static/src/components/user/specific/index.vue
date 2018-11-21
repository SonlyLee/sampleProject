<template>
    <div class="viewArticle">
        <div class="article_title">{{content.title}}</div>
        <p class="article_category">分类:{{content.category}}</p>
        <ul class="article_time_info">
            <li><i class="iconfont icon-yanjing"></i>阅读:{{content.views}}</li>
            <li><i class="iconfont icon-pinglun"></i>评论:{{commentsLength}}</li>
            <li><i class="iconfont icon-xinheart118"></i>点赞:{{content.giveLike}}</li>
            <li><i class="iconfont icon-shijian"></i>发布时间:{{time}}</li>
        </ul>
        <div class="main_article_content" v-html="H5content">
        </div>
        <el-button type="info" @click="addGive()" v-show="this.heartShow" class="heart">比心心</el-button>
        <el-button type="info" @click="addGive()" v-show="!this.heartShow" class="heart">谢谢!</el-button>
        <div class="article_comments">
            <p class="commit">评论:</p>
            <div class="inputComment">
                <p>您的评论：</p>
                <el-input class="input" type="textarea" :rows=2 maxlength="100" v-model="desc"></el-input>
                <el-button type="info" @click="submitComments()" class="btn">提交评论</el-button>
            </div>
            <ul v-if="this.comments.length !== 0">
                <li v-for="comment in comments">
                    <div class="author">
                        <div class="v-tooltip-container">
                            <div class="v-tooltip-content">
                                <a href="/" class="avatar">
                                   <img src="../../../assets/grass.jpg" alt="">
                                   
                                    <!-- <img src="C:\Users\sonlylee\AppData\Local\Temp\GTXlzhNSF26HCRqOxfgjBKSs.jpg" alt=""> -->
                                </a>
                            </div>
                        </div>
                        <div class="info">
                            <p href="/" class="name">{{comment.submitUserName}}</p>
                            <div class="meta"><span>{{comment.Date.split('T')[0]}}</span></div>
                        </div>
                    </div>
                    <div class="comment_wrap">
                        <p>{{comment.commentsContent}}</p>
                        <div class="tool-group">
                            <span @click="giveLikes" :comment-id="comment._id" v-show="comment.give"><i class="iconfont icon-xinheart118"></i>点赞 {{comment.giveLikes}}</span>
                            <span @click="giveLikes" :comment-id="comment._id" v-show="!comment.give"><i class="iconfont icon-xinheart118"></i>已点赞 {{comment.giveLikes}}</span>
                            <span @click="answerFn" :comment-id="comment._id" v-show="!comment.answer"><i class="iconfont icon-pinglun"></i>回复</span>
                            <span @click="answerFn" :comment-id="comment._id" v-show="comment.answer"><i class="iconfont icon-pinglun"></i>取消回复</span>
                        </div>
                        <transition name="slide-fade">
                            <div class="comment_answer" v-show="comment.answer">
                                <el-input class="input" type="textarea" :rows=2 maxlength="100" v-model="desc"></el-input>
                                <el-button class="btn" type="info">确认</el-button>
                            </div>
                        </transition>
                    </div>
                </li>
            </ul>
            <p v-else>还没有评论...</p>
        </div>
    </div>
</template>
<script>
import {
  userViewArticle,
  submitComment,
  giveLikes,
  addHeart
} from "./../../../api/aplist";
export default {
  data() {
    return {
      content: {},
      desc: "",
      comments: [],
      heartShow: true
    };
  },
  computed: {
    commentsLength() {
      if (this.content.comments) {
        return this.content.comments.length;
      }
    },
    time() {
      if (this.content.time) {
        return this.content.time.split("T")[0];
      }
    },
    H5content() {
      return this.$marked(this.content.content);
    }
  },
  methods: {
    //文章点赞
    async addGive() {
      if (this.heartShow) {
        this.content.giveLike += 1;
      } else {
        this.content.giveLike -= 1;
      }
      this.heartShow = !this.heartShow;
      //后台更新数据
      try {
        let data = { _id: this.$route.query.id, bool: this.heartShow };
        const result = await addHeart(data);
        if (result.data.code === 1) {
          this.$notify({
            message: "点赞成功",
            duration: 1500
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //查看文章
    async viewArticle(data) {
      const result = await userViewArticle(data);
      if (result.data.code === 1) {
        this.content = result.data.content;
        this.comments = result.data.content.comments.reverse();
      }
    },
    //提交评论
    async submitComments() {
      let data = {
        _id: this.$route.query.id,
        comments: this.desc
      };
      const result = await submitComment(data);
      if (result.data.code === 1) {
        this.comments = result.data.comments.reverse();
        this.$notify({
          message: "评论成功",
          duration: 1500
        });
        this.desc = "";
      }
      if (result.data.code === 0) {
        this.$notify({
          message: "评论失败",
          duration: 1500
        });
      }
    },
    //某一评论点赞
    async GiveLikes(data) {
      const result = await giveLikes(data);
      if (result.data.code === 1) {
        this.$notify({
          message: "点赞成功",
          duration: 1500
        });
      }
    },
    giveLikes(e) {
      this.comments.forEach(element => {
        if (element._id === e.target.getAttribute("comment-id")) {
          if (element.give) {
            element.giveLikes += 1;
          } else {
            element.giveLikes -= 1;
          }
          element.give = !element.give;
          let data = {
            give: element.give,
            _id: this.$route.query.id,
            commentId: element._id
          };
          this.GiveLikes(data);
        }
      });
    },
    //回复
    answerFn(e) {
      this.comments.forEach(element => {
        if (element._id === e.target.getAttribute("comment-id")) {
          element.answer = !element.answer;
        }
      });
    }
  },
  created() {
    let postData = { _id: this.$route.query.id };
    this.viewArticle(postData);
  }
};
</script>
<style lang="scss" scoped>
.viewArticle {
  width: 70%;
  margin: 10px auto;
  color: #333;
  padding: 10px;
  font-size: 30px;
  background: #fff;
  overflow-y: scroll;
  height: calc(100vh - 140px);
  .article_title {
    margin: 0 auto;
    font-size: 1em;
    font-weight: 700;
  }
  .article_category {
    margin-top: 10px;
    font-size: 0.5em;
    color: #491;
  }
  .article_time_info {
    display: flex;
    margin: 10px 0;
    padding: 0 10px 5px;
    justify-content: space-between;
    border-bottom: 0.5px dashed #000000;
    li {
      float: left;
      height: 13px;
      line-height: 13px;
      font-size: 0.2em;
      color: #969696;
    }
  }
  .main_article_content {
    margin: 10px 0 20px;
    font-size: 0.5em;
    color: #2f2f2f;
    font-weight: 400;
  }
  .heart {
    background: rebeccapurple;
    border-radius: 10px;
  }
  .article_comments {
    width: 100%;
    color: #2f2f2f;
    font-size: 0.7em;
    margin-top: 20px;
    .commit {
      color: #333;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .inputComment {
      font-size: 14px;
      padding: 10px 0;
      border-bottom: 0.5px solid #cccccc;
      p {
        font-size: 1.2em;
        font-weight: 500;
        margin-bottom: 5px;
      }
      .input {
        margin: 5px 0;
        font-size: 1em;
        color: #000000;
      }
      .btn {
        background: rebeccapurple;
      }
    }
    ul {
      list-style: none;
      li {
        border-bottom: 0.8px solid #f0f0f0;
        padding: 10px 0 16px 0;
        .author {
          margin-bottom: 10px;
          .v-tooltip-container {
            position: relative;
            display: inline-block;
            .v-tooltip-content {
              display: inline-block;
              user-select: none;
              .avatar {
                margin-right: 5px;
                width: 28px;
                height: 28px;
                vertical-align: middle;
                display: inline-block;
                img {
                  width: 100%;
                  height: 100%;
                  border: 1px solid #ddd;
                  border-radius: 50%;
                }
              }
            }
          }
          .info {
            display: inline-block;
            vertical-align: middle;
            .name {
              font-size: 0.7em;
              color: #333;
              cursor: pointer;
            }
            .meta {
              font-size: 0.5em;
              color: #969696;
              span {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
    .comment_wrap {
      p {
        margin: 5px 0;
        line-height: 1.5;
        font-size: 0.7em;
        word-break: break-word !important;
        word-break: break-all;
      }
      .tool-group {
        margin-right: 10px;
        font-size: 0.7em;
        color: #969696;
        span {
          cursor: pointer;
          margin-right: 5px;
        }
        span:hover {
          color: #000000;
        }
      }
      .slide-fade-enter-active {
        transition: all 0.3s ease;
      }
      .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
      }
      .slide-fade-enter,
      .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
      }
      .comment_answer{
          padding: 5px 0;
          .input{
              margin: 5px 0;
          }
          .btn{
              background: rebeccapurple;
          }
      }
    }
  }
}
</style>
