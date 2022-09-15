

const express = require('express')
const session = require('express-session')
const Controller = require('./controllers/ProductControllers')
const UserControllers = require('./controllers/UserController')
const { isLogin, isSeller } = require('./middlewares/auth')
const auth = require('./routes/auth')
const product = require('./routes/product')

const app = express()
const port = 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// Middleware Login
app.use(
  session({
    secret: 'fjRIGIPP3w', //SECRET KEY
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //use true if https (production)
      sameSite: true, //use true for csrf security
    },
  })
)

// Main landing page
app.get('/', Controller.home)

// Auth Router
app.use(auth)

// Middleware validate user login and role
app.use(isLogin)
// router berhubungan dengan pembeli/buyer

// buy product


app.get('/logout', UserControllers.getLogout)

// Middleware validate role = seller
app.use(isSeller)
// route berhubungan dengan penjual/seller

// Seller Product Controller
app.use(product)


app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`)
})
