'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { apiService } from '@/lib/api';
import { toast } from 'react-toastify';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

interface DocumentFile {
  file: File;
  type: string;
  name: string;
  uploadProgress: number;
  isUploaded: boolean;
}

export function ProviderDocumentsForm() {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { nextProviderStep, previousProviderStep } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newDocuments: DocumentFile[] = [];
    
    Array.from(files).forEach((file) => {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/webp'
      ];
      
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name}: Please select PDF, JPG, PNG, or WebP files only`);
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error(`${file.name}: File size must be less than 5MB`);
        return;
      }

      // Determine document type based on filename
      let docType = 'Other';
      const fileName = file.name.toLowerCase();
      if (fileName.includes('certificate') || fileName.includes('cert')) {
        docType = 'Certificate';
      } else if (fileName.includes('license') || fileName.includes('licence')) {
        docType = 'License';
      } else if (fileName.includes('id') || fileName.includes('identity')) {
        docType = 'ID Document';
      } else if (fileName.includes('portfolio') || fileName.includes('work')) {
        docType = 'Portfolio';
      }

      newDocuments.push({
        file,
        type: docType,
        name: file.name,
        uploadProgress: 0,
        isUploaded: false
      });
    });

    setDocuments(prev => [...prev, ...newDocuments]);
    
    // Simulate upload progress for each new document
    newDocuments.forEach((doc, index) => {
      simulateUpload(documents.length + index);
    });
  };

  const simulateUpload = (docIndex: number) => {
    const interval = setInterval(() => {
      setDocuments(prev => {
        const updated = [...prev];
        if (updated[docIndex]) {
          updated[docIndex].uploadProgress += 10;
          if (updated[docIndex].uploadProgress >= 100) {
            updated[docIndex].isUploaded = true;
            clearInterval(interval);
          }
        }
        return updated;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (documents.length === 0) {
      toast.error('Please upload at least one document');
      return;
    }

    const unfinishedUploads = documents.filter(doc => !doc.isUploaded);
    if (unfinishedUploads.length > 0) {
      toast.error('Please wait for all documents to finish uploading');
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Documents uploaded successfully!');
      nextProviderStep();
    } catch (error) {
      console.error('Failed to upload documents:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload documents';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    previousProviderStep();
  };

  const allDocumentsUploaded = documents.length > 0 && documents.every(doc => doc.isUploaded);

  return (
    <div className="p-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>5/5</span>
          <span>80%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[30px] font-bold leading-[38px] text-gray-900 dark:text-white font-inter tracking-[0%] mb-6">
          Let's finish setting up your account
        </h1>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Verification Documents
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Upload Training or Certification Documents
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer
            ${isDragging 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className={`w-8 h-8 mx-auto mb-3 ${isDragging ? 'text-green-500' : 'text-gray-400'}`} />
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
            Click to upload
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            JPG, PNG, PDF (max. 5MB)
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Uploaded Documents */}
      {documents.length > 0 && (
        <div className="mb-8 space-y-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex-shrink-0">
                  {doc.isUploaded ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 truncate">
                    {doc.name}
                  </p>
                  {!doc.isUploaded && (
                    <div className="mt-1">
                      <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-1">
                        <div
                          className="bg-green-600 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${doc.uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {Math.round(doc.file.size / 1024)} KB
                </span>
                {!doc.isUploaded && (
                  <span className="text-xs text-green-600 dark:text-green-400">
                    {doc.uploadProgress}%
                  </span>
                )}
                <button
                  onClick={() => removeDocument(index)}
                  className="p-1 text-green-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={handlePrevious}
          className="text-gray-600 hover:text-gray-700"
        >
          ← Previous
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={!allDocumentsUploaded || isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6"
        >
          {isLoading ? 'Submitting...' : !allDocumentsUploaded ? 'Upload Documents' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
