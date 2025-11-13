import React, { useState, useEffect } from 'react';
import type { HeroSlide, DestockageAd, ImagePromoAd, AudioPromoAd } from '../../types';
import { XMarkIcon, PlusIcon, TrashIcon } from '../IconComponents';
import type { AdSlot } from './ManageAdsPage';

interface AdEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedData: any) => void;
    slot: AdSlot;
}

const FormField: React.FC<{ label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; type?: string; as?: 'input' | 'textarea' }> = 
({ label, name, value, onChange, type = "text", as="input" }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {as === 'input' ? (
             <input type={type} id={name} name={name} value={value} onChange={onChange} className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
        ) : (
             <textarea id={name} name={name} value={value as string} onChange={onChange} rows={3} className="mt-1 block w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
        )}
    </div>
);

const HeroForm: React.FC<{ data: HeroSlide[], onChange: (newData: HeroSlide[]) => void }> = ({ data, onChange }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const newSlides = [...data];
        newSlides[index] = { ...newSlides[index], [name]: value };
        onChange(newSlides);
    };

    const addSlide = () => {
        const newSlide = { id: Date.now(), bgImage: "https://picsum.photos/id/10/1200/400", title: "Nouveau Slide", subtitle: "Description du slide", buttonText: "Découvrir" };
        onChange([...data, newSlide]);
        setActiveSlide(data.length);
    }
    
    const removeSlide = (index: number) => {
        if (data.length <= 1) {
            alert("Il doit y avoir au moins un slide.");
            return;
        }
        onChange(data.filter((_, i) => i !== index));
        setActiveSlide(prev => Math.max(0, prev -1));
    }
    
    const currentSlideData = data[activeSlide];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 border-b dark:border-gray-600 pb-2 mb-4 flex-wrap">
                {data.map((_, index) => (
                    <button key={index} type="button" onClick={() => setActiveSlide(index)} className={`px-3 py-1 text-sm rounded-md ${activeSlide === index ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        Slide {index + 1}
                    </button>
                ))}
                <button type="button" onClick={addSlide} className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"><PlusIcon className="w-4 h-4" /></button>
            </div>
            {currentSlideData && (
                 <div className="space-y-4 animate-fadeIn">
                    <FormField label="Titre" name="title" value={currentSlideData.title} onChange={e => handleSlideChange(e, activeSlide)} />
                    <FormField label="Sous-titre" name="subtitle" value={currentSlideData.subtitle} onChange={e => handleSlideChange(e, activeSlide)} />
                    <FormField label="Texte du bouton" name="buttonText" value={currentSlideData.buttonText} onChange={e => handleSlideChange(e, activeSlide)} />
                    <FormField label="URL de l'image de fond" name="bgImage" value={currentSlideData.bgImage} onChange={e => handleSlideChange(e, activeSlide)} />
                    <button type="button" onClick={() => removeSlide(activeSlide)} className="text-sm text-red-600 hover:underline flex items-center gap-1">
                        <TrashIcon className="w-4 h-4"/> Supprimer ce slide
                    </button>
                </div>
            )}
        </div>
    );
};

const DestockageForm: React.FC<{ data: DestockageAd[], onChange: (newData: DestockageAd[]) => void }> = ({ data, onChange }) => {
    const [activeAdIndex, setActiveAdIndex] = useState(0);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value, type } = e.target;
        const newData = [...data];
        newData[index] = { ...newData[index], [name]: type === 'number' ? parseFloat(value) || 0 : value };
        onChange(newData);
    };

    const handleImageChange = (adIndex: number, imgIndex: number, field: 'src' | 'alt', value: string) => {
        const newData = [...data];
        const newImages = [...newData[adIndex].images];
        newImages[imgIndex] = { ...newImages[imgIndex], [field]: value };
        newData[adIndex] = { ...newData[adIndex], images: newImages };
        onChange(newData);
    };

    const addAd = () => {
        const newAd = {
            id: Date.now(),
            mainTitle: "Nouvelle Offre",
            subTitle: "Description de l'offre",
            price: "0 DT",
            oldPrice: "0 DT",
            images: [
                { src: "https://picsum.photos/seed/new1/200/100", alt: "Image 1" },
                { src: "https://picsum.photos/seed/new2/200/200", alt: "Image 2" },
                { src: "https://picsum.photos/seed/new3/250/300", alt: "Image 3" }
            ],
            chefImage: "https://picsum.photos/seed/newchef/250/320",
            duration: 10,
        };
        onChange([...data, newAd]);
        setActiveAdIndex(data.length);
    };

    const removeAd = (index: number) => {
        if (data.length <= 1) {
            alert("Il doit y avoir au moins une publicité.");
            return;
        }
        onChange(data.filter((_, i) => i !== index));
        setActiveAdIndex(prev => Math.max(0, prev - 1));
    };

    const currentAdData = data[activeAdIndex];

    return (
        <div className="space-y-4">
             <div className="flex items-center gap-2 border-b dark:border-gray-600 pb-2 mb-4 flex-wrap">
                {data.map((_, index) => (
                    <button key={index} type="button" onClick={() => setActiveAdIndex(index)} className={`px-3 py-1 text-sm rounded-md ${activeAdIndex === index ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        Publicité {index + 1}
                    </button>
                ))}
                <button type="button" onClick={addAd} className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"><PlusIcon className="w-4 h-4" /></button>
            </div>
            {currentAdData && (
                <div className="space-y-4 animate-fadeIn">
                    <FormField label="Titre Principal" name="mainTitle" value={currentAdData.mainTitle} onChange={e => handleFieldChange(e, activeAdIndex)} />
                    <FormField label="Sous-titre" name="subTitle" value={currentAdData.subTitle} onChange={e => handleFieldChange(e, activeAdIndex)} />
                    <FormField label="Prix" name="price" value={currentAdData.price} onChange={e => handleFieldChange(e, activeAdIndex)} />
                    <FormField label="Ancien Prix" name="oldPrice" value={currentAdData.oldPrice} onChange={e => handleFieldChange(e, activeAdIndex)} />
                    <FormField label="Durée d'affichage (secondes)" name="duration" type="number" value={currentAdData.duration} onChange={e => handleFieldChange(e, activeAdIndex)} />
                    
                    <h4 className="text-sm font-medium pt-4 border-t dark:border-gray-600">Images des produits</h4>
                    {currentAdData.images.map((img, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2 p-2 border rounded-md dark:border-gray-600">
                            <FormField label={`Image ${index + 1} URL`} name={`src-${index}`} value={img.src} onChange={(e) => handleImageChange(activeAdIndex, index, 'src', e.target.value)} />
                            <FormField label={`Image ${index + 1} Alt`} name={`alt-${index}`} value={img.alt} onChange={(e) => handleImageChange(activeAdIndex, index, 'alt', e.target.value)} />
                        </div>
                    ))}
                    <FormField label="URL Image Chef" name="chefImage" value={currentAdData.chefImage} onChange={e => handleFieldChange(e, activeAdIndex)} />
                     <button type="button" onClick={() => removeAd(activeAdIndex)} className="text-sm text-red-600 hover:underline flex items-center gap-1">
                        <TrashIcon className="w-4 h-4"/> Supprimer cette publicité
                    </button>
                </div>
            )}
        </div>
    );
};

