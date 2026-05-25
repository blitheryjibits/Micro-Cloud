"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadModal() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const fileArray = Array.from(incoming);
    setFiles((prev) => [...prev, ...fileArray]);
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const openFilePicker = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e: Event) =>
      handleFiles((e.target as HTMLInputElement).files);
    input.click();
  };

  const handleUpload = () => {
    console.log("Uploading files:", files);
    // TODO: integrate initUploadAction → PUT → completeUploadAction
    router.back();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Files</h2>

        {/* DROPZONE */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={openFilePicker}
          className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}
          `}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 mb-4"
          >
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9" />
            <path d="M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>

          <p className="text-gray-700 font-medium">
            Drag & drop files here, or{" "}
            <span className="text-blue-600 underline">browse</span>
          </p>
        </div>

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Selected Files</h3>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {files.map((file, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-white border rounded-md shadow-sm flex justify-between items-center"
                >
                  <span>{file.name}</span>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
