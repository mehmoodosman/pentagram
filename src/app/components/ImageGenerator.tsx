"use client";

import { useState } from "react";

interface ImageGeneratorProps {
  generateImage: (
    text: string
  ) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}

export default function ImageGenerator({ generateImage }: ImageGeneratorProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const data = await generateImage(inputText);

      if (!data.success) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (data.imageUrl) {
        const img = new Image();
        const url = data.imageUrl;
        img.onload = () => {
          setImageUrl(url);
        };
        img.src = url;
      } else {
        throw new Error("No image URL received");
      }

      setInputText("");
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate image"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // TODO: Update the UI here to show the images generated

    <div className="min-h-screen flex flex-col justify-between p-8">
      <main className="flex-1 flex flex-col items-center gap-8">
        {error && (
          <div className="w-full max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
            <img
              src={imageUrl}
              alt="Generated Image"
              className="w-full h-full object-cover object-center rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out bg-black dark:bg-white dark:filter dark:brightness-90 dark:contrast-110 dark:grayscale dark:blur-[2px] dark:drop-shadow-[0 0 10px #000] dark:rounded-lg dark:ring-2 dark:ring-white dark:ring-opacity-10 dark:ring-offset-2 dark:ring-offset-black dark:ring-offset-opacity-20 dark:ring-offset-blur-[2px] dark:ring-offset-spread-[2px] dark:ring-inset dark:ring-inset-black dark:ring-inset-opacity-20 dark:ring-inset-blur-[2px] dark:ring-inset-spread-[2px] dark:ring-inset-offset-[2px] dark:ring-inset-offset-black dark:ring-inset-offset-opacity-20 dark:ring-inset-offset-blur-[2px] dark:ring-inset-offset-spread-[2px] dark:ring-inset-offset-blur-[2px] dark:ring-inset-offset-spread-[2px]"
            />
          </div>
        )}
      </main>

      <footer className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Describe the image you want to generate..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}
