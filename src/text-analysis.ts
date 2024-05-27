import { Body, Controller, Post } from '@nestjs/common';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import * as dotenv from "dotenv";
import { textanalysis,getSafetySettings } from 'C:\\Users\\Görkem\\geminiD\\deneme.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

@Controller("text-analysis")
export class TextAnalysisController {
    @Post()
    async analyzetext(@Body("userInput") userInput: string) {
        try {
            const safesettings = {
                [HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT]: HarmBlockThreshold.BLOCK_NONE,
                [HarmCategory.HARM_CATEGORY_HARASSMENT]: HarmBlockThreshold.BLOCK_NONE,
            };

            const safeTextResult = await textanalysis(userInput, safesettings);
            const generatedText = safeTextResult.join(""); // Gelen metin parçalarını birleştir
            const isSafe = !generatedText.includes("Bu cümle uygunsuzdur"); // Uygunsuzluk kontrolü

            // Cümle uygunsuzsa
            if (!isSafe) {
                return "Cümle uygunsuz.";
            } else {
                return "Cümle uygunsuz değil.";
            }
        } catch (error) {
            throw new Error(`Hata oluştu: ${error.message}`);
        }
    }
}
