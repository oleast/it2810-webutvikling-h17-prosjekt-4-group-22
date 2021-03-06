const route = require('express').Router()

const tmdbWrapper = require('../../../../tmdb')

const Movies = require('../../../../pgdb/db/controllers/MovieController')

/**
 * @param req.query.q API search string
 */
route.get('/', async (req, res) => {
  try {
    const { results } = await tmdbWrapper.search.movie(req.query.q)
    results.map((result) => Movies.createMovie(result))
    res.send(results)
  } catch (err) {
    console.error(err)
  }
})

module.exports = route
