// All custom mw go here
const Actions = require('../actions/actions-router.js');
const Projects = require('../projects/projects-router.js');

const logger = (req, res, next) => {
  // log info about the request to the console ---> GET to /
  const method = req.method;
  const endpoint = req.originalUrl;
  const date = new Date();
  console.log(`You made a ${method} request to ${endpoint} on ${date}`);
  next();
};



module.exports = {
  logger
}



