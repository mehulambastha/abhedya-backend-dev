const swaggerAutogen = require('swagger-autogen')();

const doc = {
 info: {
// name of your api
  title: 'Abhedya Backend',
  description: 'Documentation for abhedya backend'
 },
 host: 'localhost:5001'
};

const outputFile = './swagger-output.json';
// assuming your routes are located in app.js
const routes = ['./index.js', './routes/playRoute.js', './routes/userRoutes.js'];
swaggerAutogen(outputFile, routes, doc);