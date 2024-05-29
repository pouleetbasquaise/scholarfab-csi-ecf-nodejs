require('dotenv').config()

const path = require('node:path')
const fs = require('node:fs')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const sqlite3 = require('sqlite3')
const cs = require('cookie-session')

const {  keys, port, addr  } = require('./config')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use([
    morgan('tiny'),
    helmet(),
    cs({ name: 'session', keys }),
    express.urlencoded({ extended: true }),
    express.json(),
])


app.get('/', (req, res) => {
    // Page d'accueil
    console.log(req.session.user)
    res.render('index')
})

app.get('/register', (req, res) => {
    // Formulaire d'inscription (sign-up)
})

app.post('/register', (req, res) => {
    // Traitement de l'inscription (sign-up)
})

app.get('/login', (req, res) => {
    // Formulaire d'authentification (login)
    req.session.user = { email: 'test@test.test' }
    res.redirect('/')
})

app.post('/login', (req, res) => {
    // Traitement de l'authentification
})

app.get('/logout', (req, res) => {
    // Déconnexion
    req.session.user = null
    res.redirect('/')
})

// ... le reste de l'application doit être développé ici, ou dans des fichiers annexes, en fonction de la structure choisie ...

// ... lancement de l'écoute du serveur sur le port HTTP_PORT et l'IP HTTP_ADDR
app.listen(port, addr, () => {
    console.log('Server is running...')
})
