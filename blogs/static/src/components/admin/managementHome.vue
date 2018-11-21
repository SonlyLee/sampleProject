<template>
    <div>
       <common :contents="contents" :total="total" :homefun="homefun" :show="show"/>
    </div>
</template>
<script>
import common from "./common";
import { allArticle } from "./../../api/aplist";
export default {
  data() {
    return {
      contents: [],
      total: 0,
      show: true
    };
  },
  methods: {
    async homefun(data) {
      try {
        const result = await allArticle(data);
        if(result.data.code === 0){
          this.contents = result.data.contents;
          this.total = Math.ceil(result.data.count);
          this.show = true;
        }else{
          this.contents = [];
          this.total = 0;
          this.show = false
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    if (!!sessionStorage.getItem("page")) {
      sessionStorage.setItem("page", 1);
    }
    this.homefun("");
  },
  components: {
    common: common
  }
};
</script>
<style lang="scss">
</style>

