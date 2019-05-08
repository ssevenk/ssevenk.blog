<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang='scss' src='../static/m.scss'></style>
<style>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}
a {
  text-decoration:none
}
ul,
li {
  list-style: none
}
body {
  min-width: 800px;
 font-family: Helvetica, arial, sans-serif;
 font-size: 14px;
line-height: 1.6;
padding: 10px 70px 10px 70px; }

</style>
