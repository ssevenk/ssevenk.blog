<template>
  <div id="mySearch">
    <input type="text" v-model="content" :class="classipt" placeholder="请输入关键词搜索">
    <button @click="search" :class="classbtn">
      <img src="/static/img/fang.png" alt>
    </button>
    <div id='notice' style=''>
      <h3>公告</h3>
      这里是ssevenk的个人博客，不定期总结自己在前端领域的所学，有自己的原创文章板块，杂谈板块，也有收藏了别人的好文的板块
      如果内容对您有所帮助，欢迎在文章下面评论<br><br>
      github主页：<br><a href="https://github.com/ssevenk">https://github.com/ssevenk</a><br><br>
      segmentFault主页：<a href="https://segmentfault.com/u/yexingfeng">https://segmentfault.com/u/yexingfeng</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "mySearch",
  data () {
    return {
      content:''
    }
  },
  computed: {
    kind: function() {
      switch (this.$route.path) {
        case "/Blogs":
          return 1;
        case "/Essays":
          return 2;
        case "/Articles":
          return 3;
      }
    },
    classipt: function() {
      return {
        classipt1: this.kind == 1,
        classipt2: this.kind == 2,
        classipt3: this.kind == 3
      };
    },
    classbtn: function() {
      return {
        classbtn1: this.kind == 1,
        classbtn2: this.kind == 2,
        classbtn3: this.kind == 3
      };
    }
  },
  methods:{
      search() {
          this.$emit('search',this.content)
      }
  }
};
</script>

<style>
#mySearch {
  position: relative;
  padding: 0 0 0 60px;
  margin: 0;
  vertical-align: top;
  display: inline-block;
  width: 34%;
  height: 35px;
}
#mySearch input {
  vertical-align: top;
  height: 100%;
  width: 60%;
  margin: 0 auto 0 auto;
  padding: 0;
  font-size: 16px;
  border-radius: 5px 0 0 5px;
}
#mySearch button {
  vertical-align: top;
  margin-left: -6px;
  height: 100%;
  width: 40px;
  border-radius: 0 5px 5px 0;
  border: none;
  outline: none;
  cursor: pointer;
}
#mySearch img {
  width: 60%;
}
#mySearch #notice {
display:inline-block;
line-height:1.8em;
height:350px;
width:300px;
padding:20px;
margin-top:30px;
background-color:white;
box-shadow: 5px 5px 20px rgb(228, 227, 227);
}
.classipt1 {
  border: 2px solid rgb(255, 224, 199);
}
.classipt1:focus {
  outline: none;
  border: 2px solid rgb(253, 178, 116);
}
.classipt2 {
  border: 2px solid rgb(255, 210, 221);
}
.classipt2:focus {
  outline: none;
  border: 2px solid rgb(255, 126, 159);
}
.classipt3 {
  border: 2px solid rgb(190, 220, 255);
}
.classipt3:focus {
  outline: none;
  border: 2px solid rgb(126, 186, 255);
}
.classbtn1 {
background: rgb(253, 178, 116);
}
.classbtn2 {
background: rgb(255, 126, 159);
}
.classbtn3 {
background: rgb(126, 186, 255);
}
</style>
