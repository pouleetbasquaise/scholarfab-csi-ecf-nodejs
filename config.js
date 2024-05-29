const kg = require('keygrip')

const keys = kg([ 'ChangeMe!' ])
const port = 3000
const addr = '127.0.0.1'


module.exports = {
    keys, port, addr
}
