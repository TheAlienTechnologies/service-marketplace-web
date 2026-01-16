"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Upload, Trash2, Check, FileVideo } from "lucide-react";
import { cn } from "@/lib/utils";

const RATINGS = [
  { value: 1, label: "Very poor" },
  { value: 2, label: "Poor" },
  { value: 3, label: "Average" },
  { value: 4, label: "Good" },
  { value: 5, label: "Excellent" },
] as const;

interface ReviewFormProps {
  orderId: string;
}

export function ReviewForm({ orderId }: ReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("Project recording.mp4");
  const [fileSize] = useState("10 MB");
  const [uploadProgress, setUploadProgress] = useState(40);
  const [hasFile, setHasFile] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const remainingChars = 500 - description.length;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setHasFile(true);
    setUploadProgress(40); // Mock progress start
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Mock submit – in future, send to API
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center pt-32 pb-40">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Your feedback has been submitted!
        </h2>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Thanks for your feedback! Your review will help others.
        </p>
        <button
          type="button"
          onClick={() => router.push("/dashboard/orders")}
          className="text-sm font-bold text-green-700 hover:text-green-800 hover:underline border-b border-green-700 pb-0.5"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Share your experience
        </h1>
        <p className="text-sm text-gray-500">
          Your feedback helps others hire with confidence.
        </p>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <p className="text-sm font-bold text-gray-900 mb-3">Your rating</p>
        <div className="flex flex-wrap items-center gap-4">
          {RATINGS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRating(option.value)}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                  rating === option.value
                    ? "border-green-600"
                    : "border-gray-300 group-hover:border-green-500"
                )}
              >
                {rating === option.value && (
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                )}
              </div>
              <span className="text-sm text-gray-700 font-medium ml-1">
                {option.label}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "w-3 h-3",
                      index < option.value
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                    )}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-bold text-gray-900">
            Tell us more about your experience
          </p>
          <span className="text-xs text-gray-400">(optional)</span>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-green-500 focus-within:border-green-500 transition-all">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 500))}
            placeholder="Enter a description..."
            className="w-full h-32 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none resize-none"
          />
          <div className="flex justify-end px-4 py-2 text-xs text-gray-400 bg-gray-50/50 border-t border-gray-100">
            {500 - remainingChars}/500
          </div>
        </div>
      </div>

      {/* Upload section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-bold text-gray-900">
            Share photos of the work
          </p>
          <span className="text-xs text-gray-400">(optional)</span>
        </div>

        {!hasFile && (
          <label className="flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-white px-6 py-10 text-center cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3 text-gray-400">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm text-green-700 font-semibold mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400">
              SVG, PNG, JPG or GIF (max. 800×400px)
            </p>
          </label>
        )}

        {hasFile && (
          <div className="border border-gray-200 rounded-lg px-4 py-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center text-green-600">
                  <FileVideo className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {fileName}
                  </p>
                  <p className="text-xs text-gray-500">{fileSize}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasFile(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#15803d] rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {uploadProgress}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 sm:flex-none sm:w-32 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 sm:flex-none sm:w-48 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-[#15803d] hover:bg-[#14532d] transition-colors shadow-sm"
        >
          Submit review
        </button>
      </div>
    </form>
  );
}
