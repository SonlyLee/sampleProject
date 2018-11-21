<template>
    <header>
        <ul @click="selected">
            <li>首页</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Vue</li>
            <li>Node</li>
        </ul>
    </header>
</template>

<script>
export default {
  name: "heads",
  data() {
    return {
    };
  },
  methods: {
    selected(e){
      let value = e.target.innerText;
      if(value==='首页'){
        this.$router.push({path:'/article/home'});
      }
      if(value === 'HTML' || value === 'CSS' || value === 'JavaScript' || value === 'Vue' || value === 'Node'){
        console.log(value);
        this.$router.push({path:'/article/category',query:{name:value}})
      }
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  padding: 0px 20px;
}
ul {
  cursor: pointer;
  position: fixed;
  top: 50px;
  left: 50%;
  z-index: 15;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  font-family: "Times New Roman", Times, serif;
}
li {
  position: relative;
  height: 30px;
  font-size: 30px;
  line-height: 30px;
  font-weight: 800;
  float: left;
  margin-left: 15px;
}
li::before {
  content: "";
  position: absolute;
  top: 0;
  left: 100%;
  width: 0;
  height: 100%;
  border-bottom: 2px solid #ffffff;
  transition: 0.2s all linear;
}

li:hover::before {
  left: 0;
  width: 100%;
}
li:hover ~ li::before {
  left: 0;
}
</style>

