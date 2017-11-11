const route = require('express').Router()

const tmdbWrapper = require('../../../tmdb/')

route.get('/movie/:id', async (req, res) => {
  res.send(await tmdbWrapper.details.movie(req.params.id, req.user))
})
route.get('/tv/:id', async (req, res) => {
  res.send(await tmdbWrapper.details.tv(req.params.id, req.user))
})

module.exports = route
