const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gblog')

const MonBlog = mongoose.model('monblog', {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments:[]
})

const MonEssay = mongoose.model('monessay', {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments:[]
})

const MonArticle = mongoose.model('monarticle', {
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = {
    MonBlog: MonBlog,
    MonEssay: MonEssay,
    MonArticle: MonArticle
}