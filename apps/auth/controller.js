const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Keluarga = require('../models/keluarga');
const Rt = require('../models/rt');

exports.authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

exports.errorHandling = (err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  };
  