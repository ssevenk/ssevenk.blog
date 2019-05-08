const express = require('express')
const curd = require('./curd')
var multer = require('multer')
var router = express.Router()

//数据库
const MonBlog = curd.MonBlog
const MonEssay = curd.MonEssay
const MonArticle = curd.MonArticle

//测试上传图片
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../static/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
// var upload = multer({ dest: 'upload/' });
var upload = multer({ storage: storage })

// 单图上传
router.post('/data/myupload', upload.single('i'), function (req, res, next) {
    res.send(req.file.filename)
});

//整体拿数据
router.get('/data/blog', function (req, res) {
    MonBlog.find((err, data) => {
        if (err) {
            res.send(err)
            return
        }
        res.send(data.reverse())
    })
})
router.get('/data/essay', function (req, res) {
    MonEssay.find((err, data) => {
        if (err) {
            res.send(err)
            return
        }
        res.send(data.reverse())
    })
})
router.get('/data/article', function (req, res) {
    MonArticle.find((err, data) => {
        if (err) {
            res.send(err)
            return
        }
        res.send(data.reverse())
    })
})

//单个blog处理
router.post('/data/blog/new', (req, res) => {
    new MonBlog(req.body).save((err) => {
        if (err) res.send(err)
        else {
            res.send('成功添加数据')
        }
    })
})
router.route('/data/blog/:id')
    .get((req, res) => {
        MonBlog.findById(req.params.id, function (err, data) {
            if (err) res.send(err)
            else res.send(data)
        })
    })

    .delete((req, res) => {
        MonBlog.findByIdAndDelete(req.params.id, function (err, data) {
            if (err) res.send(err)
            else res.send('删除成功')
        })
    })
    .post((req, res) => {
        MonBlog.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            content: req.body.content,
            comments:req.body.comments
        }, function (err, data) {
            if (err) res.send(err)
            else res.send('更新成功')
        })
    })


//单个essay处理
router.post('/data/essay/new', (req, res) => {
    new MonEssay(req.body).save((err) => {
        if (err) res.send(err)
        else {
            res.send('成功添加数据')
        }
    })
})
router.route('/data/essay/:id')
    .get((req, res) => {
        MonEssay.findById(req.params.id, function (err, data) {
            if (err) res.send(err)
            else res.send(data)
        })
    })

    .delete((req, res) => {
        MonEssay.findByIdAndDelete(req.params.id, function (err, data) {
            if (err) res.send(err)
            else res.send('删除成功')
        })
    })
    .post((req, res) => {
        MonEssay.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            content: req.body.content,
            comments:req.body.comments
        }, function (err, data) {
            if (err) res.send(err)
            else res.send('更新成功')
        })
    })


//单个article处理
router.post('/data/article/new', (req, res) => {
    new MonArticle(req.body).save((err) => {
        if (err) res.send(err)
        else {
            res.send('成功添加数据')
        }
    })
})
router.route('/data/article/:id')
    .get((req, res) => {
        MonArticle.findById(req.params.id, function (err, data) {
            if (err) res.send(err)
            else res.send(data)
        })
    })

    .delete((req, res) => {
        MonArticle.findByIdAndDelete(req.params.id, function (err, data) {
            if (err) res.send(err)
            else res.send('删除成功')
        })
    })
    .post((req, res) => {
        // console.log(req.body.id)
        MonArticle.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            link: req.body.link
        }, function (err, data) {
            if (err) res.send(err)
            else res.send('更新成功')
        })
    })


router.get('/', (req, res) => {
    res.send('这是7000服务器')
})

module.exports = router