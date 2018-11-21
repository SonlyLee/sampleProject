<template>
    <div class="main">
        <div class="header">
          <p class="logo">
            LI<span>N</span>K
          </p>
          <div class="menu">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c74"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1" @click="home">所有的文章</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">文章类别</template>
                    <el-menu-item index="2-1">HTML</el-menu-item>
                    <el-menu-item index="2-2">CSS</el-menu-item>
                    <el-menu-item index="2-3">JavaScript</el-menu-item>
                    <el-menu-item index="2-4">Vue</el-menu-item>
                    <el-menu-item index="2-5">Node</el-menu-item>
                </el-submenu>
                <el-menu-item index="3" @click="date">日期排序</el-menu-item>
                <el-menu-item index="4" @click="publish">发表文章</el-menu-item>
            </el-menu>
          </div>
            <div class="head_portrait" @click="userInfo">
                <img src="./../../assets/pig1.jpg" alt="">
                <p>{{username}}</p>
            </div>
            <div class="personalInfo" v-show="personal">
            </div>
        </div>
        <div class="container">
             <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      activeIndex: "1",
      username: Cookies.get("name"),
      personal: false
    };
  },
  methods: {
    handleSelect(key) {
      let keys = key.slice(0, 1);
      sessionStorage.setItem("activeIndex", keys);
      if (key.slice(0, 1) === "2") {
        if (key === "2-1") {
          this.$router.push({
            path: "/management/category",
            query: { mark: "html" }
          });
          return;
        }
        if (key === "2-2") {
          this.$router.push({
            path: "/management/category",
            query: { mark: "css" }
          });
          return;
        }
        if (key === "2-3") {
          this.$router.push({
            path: "/management/category",
            query: { mark: "javascript" }
          });
          return;
        }
        if (key === "2-4") {
          this.$router.push({
            path: "/management/category",
            query: { mark: "vue" }
          });
          return;
        }
        if (key === "2-5") {
          this.$router.push({
            path: "/management/category",
            query: { mark: "node" }
          });
          return;
        }
      }
    },
    userInfo() {
      this.personal = !this.personal;
    },
    home() {
      this.$router.push({ path: "/management/home" });
    },
    publish() {
      this.$router.push({ path: "/management/publish" });
    },
    date() {
      this.$router.push({ path: "/management/date" });
    },
    changeRouter() {
      let router = window.location.href.split("/")[4];
      if (!router.indexOf("home")) {
        this.activeIndex = "1";
        sessionStorage.setItem("activeIndex", 1);
        return;
      }
      if (!router.indexOf("category")) {
        this.activeIndex = "2";
        sessionStorage.setItem("activeIndex", 2);
        return;
      }
      if (!router.indexOf("date")) {
        this.activeIndex = "3";
        sessionStorage.setItem("activeIndex", 3);
        return;
      }
      if (!router.indexOf("publish")) {
        this.activeIndex = "4";
        sessionStorage.setItem("activeIndex", 4);
        return;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.changeRouter();
    }
  },
  created() {
    if (!Cookies.get("name")) {
      this.$router.push("/login");
      return;
    }
    if (!sessionStorage.getItem("activeIndex")) {
      this.changeRouter();
      // this.activeIndex = "1";
    } else {
      this.activeIndex = sessionStorage.getItem("activeIndex");
    }
  }
};
</script>
<style lang="scss">
.main {
  width: 100%;
  height: 100vh;
  background: url('../../assets/bk1.jpg');
  background-size: 100% 100vh;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
}
.header {
  width: 74%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 13%;
  z-index: 999;
  box-sizing: border-box;
  background-color: #545C74; 
}
.logo{
  width: 8%;
  height: 80px;
  color: #ffffff;
  background: rgb(84, 92, 116);
  position: fixed;
  top: 0;
  left: 13%;
  font-size: 30px;
  font-weight: 900;
  text-align: center;
  line-height: 75px;
  span{
    color: red;
  }
}
.menu{
  margin-left: 11%;
}
.el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu .el-submenu__title{
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  color: #000;
  font-weight: 700;
}
.container {
  width: 74%;
  margin: 0 auto;
  margin-top: 81px;
  padding-bottom: 60px;
  padding-top: 10px;
  background: #fff;
  height: calc(100% - 80px);
  overflow: scroll;
  // border-left: 0.5px solid #545C74;
  // border-right: 0.5px solid #545C74;
  // box-sizing: border-box;
}
.el-menu {
  width: 92%;
}
.head_portrait {
  width: 6%;
  height: 80px;
  position: fixed;
  top: 0;
  right: 13%;
  background: #545C74;
  img {
    width: 45px;
    height: 45px;
    margin-top: 8px;
    margin-left: 30%;
    border-radius: 50%;
  }
  p {
    font-size: 16px;
    color: #ffffff;
    height: 16px;
    line-height: 16px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.personalInfo {
  width: 100px;
  height: 150px;
  background: rebeccapurple;
  position: fixed;
  right: 13%;
  top: 80px;
}
</style>

