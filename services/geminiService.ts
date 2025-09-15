import { GoogleGenAI, Type } from "@google/genai";
import type { Presentation, Slide, GenerationConfig } from '../types';
import { TEXT_MODEL, IMAGE_MODEL, VIDEO_MODEL } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const slideSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'The title of the slide (max 8 words).' },
    bullets: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3 to 5 short bullet points for the slide content.'
    },
    speaker_notes: { type: Type.STRING, description: '2-4 sentences of speaker notes.' },
    image_prompt: { type: Type.STRING, description: 'A short, descriptive prompt for an AI image generator to create a relevant visual for the slide. This prompt should NOT include styling information like "vector", "illustration", etc.' }
  },
  required: ['title', 'bullets', 'speaker_notes', 'image_prompt']
};

const presentationSchema = {
  type: Type.OBJECT,
  properties: {
    slides: {
      type: Type.ARRAY,
      items: slideSchema,
    }
  },
  required: ['slides']
};


async function generateSlidesContent(topic: string, slidesCount: number, stylePrompt?: string): Promise<Omit<Slide, 'id' | 'imageUrl'>[]> {
  const baseSystemInstruction = "You are a professional presentation writer. You must output valid JSON that adheres to the provided schema. Do not output anything other than the JSON object.";
  const styleInstruction = stylePrompt ? `The presentation should have the following style and tone: ${stylePrompt}.` : '';
  const fullSystemInstruction = `${baseSystemInstruction} ${styleInstruction}`;

  const prompt = `Create a presentation about "${topic}". Produce exactly ${slidesCount} slides. For each slide, provide a title, 3 to 5 bullet points, speaker notes, and a descriptive image prompt.`;

  try {
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        systemInstruction: fullSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: presentationSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    if (!parsed.slides || !Array.isArray(parsed.slides)) {
        throw new Error("Invalid JSON structure received from API.");
    }

    return parsed.slides;
  } catch (error) {
    console.error("Error generating slide content:", error);
    throw new Error("Failed to generate slide content from the AI model. Please check the topic and try again.");
  }
}

export async function generateImageForPrompt(prompt: string, stylePrompt?: string): Promise<string> {
  const basePrompt = `A clean, modern image showing "${prompt}", centered composition, high contrast, 16:9 aspect ratio, suitable for a presentation slide.`;
  const fullPrompt = stylePrompt ? `${basePrompt} Style: ${stylePrompt}` : `${basePrompt} Style: flat-vector illustration, corporate tech, light gradients, professional, clean lines.`;
  
  try {
    const response = await ai.models.generateImages({
      model: IMAGE_MODEL,
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No images were generated.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    // Return a placeholder on failure
    return 'https://picsum.photos/seed/error/1280/720';
  }
}

async function generateIntroVideo(topic: string): Promise<string> {
    // This is a simulation of a long-running video generation task.
    // In a real app, this would be a backend worker process.
    // We are using a placeholder video to demonstrate the UX.
    console.log(`Simulating video generation for topic: ${topic} with model ${VIDEO_MODEL}`);
    return new Promise(resolve => {
        setTimeout(() => {
            // Placeholder video URL
            resolve("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
        }, 8000); // Simulate 8-second generation time
    });
}


export async function generateSlidesAndMedia(config: GenerationConfig, setStep: (step: string) => void): Promise<Presentation> {
    const { topic, slidesCount, includeImages, includeVideo, template } = config;

    // Step 1: Generate slide text content
    setStep(`Crafting presentation outline for "${topic}"...`);
    const slideContents = await generateSlidesContent(topic, slidesCount, template?.stylePrompt);

    const presentation: Presentation = {
        title: topic,
        slides: slideContents.map((content, index) => ({
            ...content,
            id: `slide-${index}-${Date.now()}`
        })),
    };

    // Step 2: Generate images (if requested)
    if (includeImages) {
        setStep(`Generating visuals for ${presentation.slides.length} slides...`);
        const imagePromises = presentation.slides.map(slide => generateImageForPrompt(slide.image_prompt, template?.stylePrompt));
        const imageUrls = await Promise.all(imagePromises);
        presentation.slides.forEach((slide, index) => {
            slide.imageUrl = imageUrls[index];
        });
    }

    // Step 3: Generate intro video (if requested)
    if (includeVideo) {
        setStep("Producing animated intro video...");
        presentation.videoUrl = await generateIntroVideo(topic);
    }
    
    setStep('Finalizing presentation...');
    await new Promise(res => setTimeout(res, 1000)); // Short delay for effect

    return presentation;
}