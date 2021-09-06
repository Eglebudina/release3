"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");
const accounts = require("./controllers/accounts.js");

//get
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get("/settings", accounts.loadSettingsPage);
router.get("/addnewuser", accounts.addNewUser);
router.get("/accounts/deleteUser/:id", accounts.deleteUser);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/station/:id", station.index);
router.get('/station/:id/deletereading/:readingid', station.deleteReading);
router.get('/dashboard/deletestation/:id', dashboard.deleteStation);

//post
router.post('/register', accounts.register);
router.post("/settings", accounts.updateSettings);
router.post('/authenticate', accounts.authenticate);
router.post('/station/:id/addreading', station.addReading);
router.post('/dashboard/addstation', dashboard.addStation);
router.post("/updateSettings", accounts.updateSettings);



module.exports = router;

