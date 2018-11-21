<template>
    <div>
      <div v-for="(content,index) in contents"> 
          <imgContent v-if="index%2===0" :key="index" :content="content"/>
          <contentImg v-else :key="index" :content="content"/>
      </div>
      <div class="pagination" v-if="show===true"> 
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next"
          :page-size="10"
          :total="total">
        </el-pagination>
      </div>
      <div class="pagination" v-else>还没有相关文章...</div>
    </div>
</template>
<script>
import img_content from "./img_content";
import content_img from "./content_img";
export default {
  props:['contents','total','homefun','show'],
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    handleCurrentChange(val){
      this.currentPage = val;
      sessionStorage.setItem('page',this.currentPage);
      let data = {page:this.currentPage}
      this.homefun(data);
    }
  },
  components: {
    imgContent: img_content,
    contentImg: content_img
  }
};
</script>
<style lang="scss">
.pagination {
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
}
.el-pager li {
  font-size: 14px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  min-width: 30px;
}
.el-pagination button {
  height: 30px;
  line-height: 30px;
}
</style>

