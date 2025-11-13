
import React, { useState } from 'react';
import { useCart } from './CartContext';
import type { CartItem } from '../types';
import { InformationCircleIcon, DeliveryTruckIcon, BuildingOfficeIcon } from './IconComponents';
import { Logo } from './Logo';
import { Breadcrumb } from './Breadcrumb';

interface CheckoutPageProps {
    onNavigateHome: () => void;
}

const OrderSummary: React.FC = () => {
    const { cartItems, cartTotal } = useCart();
    return (
        <aside className="w-full lg:w-2/5 lg:pl-12">
            <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                            <div className="relative">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-200 dark:border-gray-700"/>
                                <span className="absolute -top-2 -right-2 bg-gray-600 dark:bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                            </div>
                            <p className="flex-grow text-sm font-medium line-clamp-2">{item.name}</p>
                            <p className="text-sm font-semibold whitespace-nowrap">{item.price.toFixed(3).replace('.', ',')} DT</p>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                        <input type="text" placeholder="Code de réduction" className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-red-500"/>
                        <button className="ml-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Valider</button>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Sous-total</span>
                        <span>{cartTotal.toFixed(3).replace('.', ',')} DT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Expédition</span>
                        <span className="font-semibold text-green-600">GRATUIT</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{cartTotal.toFixed(3).replace('.', ',')} DT</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const FormInput: React.FC<{ name: string; label: string; type?: string; optional?: boolean; }> = ({ name, label, type = 'text', optional }) => (
    <div>
        <label htmlFor={name} className="sr-only">{label}</label>
        <input type={type} id={name} name={name} placeholder={`${label}${optional ? ' (optionnel)' : ''}`} className="w-full bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 text-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500"/>
    </div>
);

const ShippingMethodSelector: React.FC<{
    method: 'ship' | 'pickup';
    selectedMethod: 'ship' | 'pickup';
    onSelect: (method: 'ship' | 'pickup') => void;
    icon: React.ReactNode;
    title: string;
}> = ({ method, selectedMethod, onSelect, icon, title }) => {
    const isSelected = method === selectedMethod;
    return (
        <button
            type="button"
            onClick={() => onSelect(method)}
            className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 text-left transition-all duration-200 ${isSelected ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-md' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 hover:border-gray-400'}`}
        >
            <input type="radio" checked={isSelected} readOnly className="form-radio text-yellow-500 focus:ring-yellow-500 h-5 w-5" />
            <div className="text-gray-500 dark:text-gray-400">{icon}</div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">{title}</span>
        </button>
    );
};

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigateHome }) => {
    const [shippingMethod, setShippingMethod] = useState<'ship' | 'pickup'>('ship');

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col-reverse lg:flex-row gap-8">
                    {/* Left side: Form */}
                    <main className="w-full lg:w-3/5">
                         <div className="mb-8">
                            <Logo />
                        </div>
                        <Breadcrumb items={[{ name: 'Panier', onClick: onNavigateHome }, { name: 'Informations' }, { name: 'Expédition' }, { name: 'Paiement' }]} />

                        <div className="mt-8 space-y-8">
                            {/* Contact */}
                            <section>
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold">Contact</h2>
                                    <span className="text-sm">Vous avez déjà un compte ? <a href="#" className="text-red-600 hover:underline">Se connecter</a></span>
                                </div>
                                <FormInput name="email" label="E-mail ou numéro de portable" />
                                <div className="flex items-center mt-2">
                                    <input type="checkbox" id="newsletter" className="h-4 w-4 rounded text-yellow-500 focus:ring-yellow-500 border-gray-300" />
                                    <label htmlFor="newsletter" className="ml-2 text-sm">Envoyez-moi des nouvelles et des offres par e-mail</label>
                                </div>
                            </section>

                            {/* Livraison */}
                            <section>
                                <h2 className="text-lg font-semibold mb-4">Livraison</h2>
                                <div className="space-y-4">
                                    <ShippingMethodSelector method="ship" selectedMethod={shippingMethod} onSelect={setShippingMethod} icon={<DeliveryTruckIcon className="w-6 h-6"/>} title="Expédier" />
                                    <ShippingMethodSelector method="pickup" selectedMethod={shippingMethod} onSelect={setShippingMethod} icon={<BuildingOfficeIcon className="w-6 h-6"/>} title="Récupérer" />
                                </div>
                                
                                {shippingMethod === 'ship' ? (
                                    <div className="mt-6 space-y-4">
                                        <select className="w-full bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 text-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500">
                                            <option>Tunisie</option>
                                        </select>
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormInput name="firstname" label="Prénom" optional />
                                            <FormInput name="lastname" label="Nom" />
                                        </div>
                                        <FormInput name="company" label="Entreprise" optional />
                                        <FormInput name="address" label="Adresse" />
                                        <FormInput name="apartment" label="Appartement, suite, etc." optional />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormInput name="postal_code" label="Code postal" optional />
                                            <FormInput name="city" label="Ville" />
                                        </div>
                                        <div className="relative">
                                            <FormInput name="phone" label="Téléphone" />
                                            <InformationCircleIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-4 -translate-y-1/2"/>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <input type="checkbox" id="save-info" className="h-4 w-4 rounded text-yellow-500 focus:ring-yellow-500 border-gray-300" />
                                            <label htmlFor="save-info" className="ml-2 text-sm">Sauvegarder mes coordonnées pour la prochaine fois</label>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 space-y-4">
                                        <p className="text-sm">Les centres de retrait seront affichés après avoir entré votre adresse.</p>
                                    </div>
                                )}
                            </section>
                            
                            {/* Mode d'expédition & Paiement */}
                            <section className="space-y-8">
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Mode d'expédition</h2>
                                    <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg flex justify-between items-center">
                                        <span>Livraison gratuite</span>
                                        <span className="font-semibold">GRATUIT</span>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Paiement</h2>
                                     <p className="text-sm text-gray-500 mb-2">Toutes les transactions sont sécurisées et chiffrées.</p>
                                     <div className="p-4 border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                        <span className="font-semibold text-gray-800 dark:text-gray-100">Paiement à la livraison</span>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Adresse de facturation */}
                             <section>
                                <h2 className="text-lg font-semibold mb-4">Adresse de facturation</h2>
                                <div className="space-y-4">
                                    <div className="p-4 border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                        <input type="radio" id="same_address" name="billing" defaultChecked className="form-radio text-yellow-500 focus:ring-yellow-500 h-5 w-5 mr-3"/>
                                        <label htmlFor="same_address" className="font-semibold text-gray-800 dark:text-gray-100">Identique à l'adresse de livraison</label>
                                    </div>
                                    <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                                        <input type="radio" id="different_address" name="billing" className="form-radio text-yellow-500 focus:ring-yellow-500 h-5 w-5 mr-3"/>
                                        <label htmlFor="different_address" className="font-semibold text-gray-800 dark:text-gray-100">Utiliser une adresse de facturation différente</label>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="mt-12 flex justify-end">
                            <button className="w-full sm:w-auto bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-500 transition-colors shadow-lg">
                                Valider ma commande
                            </button>
                        </div>

                    </main>
                    {/* Right side: Summary */}
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};
