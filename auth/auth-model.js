const db = require('../database/dbConfig');

function register(user){
    return db('users').insert(user)
}

function login(username){
    return db('users').where({username: username})
}

module.exports = {
    register,
    login,
}