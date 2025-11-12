
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { BuildingOfficeIcon, PhoneIcon, MailIcon, ClockIcon } from './IconComponents';

interface ContactPageProps {
    onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        document.title = `Contactez-nous - Electro Shop`;
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formState);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Breadcrumb items={[{ name: 'Accueil', onClick: onNavigateHome }, { name: 'Contactez-nous' }]} />
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Entrons en contact</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Une question, une suggestion ou besoin d'aide ? Notre équipe est là pour vous répondre.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Nos Coordonnées</h2>
                        <div className="space-y-6">
                            <InfoItem icon={<BuildingOfficeIcon className="w-6 h-6 text-red-600" />} title="Adresse" content="123 Rue de l'Électronique, Tunis, Tunisie" />
                            <InfoItem icon={<PhoneIcon className="w-6 h-6 text-red-600" />} title="Téléphone" content="+216 55 263 522" />
                            <InfoItem icon={<MailIcon className="w-6 h-6 text-red-600" />} title="Email" content="contact@electroshop.com" />
                            <InfoItem icon={<ClockIcon className="w-6 h-6 text-red-600" />} title="Horaires d'ouverture" content="Lundi - Samedi : 9h00 - 19h00" />
                        </div>
                        <div className="mt-8 rounded-lg overflow-hidden">
                             <img src="https://i.stack.imgur.com/8QpLK.png" alt="Carte de localisation" className="w-full h-64 object-cover" />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Envoyez-nous un message</h2>
                        {isSubmitted ? (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                                <p className="font-bold">Message envoyé !</p>
                                <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <InputField id="name" name="name" label="Nom complet" type="text" value={formState.name} onChange={handleChange} required />
                                <InputField id="email" name="email" label="Adresse e-mail" type="email" value={formState.email} onChange={handleChange} required />
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sujet</label>
                                    <select id="subject" name="subject" value={formState.subject} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring-red-500 bg-white dark:bg-gray-700" required>
                                        <option value="">Sélectionnez un sujet</option>
                                        <option>Question sur un produit</option>
                                        <option>Suivi de commande</option>
                                        <option>Service après-vente</option>
                                        <option>Autre</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                    <textarea id="message" name="message" rows={4} value={formState.message} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring-red-500 bg-white dark:bg-gray-700" required></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                                        Envoyer le message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem: React.FC<{ icon: React.ReactNode; title: string; content: string }> = ({ icon, title, content }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-red-50 dark:bg-gray-700 rounded-full">{icon}</div>
        <div className="ml-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</p>
            <p className="text-gray-600 dark:text-gray-300">{content}</p>
        </div>
    </div>
);

const InputField: React.FC<{ id: string; name: string; label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; }> = 
({ id, name, label, type, value, onChange, required }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input 
            type={type} 
            name={name} 
            id={id} 
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring-red-500 bg-white dark:bg-gray-700" 
        />
    </div>
);
