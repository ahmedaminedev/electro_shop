
import React, { useState } from 'react';
import { LinkIcon, CloudArrowUpIcon, PhotoIcon, TrashIcon } from './IconComponents';

interface ImageInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export const ImageInput: React.FC<ImageInputProps> = ({ label, value, onChange, required = false }) => {
    const [mode, setMode] = useState<'url' | 'file'>('url');
    const [dragActive, setDragActive] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        processFile(file);
    };

    // Client-side Image Compression & Resizing
    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; // Resize to reasonable max width for e-commerce
                    const scaleSize = MAX_WIDTH / img.width;
                    const width = (scaleSize < 1) ? MAX_WIDTH : img.width;
                    const height = (scaleSize < 1) ? img.height * scaleSize : img.height;

                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    
                    // Compress to JPEG with 0.7 quality
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const processFile = async (file?: File) => {
        if (file) {
            setIsCompressing(true);
            try {
                // If it's an image, compress it. Else read as is.
                if (file.type.startsWith('image/')) {
                    const compressedBase64 = await compressImage(file);
                    onChange(compressedBase64);
                } else {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                            onChange(reader.result);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            } catch (error) {
                console.error("Error processing image", error);
                alert("Erreur lors du traitement de l'image.");
            } finally {
                setIsCompressing(false);
            }
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const clearImage = () => {
        onChange('');
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg w-fit">
                <button
                    type="button"
                    onClick={() => setMode('url')}
                    className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-all ${
                        mode === 'url' 
                        ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white font-medium' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Lien URL
                </button>
                <button
                    type="button"
                    onClick={() => setMode('file')}
                    className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-all ${
                        mode === 'file' 
                        ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white font-medium' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    <CloudArrowUpIcon className="w-4 h-4 mr-2" />
                    Importer du PC
                </button>
            </div>

            {/* Input Area */}
            {mode === 'url' ? (
                <div className="relative">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        required={required}
                        placeholder="https://exemple.com/image.jpg"
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
            ) : (
                <div 
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={isCompressing}
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                        {isCompressing ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        ) : (
                            <CloudArrowUpIcon className="w-8 h-8 text-gray-400" />
                        )}
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isCompressing ? (
                                <span className="font-semibold text-red-600">Optimisation en cours...</span>
                            ) : (
                                <>
                                    <span className="font-semibold text-red-600">Cliquez pour importer</span> ou glissez-déposez
                                </>
                            )}
                        </p>
                        <p className="text-xs text-gray-400">Image optimisée automatiquement (JPEG, 800px)</p>
                    </div>
                </div>
            )}

            {/* Preview */}
            {value && (
                <div className="relative mt-2 w-32 h-32 group bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    <img 
                        src={value} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        title="Supprimer l'image"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};
