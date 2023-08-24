const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');

const usersModel = require("../models/usersModel");

const controller = {
    register: (req,res) => {
        res.render('register');
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
    },
    login: (req,res) => {
        res.render('login');
    }
};

module.exports = controller;
