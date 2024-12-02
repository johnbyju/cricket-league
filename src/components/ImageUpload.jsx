import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

export function ImageUpload({ onChange }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        if (onChange) {
          onChange(file);
        }
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="relative border border-gray-800 rounded-lg overflow-hidden cursor-pointer transition-colors hover:border-gray-700"
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative aspect-[3/2] w-full">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <p className="text-white text-sm">Click or drag to change photo</p>
          </div>
        </div>
      ) : (
        <div className="aspect-[3/2] w-full flex flex-col items-center justify-center gap-2 p-4">
          <UploadCloud className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-400">
            {isDragActive ? "Drop photo here" : "Drag photo here"}
          </p>
        </div>
      )}
    </div>
  );
}
