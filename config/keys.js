if (process.env.NODE_ENV === 'prodiction') {
    module.exports = require('./keys.prod')
} else {
    module.exports = require('./keys.dev')
}
