<template>
    <div class="login">
        <el-row class="content">
            <el-col>
                <span class="title">
                    欢迎登录
                </span>
                <el-row>
                    <el-input class="input" autofocus="autofocus" ref="input0" v-model="name" placeholder="账号" type="text" @keyup.enter.native="submit('input1')" @focus="isDisable=false"></el-input>
                    <el-input class="input" ref="input1" v-model="password" placeholder="密码" type="password" @keyup.enter.native="submit('last')" @focus="isDisable=false"></el-input>
                    <span class="register" @click="register">还没有注册？</span>
                    <el-button type="primary" class="btn" @click="loginTodo()" :disabled="isDisable">登录</el-button>
                </el-row>
            </el-col>        
        </el-row>
    </div>
</template>

<script>
import {adminLogin} from './../../api/aplist';
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      name: "",
      password: "",
      isDisable: false,
      flag: true
    };
  },
  methods: {
    submit(i) {
      if (i !== "last") {
        this.$refs[i].focus();
      } else {
        this.$refs['input1'].blur();
        this.loginTodo();
      }
    },
    register() {
      setTimeout(()=>{this.$router.push({ path: "/register" })},1500);
    },
    async loginTodo() {
      this.isDisable = true;
      if(!this.flag){
        return;
      }
      this.flag = false;
      let data = {
        name: this.name,
        password: this.password
      };
      if (data.name !== "" && data.password !== "") {
        if (data.password.length < 3) {
          this.notify("密码过短,请输入6~15位!");
          return;
        } else if (data.name.length > 15) {
          this.notify("密码过长,请输入6~15位!");
          return;
        } else {
          let postData = {
            name: this.name,
            password: this.$md5(this.password)
          };
          const result = await adminLogin(postData);
          if(!!result){
            if(result.data.code === 0){
              this.notify(result.data.message);
              return;
            }
            if(result.data.code === 1){
              this.notify(result.data.message);
              setTimeout(()=>{this.$router.push({path:'/management/home'})},2000)
            }
            if(result.data.code === 2){
              this.notify(result.data.message);
            }
          }
        }
      } else if (data.name == "") {
        this.notify("用户名不能为空!");
        return;
      } else if (data.password == "") {
        this.notify("密码不能为空!");
        return;
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
  },
  created(){
    if(!!Cookies.get('name')){
      
    }
  }
};
</script>
<style scoped>
.login{
    width: 100%;
    height: 100vh;
    background: url('./../../assets/adminlogin.jpg');
    background-size: 100% 100%; 
}
.content {
  padding: 16px;
  width: 360px;
  height: 280px;
  background: rgba(198, 242, 242, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.title {
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  color: #ffffff;
}
.input {
  margin: 10px 0;
}
.btn {
  width: 100%;
  margin-top: 10px;
}
.register {
  color: brown;
  text-decoration: underline;
  font-size: 12px;
  float: right;
  width: 80px;
  height: 25px;
  cursor: pointer;
}
</style>
