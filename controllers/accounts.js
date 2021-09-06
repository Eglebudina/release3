'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('station', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const newUser = request.body;
    newUser.id = uuid.v1();
    userstore.addUser(newUser);
    logger.info(`registering ${newUser.email}`);
    response.redirect('/');
  },
   
  addNewUser(request, response) {
    const newUser = request.body;
    newUser.id = uuid.v1();
    userstore.addUser(newUser);
    logger.info(`registering ${newUser .email}`);
    response.redirect("/dashboard");
  },

  authenticate(request, response) {
    const userCheck = userstore.getUserByEmail(request.body.email);
    if (userCheck && userCheck.password == request.body.password) {
      response.cookie('station', userCheck.email);
      logger.info(`logging in ${userCheck.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },
  
  loadSettingsPage(request,response){
    const viewData = {
      title: "Update settings",
      user: userstore.getUserById(request.params.id)
    };
    response.render("settings", viewData);
  },
  
  updateSettings(request,response){
    const updateUser = userstore.getUserByEmail(request.body.email);
    
    updateUser.firstName = request.body.firstName;
    updateUser.lastName = request.body.lastName;
    updateUser.email = request.body.email;
    updateUser.password = request.body.password;
    response.redirect("/dashboard");

  },
  
  deleteUser(request,response){
    userstore.removeUser(request.params.id);
    response.redirect("/dashboard");
  }
  
};

module.exports = accounts;