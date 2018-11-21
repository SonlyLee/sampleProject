<template>
    <div class="category">
        <div class="main">
            <div v-for="item in contents">
                <itemCon :item="item"/>
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
    </div>
</template>
<script>
import { category } from "./../../../api/aplist";
import itemCon from "./itemCon";
export default {
  data() {
    return {
      currentPage: 1,
      show: true,
      total: 0,
      contents: []
    };
  },
  methods: {
    async categoryFn(data) {
      const result = await category(data);
      console.log(result);
      if (result.data.code === 0) {
        this.contents = result.data.contents;
        this.total = result.data.count;
        this.show = true;
      }
      if (result.data.code === 1) {
        this.contents = [];
        this.total = 0;
        this.show = false;
      }
      if (result.data.code === 2) {
        this.$notify({
          position: "bottom-left",
          message: result.data.message,
          duration: 1500
        });
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let data = { page: this.currentPage, category: this.$route.query.name };
      this.categoryFn(data);
    }
  },
  components: {
    itemCon: itemCon
  },
  watch: {
    $route(to, from) {
      this.categoryFn({ category: this.$route.query.name });
    }
  },
  created() {
    let data = { category: this.$route.query.name };
    this.categoryFn(data);
  }
};
</script>
<style lang="scss" scoped>
.category {
  width: 100%;
  height: calc(100vh - 205px);
  height: 100vh;
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 1;
  overflow-y: scroll;
}
.main {
  width: 100%;
  height: calc(100vh - 120px);
  margin-top: 120px;
}
.pagination {
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
}
</style>
