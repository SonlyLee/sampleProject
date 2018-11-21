<template>
    <div>
        <common :contents="contents" :total="total" :homefun="categoryfn" :show="show"/>
    </div>
</template>
<script>
import common from "./common";
import { categoryArticle } from "./../../api/aplist";
export default {
  data() {
    return {
      contents: [],
      total: 0,
      show: true
    };
  },
  methods: {
    async categoryfn() {
      try {
        let data = {};
        switch (this.$route.query.mark) {
          case "html":
            data = { category: this.$route.query.mark.toUpperCase() };
            break;
          case "css":
            data = { category: this.$route.query.mark.toUpperCase() };
            break;
          case "javascript":
            data = { category: "JavaScript" };
            break;
          case "vue":
            data = { category: "Vue" };
            break;
          case "node":
            data = { category: "Node" };
            break;
        }
        const result = await categoryArticle(data);
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
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    $route(to, from) {
      this.categoryfn();
    }
  },
  created() {
    if (!!sessionStorage.getItem("page")) {
      sessionStorage.setItem("page", 1);
    }
    this.categoryfn();
  },
  components: {
    common: common
  }
};
</script>
<style scoped>
</style>

