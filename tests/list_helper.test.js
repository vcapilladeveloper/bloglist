const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')


const api = supertest(app)

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.listWithMultipleBlog)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.listWithMultipleBlog)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {

  test('most likes from many blogs', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithMultipleBlog)
    assert.deepStrictEqual(result, {
      author: "Michael Chan",
      likes: 7,
      title: "React patterns"
    })
  })
})

describe('most blogs', () => {

  test('author with most blogs from many', () => {
    const result = listHelper.mostBlogs(listHelper.listWithMultipleBlog)
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      likes: 10
    })
  })
})

describe('most likes', () => {

  test('author with most likes from many blogs', () => {
    const result = listHelper.mostLikes(listHelper.listWithMultipleBlog)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})

describe('GET /', () => {
  test('Blog list returns the correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listHelper.listWithMultipleBlog.length)
  })

  test('Id is named ID', async () => {
    const response = await api.get('/api/blogs')
    assert.ok(response.body[0].id)
  })
})

after(async () => {
  await mongoose.connection.close()
})