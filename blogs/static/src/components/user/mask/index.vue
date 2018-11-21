<template>
    <div>
        <div class="userInfo">
          <i class="el-icon-menu menu" @click="menuIcon"></i>
        </div>
        <div class="shade" v-show="show" @click="outLay"></div>
        <div class="contain" @click="containShow" v-show="show">
            <div class="left">
                <div class="user clear">
                  <div class="icon"><i class="el-icon-delete size"></i></div>
                  <div class="content">
                    <p class="info">用户信息</p>
                    <el-button class="button">查看</el-button>
                  </div>
                </div>
                <div class="user bottomCon">
                  <div class="icon"><i class="el-icon-delete size"></i></div>
                  <div class="content">
                    <p class="info">热门</p>
                    <el-button class="button">查看</el-button>
                  </div>
                </div>
            </div>
            <div class="right">
                <div class="user clear">
                  <div class="icon"><i class="el-icon-delete size"></i></div>
                  <div class="content">
                    <p class="info">推荐</p>
                    <el-button class="button">查看</el-button>
                  </div>
                </div>
                <div class="user bottomCon">
                  <div class="icon"><i class="el-icon-delete size"></i></div>
                  <div class="content">
                    <p class="info">发布日期</p>
                    <el-button class="button">查看</el-button>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'masks',
  data() {
    return {
      show: false
    };
  },
  methods: {
    menuIcon(e) {
      this.show = !this.show;
    },
    containShow(e) {
      this.show = true;
      e.stopPragation();
    },
    outLay() {
      this.show = !this.show;
    }
  }
};
</script>
<style lang="scss" scoped>
.shade {
  width: 100%;
  height: 100vh;
  background-color: #000;
  z-index: 99;
  opacity: 0.7;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.menu {
  position: fixed;
  top: 50px;
  left: 30px;
  font-size: 30px;
  z-index: 20;
}
.menu:hover {
  cursor: pointer;
}
.contain {
  width: 438px;
  height: 438px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -219px;
  margin-top: -219px;
  z-index: 100;
  .left,
  .right {
    width: 214px;
    float: left;
  }
  .right {
    position: absolute;
    left: 224px;
  }
  .user {
    width: 214px;
    height: 214px;
    text-align: center;
    line-height: 100px;
    margin-top: 10px;
    background: rgba($color: #000000, $alpha: 0.7);
    border: 0.5px solid rgba(220, 220, 220, 0.2);
    position: absolute;
    top: 0px;
  }
  .clear {
    margin-top: 0;
  }
  .icon {
    width: 100px;
    height: 100px;
    opacity: 1;
    transition: opacity 1.2s ease;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    .size{
      font-size: 50px;
      line-height: 100px;
    }
  }
  .user:hover .content {
    opacity: 1;
  }
  .user:hover .icon {
    opacity: 0;
  }
  .content {
    width: 214px;
    height: 214px;
    background: rgba(184, 36, 160, 0.5);
    font-size: 20px;
    opacity: 0;
    transition: opacity 1.2s ease;
    position: absolute;
    top: 0;
    .info {
      height: 14px;
      line-height: 14px;
      padding-top: 60px;
    }
    .button {
      height: 25px;
      width: 50px;
      padding: 1px 3px;
      font-size: 18px;
      border: 1px solid #b724a0;
      background: #b724a0;
      color: #ffffff;
      line-height: 26px;
      border-radius: 2px;
      box-sizing: content-box;
      position: absolute;
      top: 120px;
      left: 50%;
      margin-left: -30px;
    }
  }
  .bottomCon {
    position: absolute;
    top: 214px;
  }
}
</style>

