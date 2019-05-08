<template>
  <div id="ShowEssays">
    <ul>
      <router-link class='ShowEssays-essay'
        :to="{ name:'TheOne',params:{ kind:'essay',id:item._id }}"
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
  name: "ShowEssays",
components: {
    mySearch: mySearch
  },
  created() {
    this.getData();
  },
  data() {
    return {
      essays: [],
      show:[],
            pageSize:5,
      currentPage: 1
    };
  },
  methods: {
    getData() {
      this.$axios.get("/data/essay").then(res => {
        this.essays = res.data;
        this.show=this.essays
      });
    },
     searchfor(s) {
      this.show = this.essays.filter(item => {
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
#ShowEssays {
  margin-top: 30px;
}
#ShowEssays ul {
  display: inline-block;
  width: 60%;
}
#ShowEssays .ShowEssays-essay {
  position: relative;
  padding: 30px 20px 40px 140px;
  margin-bottom: 30px;
  line-height: 1.5em;
  font-size: 19px;
  box-shadow: 5px 5px 20px rgb(228, 227, 227);
  border-left: solid 12px rgb(255, 210, 221);
  box-sizing: border-box;
  transition: 0.4s;
}
#ShowEssays span {
  position: absolute;
  left: 40px;
  color: rgb(87, 87, 87);
}
#ShowEssays .ShowEssays-essay:hover {
  cursor: pointer;
  border-left: solid 12px rgb(255, 126, 159);
  transform: scale(1.03);
}
</style>