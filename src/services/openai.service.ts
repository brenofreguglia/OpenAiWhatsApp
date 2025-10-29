import { Injectable, OnModuleInit } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class OpenAIService implements OnModuleInit{

    client: OpenAI;

    onModuleInit() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

}
