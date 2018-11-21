<template>
    <div class="viewArticle" v-loading="loading">
        <div class="article_title">{{content.title}}</div>
        <p class="article_category">分类:{{content.category}}</p>
        <ul class="article_time_info">
            <li><i class="iconfont icon-yanjing"></i>阅读:{{content.views}}</li>
            <li><i class="iconfont icon-pinglun"></i>评论:{{commentsLength}}</li>
            <li><i class="iconfont icon-xinheart118"></i>点赞:{{content.giveLike}}</li>
            <li><i class="iconfont icon-shijian"></i>发布时间:{{time}}</li>
        </ul>
        <div class="main_article_content">
            {{content.content}}
        </div>
        <div v-show="true">
          <el-button type="primary" icon="el-icon-edit" @click="edit">编辑文章</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="delet()">删除文章</el-button>
        </div>
        <div class="article_comments">
            <p class="commit">评论:</p>
            <ul>
                <li>
                    <div class="author">
                        <div class="v-tooltip-container">
                            <div class="v-tooltip-content">
                                <a href="/" class="avatar">
                                   <img src="../../assets/grass.jpg" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="info">
                            <p href="/" class="name">匿名</p>
                            <div class="meta"><span>2018.10.28</span></div>
                        </div>
                    </div>
                    <div class="comment_wrap">
                        <p>想了这么久，忘了这回事了😂</p>
                        <div class="tool-group">
                            <span><i class="iconfont icon-xinheart118"></i>点赞</span>
                            <span><i class="iconfont icon-pinglun"></i>回复</span>
                        </div>
                    </div>
                    <div class="sub-comment-list">
                        <div class="sub-comment">
                            <div class="anwser">
                                <div class="v-tooltip-container">
                                    <span>初晴微雨1314</span>：
                                    <span>@前世w无甚可恋</span>
                                    可能是我写的太那啥，大家没有把注意力放在帝君赶凤九回青丘。可能是我写的太那啥，大家没有把注意力放在帝君赶凤九回青丘可能是我写的太那啥，大家没有把注意力放在帝君赶凤九回青丘
                                </div>
                            </div>
                            <div class="sub-tool-group">
                                <span>2018.08.12 23:18</span>
                                <span><i class="iconfont icon-pinglun"></i>回复</span>
                            </div>
                        </div>
                        <div class="sub-comment more-comment">
                            <span>添加新的评论</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { viewArticle, deleteArticle } from "./../../api/aplist";
export default {
  data() {
    return {
      content: {},
      loading: false
    };
  },
  computed: {
    commentsLength() {
      // console.log(this.content.comments)
      if (this.content.comments) {
        return this.content.comments.length;
      }
    },
    time() {
      if (this.content.time) {
        return this.content.time.split("T")[0];
      }
    }
  },
  methods: {
    // 编辑文章
    edit() {
      this.$router.push({
        path: "/management/publish",
        query: { id: this.$route.query.id }
      });
    },
    //删除文章
    async delet() {
      let postData = { _id: this.$route.query.id };
      const res = await deleteArticle(postData);
      if (res.data.code === 1) {
        (this.loading = true),
          setTimeout(() => {
            this.loading = false;
            this.$notify.success({
              message: "删除成功...",
              duration: 1000
            });
            this.$router.go(-1);
          }, 2000);
      }
    },
    async viewArticle(data) {
      const result = await viewArticle(data);
      if (result.data.code === 1) {
        this.content = result.data.content;
      }
    }
  },
  created() {
    // console.log(this.$route.query.id);
    let postData = { _id: this.$route.query.id };
    this.viewArticle(postData);
  }
};
</script>
<style lang="scss" scoped>
.viewArticle {
  width: 60%;
  margin: 0 auto;
  color: #333;
  padding-top: 10px;
  font-size: 30px;
  .article_title {
    margin: 0 auto;
    font-size: 1em;
    font-weight: 700;
  }
  .article_category {
    margin-top: 10px;
    font-size: 0.5em;
  }
  .article_time_info {
    display: flex;
    margin: 10px 0;
    padding-bottom: 5px;
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
        }
        .sub-comment-list {
          margin-top: 5px;
          padding: 5px 0 5px 10px;
          border-left: 2px solid #d9d9d9;
          .sub-comment {
            margin-bottom: 5px;
            padding-bottom: 5px;
            border-bottom: 1px dashed #f0f0f0;
            .anwser {
              margin: 0 0 2px;
              .v-tooltip-container {
                position: relative;
                display: inline-block;
                font-size: 0.6em;
                span {
                  color: #3194d0;
                  font-size: 1em;
                }
              }
            }
            .sub-tool-group {
              font-size: 0.6em;
              color: #969696;
              span {
                margin-right: 3px;
                display: inline-block;
              }
            }
          }
          .sub-comment:last-child {
            margin: 0;
            padding: 0;
            border: none;
          }
          .more-comment span {
            font-size: 0.6em;
            color: #969696;
          }
          .more-comment span:hover {
            color: #000000;
            cursor: pointer;
          }
        }
      }
      li:first-child {
        border-top: 0.8px solid #f0f0f0;
      }
      li:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
