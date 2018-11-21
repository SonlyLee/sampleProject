<template>
    <div class="container">
        <masks/>
        <headerIndex/>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import headerIndex from "./head/index";
import masks from "./mask/index";
export default {
  name: "indexContainer",
  components: {
    headerIndex: headerIndex,
    masks: masks
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: url("./../../assets/starry_sky.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
.main {
  width: 100%;
  position: absolute;
  top: 100px;
  left: 0;
}
</style>

