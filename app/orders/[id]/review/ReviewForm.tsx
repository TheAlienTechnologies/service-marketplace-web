"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Upload, Trash2, Check } from "lucide-react";

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
  const [fileSize] = useState("16 MB");
  const [uploadProgress, setUploadProgress] = useState(40);
  const [hasFile, setHasFile] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const remainingChars = 500 - description.length;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setHasFile(true);
    setUploadProgress(40);
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
      <div className="flex flex-col items-center justify-center pt-24 pb-32">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
          Your feedback has been submitted!
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
          Thanks for your feedback! Your review will help others.
        </p>
        <button
          type="button"
          onClick={() => router.push("/orders")}
          className="text-sm font-medium text-brand-700 dark:text-brand-400 hover:underline"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 px-8 py-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          Share your experience
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Your feedback helps others hire with confidence.
        </p>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Your rating
        </p>
        <div className="flex flex-nowrap items-center gap-6 rounded-full bg-gray-50 dark:bg-gray-800 px-6 py-3 border border-gray-200 dark:border-gray-700">
          {RATINGS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRating(option.value)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200"
            >
              <span
                className={`flex items-center justify-center w-4 h-4 rounded-full border ${
                  rating === option.value
                    ? "border-green-600"
                    : "border-gray-400"
                }`}
              >
                {rating === option.value && (
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                )}
              </span>
              <span
                className={
                  rating === option.value
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300"
                }
              >
                {option.label}
              </span>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: option.value }).map((_, index) => (
                  <Star
                    key={index}
                    className="w-3 h-3 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Tell us more about your experience
          </p>
          <span className="text-xs text-gray-400">(optional)</span>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value.slice(0, 500))
            }
            placeholder="Enter a description..."
            className="w-full h-32 px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent outline-none resize-none"
          />
          <div className="flex justify-end px-4 py-2 text-xs text-gray-400">
            {500 - remainingChars}/500
          </div>
        </div>
      </div>

      {/* Upload section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Share photos of the work
          </p>
          <span className="text-xs text-gray-400">(optional)</span>
        </div>

        <label className="block border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 py-8 text-center cursor-pointer hover:border-gray-400">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <Upload className="w-5 h-5 text-gray-500 mb-1" />
            <span className="font-medium text-brand-700 dark:text-brand-400">
              Click to upload or drag and drop
            </span>
            <span>SVG, PNG, JPG or GIF (max. 800×400px)</span>
          </div>
        </label>

        {hasFile && (
          <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100">
                <div className="w-6 h-6 rounded bg-green-600 flex items-center justify-center text-white text-xs font-semibold">
                  E
                </div>
                <div>
                  <p className="font-medium">{fileName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {fileSize}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasFile(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
              {uploadProgress}%
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 sm:flex-none sm:w-40 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 sm:flex-none sm:w-44 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 transition-colors"
        >
          Submit review
        </button>
      </div>
    </form>
  );
}


