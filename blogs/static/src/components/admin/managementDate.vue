<template>
    <div class="hello">
        <ul v-show="show" class="line-container">
            <li v-for="(list,index) in lists" class="line-item">
                <div class="item-tag">{{list.year}}年</div>
                <div class="item-symbol">
                    <div class="item-circle"></div>
                </div>
                <ul> 
                    <li v-for="(every,index) in list.contents" class="month_day">
                        <div class="month_tag">{{every.date}}</div>
                        <div class="month_symbol">
                           <div class="month_circle"></div>
                        </div>
                        <div v-for="(item,index) in every.container">
                            <div class="maincon">
                                <div class="mask" @click.stop="views" :data="item._id"></div>
                                <div class="main_title">{{item.title}}</div>
                                <div class="main_con">分类:{{item.category}}</div>
                                <div class="main_content">{{item.content}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        
	</div>
</template>
<script>
import { dateArticle } from "./../../api/aplist";
export default {
  name: "hello",
  data() {
    return {
      show: false,
      lists: []
    };
  },
  methods: {
    views(event) {
      // console.log(e.target.getAttribute("data"));
      this.$router.push({'path':'/management/view',query:{id:event.target.getAttribute('data')}})
    },
    searchData(dataItems, year) {
      let flag = false;
      for (var i = 0; i < dataItems.length; i++) {
        if (dataItems[i].year == year) {
          flag = true;
          break;
        }
      }
      if (flag) {
        return true;
      } else {
        return false;
      }
    },
    async dateContent() {
      const result = await dateArticle();
      let dataItems = []; //定义一个数组
      if (result.data.code === 0) {
        if (result.data.content.length !== 0) {
          this.show = true;
          result.data.content.forEach((element, index) => {
            let month_day =
              element.time.split("T")[0].split("-")[1] +
              "月" +
              element.time.split("T")[0].split("-")[2] +
              "日";

            let year = element.time.split("-")[0];
            let searchResult = this.searchData(dataItems, year); //查找是否含有该年
            if (searchResult) {
              //有该年份
              dataItems.forEach(item => {
                if (item.year == year) {
                  let hasSome = false;
                  for (let i = 0; i < item.contents.length; i++) {
                    if (item.contents[i].date === month_day) {
                      hasSome = true;
                      break;
                    }
                  }
                  if (hasSome) {
                    for (let i = 0; i < item.contents.length; i++) {
                      if (item.contents[i].date === month_day) {
                        item.contents[i].container.push(element);
                        break;
                      }
                    }
                  } else {
                    let monthObjectSecond = {};
                    monthObjectSecond.date = month_day;
                    monthObjectSecond.container = [];
                    monthObjectSecond.container.push(element);
                    item.contents.push(monthObjectSecond);
                  }
                }
              });
            } else {
              //没有该年份
              let Object = {};
              Object.year = year;
              Object.contents = [];
              let monthObject = {};
              monthObject.date = month_day;
              monthObject.container = [];
              monthObject.container.push(element);
              Object.contents.push(monthObject);
              dataItems.push(Object);
            }
          });
          this.lists = dataItems;
          console.log(this.lists);
        }
      }
    }
  },
  created() {
    this.dateContent();
  }
};
</script>
<style lang="scss" scoped>
.line-container {
  color: #606c76;
  font-size: 16px;
  font-family: "Helvetica Neue For Number", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  position: relative;
  list-style: none;
  margin: 8px;
  width: 80%;
  padding-left: 200px;
}
.line-container .line-item {
  padding: 16px;
  position: relative;
}
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
.line-container .item-tag {
  position: absolute;
  left: -120px;
  width: 100px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #000;
  font-size: 20px;
  font-weight: 800;
}
.line-container .item-symbol {
  box-sizing: border-box;
  position: absolute;
  left: -16px;
  z-index: 1;
  background: white;
}
.line-container .item-circle {
  box-sizing: border-box;
  position: absolute;
  margin-left: -9px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: white;
  border: 2px solid #323f67;
}
.line-container::after {
  position: absolute;
  content: "";
  left: 184px;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: #e4e1fe;
}
.month_day {
  width: 100%;
  position: relative;
  left: -20px;
  top: 25px;
  color: #606c76;
}
.month_tag {
  line-height: 19px;
  text-align: left;
  color: #000;
  font-size: 18px;
  font-weight: 500;
}
.month_symbol {
  box-sizing: border-box;
  position: absolute;
  left: -16px;
  top: 4px;
  z-index: 1;
  background: white;
}
.month_circle {
  box-sizing: border-box;
  position: absolute;
  margin-left: -2px;
  width: 12px;
  height: 12px;
  border-radius: 10px;
  background: white;
  border: 2px solid #8b80f9;
}
.maincon {
  cursor: pointer;
  border: 0.5px solid #cccccc;
  margin: 10px 0;
  box-shadow: 0px 2px 6px #000;
  font-size: 16px;
  border-radius: 5px;
  min-height: 20px;
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: 20;
  }
  .main_title {
    font-size: 1.2em;
    font-weight: 800;
    color: #000;
    margin-left: 10px;
    margin-top: 5px;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .main_con {
    font-size: 0.8em;
    margin: 3px 10px;
    padding-bottom: 3px;
    border-bottom: 0.5px dashed #000;
  }
  .main_content {
    width: 98%;
    text-overflow: ellipsis;
    overflow: hidden;
    // white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 1em;
    font-weight: 500;
    margin: 10px;
    height: 60px;
    line-height: 20px;
  }
}
</style>
