import React, { useState } from "react";
import ImageIcon from "@/icons/ImageIcon";

interface Props {
  handleFileChange: (file: File, blobUrl: string) => void;
}

function ImageInput({ handleFileChange }: Props) {
  const [blobUrl, setBlobUrl] = useState("");

  return (
    <label
      className="flex flex-col items-center justify-center w-24 h-24 p-2 gap-1 cursor-pointer 
                 bg-white text-primary border-2 border-dashed border-primary rounded-lg"
    >
      <ImageIcon className="w-12 h-12" />
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            if (blobUrl) URL.revokeObjectURL(blobUrl);
            const newBlobUrl = URL.createObjectURL(file);
            setBlobUrl(newBlobUrl);
            handleFileChange(file, newBlobUrl);
          }
        }}
      />
    </label>
  );
}

export default ImageInput;
