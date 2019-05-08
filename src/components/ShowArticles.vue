<template>
  <div id="ShowArticles">
    <ul>
      <li class='ShowBlogs-article'
        v-for="item in show.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        :key="item._id"
        @click="jumpTo(item.link)"
      >
        <span>{{ item.date }}</span>
        {{ item.title }}
      </li>
      <el-pagination
      style="display:inline-block;margin:30px 0 0 100px;"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total=" show.length"
      ></el-pagination>
    </ul>
    <mySearch @search="searchfor"></mySearch>
  </div>
</template>

<script>
import mySearch from "./mySearch";
export default {
  name: "ShowArticles",
  components: {
    mySearch: mySearch
  },
  created() {
    this.getData();
  },
  data() {
    return {
      articles: [],
      show: []
    };
  },
  methods: {
    jumpTo(link) {
      // window.location.href=link //当前窗口打开
      window.open(link)
    },
    getData() {
      this.$axios.get("/data/article").then(res => {
        this.articles = res.data;
        this.show = this.articles;
      });
    },
    searchfor(s) {
      this.show = this.articles.filter(item => {
        if (item.title.includes(s)) {
          return item;
        }
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>

<style>
#ShowArticles {
  margin-top: 30px;
}
#ShowArticles ul {
  display: inline-block;
  width: 60%;
}
#ShowArticles .ShowBlogs-article {
  position: relative;
  padding: 30px 20px 40px 140px;
  margin-bottom: 30px;
  line-height: 1.5em;
  font-size: 19px;
  box-shadow: 5px 5px 20px rgb(228, 227, 227);
  border-left: solid 12px rgb(190, 220, 255);
  box-sizing: border-box;
  transition: 0.4s;
}
#ShowArticles span {
  position: absolute;
  left: 40px;
  color: rgb(87, 87, 87);
}
#ShowArticles .ShowBlogs-article:hover {
  cursor: pointer;
  border-left: solid 12px rgb(126, 186, 255);
  transform: scale(1.03);
}
</style>
