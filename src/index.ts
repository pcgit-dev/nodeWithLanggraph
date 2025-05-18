import 'reflect-metadata'; // Required for routing-controllers
import { createExpressServer } from 'routing-controllers';
import ConversationalAgentController from './controller/ConversationalAgenTController';
// Removed unused import as 'HumanMessage' is not used in the code
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import {DemoReactAgent} from './agents/demoReactAgent' ; 

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
import { llm } from './llm';

// Add a root route
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the Conversational Agent API!');
});

app.get('/test', (_req: Request, res: Response) => {
  const agent = new DemoReactAgent();

  // Call the run method with an input string
  const input = "How is the weather of Dubai today?";
  const response =  agent.run(input);

  res.send(response);
});

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req:Request, res:Response) {
  console.log(req.body) // populated with parsed body
  // Wrap the input in a HumanMessage
  const message = new HumanMessage(req.body.input);
  llm.invoke([message]).then((response) => {
    if (response) {
      console.log('LLM response:'+response);
      res.send(response);
    } else {
      res.status(500).send('Invalid response from LLM');
    }
  }
  ).catch((error) => {
    console.error('Error invoking LLM:', error);
    res.status(500).send('Internal Server Error');
  });
})

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

