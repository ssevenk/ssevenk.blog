<template>
  <div id="Manage">
    <div id="Manage-header">
      <img src="/static/img/Seed-01.png" @click="toIndex" alt>
    </div>
    <div id="Manage-nav">
      <ul>
        <li :class="{active:kind=='blog'}" @click="getData('blog')">文章</li>
        <li :class="{active:kind=='essay'}" @click="getData('essay')">杂谈</li>
        <li :class="{active:kind=='article'}" @click="getData('article')">收藏</li>
      </ul>
    </div>
    <div id="Manage-table">
      <el-table
        :data="((things.filter(data=>!search||data.title.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)))"
        style="width:100%"
        :header-row-style="{height:'10px'}"
      >
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>&nbsp;&nbsp;&nbsp;{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键词搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="toEdit(scope.row._id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <router-link :to="{name:'Edit',params:{kind:kind,id:'new'}}">新建</router-link> -->

      <el-pagination
        style="display:inline-block;margin:30px 0 0 200px;"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total=" things.length"
      ></el-pagination>
      <el-button
        id="Manage-plus"
        round
        icon="el-icon-plus"
        @click="toNew"
        size="small"
        type="primary"
      >新建</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Manage",

  //默认初始编辑选项是文章
  created() {
    this.getData("blog");
  },

  data() {
    return {
      kind: "blog",
      things: [],
      currentPage: 1,
      pageSize: 5,
      search: ""
    };
  },

  methods: {
    toNew() {
      if (this.kind == "article") {
        this.$router.push({
          name: "EditArticle",
          params: { id: "new" }
        });
      } else {
        this.$router.push({
          name: "Edit",
          params: { kind: this.kind, id: "new" }
        });
      }
    },
    toIndex() {
      this.$router.push({ path: "/" });
    },
    toEdit(id) {
      if (this.kind == "article") {
        this.$router.push({
          name: "EditArticle",
          params: { id: id }
        });
      } else {
        this.$router.push({
          name: "Edit",
          params: { kind: this.kind, id: id }
        });
      }
    },
    getData(kind) {
      this.kind = kind;
      this.$axios
        .get(`/data/${kind}`)
        .then(res => {
          this.things = res.data;
        })
        .then(() => {
          this.show = this.things;
        });
    },
    del(delid) {
      var delIndex = this.things.findIndex(item => {
        return item._id == delid;
      });
      this.things.splice(delIndex, 1);
      this.$axios.delete(`/data/${this.kind}/${delid}`);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    searchfor(s) {
      this.show = this.things.filter(item => {
        if (item.title.includes(s)) {
          return item;
        }
      });
    }
  }
};
</script>

<style>
#Manage-header {
  position: relative;
  height: 70px;
  width: 100%;
  font-size: 18px;
  padding-bottom: 5px;
  border-bottom: solid rgb(228, 228, 228) 0.5px;
}
#Manage-header img {
  height: 60px;
  cursor: pointer;
}
#Manage-nav {
  float: left;
  width: 120px;
  height: 400px;
  background-color: rgb(182, 182, 182);
  padding-top: 30px;
}
#Manage-nav li {
  text-align: center;
  line-height: 35px;
  color: white;
  font-size: 16px;
  /* border-right: solid 4px rgb(167, 186, 228); */
}
#Manage-nav li:hover {
  background-color: rgba(255, 215, 189, 0.2);
  cursor: pointer;
}
#Manage-nav li.active {
  background-color: rgba(253, 174, 128, 0.753);
  /* border-right: solid 4px rgb(255, 182, 134); */
}
#Manage-table {
  overflow: hidden;
  position: relative;
  height: 400px;
}
#Manage-plus {
  display: inline-block;
  margin-left: 400px;
}
.el-table th div {
  padding-left: 0;
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
</style>