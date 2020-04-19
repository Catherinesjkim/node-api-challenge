const express = require('express');
const helmet = require('helmet');
const server = express();
const projectsRouter = require('./projects/projects-router.js');
const actionsRouter = require('./actions/actions-router.js');
const mw = require('./custom/middleware.js');
const logger = mw.logger;

// global mw
server.use(helmet());
server.use(express.json());
server.use(logger);

// the router hanlder: it handles endpoints that begins with the below urls - Connection
server.use('/api/projects', logger, projectsRouter);
server.use('/api/actions', logger, actionsRouter);

// write a GET / endpoint that returns an obj
server.use(addName);

server.use(express.json());

server.get("/api", (req, res) => {
  const environment = process.env;
  res.status(200).json({ api: "up", environment });
});

server.get('/', addName, (req, res) => {
  const nameInsert = (req.name) ? `${req.name}` : '';
  console.log('req.name is:', req.name);
  res.send(`
    <h2>Catherine's Sprint Challenge API!</h2>
    <p>Welcome: ${nameInsert} to the Catherine's Sprint API</p>
  `); // Worked on postman
});

function addName(req, res, next) {
  req.name = 'WEB PT 11';
  next();
}

// catch all 404 error message - good UX
server.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "Oops, didn't find what you are looking for" })
  next();
});

module.exports = server;