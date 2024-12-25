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
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 bg-background">
      <main className="flex-1 flex flex-col items-center gap-6 sm:gap-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
          Generate AI Images
        </h1>

        {error && (
          <div className="w-full max-w-2xl p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-2xl text-red-800 dark:bg-red-900/90 dark:text-red-100 shadow-sm">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="w-full max-w-2xl aspect-[704/832] rounded-2xl overflow-hidden shadow-xl transition-all">
            <img
              src={imageUrl}
              alt="Generated Image"
              className="w-full h-full object-cover object-center rounded-2xl transition duration-300 ease-out hover:scale-102"
              style={{ aspectRatio: "704/832" }}
            />
          </div>
        )}

        {!imageUrl && !error && (
          <div className="w-full max-w-2xl aspect-[704/832] rounded-2xl bg-black/[.03] dark:bg-white/[.03] border-2 border-dashed border-black/10 dark:border-white/10 flex items-center justify-center">
            <p className="text-foreground/50 text-center px-4">
              Your generated image will appear here
            </p>
          </div>
        )}
      </main>

      <footer className="w-full max-w-3xl mx-auto mt-6 sm:mt-8 sticky bottom-4 sm:bottom-8">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2 p-2 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl shadow-lg border border-black/5 dark:border-white/10">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 p-4 rounded-xl bg-black/[.03] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.12] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-black/40 dark:placeholder-white/40 transition-all"
              placeholder="Describe the image you want to generate..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}
