<template>
  <div id="ShowBlogs">
    <ul>
      <router-link class='ShowBlogs-blog'
        :to="{ name:'TheOne',params:{ kind:'blog',id:item._id }}"
        tag="li"
        v-for="item in show.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        :key="item._id"
      >
        <span>{{ item.date }}</span>
        {{ item.title }}
      </router-link>
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
  components: {
    mySearch: mySearch
  },
  name: "ShowBlogs",
  created() {
    this.getData();
  },
  data() {
    return {
      blogs: [],
      show: [],
      pageSize:5,
      currentPage: 1
          };
  },
  methods: {
    getData() {
      this.$axios.get("/data/blog").then(res => {
        this.blogs = res.data;
        this.show = this.blogs;
      });
    },
    searchfor(s) {
      this.show = (this.blogs.filter(item => {
        if (item.title.includes(s)) {
          return item;
        }
      }));
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>

<style>
#ShowBlogs {
  margin-top: 30px;
}
#ShowBlogs ul {
  display: inline-block;
  width: 60%;
}
#ShowBlogs .ShowBlogs-blog {
  position: relative;
  padding: 30px 20px 40px 140px;
  margin-bottom: 30px;
  line-height: 1.5em;
  font-size: 19px;
  box-shadow: 5px 5px 20px rgb(228, 227, 227);
  border-left: solid 12px rgb(255, 224, 199);
  box-sizing: border-box;
  transition: 0.4s;
}
#ShowBlogs span {
  position: absolute;
  left: 40px;
  color: rgb(87, 87, 87);
}
#ShowBlogs .ShowBlogs-blog:hover {
  cursor: pointer;
  border-left: solid 12px rgb(253, 178, 116);
  transform: scale(1.03);
}
</style>
