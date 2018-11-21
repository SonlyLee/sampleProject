<template>
    <div class="publish">
        <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="文章标题">
                <el-input v-model="form.title" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="文章类别">
                <el-select v-model="form.region" placeholder="请选择文章类别">
                <el-option label="HTML" value="HTML"></el-option>
                <el-option label="CSS" value="CSS"></el-option>
                <el-option label="JavaScript" value="JavaScript"></el-option>
                <el-option label="Vue" value="Vue"></el-option>
                <el-option label="Node" value="Node"></el-option>
                </el-select>
            </el-form-item>
            <el-upload
              class="upload-demo"
              action="http://localhost:8080/api/article/photo"
              :on-success="handleSuccess"
              :limit="1"
              name="ShowPhoto"
              >
              <el-button size="small" type="primary">点击上传主题图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <mavon-editor
                class="md"
              v-model="val"
              :editable="true"
            ></mavon-editor>
            <el-form-item>
                <el-button v-show="!showBtn" type="primary" @click="onSubmit()">立即创建</el-button>
                <el-button v-show="showBtn" type="primary" @click="onEdit()">确认编辑</el-button>
                <el-button @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import {
  publishArticle,
  editArticle,
  publishEditArticle
} from "./../../api/aplist";
export default {
  data() {
    return {
      val: "",
      form: {
        title: "",
        region: ""
      },
      flag: true,
      showBtn: false,
      Img:''
    };
  },
  methods: {
    handleSuccess(response) {
      console.log(response.filepath);
      this.Img = 'http://localhost:8000/'+response.filepath.slice(27);
    },
    common() {
      if (!this.flag) {
        return;
      }
      if (!Cookies.get("name")) {
        this.$notify({
          message: "请登录！",
          duration: 1500
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
        return;
      }
    },
    async onSubmit() {
      this.common();
      if (
        this.form.title !== "" &&
        this.form.region !== "" &&
        this.val !== ""
      ) {
        let data = {
          title: this.form.title,
          author: Cookies.get("name"),
          category: this.form.region,
          content: this.val,
          url: this.Img
        };
        this.flag = false;
        const result = await publishArticle(data);
        if (result.data.code === 0) {
          this.$notify({
            message: "标题重复，请输入合适的标题!",
            duration: 1500
          });
        }
        if (result.data.code === 1) {
          this.$notify({
            message: "保存成功",
            duration: 1500
          });
          setTimeout(() => {
            this.cancle();
          }, 3000);
        }
      } else {
        this.$notify({
          message: "请补充完所有信息",
          duration: 1500
        });
      }
    },
    async onEdit() {
      this.common();
      if (
        this.form.title !== "" &&
        this.form.region !== "" &&
        this.val !== ""
      ) {
        let data = {
          _id: this.$route.query.id,
          title: this.form.title,
          author: Cookies.get("name"),
          category: this.form.region,
          content: this.val,
        };
        this.flag = false;
        const result = await publishEditArticle(data);
        if (result.data.code === 1) {
          this.$notify({
            message: "保存成功",
            duration: 1500
          });
          setTimeout(() => {
            this.cancle();
            this.$router.go(-1);
          }, 3000);
        }
      } else {
        this.$notify({
          message: "请补充完所有信息",
          duration: 1500
        });
      }
    },
    cancle() {
      this.form.title = "";
      this.form.region = "";
      this.val = "";
      this.flag = true;
    },
    async editArticle(data) {
      try {
        const res = await editArticle(data);
        if (res.data.code === 1) {
          this.form.title = res.data.content.title;
          this.form.region = res.data.content.category;
          this.val = res.data.content.content;
        }
        if (res.data.code === 0) {
          this.$notify({
            message: "查找失败",
            duration: 1500
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    if (!!this.$route.query.id) {
      this.showBtn = true;
      let data = { _id: this.$route.query.id };
      this.editArticle(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.publish {
  padding-top: 30px;
  width: 80%;
  margin: 0 auto;
}
.el-form-item__label {
  font-size: 14px;
  // text-align: left;
  padding: 0;
}
.el-input__inner {
  font-size: 14px;
  height: 25px;
}
.el-select-dropdown__item {
  font-size: 14px;
}
.el-button {
  font-size: 14px;
  padding: 8px 10px;
}
.el-button--primary,
.el-button--primary:hover,
.el-button--primary:active,
.el-button--primary:focus {
  background-color: #ffd04b;
  color: #ffffff;
  border-color: #ffd04b;
}
.el-textarea__inner:focus,
.el-input__inner:focus,
.el-select .el-input.is-focus .el-input__inner {
  border-color: #ffd04b;
}
.v-note-wrapper {
  z-index: 2 !important;
  margin-bottom: 22px;
  font-size: 0.5em !important;
  height: 550px;
}
.upload-demo{
  margin: 30px 0;
}
</style>
