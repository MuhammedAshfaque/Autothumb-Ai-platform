import { Request, Response } from "express";
import { Thumbnail } from "../models/Thumbnail";
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from "@google/genai";
import ai from "../configs/ai";
import path from "path";
import fs, { mkdir } from "fs";
import {v2 as cloudinary} from 'cloudinary';

const stylePrompts = {
    'Bol & Graphic' : 'eye-catching thumbnail, bold typography, vibrant colors, expressive fasical reaction, dramatic lighting, high contrast, click-worthy composition, professional style',
    'Tech/Futuristic' : 'futuristic tech style thumbnail, sleek design, neon colors, digital elements, high-tech vibe, modern typography, sci-fi background, professional style',
    'Minimalist' : 'minimalist thumbnail, clean design, simple typography, ample white space, subtle colors, elegant composition, modern aesthetic, professional style',
    'Photorealistic' : 'photorealistic thumbnail, high detail, lifelike imagery, realistic lighting and shadows, natural colors, sharp focus, professional style',
    'Illustrated' : 'illustrated thumbnail, hand-drawn style, vibrant colors, playful composition, creative typography, artistic elements, engaging design, professional style'
}
const colorSchemeDescriptions: { [key: string]: string } = {
    vibrant: 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    sunset: 'warm sunset tones, oranges, pinks, and purples hues, soft gradients, cinematic glow',
    forest: 'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',
    neon: 'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',
    purple: 'purple-dominant color palette, magenta and violet tones, modern and stylish mood',
    monochrome: 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
    ocean: 'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',
    pastel: 'soft pastel colors, low staturation, gentle tones, calm and friendly aesthetic'
};

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        // Thumbnail generation logic will go here
        const { userId } = req.session;
        const { title, prompt: user_prompt, style, aspect_ratio, color_scheme, text_overlay } = req.body;

        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt, // This should be replaced with actual prompt generation logic
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true,
        });


        /*--------# Now we have to generate the image using some AI service using these prompts #--------*/
        const mode = 'gemini-3-pro-image-preview';
        const generationConfig : GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ['IMAGE'],
            imageConfig: {
                aspectRatio: aspect_ratio || '16:9',
                imageSize: '1K'
            },
            safetySettings: [
                {category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF},
                {category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF},
                {category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF},
                {category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF},
            ]
        }
        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`
        if(color_scheme){
            prompt += `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`
        }
        if(user_prompt){
            prompt += `Also incorporate these details: ${user_prompt}`
        }
        prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional, and impossible to ignore`

        // Generate image using AI service
        const response : any = await ai.models.generateContent({
            model: mode,
            contents: [prompt],
            config: generationConfig
        });

        // Check if the response contains an image
        if (!response?.candidates?.[0]?.content?.parts) {
            throw new Error("No image data returned from AI");
        }

        const parts = response.candidates[0].content.parts;
        let finalBuffer: Buffer | null = null;
        for (const part of parts) {
            if (part.inlineData) {
                finalBuffer = Buffer.from(part.inlineData.data, 'base64');
            }
        }
        const filename = `final-output-${Date.now()}.png`;
        const filePath = path.join('images', filename);


        // Create 'images' directory if it doesn't exist in order to store those images into cloudinary
        fs.mkdirSync('images', { recursive: true });
        if (!finalBuffer) {
            throw new Error("Image generation failed");
        }
        fs.writeFileSync(filePath, finalBuffer!);

        const uploadResult = await cloudinary.uploader.upload(filePath, {resource_type: "image"})
        thumbnail.image_url = uploadResult.url;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        res.json({ message: "Thumbnail generated successfully", thumbnail });
        fs.unlinkSync(filePath);
    } catch (error: any) {
        console.error("Error generating thumbnail:", error);
        res.status(500).json({ message: error.message });
    }
}

// Delete Thumbnail
export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;
        const thumbnail = await Thumbnail.findByIdAndDelete({ _id: id, userId });
        if (!thumbnail) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }  
        res.json({ message: 'Thumbnail deleted successfully' });
    }
    catch (error: any) {
        console.error("Error deleting thumbnail:", error);
        res.status(500).json({ message: error.message });
    }  
}