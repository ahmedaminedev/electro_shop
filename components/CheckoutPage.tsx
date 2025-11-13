
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { 
    DeliveryTruckIcon, 
    BuildingOfficeIcon,
    LockIcon,
    MailIcon,
    UserIcon,
    PhoneIcon,
    LocationIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    HomeIcon
} from './IconComponents';

interface CheckoutPageProps {
    onNavigateHome: () => void;
}

// Sub-components for better structure and styling

const FormInputWithIcon: React.FC<{ name: string; label: string; icon: React.ReactNode; type?: string; optional?: boolean; }> = ({ name, label, icon, type = 'text', optional }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
        </div>
        <input 
            type={type} 
            id={name} 
            name={name} 
            placeholder={`${label}${optional ? ' (facultatif)' : ''}`}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder:text-gray-400"
            aria-label={label}
        />
    </div>
);

const CheckoutSection: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold flex items-center gap-3">
            <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">{number}</span>
            {title}
        </h2>
        <div className="mt-6 space-y-4">
            {children}
        </div>
    </section>
);


const OrderSummary: React.FC = () => {
    const { cartItems, cartTotal } = useCart();
    const [isExpanded, setIsExpanded] = useState(false);
    const shippingCost = 7.000;

    const savings = React.useMemo(() => {
        const oldTotal = cartItems.reduce((total, item) => {
            const oldPrice = 'oldPrice' in item.originalItem && item.originalItem.oldPrice ? item.originalItem.oldPrice : item.price;
            return total + (oldPrice * item.quantity);
        }, 0);
        return oldTotal - cartTotal;
    }, [cartItems, cartTotal]);
    
    const total = cartTotal + shippingCost;

    return (
        <aside className="w-full lg:w-2/5 lg:pl-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>
                
                {/* Mobile expand button */}
                <div className="lg:hidden mb-4">
                    <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex justify-between items-center text-red-600 font-semibold">
                        <span>{isExpanded ? 'Masquer le récapitulatif' : 'Afficher le récapitulatif'}</span>
                        {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                    </button>
                </div>

                <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-3 border-b border-gray-200 dark:border-gray-700 pb-4 pt-3">
                        {cartItems.map(item => {
                            const oldPrice = 'oldPrice' in item.originalItem ? item.originalItem.oldPrice : null;
                            return (
                            <div key={item.id} className="flex items-start gap-4">
                                <div className="relative">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-contain rounded-md border border-gray-200 dark:border-gray-700"/>
                                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold transform translate-x-1/2 -translate-y-1/2">{item.quantity}</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-medium line-clamp-2 leading-tight">{item.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Quantité: {item.quantity}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-semibold whitespace-nowrap">{(item.price * item.quantity).toFixed(3).replace('.', ',')} DT</p>
                                    {oldPrice && (
                                        <p className="text-xs text-gray-400 line-through">{(oldPrice * item.quantity).toFixed(3).replace('.', ',')} DT</p>
                                    )}
                                </div>
                            </div>
                        )})}
                    </div>

                    <div className="py-4 space-y-2 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center gap-2">
                            <input type="text" placeholder="Code promo" className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"/>
                            <button className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm">Appliquer</button>
                        </div>
                    </div>
                    
                    <div className="pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Sous-total</span>
                            <span>{cartTotal.toFixed(3).replace('.', ',')} DT</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Livraison</span>
                            <span>{shippingCost.toFixed(3).replace('.', ',')} DT</span>
                        </div>
                         {savings > 0.001 && (
                             <div className="flex justify-between text-green-600 dark:text-green-400">
                                <span className="font-semibold">Vos économies</span>
                                <span className="font-semibold">-{savings.toFixed(3).replace('.', ',')} DT</span>
                            </div>
                        )}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{total.toFixed(3).replace('.', ',')} DT</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const ShippingMethodSelector: React.FC<{
    method: 'ship' | 'pickup';
    selectedMethod: 'ship' | 'pickup';
    onSelect: (method: 'ship' | 'pickup') => void;
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ method, selectedMethod, onSelect, icon, title, description }) => {
    const isSelected = method === selectedMethod;
    return (
        <button
            type="button"
            onClick={() => onSelect(method)}
            className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 text-left transition-all duration-200 ${isSelected ? 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-lg' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400'}`}
        >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-red-600' : 'border-gray-400'}`}>
                {isSelected && <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>}
            </div>
            <div className={`text-gray-500 dark:text-gray-400 ${isSelected ? 'text-red-600 dark:text-red-400' : ''}`}>{icon}</div>
            <div>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{title}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </button>
    );
};


export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigateHome }) => {
    const [shippingMethod, setShippingMethod] = useState<'ship' | 'pickup'>('ship');

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigateHome(); }} 
                className="fixed bottom-6 left-6 bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors duration-300 z-50"
                aria-label="Retourner à la boutique"
            >
                <HomeIcon className="w-8 h-8" />
            </a>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
                <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
                    {/* Left side: Form */}
                    <main className="w-full lg:w-3/5 space-y-8">
                        
                        <CheckoutSection number={1} title="Coordonnées">
                            <FormInputWithIcon name="email" label="Adresse e-mail" icon={<MailIcon className="w-5 h-5"/>} />
                            <div className="flex items-center">
                                <input type="checkbox" id="newsletter" className="h-4 w-4 rounded text-red-600 focus:ring-red-500 border-gray-300" />
                                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600 dark:text-gray-400">M'envoyer les nouveautés et offres par e-mail</label>
                            </div>
                        </CheckoutSection>

                        <CheckoutSection number={2} title="Livraison">
                            <div className="space-y-4">
                                <ShippingMethodSelector method="ship" selectedMethod={shippingMethod} onSelect={setShippingMethod} icon={<DeliveryTruckIcon className="w-6 h-6"/>} title="Livraison à domicile" description="Recevez votre commande chez vous."/>
                                <ShippingMethodSelector method="pickup" selectedMethod={shippingMethod} onSelect={setShippingMethod} icon={<BuildingOfficeIcon className="w-6 h-6"/>} title="Retrait en magasin" description="Récupérez votre commande gratuitement."/>
                            </div>
                            
                            {shippingMethod === 'ship' && (
                                <div className="mt-6 space-y-4">
                                    <select className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 text-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500">
                                        <option>Tunisie</option>
                                    </select>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormInputWithIcon name="firstname" label="Prénom" icon={<UserIcon className="w-5 h-5"/>} optional />
                                        <FormInputWithIcon name="lastname" label="Nom" icon={<UserIcon className="w-5 h-5"/>} />
                                    </div>
                                    <FormInputWithIcon name="address" label="Adresse" icon={<LocationIcon className="w-5 h-5"/>}/>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormInputWithIcon name="postal_code" label="Code postal" icon={<LocationIcon className="w-5 h-5"/>} optional />
                                        <FormInputWithIcon name="city" label="Ville" icon={<LocationIcon className="w-5 h-5"/>} />
                                    </div>
                                    <FormInputWithIcon name="phone" label="Téléphone" icon={<PhoneIcon className="w-5 h-5"/>} />
                                </div>
                            )}

                             {shippingMethod === 'pickup' && (
                                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-sm text-center text-gray-700 dark:text-gray-200">Nos points de retrait seront bientôt disponibles. Pour le moment, veuillez sélectionner la livraison à domicile.</p>
                                </div>
                            )}
                        </CheckoutSection>
                        
                        <CheckoutSection number={3} title="Paiement">
                            <p className="text-sm text-gray-500">Toutes les transactions sont sécurisées et chiffrées.</p>
                            <div className="p-4 border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-between">
                                <label htmlFor="cod" className="font-semibold text-gray-800 dark:text-gray-100">Paiement à la livraison</label>
                                <input type="radio" id="cod" name="payment" defaultChecked className="form-radio text-red-600 focus:ring-red-500 h-5 w-5"/>
                            </div>
                        </CheckoutSection>

                        <div className="flex justify-end pt-4">
                            <button className="w-full sm:w-auto bg-red-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95">
                                <LockIcon className="w-5 h-5" />
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
