/**
 * Created by developer on 16-2-17.
 */


var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');


app.use(cookieParser());
app.use(session({ user: 'hello' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

