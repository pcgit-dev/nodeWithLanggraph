import { Request, Response } from 'express';
import { Post, JsonController } from 'routing-controllers';

@JsonController()
class ConversationalAgentController {
    @Post('/chat')
    async chat(req: Request, res: Response): Promise<void> {
        try {
            const userInput = req.body.input;
            console.log('User input received:', userInput);
             // Here you would typically process the input with your conversational agent logic
            const responseMessage = `You said: ${userInput}`;
            res.json({ response: responseMessage });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default ConversationalAgentController;