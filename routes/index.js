// import express from 'express';

var routes = function(passport, mongoose) {
  var express = require('express');
  var router = express.Router();

  router.get('/auth/github', passport.authenticate('github'));
  router.get('/auth/callback/github',
    passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    // have a login page where you pull the data then direct to the user from front end
    res.redirect('http://127.0.0.1:8080/#/auth/' + req.user.token);
    // res.redirect('http://127.0.0.1:8080/#/');

    console.log(req.user);
    // res.redirect('/');
    // res.json(req.user);
  });
  router.get('/auth/logout', function(req, res, next) {
    req.logout();
    res.redirect("/");
  });
  router.get('/currentuser', function(req, res, next) {
    console.log("get user data", req.user);
    res.json(req.user);
  })

  /* GET home page. */
  router.get('/', (req, res, next) => {
    console.log(req.user);
    res.render('index', { currentUserData: req.user });
    // console.log(req.user);
    // res.json(req.user)
  });

  return router;
}
module.exports = routes;
