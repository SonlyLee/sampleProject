<template>
<div class="register">
    <el-row class="content">
        <el-col>
            <span class="title">
                注册
            </span>
            <el-row>
                <el-input class="input" v-model="name" autofocus="autofocus" placeholder="账号" type="text" ref="input0" @keyup.enter.native="submit('input1')" @focus="isDisable=false"></el-input>
                <el-input class="input" v-model="password" placeholder="密码" type="password" ref="input1" @keyup.enter.native="submit('input2')" @focus="isDisable=false"></el-input>
                <el-input class="input" v-model="confirmPassword" placeholder="确认密码" type="password" ref="input2" @keyup.enter.native="submit('last')" @focus="isDisable=false"></el-input>
                <el-button type="primary" class="btn" @click="register()" :disabled="isDisable">注册</el-button>
            </el-row>
        </el-col>        
    </el-row>
</div>
</template>

<script>
// import Cookies from "js-cookie";
import { adminRegister } from "./../../api/aplist";
export default {
  data() {
    return {
      name: "",
      password: "",
      confirmPassword: "",
      isDisable: false,
      flag: true
    };
  },
  methods: {
    submit(index) {
      if (index !== "last") {
        this.$refs[index].focus();
      } else {
        this.$refs["input2"].blur();
        this.register();
      }
    },
    async register() {
      this.isDisable = true;
      if (!this.flag) {
        return;
      }
      let data = {
        name: this.name,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      if (
        data.name !== "" &&
        data.password !== "" &&
        data.confirmPassword !== ""
      ) {
        if (data.name.length < 3) {
          this.notify("用户名过短,请输入6~15位!");
          return;
        }
        if (data.password.length < 5) {
          this.notify("密码过短,请输入6~15位!");
          return;
        }
        if (data.confirmPassword.length < 5) {
          this.notify("密码过短,请输入6~15位!");
          return;
        }
        if (data.password === data.confirmPassword) {
          let postData = {
            name: this.name,
            password: this.$md5(this.password)
          };
          const result = await adminRegister(postData);
          if (!!result) {
            if (result.data.code === 0) {
              this.notify("用户名已经存在，请重新输入！");
              return;
            }
            if (result.data.code === 1) {
              this.flag = false;
              this.notify("注册成功!");
              setTimeout(()=>{this.$router.push({ path: "/login" })}, 2000);
            }
          }
        } else {
          this.notify("两次输入密码不一致，请输入正确的密码!");
          return;
        }
      } else if (data.name == "") {
        this.notify("用户名不能为空!");
      } else if (data.password == "") {
        this.notify("密码不能为空!");
      } else if (data.confirmPassword == "") {
        this.notify("请输入确认密码!");
      } else {
      }
    },
    notify: function(message) {
      this.$notify({
        position: "bottom-left",
        message: message,
        duration: 1500
      });
    }
  }
};
</script>
<style scoped>
.register {
  width: 100%;
  height: 100vh;
  background: url("./../../assets/adminlogin.jpg");
  background-size: 100% 100%;
}
.content {
  padding: 16px;
  width: 360px;
  height: 300px;
  box-sizing: content-box;
  background: rgba(198, 242, 242, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.input {
  margin: 10px 0;
}
.title {
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  color: #ffffff;
}
.btn {
  width: 100%;
  margin-top: 10px;
}
</style>
