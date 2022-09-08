const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { it } = require("node:test");
require('dotenv').config();
const saltRounds = 10;


var db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
});

db.connect(function (err) {
    if (err) throw err;
    var name = 'amariwan1';
    var email = 'tolasmariwan99@gmail.c';
    //Escape the name and the address values:
    //Send an array with value(s) to replace the escaped values:
    db.query('SELECT * FROM users WHERE username = ?', [name], function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            db.query('SELECT * FROM users WHERE email = ?', [email], function (err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    console.log("No results found");
                } else {
                    console.log("Email already registered");
                }
            });
        }else {
            console.log("Username already registered");
        }
    });
});