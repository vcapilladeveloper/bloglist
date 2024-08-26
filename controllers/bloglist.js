const listRouter = require('express').Router()
const Blog = require('../models/blog')

listRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

listRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

listRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = listRouter