import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import Swal from "sweetalert2";


export function ImageUpload({ onChange,file,setFile }) {
  const [preview, setPreview] = useState(null); // Preview of the image

  // const onDrop = useCallback(
  //   (acceptedFiles = []) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       // Create a preview URL
  //       const previewUrl = URL.createObjectURL(file);
  //       setPreview(previewUrl); // Update the local preview state
  //       onChange(previewUrl); // Pass the preview URL to the parent via onChange
  //     }
  //   },
  //   [onChange]
  // );

  const MAX_FILE_SIZE_MB = 3; // Maximum allowed size in MB

const onDrop = useCallback((acceptedFiles = []) => {
  const file = acceptedFiles[0];
  if (file) {
    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
    if (fileSizeInMB > MAX_FILE_SIZE_MB) {
       Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: `Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`,
        });
      return; // Stop further processing
    }

    // Process file if size is valid
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setPreview(base64Image); // Update the preview
      setFile(file); // Store the file for backend submission
      if (onChange) {
        onChange(file); // Call onChange handler with the file
      }
    };
    reader.readAsDataURL(file); // Convert the image to a Base64 string for preview
  }
}, [onChange]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });
  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    const storedFile = localStorage.getItem("uploadedFile");
  
    if (storedImage && storedFile) {
      const fileData = JSON.parse(storedFile); // Retrieve file metadata
      const file = new File([new Blob([storedImage])], fileData.name, {
        type: fileData.type,
      });
  
      setPreview(storedImage); // Set preview from localStorage
      setFile(file); // Rebuild file object from metadata
  
      // Optionally call onChange if needed
     
    }
  }, []);
  

  return (
    <div
      {...getRootProps()}
      className="relative border border-gray-800 rounded-lg overflow-hidden cursor-pointer transition-colors hover:border-gray-700"
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative aspect-[3/2] w-full">
          <img
            src={preview} // Use local preview
            alt="Uploaded Preview"
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
            {isDragActive ? "Drop Your Image" : "Upload less than 3MB"}
          </p>
        </div>
      )}
    </div>
  );
}
