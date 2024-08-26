const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const listWithMultipleBlog = [

    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }

]

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const initialValue = 0
    const sumWithInitial = likes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    )
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

const mostLikes = (blogs) => {
    const likesByAuthor = lodash(blogs)
        .groupBy('author')
        .map((blogs, author) => ({
            author,
            likes: lodash.sumBy(blogs, 'likes')
        }))
        .value()

    const mostLikedAuthor = likesByAuthor.reduce((max, author) =>
        author.likes > max.likes ? author : max
    )

    return { author: mostLikedAuthor.author, likes: mostLikedAuthor.likes }
}

module.exports = {
    listWithMultipleBlog,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}