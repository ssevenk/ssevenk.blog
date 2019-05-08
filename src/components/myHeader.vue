<template>
  <header id="myHeader">
    <img src="/static/img/Seed-01.png" @click='toIndex' alt="">
    <div id='myHeader-link'> 
      <router-link  to="/Blogs" >文章</router-link>
      <router-link  to="/Essays">杂谈</router-link>
      <router-link  to="/Articles">收藏</router-link>
      <router-link  to="/Manage">管理</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "myHeader",
  methods:{
    toIndex(){
      this.$router.push({path:'/'})
    },
  }
};
</script>

<style>
#myHeader {
  position: relative;
  height:70px;
  line-height: 1.5em;
  font-size: 18px;
  padding-bottom: 5px;
  border-bottom:solid rgb(228, 228, 228) 0.5px;
}
#myHeader img {
  height:60px;
  position:absolute;
  cursor: pointer;
}
#myHeader-link {
position: absolute;
right:0;
width:400px;
display:flex;
justify-content:space-around;
}

#myHeader-link > a
{
margin-top:20px;
padding-bottom:10px;
}

#myHeader-link .router-link-active:nth-of-type(1) {
  color:rgb(0, 0, 0) !important;
  border-bottom:solid rgb(255, 184, 126) 3px
}

#myHeader-link .router-link-active:nth-of-type(2) {
  color:rgb(0, 0, 0) !important;
  border-bottom:solid rgb(255, 126, 159) 3px
}

#myHeader-link .router-link-active:nth-of-type(3) {
  color:rgb(0, 0, 0) !important;
  border-bottom:solid rgb(126, 186, 255) 3px
}

#myHeader-link > a:link {
  color:rgb(153, 149, 149)
}
#myHeader-link > a:visited {
  color:rgb(153, 149, 149)
}
#myHeader-link > a:hover {
  color:rgb(245, 77, 77)
}

</style>
