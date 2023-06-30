<<<<<<< HEAD
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

const indexRouter = require("./routes/index");
const authRouter = require("./apps/auth/routes");
const rtRouter = require("./apps/rt/routes");
const wargaRouter = require("./apps/warga/routes");
const keuanganRouter = require("./apps/keuangan/routes");
const laporanRouter = require("./apps/laporan/routes");
const kegiatanRouter = require("./apps/kegiatan/routes");

const URL = `/api/v1`;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

// Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Middleware to setHeader
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(`${URL}/`, indexRouter);
app.use(`${URL}/auth`, authRouter);
app.use(`${URL}`, rtRouter);
app.use(`${URL}`, wargaRouter);
app.use(`${URL}`, keuanganRouter);
app.use(`${URL}`, laporanRouter);
app.use(`${URL}`, kegiatanRouter);
=======
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Error Handling Middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
  
  // Middleware to setHeader
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
>>>>>>> dcc2fb30a6b5215525f8be554c59fbad9200275a

module.exports = app;
