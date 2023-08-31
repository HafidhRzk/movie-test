const express = require('express');
const router = express.Router();

const {
    createMovie,
    getMovieList,
    getMovieDetail,
    updateMovie,
    deleteMovie,
} = require('../controllers/movies')

router.post('/', createMovie);
router.get('/', getMovieList);
router.get('/:id', getMovieDetail);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
