//import our dependencies- step 1
const express = require("express")
const app = express()
const mysql = require("mysql2")
const dotenv = require("dotenv")
const cors = require("cors")

//configure environment variables
app.use(express.json())
app.use(cors())
dotenv.config();


//create a connection object- step 3
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: "3307"// in the event you have two local servers installed, you are supposed to configure them with different ports to avoid conflict. When creating the connection object, specify the port to be able to have access.
})

//test the connection
db.connect((err) => {
    //if connection is not successful
    if (err) {
        return console.log("Error connection to the database", err)
    }
    //connection is successful
    console.log("Successfully connected to MYSQL as id: ", db.threadId)
})  


//GET method

//Question 1

app.set('view engine', 'ejs')
app.set('views' + '/views')

//data is the name of the file inside views folder
app.get('/data', (req, res) => {
    //Retrieve data from database
    db.query('SELECT patient_id,first_name,last_name,date_of_birth FROM patients', (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error retrieving data')
        } else {
            //display the records to the browser
            res.render('data', { results: results })
        }
    })

})

//   Question 2

app.get('/providers', (req, res) => {
    //Retrieve data from database
    db.query('SELECT first_name,last_name,provider_specialty FROM providers', (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error retrieving data')
        } else {
            //display the records to the browser
            res.render('providers', { results: results })
        }
    })

})

//   Question 3

app.get('/patients_filter', (req, res) => {
    //Retrieve data from database
    db.query('SELECT first_name FROM providers', (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error retrieving data')
        } else {
            //display the records to the browser
            res.render('patients_filter', { results: results })
        }
    })

})

//   Question 4

app.get('/provider_specialty', (req, res) => {
    //Retrieve data from database
    db.query('SELECT provider_specialty, first_name, last_name FROM providers', (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error retrieving data')
        } else {
            //display the records to the browser
            res.render('provider_specialty', { results: results })
        }
    })

})


//start and listen to the server- step 2
//you cna have the actually PORT number or use process.env.PORT to access it from your .env
app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`)

    //send message to browser
    console.log('Sending message to browser...')
    app.get('/', (req, res) => {
        res.send('Server started successfully')
    })
})