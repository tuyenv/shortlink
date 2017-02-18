# shortlink

npm init -y
npm install -g nodemon
npm install router
npm install finalhandler
npm install path
npm i -S mustache consolidate


Package 1: shortid  Build Status shortid

ShortId creates amazingly short non-sequential url-friendly unique ids. Perfect for url shorteners, MongoDB and Redis ids, and any other id users might see.

By default 7-14 url-friendly characters: A-Z, a-z, 0-9, _-
Non-sequential so they are not predictable.
Supports cluster (automatically), custom seeds, custom alphabet.
Can generate any number of ids without duplicates, even millions per day.
Perfect for games, especially if you are concerned about cheating so you don't want an easily guessable id.
Apps can be restarted any number of times without any chance of repeating an id.
Popular replacement for Mongo ID/Mongoose ID.
Works in Node, io.js, and web browsers.
Includes Mocha tests.


Package 2: router
Simple middleware-style router
