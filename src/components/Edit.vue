<template>
<div>
<el-input v-model="title" placeholder="输入标题" size='small' style='width:300px;margin-bottom:10px'></el-input>
      <el-button @click="pushData" type='primary' size='small' style='float:right;margin-right:40px;'>{{ btn }}</el-button>
    <textarea id="simplemde"></textarea>

    <!-- 隐藏的上传文件按钮 -->
      <input style="display:none" accept="image/gif,image/jpeg,image/jpg,image/png" type="file" id="upInput" ref="upInput">
  </div>
</template>

<script>
import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

export default {
  name: "Edit",
  data() {
    return {
      title: "",
      content: "",
      isNew: true,
      kind: "",
      comments:'',
      time: new Date()
    };
  },
  computed: {
    btn: function() {
      switch (this.kind) {
        case "blog":
          return (this.isNew ? "发表" : "更新") + "文章";
        case "essay":
          return (this.isNew ? "发表" : "更新") + "杂谈";
        case "article":
          return (this.isNew ? "发表" : "更新") + "收藏";
        default:
          return "";
      }
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
    this.kind = this.$route.params.kind;
    if (this.$route.params.id != "new") {
      this.isNew = false;
    }
  },
  mounted() {
    var simplemde = new SimpleMDE({
      el: document.getElementById(simplemde)
    });
    simplemde.codemirror.on("change", () => {
      this.content = simplemde.value();
    });
    if (!this.isNew) {
      this.$axios
        .get(`/data/${this.$route.params.kind}/${this.$route.params.id}`)
        .then(req => {
          this.title = req.data.title;
          this.content = req.data.content;
          this.comments=req.data.comments;
          simplemde.value(this.content);
        });
    }

    //上传图片挂载
    var input = this.$refs.upInput
    input.addEventListener("change", () => {
      var formData = new FormData()
      formData.append("i", input.files[0])
      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      this.$axios.post("/data/myupload", formData, config).then((res)=> {
        var urlname=`![](/static/upload/${res.data})`
        simplemde.value(`${this.content}\n${urlname}\n`)
      })
    })
  },
  methods: {
    pushData() {
      if (!this.isNew) {
        this.$axios
          .post(`/data/${this.$route.params.kind}/${this.$route.params.id}`, {
            id: this.$route.params.id,
            title: this.title,
            content: this.content
          })
          .then(() => {
            this.$router.push("/Manage");
          });
      } else {
        this.$axios
          .post(`/data/${this.$route.params.kind}/new`, {
            title: this.title,
            content: this.content,
            comments:this.comments,
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

<style>
.CodeMirror-scroll {
  min-height:350px;
  height: 350px;
}
</style>