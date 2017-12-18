
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodemailersampleemail@gmail.com',
        pass: 'foopassword'
    }
});

app.use(express.static('public'));
app.get('', function (req, res) {
    res.sendFile(__dirname + "/");
})

app.post('/', function (req, res) {
    response = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };
    var mailClient = {
        from: 'nodemailersampleemail@gmail.com',
        to: 'nodemailersampleemail@gmail.com',
        subject: `Message from ${response.name}`,
        text: `Name: ${response.name}\nEmail: ${response.email}\nMessage:${response.message}`
    };
    transporter.sendMail(mailClient, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.redirect("/success.html");
        }
    });
})

var server = app.listen(80, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})
