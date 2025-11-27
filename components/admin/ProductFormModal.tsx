
import React, { useState, useEffect, useMemo } from 'react';
import type { Product, Category } from '../../types';
import { XMarkIcon, PlusIcon, TrashIcon } from '../IconComponents';
import { ImageInput } from '../ImageInput';
import { useToast } from '../ToastContext'; // Using Toast for validation errors

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (productData: Omit<Product, 'id'>) => void;
    product: Product | null;
    categories: Category[];
}

type Specification = { name: string; value: string; };

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, product, categories }) => {
    const { addToast } = useToast();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        oldPrice: 0,
        discount: 0,
        imageUrl: '',
        category: '',
        description: '',
        quantity: 0,
        specifications: [] as Specification[],
    });
    
    const finalPrice = useMemo(() => {
        const basePrice = formData.oldPrice || 0;
        const discount = formData.discount || 0;
        if (basePrice > 0 && discount > 0) {
            const effectiveDiscount = Math.min(discount, 100);
            return basePrice * (1 - effectiveDiscount / 100);
        }
        return basePrice;
    }, [formData.oldPrice, formData.discount]);

    const isPromo = useMemo(() => (formData.discount || 0) > 0 && (formData.oldPrice || 0) > 0, [formData.discount, formData.oldPrice]);

    useEffect(() => {
        if (product) {
            const basePrice = product.oldPrice || product.price;
            setFormData({
                name: product.name,
                brand: product.brand,
                oldPrice: basePrice,
                discount: product.discount || 0,
                imageUrl: product.imageUrl,
                category: product.category,
                description: product.description || '',
                quantity: product.quantity,
                specifications: product.specifications || [],
            });
        } else {
             setFormData({
                name: '', brand: '', oldPrice: 0, discount: 0, imageUrl: '',
                category: '', description: '', quantity: 0, specifications: [],
            });
        }
        setStep(1);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        let processedValue: string | number = value;
        if (type === 'number') {
            processedValue = parseFloat(value) || 0;
            if (name === 'discount') {
                processedValue = Math.max(0, processedValue);
            }
        }
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleImageChange = (value: string) => {
        setFormData(prev => ({ ...prev, imageUrl: value }));
    };
    
    const handleSpecChange = (index: number, field: 'name' | 'value', value: string) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index] = { ...newSpecs[index], [field]: value };
        setFormData(prev => ({ ...prev, specifications: newSpecs }));
    };

    const addSpec = () => {
        setFormData(prev => ({...prev, specifications: [...prev.specifications, {name: '', value: ''}]}));
    };

    const removeSpec = (index: number) => {
        setFormData(prev => ({...prev, specifications: prev.specifications.filter((_, i) => i !== index)}));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            addToast("Le nom du produit est obligatoire.", "error");
            return false;
        }
        if (formData.oldPrice <= 0) {
            addToast("Le prix original doit être supérieur à 0.", "error");
            return false;
        }
        if (formData.quantity < 0) {
            addToast("La quantité ne peut pas être négative.", "error");
            return false;
        }
        if (!formData.category) {
            addToast("Veuillez sélectionner une catégorie.", "error");
            return false;
        }
        if (!formData.imageUrl) {
            addToast("L'image du produit est obligatoire.", "error");
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const productData: Omit<Product, 'id'> = {
            name: formData.name,
            brand: formData.brand,
            category: formData.category,
            description: formData.description,
            imageUrl: formData.imageUrl,
            quantity: formData.quantity,
            price: finalPrice,
            oldPrice: isPromo ? formData.oldPrice : undefined,
            discount: isPromo ? formData.discount : undefined,
            promo: isPromo,
            specifications: formData.specifications.filter(s => s.name.trim() && s.value.trim()),
        };
        onSave(productData);
        onClose();
    };
    
    if (!isOpen) return null;

    const allCategoryNames = categories.flatMap(c => 
        [c.name, ...(c.subCategories || []), ...(c.megaMenu?.flatMap(m => m.items.map(i => i.name)) || [])]
    );
    const uniqueCategoryNames = [...new Set(allCategoryNames)].sort();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 id="modal-title" className="text-xl font-bold">{product ? 'Modifier le produit' : 'Ajouter un produit'} (Étape {step}/2)</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><XMarkIcon className="w-6 h-6"/></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                    {step === 1 && (
                        <>
                            <InputField name="name" label="Nom du produit" value={formData.name} onChange={handleChange} required />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField name="brand" label="Marque" value={formData.brand} onChange={handleChange} required />
                                <InputField name="category" label="Catégorie" value={formData.category} onChange={handleChange} as="select" options={uniqueCategoryNames} required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <InputField name="oldPrice" label="Prix Original (DT)" type="number" value={formData.oldPrice} onChange={handleChange} required />
                                <InputField name="discount" label="Remise (%)" type="number" value={formData.discount} onChange={handleChange} />
                                <InputField name="price" label="Prix Actuel (DT)" value={finalPrice.toFixed(3)} readOnly />
                            </div>
                            <InputField name="quantity" label="Quantité en stock" type="number" value={formData.quantity} onChange={handleChange} required />
                            <ImageInput label="Image du produit" value={formData.imageUrl} onChange={handleImageChange} required />
                            <InputField name="description" label="Description" value={formData.description} onChange={handleChange} as="textarea" />
                        </>
                    )}
                    {step === 2 && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Caractéristiques dynamiques</h3>
                                <button type="button" onClick={addSpec} className="text-sm bg-green-100 text-green-700 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 hover:bg-green-200">
                                    <PlusIcon className="w-4 h-4" /> Ajouter
                                </button>
                            </div>
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                {formData.specifications.map((spec, index) => (
                                    <div key={index} className="grid grid-cols-10 gap-2 items-center">
                                        <input type="text" placeholder="Attribut (ex: Moteur)" value={spec.name} onChange={(e) => handleSpecChange(index, 'name', e.target.value)} className="col-span-4 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500" />
                                        <input type="text" placeholder="Valeur" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} className="col-span-5 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500" />
                                        <button type="button" onClick={() => removeSpec(index)} className="col-span-1 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 flex justify-center">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                {formData.specifications.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Aucune caractéristique ajoutée.</p>}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end pt-4 gap-3">
                        {step === 1 && (
                            <>
                                <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">Annuler</button>
                                <button type="button" onClick={() => setStep(2)} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">Suivant</button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <button type="button" onClick={() => setStep(1)} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">Précédent</button>
                                <button type="submit" className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700">Sauvegarder</button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ name, label, value, onChange, type = 'text', as = 'input', options = [], required = false, readOnly = false }: any) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        {as === 'input' && <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} readOnly={readOnly} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 read-only:bg-gray-200 dark:read-only:bg-gray-800" />}
        {as === 'textarea' && <textarea id={name} name={name} value={value} onChange={onChange} rows={3} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500" />}
        {as === 'select' && (
            <select id={name} name={name} value={value} onChange={onChange} required={required} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500">
                <option value="">-- Sélectionnez --</option>
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        )}
    </div>
);
