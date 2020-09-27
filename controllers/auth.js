const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({ email: req.body.email})

    if (candidate) {
        // Проверка пароля, если пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if (passwordResult) {
            // Генерация токена, если пароль верный
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Ошибка, если неправильный пароль
            res.status(401).json({
                message: 'Неправильный пароль. Попробуйте снова'
            })
        }
    } else {
        // Если пользователя нет - ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        // Если пользователь уже существуем, выдаем ошибку
        res.status(409).json({
            message: "Такой email уже занят. Попробуйте другой."
        })
    } else {
        // Создаем пользователья
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}
