const express = require('express')
const controller = require('../controllers/position')
const passport = require('passport')
const router = express.Router()


// localhost:5000/api/position/:category
router.get('/:categoryId', passport.authenticate('jwt', { session: false }), controller.getByCategoryId)
// localhost:5000/api/auth/register
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
// localhost:5000/api/position/:id
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
// localhost:5000/api/position/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router
