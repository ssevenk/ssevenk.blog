<template>
<div>
  <div id="TheOne">
    <h1>{{ theOne.title }}</h1>
    <!-- <div class="markdown-body" v-html="contentMarkdown"></div> -->
    <div id='markdownArticle' v-html="contentMarkdown"></div>
  </div>
  <div id='cmt'>
    <div id='cmt-div' v-for="item in theOne.comments.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key='item.date'>
<span>{{ item.name }}<br></span>
<span style='float:right'>---{{ item.content }}&nbsp;</span>
    </div>
    <el-pagination
      style="display:inline-block;margin:10px 0 0 0;"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total=" theOne.comments.length"
      ></el-pagination>
    <el-input v-model="comment.name" placeholder="输入评论人昵称" size='small' style='width:60%;margin:20px 0 10px 0'></el-input>
    <el-input v-model="comment.content" placeholder="输入评论内容" size='small' style='width:100%;margin-bottom:10px'></el-input>
    <el-button @click="pushComment" size='small'>提交评论</el-button>
  </div>
</div>
</template>

<script>
import SimpleMDE from "simplemde"
import "simplemde/dist/simplemde.min.css"

export default {
  name: "TheOne",

  created() {
      this.kind=this.$route.params.kind
    this.getTheOne();
  },
  data() {
    return {
      pageSize:5,
      currentPage:1,
        kind:'',
      theOne: {
        comments:[]
      },
      comment:{name:'',content:"",date:''},
      contentMarkdown:''
    };
  },
  methods: {
    getTheOne() {
      this.$axios.get(`/data/${this.kind}/${this.$route.params.id}`).then(res=>{
        this.theOne=res.data
      }).then(()=>{
        this.contentMarkdown=SimpleMDE.prototype.markdown(this.theOne.content)
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    pushComment() {
      if(this.comment.name&&this.comment.content)
      {
var comment={
        name:this.comment.name,
        content:this.comment.content,
        date:Math.random().toString(36).substr(2)
      }
      this.theOne.comments.push(comment)
      this.$axios.post(`/data/${this.kind}/${this.$route.params.id}`,{
        id: this.$route.params.id,
        title: this.theOne.title,
        content: this.theOne.content,
        comments:this.theOne.comments
      })
      }
      this.comment.name=''
      this.comment.content=''
    }
  }
};
</script>

<style>
#TheOne {
  display:inline-block;
  min-width:600px;
  width:600px;
}
#cmt {
  vertical-align: top;
display:inline-block;
min-width:300px;
  width:300px;
  margin-left:30px;
}
#cmt-div {
  display:inline-block;
min-width:300px;
  width:300px;
  margin:20px 0 0 0;
  /* box-shadow: 5px 5px 20px rgb(228, 227, 227); */
}
</style>