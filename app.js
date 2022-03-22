const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin:test123455@cluster0.lqxs2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const accountSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const Account = new mongoose.model("Account", accountSchema);


app.get("/", (req, res) => {
    Account.find({}, (e, results) => {
        if (!e) {
            res.render("home", {
                posts: results
            });
        }
        else {
            res.send("Internal server error. Sorry!");
        }
    });
});

app.post("/createUser", function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (username != "" && email != "" && password != "") {
        const account = new Account({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        account.save((e) => {
            if (!e) {
                res.status(201).send();
            }
            else {
                res.status(500).send();
            }
        });
    }
    else {
        res.status(400).send();
    }
});

app.post("/createUserForm", function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (username != "" && email != "" && password != "") {
        const account = new Account({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        account.save((e) => {
            if (!e) {
                alert("Status code 201: success!");
            }
            else {
                alert("Status code 500: idk what went wrong, sorry.");
            }
        });
    }
    else {
        alert("Status code 400: please make sure each field includes content.");
    }
});

app.post("/delete", (req, res) => {
    console.log("deleting DB....");
    Account.remove({}, (e) => {
        if (!e) {
            res.redirect("/");
        }
        else {
            res.send("Server error - yikes!");
        }
    });
});

app.post("/refresh", (req, res) => {
    res.redirect("/");
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 211;
}
app.listen(port);
