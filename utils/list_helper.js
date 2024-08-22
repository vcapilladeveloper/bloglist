const lodash = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const initialValue = 0;
    const sumWithInitial = likes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    );
    return sumWithInitial
}

const indexOfMaxLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    if (likes.length === 0) {
        return -1
    }

    return likes.reduce((maxIndex, currentValue, currentIndex) => {
        return currentValue > blogs[maxIndex] ? currentIndex : maxIndex
    }, 0)
}

const favoriteBlog = (blogs) => {
    const blog = blogs[indexOfMaxLikes(blogs)]
    return { title: blog.title, author: blog.author, likes: blog.likes }
}

const countBy = (blogs) => {
    let counts = lodash.countBy(blogs, 'author')

    let mostReputedAuthor = lodash.maxBy(Object.keys(counts), o => counts[o])

    return lodash.filter(blogs, { author: mostReputedAuthor })

}

const mostBlogs = (blogs) => {
    const [blog] = countBy(blogs)
    return { author: blog.author, likes: blog.likes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}