const fs = require("fs");
const path = require("path");

const usersModel = require("../models/usersModel");

const controller = {
    register: (req,res) => {
        res.render('register');
    },
    login: (req,res) => {
        res.render('login');
    }
};

module.exports = controller;
