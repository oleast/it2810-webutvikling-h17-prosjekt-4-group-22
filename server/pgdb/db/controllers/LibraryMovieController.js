
const Library = require('../models').LibraryMovie
const Watchlist = require('../models').WatchlistMovie

const Op = require('../models').Sequelize.Op

module.exports = {
  async addMovieToUser (MovieId, UserId) {
    try {
      const movie = {MovieId: MovieId, UserId: UserId}

      const dbLibraryMovie = await Library.findOne({
        where: movie
      })
      const dbWatchlistMovie = await Watchlist.findOne({
        where: movie
      })
      if (!dbLibraryMovie) {
        await Library.create(movie)
        if (dbWatchlistMovie) {
          await dbWatchlistMovie.destroy()
        }
        return true
      }
      return false
    } catch (err) {
      console.error(err)
    }
  },

  async getPageCount (UserId, options) {
    try {
      const movies = await Library.findAll({
        where: {UserId: UserId},
        include: [{
          association: 'Movie',
          where: {
            title: {[Op.iLike]: `%${options.query}%`},
            vote_average: {[Op.between]: [options.ratingMin, options.ratingMax]},
            release_date: {[Op.between]: [new Date(options.startYear).toISOString(), new Date(options.endYear).toISOString()]}
          }
        }],
        order: [
          ['Movie', options.orderBy, options.order]
        ]
      })
      return movies.length
    } catch (err) {
      console.error(err)
      return -1
    }
  },

  async getAllMoviesForUser (UserId, options) {
    try {
      const dbLibraryMovie = await Library.findAll({
        where: {UserId: UserId},
        include: [{
          association: 'Movie',
          where: {
            title: {[Op.iLike]: `%${options.query}%`},
            vote_average: {[Op.between]: [options.ratingMin, options.ratingMax]},
            release_date: {[Op.between]: [new Date(options.startYear).toISOString(), new Date(options.endYear).toISOString()]}
          }
        }],
        order: [
          ['Movie', options.orderBy, options.order]
        ],
        limit: options.size,
        offset: ((options.page - 1) * options.size)
      })
      if (dbLibraryMovie) {
        return dbLibraryMovie.map((movie) => movie.Movie)
      } else {
        return []
      }
    } catch (err) {
      console.error(err)
    }
  },

  async removeMovieFromUser (MovieId, UserId) {
    try {
      const dbLibraryMovie = await Library.findOne({
        where: {MovieId: MovieId, UserId: UserId}
      })
      if (dbLibraryMovie) {
        await dbLibraryMovie.destroy()
        return true
      }
      return false
    } catch (err) {
      console.error(err)
    }
  },

  async movieInLibrary (MovieId, UserId) {
    try {
      const movie = await Library.findOne({
        where: {MovieId: MovieId, UserId: UserId}
      })
      if (movie) {
        return true
      }
      return false
    } catch (err) {
      console.error(err)
    }
  }
}
