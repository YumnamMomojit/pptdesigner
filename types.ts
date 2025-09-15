export interface Slide {
  id: string;
  title: string;
  bullets: string[];
  speaker_notes: string;
  image_prompt: string;
  imageUrl?: string;
}

export interface Presentation {
  title: string;
  slides: Slide[];
  videoUrl?: string;
}

export interface Template {
    id: string;
    name: string;
    category: string;
    description: string;
    previewImageUrl: string;
    stylePrompt: string;
}

export interface GenerationConfig {
  topic: string;
  slidesCount: number;
  includeImages: boolean;
  includeVideo: boolean;
  template?: Template;
}
