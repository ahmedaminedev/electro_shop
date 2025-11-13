import React, { useState, useEffect } from 'react';
import type { Product, Category } from '../../types';
import { XMarkIcon } from '../IconComponents';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (productData: Omit<Product, 'id'>) => void;
    product: Product | null;
    categories: Category[];
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, product, categories }) => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: 0,
        oldPrice: 0,
        imageUrl: '',
        discount: 0,
        category: '',
        description: '',
        promo: false,
    });
    
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                brand: product.brand,
                price: product.price,
                oldPrice: product.oldPrice || 0,
                imageUrl: product.imageUrl,
                discount: product.discount || 0,
                category: product.category,
                description: product.description || '',
                promo: product.promo || false,
            });
        } else {
            // Reset for new product
             setFormData({
                name: '', brand: '', price: 0, oldPrice: 0, imageUrl: '', discount: 0,
                category: categories[0]?.name || '', description: '', promo: false,
            });
        }
    }, [product, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };
    
    if (!isOpen) return null;

    const allCategoryNames = categories.flatMap(c => 
        [c.name, ...(c.subCategories || []), ...(c.megaMenu?.flatMap(m => m.items.map(i => i.name)) || [])]
    );
    const uniqueCategoryNames = [...new Set(allCategoryNames)];


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 id="modal-title" className="text-xl font-bold">{product ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><XMarkIcon className="w-6 h-6"/></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                    <InputField name="name" label="Nom du produit" value={formData.name} onChange={handleChange} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField name="brand" label="Marque" value={formData.brand} onChange={handleChange} required />
                        <InputField name="category" label="Catégorie" value={formData.category} onChange={handleChange} as="select" options={uniqueCategoryNames} required />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField name="price" label="Prix (DT)" type="number" value={formData.price} onChange={handleChange} required />
                        <InputField name="oldPrice" label="Ancien Prix (DT)" type="number" value={formData.oldPrice} onChange={handleChange} />
                        <InputField name="discount" label="Remise (%)" type="number" value={formData.discount} onChange={handleChange} />
                    </div>
                    <InputField name="imageUrl" label="URL de l'image" value={formData.imageUrl} onChange={handleChange} required />
                    <InputField name="description" label="Description" value={formData.description} onChange={handleChange} as="textarea" />
                    <div className="flex items-center">
                        <input type="checkbox" id="promo" name="promo" checked={formData.promo} onChange={handleChange} className="h-4 w-4 rounded text-red-600 focus:ring-red-500 border-gray-300"/>
                        <label htmlFor="promo" className="ml-2 text-sm font-medium">En promotion</label>
                    </div>

                    <div className="flex justify-end pt-4 gap-3">
                        <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">Annuler</button>
                        <button type="submit" className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700">Sauvegarder</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ name, label, value, onChange, type = 'text', as = 'input', options = [], required = false }: any) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        {as === 'input' && <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500" />}
        {as === 'textarea' && <textarea id={name} name={name} value={value} onChange={onChange} rows={3} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500" />}
        {as === 'select' && (
            <select id={name} name={name} value={value} onChange={onChange} required={required} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500">
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        )}
    </div>
);
