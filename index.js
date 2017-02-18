'use strict';

require('dotenv').config({silent:true});

const server = require('./lib/app');

server.listen(process.env.PORT || 3000);
console.log('App run on port', process.env.PORT || 3000);
