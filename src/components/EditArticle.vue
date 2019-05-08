<template>
<div>
<el-input v-model="title" placeholder="输入标题" size='small' style='width:300px;margin-bottom:10px'></el-input>
      <el-button @click="pushData" type='primary' size='small' style='float:right;margin-right:40px;'>{{ btn }}</el-button>
    <el-input v-model="link" placeholder="输入链接" size='small' style='width:100%;margin-bottom:10px'></el-input>
  </div>
</template>

<script>
export default {
  name: "EditArticle",
  data() {
    return {
      title: "",
      link: "",
      time: new Date(),
      isNew:true
    };
  },
  computed: {
    btn: function() {
          return (this.isNew ? "发表" : "更新") + "收藏";
      },
    date: function() {
      var time = new Date(this.time);
      return `${(time.getMonth() + 1).toString().padStart(2, "0")}-${time
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    }
  },
  created() {
    if (this.$route.params.id != "new") {
      this.isNew = false;
    }
     if (!this.isNew) {
      this.$axios
        .get(`/data/article/${this.$route.params.id}`)
        .then(req => {
          this.title = req.data.title;
          this.link = req.data.link;
        });
    }
  },
  methods: {
    pushData() {
      if (!this.isNew) {
        this.$axios
          .post(`/data/article/${this.$route.params.id}`, {
            id: this.$route.params.id,
            title: this.title,
            link: this.link
          })
          .then(() => {
            this.$router.push("/Manage");
          });
      } else {
        this.$axios
          .post(`/data/article/new`, {
            title: this.title,
            link: this.link,
            date: this.date
          })
          .then(() => {
            this.$router.push("/Manage");
          });
      }
    }
  }
};
</script>
