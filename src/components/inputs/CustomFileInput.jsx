import React, { useState, useRef } from 'react';
import { ArrowUpIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const CustomFileInput = ({ 
  accept = '*', 
  multiple = false, 
  onFileChange,
  className
}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    
    if (onFileChange) {
      onFileChange(selectedFiles);
    }
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    
    if (onFileChange) {
      onFileChange(updatedFiles);
    }

    // Reset input to allow re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-md relative">
      <div 
        onClick={triggerFileInput} 
        className={className ? className : `
          flex items-center justify-center 
          w-full p-4 
          border-2 border-dashed border-gray-300 
          rounded-lg cursor-pointer 
          hover:border-blue-500 
          transition-colors duration-300
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />
        <div className="flex text-center">
          <img src="/Action.png" alt="Upload" className="w-5 h-5 mr-2" />
          <p className="text-sm text-white">
            {multiple ? 'Cargar archivos' : 'Cargar un archivo'}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          {/* <h4 className="mb-2 text-sm font-medium text-gray-700">
            Selected Files:
          </h4> */}
          <ul className="absolute top-[75%] left-0">
            {files.map((file, index) => (
              <li 
                key={file.name} 
                className="
                  flex items-center justify-between 
                  p-1 bg-gray-100 
                  rounded-md 
                  shadow-sm
                "
              >
                <span className="text-sm truncate">{file.name}</span>
                <button 
                  onClick={() => removeFile(index)}
                  className="
                    font-bold
                    text-red-500 
                    hover:text-red-700 
                    focus:outline-none
                  "
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;