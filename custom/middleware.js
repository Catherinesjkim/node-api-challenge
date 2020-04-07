// All custom mw go here
const Actions = require('../actions/actionModel.js'); 
const Projects = require('../projects/projectModel.js');

const logger = (req, res, next) => {
  // log info about the request to the console ---> GET to /
  const method = req.method;
  const endpoint = req.originalUrl;
  const date = new Date();
  console.log(`You made a ${method} request to ${endpoint} on ${date}`);
  next();
};

const validateActionId = (req, res, next) => {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      action ? req.action : res.status(404).json({ message: 'That Action Does Not Exist!' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Sorry, try again!', err })
    })
    next();
}

const validateProjectId = (req, res, next) => {
  const { id } = req.params;
  Projects.get(id)
    .then(project => {
      project
        ? req.project
        : res.status(404).json({ message: "That Project Does Not Exist!" });
    })
    .catch(err => {
      res.status(500).json({ error: "Sorry, try again!", err });
    });
  next();
};

const validateAction = (req, res, next) => {
  const { description, notes } = req.body;
  Object.entries(req.body).length === 0 // if the req.body is not there, if we don't add info
    ? res.status(404).json({ message: 'No Action Data' }) // if
    : !description || !notes // else if 
    ? res.status(400).json({ message: 'Missing required info. Please add the description and notes!' }) // if
  : next(); // else
}

const validateProject = (req, res, next) => {
    const { name, description } = req.body;
    Object.entries(req.body).length === 0 
    ? res.status(404).json({ message: 'No Project Data' })
    : !name || !description // send back an error message if missing either info
    ? res.status(400).json({ error: 'Missing required info. Please add a Name & Description!' })
  : next();
}

module.exports = {
  logger,
  validateActionId, 
  validateProjectId,
  validateAction, 
  validateProject
}



