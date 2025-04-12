import 'reflect-metadata'; // Required for routing-controllers
import { createExpressServer } from 'routing-controllers';
import ConversationalAgentController from './controller/ConversationalAgenTController';


var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

console.log('Starting server...');
// Create an Express server and register the controller
const app = createExpressServer({
  controllers: [ConversationalAgentController], // Register your controllers here
});
console.log('Controllers registered:', ConversationalAgentController);

import { Request, Response } from 'express';

// Add a root route
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the Conversational Agent API!');
});

app.get('/test', (_req: Request, res: Response) => {
  res.send('Test route is working!');
});

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req:Request, res:Response) {
  console.log(req.body) // populated with parsed body
  res.send(req.body);
})

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

