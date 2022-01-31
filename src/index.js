const app = require('./app')
const port = process.env.PORT

// port listening
app.listen(port,() => {
    console.log('Server is up on port ' + port)
})

