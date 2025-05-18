import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import dotenv from "dotenv";
import { llm } from "../llm";

export class DemoReactAgent {
     agentTools: any[];
     agentModel: any;  
     memory: any; 

    
     constructor() {
        // Load environment variables from .env file
        dotenv.config();
        this.agentTools  = [new TavilySearchResults({ maxResults: 3 })];
        this.agentModel = new ChatOpenAI({ temperature: 0 });
        this.memory = new MemorySaver()
    }
// Define the tools for the agent to use

createDemoReactAgent(input:string) : any {
    // Removed incorrect llm.bind call
    const agent = createReactAgent({
        llm: new ChatOpenAI({
            modelName: "gpt-4",
            temperature: 0,
            apiKey: process.env.OPENAI_API_KEY,
          }),
        tools: this.agentTools,
        checkpointSaver: this.memory,
    });
    return agent;
}



 async run(input: string): Promise<string> {
    const agent = this.createDemoReactAgent(input);
    const response = await agent.invoke(
        { messages: [new HumanMessage(input)] },
        { configurable: { thread_id: "42" } },
    );
    console.log("Response from agent:", response);
    return response.messages[response.messages.length - 1].content;
}
  
}