const AudioPromoForm: React.FC<{ data: AudioPromoAd[], onChange: (newData: AudioPromoAd[]) => void }> = ({ data, onChange }) => {
    const [activeAd, setActiveAd] = useState(0);
    
    const handleAdChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value, type } = e.target;
        const newAds = [...data];
        newAds[index] = { ...newAds[index], [name]: type === 'number' ? parseFloat(value) || 0 : value };
        onChange(newAds);
    };

    const addAd = () => {
        const newAd = { id: Date.now(), title: "Nouveau Titre", subtitle1: "Sous-titre 1", subtitle2: "Sous-titre 2", image: "https://picsum.photos/seed/newaudio/800/400", background: "from-blue-500 to-green-500", duration: 8 };
        onChange([...data, newAd]);
        setActiveAd(data.length);
    }
    
    const removeAd = (index: number) => {
        if (data.length <= 1) {
            alert("Il doit y avoir au moins une publicité.");
            return;
        }
        onChange(data.filter((_, i) => i !== index));
        setActiveAd(prev => Math.max(0, prev - 1));
    }
    
    const currentAdData = data[activeAd];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 border-b dark:border-gray-600 pb-2 mb-4 flex-wrap">
                {data.map((_, index) => (
                    <button key={index} type="button" onClick={() => setActiveAd(index)} className={`px-3 py-1 text-sm rounded-md ${activeAd === index ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        Publicité {index + 1}
                    </button>
                ))}
                <button type="button" onClick={addAd} className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"><PlusIcon className="w-4 h-4" /></button>
            </div>
            {currentAdData && (
                 <div className="space-y-4 animate-fadeIn">
                    <FormField label="Titre" name="title" value={currentAdData.title} onChange={e => handleAdChange(e, activeAd)} />
                    <FormField label="Sous-titre 1" name="subtitle1" value={currentAdData.subtitle1} onChange={e => handleAdChange(e, activeAd)} />
                    <FormField label="Sous-titre 2" name="subtitle2" value={currentAdData.subtitle2} onChange={e => handleAdChange(e, activeAd)} />
                    <FormField label="URL de l'image" name="image" value={currentAdData.image} onChange={e => handleAdChange(e, activeAd)} />
                    <FormField label="Dégradé de fond (tailwind)" name="background" value={currentAdData.background} onChange={e => handleAdChange(e, activeAd)} />
                    <FormField label="Durée (secondes)" name="duration" type="number" value={currentAdData.duration} onChange={e => handleAdChange(e, activeAd)} />
                    <button type="button" onClick={() => removeAd(activeAd)} className="text-sm text-red-600 hover:underline flex items-center gap-1">
                        <TrashIcon className="w-4 h-4"/> Supprimer cette publicité
                    </button>
                </div>
            )}
        </div>
    );
};

const ImagePromosForm: React.FC<{ data: ImagePromoAd[], onChange: (newData: ImagePromoAd[]) => void }> = ({ data, onChange }) => {
    const handleAdChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const newAds = [...data];
        newAds[index] = { ...newAds[index], [name]: value };
        onChange(newAds);
    };

    const addAd = () => {
        const newAd = { id: Date.now(), imageUrl: "https://picsum.photos/seed/newpromo/400/400", altText: "Nouvelle promo", link: "#" };
        onChange([...data, newAd]);
    }
    
    const removeAd = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Gérez la liste des images promotionnelles qui défilent dans le carrousel.</p>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {data.map((ad, index) => (
                    <div key={ad.id} className="p-4 border rounded-md dark:border-gray-600 space-y-2 relative bg-gray-50 dark:bg-gray-700/50">
                        <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Image {index + 1}</h4>
                        <FormField label="URL de l'image" name="imageUrl" value={ad.imageUrl} onChange={e => handleAdChange(e, index)} />
                        <FormField label="Texte alternatif (pour SEO)" name="altText" value={ad.altText} onChange={e => handleAdChange(e, index)} />
                        <FormField label="Lien (URL)" name="link" value={ad.link} onChange={e => handleAdChange(e, index)} />
                        <button type="button" onClick={() => removeAd(index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addAd} className="w-full text-sm text-green-600 dark:text-green-400 hover:underline flex items-center justify-center gap-1 mt-2 p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                <PlusIcon className="w-4 h-4" /> Ajouter une image
            </button>
        </div>
    );
};

const GenericAdForm: React.FC<{data: any, onChange: (newData: any) => void, fields: {name: string, label: string}[]}> = ({ data, onChange, fields }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };
    return (
        <div className="space-y-4">
            {fields.map(field => (
                <FormField key={field.name} label={field.label} name={field.name} value={data[field.name] || ''} onChange={handleChange} />
            ))}
        </div>
    );
};

export const AdEditModal: React.FC<AdEditModalProps> = ({ isOpen, onClose, onSave, slot }) => {
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        if (slot) {
            // Deep copy to prevent direct mutation
            setFormData(JSON.parse(JSON.stringify(slot.data)));
        }
    }, [slot]);

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    const renderForm = () => {
        if (!formData) return null;

        switch(slot.type) {
            case 'hero':
                return <HeroForm data={formData} onChange={setFormData} />;
            case 'destockage':
                return <DestockageForm data={formData} onChange={setFormData} />;
            case 'audioPromo':
                return <AudioPromoForm data={formData} onChange={setFormData} />;
            case 'promoBanner':
                 return <GenericAdForm data={formData} onChange={setFormData} fields={[
                    { name: 'title', label: "Titre" },
                    { name: 'subtitle', label: "Sous-titre" },
                    { name: 'buttonText', label: "Texte du bouton" },
                    { name: 'image', label: "URL de l'image" },
                ]}/>;
            case 'smallPromoBanners':
                return <ImagePromosForm data={formData} onChange={setFormData} />;
            default:
                return <div>Type de formulaire non reconnu.</div>;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b dark:border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold">Modifier: {slot.name}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><XMarkIcon className="w-6 h-6"/></button>
                </div>
                <div className="p-6 flex-grow overflow-y-auto">
                    {renderForm()}
                </div>
                <div className="flex justify-end p-4 border-t dark:border-gray-700 gap-3 flex-shrink-0 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
                    <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">Annuler</button>
                    <button type="button" onClick={handleSave} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700">Sauvegarder</button>
                </div>
            </div>
        </div>
    );
}

// Simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
`;
document.head.appendChild(style);
