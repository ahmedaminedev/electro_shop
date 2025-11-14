
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { 
    DeliveryTruckIcon, 
    LockIcon,
    MailIcon,
    PhoneIcon,
    LocationIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    HomeIcon,
    VisaIcon,
    MastercardIcon,
    PencilIcon
} from './IconComponents';
import type { CartItem, CustomerInfo } from '../types';

interface CheckoutPageProps {
    onNavigateHome: () => void;
    onOrderComplete: (cartItems: CartItem[], customerInfo: CustomerInfo) => void;
    onNavigateToPaymentGateway: (orderId: string, total: number, customerInfo: CustomerInfo) => void;
}

const FormInputWithIcon: React.FC<{ name: string; label: string; icon: React.ReactNode; type?: string; optional?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ name, label, icon, type = 'text', optional, value, onChange }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
        </div>
        <input 
            type={type} 
            id={name} 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`${label}${optional ? ' (facultatif)' : ''}`}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder:text-gray-400"
            aria-label={label}
        />
    </div>
);


const CheckoutStep: React.FC<{
    stepNumber: number;
    title: string;
    isActive: boolean;
    isCompleted: boolean;
    summary?: React.ReactNode;
    onHeaderClick: () => void;
    children: React.ReactNode;
    isDisabled: boolean;
}> = ({ stepNumber, title, isActive, isCompleted, summary, onHeaderClick, children, isDisabled }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 ${isActive ? 'shadow-lg border-red-300 dark:border-red-500/50' : ''} ${isDisabled ? 'opacity-50' : ''}`}>
            <div 
                className={`flex justify-between items-center p-4 ${isCompleted && !isDisabled ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={isDisabled ? undefined : onHeaderClick}
                aria-expanded={isActive}
            >
                <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold transition-colors ${
                        isCompleted ? 'bg-green-600 text-white' : isActive ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                        {isCompleted ? '✓' : stepNumber}
                    </div>
                    <h2 className={`text-lg font-bold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{title}</h2>
                </div>
                {isCompleted && !isActive && (
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block truncate max-w-xs">{summary}</div>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1.5 text-sm font-semibold">
                            <PencilIcon className="w-4 h-4"/>
                            Modifier
                        </button>
                    </div>
                )}
            </div>
            {isActive && (
                <div className="p-6 pt-0 animate-fadeInDown">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};


const OrderSummary: React.FC<{ shippingCost: number; fiscalStamp: number }> = ({ shippingCost, fiscalStamp }) => {
    const { cartItems, cartTotal } = useCart();
    const [isExpandedOnMobile, setIsExpandedOnMobile] = useState(false);

    const savings = React.useMemo(() => {
        const oldTotal = cartItems.reduce((total, item) => {
            const oldPrice = 'oldPrice' in item.originalItem && item.originalItem.oldPrice ? item.originalItem.oldPrice : item.price;
            return total + (oldPrice * item.quantity);
        }, 0);
        return oldTotal - cartTotal;
    }, [cartItems, cartTotal]);
    
    const total = cartTotal + shippingCost + fiscalStamp;

    return (
        <aside className="w-full lg:w-2/5 lg:pl-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sticky top-24">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Récapitulatif</h2>
                    <div className="lg:hidden">
                        <button onClick={() => setIsExpandedOnMobile(!isExpandedOnMobile)} className="text-red-600 font-semibold flex items-center gap-1">
                            <span>{isExpandedOnMobile ? 'Masquer' : 'Afficher'}</span>
                            {isExpandedOnMobile ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className={`mt-6 ${isExpandedOnMobile ? 'block' : 'hidden'} lg:block`}>
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-3 border-b border-gray-200 dark:border-gray-700 pb-4 pt-3">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-start gap-4">
                                <div className="relative">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain rounded-md border border-gray-200 dark:border-gray-700"/>
                                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold transform translate-x-1/2 -translate-y-1/2">{item.quantity}</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-medium line-clamp-2 leading-tight">{item.name}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-semibold whitespace-nowrap">{(item.price * item.quantity).toFixed(3).replace('.', ',')} DT</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Sous-total</span>
                            <span>{cartTotal.toFixed(3).replace('.', ',')} DT</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Livraison</span>
                            <span>{shippingCost > 0 ? shippingCost.toFixed(3).replace('.', ',') + ' DT' : 'Gratuit'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Timbre Fiscal</span>
                            <span>{fiscalStamp.toFixed(3).replace('.', ',')} DT</span>
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

const ShippingOptionCard: React.FC<{id: string; title: string; description: string; selectedOption: string; onSelect: (id: string) }> = ({ id, title, description, selectedOption, onSelect }) => {
    const isSelected = id === selectedOption;
    return (
        <label htmlFor={id} className={`p-4 border-2 rounded-lg flex items-start gap-4 cursor-pointer transition-all duration-200 ${isSelected ? 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-md' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400'}`}>
            <input type="radio" id={id} name="shipping-option" value={id} checked={isSelected} onChange={() => onSelect(id)} className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300" />
            <div>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{title}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </label>
    );
};

const PaymentMethodSelector: React.FC<{ method: 'cod' | 'card'; selectedMethod: 'cod' | 'card'; onSelect: (method: 'cod' | 'card') => void; title: string; description: string; icons?: React.ReactNode; }> = ({ method, selectedMethod, onSelect, title, description, icons }) => {
    const isSelected = method === selectedMethod;
    return (
        <div className={`p-4 border-2 rounded-lg transition-all duration-200 ${isSelected ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>
            <label className="flex items-center gap-4 cursor-pointer">
                <input type="radio" name="payment-method" value={method} checked={isSelected} onChange={() => onSelect(method)} className="w-5 h-5 text-red-600 focus:ring-red-500" />
                <div className="flex-grow">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{title}</span>
                        {icons}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                </div>
            </label>
        </div>
    );
};

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigateHome, onOrderComplete, onNavigateToPaymentGateway }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState<CustomerInfo>({
        email: 'ahmed.nafti@example.com',
        firstName: 'ahmed',
        lastName: 'nafti',
        address: '14 rue grenadier ezzahra',
        address2: '',
        postalCode: '2034',
        city: 'ezzahra ben arous',
        country: 'Tunisia',
        phone: '92702533',
    });
    const [shippingOption, setShippingOption] = useState('transporteur-tunisie');
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('card');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const { cartItems, clearCart, cartTotal } = useCart();
    
    const SHIPPING_COST = cartTotal >= 300 ? 0.000 : 7.000;
    const FISCAL_STAMP = 1.000;
    const finalTotal = cartTotal + SHIPPING_COST + FISCAL_STAMP;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        // Here you would add validation for the current step's fields
        setActiveStep(prev => Math.min(prev + 1, 4));
    };

    const handleGoTo = (step: number) => {
        if (step < activeStep) {
            setActiveStep(step);
        }
    };

    const handleConfirmOrder = () => {
        if (!termsAgreed) {
            alert("Veuillez accepter les conditions générales de vente.");
            return;
        }
        if (cartItems.length === 0) {
            alert("Votre panier est vide.");
            return;
        }

        if (paymentMethod === 'cod') {
            onOrderComplete(cartItems, formData);
            clearCart();
        } else if (paymentMethod === 'card') {
            const orderId = 'ES' + Date.now().toString().slice(-8).toUpperCase();
            onNavigateToPaymentGateway(orderId, finalTotal, formData);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
             <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInDown { animation: fadeInDown 0.5s ease-out forwards; }
            `}</style>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigateHome(); }} 
                className="fixed bottom-6 left-6 bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors duration-300 z-50"
                aria-label="Retourner à la boutique"
            >
                <HomeIcon className="w-8 h-8" />
            </a>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Finaliser ma commande</h1>
                </div>
                <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
                    <main className="w-full lg:w-3/5 space-y-4">
                        <CheckoutStep 
                            stepNumber={1} 
                            title="Informations Personnelles" 
                            isActive={activeStep === 1} 
                            isCompleted={activeStep > 1} 
                            onHeaderClick={() => handleGoTo(1)} 
                            isDisabled={false}
                            summary={<span>{formData.email}</span>}
                        >
                            <div className="space-y-4">
                                <FormInputWithIcon name="email" label="Adresse e-mail" icon={<MailIcon className="w-5 h-5"/>} value={formData.email} onChange={handleInputChange} />
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormInputWithIcon name="firstName" label="Prénom" icon={<div />} value={formData.firstName} onChange={handleInputChange} />
                                    <FormInputWithIcon name="lastName" label="Nom" icon={<div />} value={formData.lastName} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6"><button onClick={handleNext} className="bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors">Continuer</button></div>
                        </CheckoutStep>
                        
                        <CheckoutStep 
                            stepNumber={2} 
                            title="Adresses" 
                            isActive={activeStep === 2} 
                            isCompleted={activeStep > 2} 
                            onHeaderClick={() => handleGoTo(2)} 
                            isDisabled={activeStep < 2}
                            summary={<span>{formData.address}, {formData.city}</span>}
                        >
                             <div className="p-4 border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full border-2 border-yellow-500 flex items-center justify-center mt-1 flex-shrink-0"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div></div>
                                <div>
                                    <p className="font-bold text-yellow-800 dark:text-yellow-200">Mon adresse</p>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-300">{`${formData.firstName} ${formData.lastName}`}<br/>{formData.address}<br/>{`${formData.postalCode} ${formData.city}`}<br/>{formData.country}<br/>{formData.phone}</p>
                                    <div className="mt-2 flex gap-4 text-sm font-semibold">
                                        <button className="text-blue-600 hover:underline">Modifier</button>
                                        <button className="text-red-600 hover:underline">Supprimer</button>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="mt-4 inline-block font-semibold text-red-600 hover:underline">+ ajouter une nouvelle adresse</a>
                             <div className="flex justify-end mt-6"><button onClick={handleNext} className="bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors">Continuer</button></div>
                        </CheckoutStep>
                        
                        <CheckoutStep 
                            stepNumber={3} 
                            title="Mode De Livraison" 
                            isActive={activeStep === 3} 
                            isCompleted={activeStep > 3} 
                            onHeaderClick={() => handleGoTo(3)} 
                            isDisabled={activeStep < 3}
                            summary={<span>Transporteur - Toute la Tunisie</span>}
                        >
                            <div className="space-y-3">
                                <ShippingOptionCard id="retrait-sfax" title="Retrait en magasin - Sfax" description="Poudrière 1, Rue 18 Août (en face de Stoufa), Sfax | gratuit" selectedOption={shippingOption} onSelect={setShippingOption} />
                                <ShippingOptionCard id="retrait-tunis" title="Retrait en magasin - Tunis" description="10 Rue Saint Augustin 1002 Tunis | gratuit" selectedOption={shippingOption} onSelect={setShippingOption} />
                                <ShippingOptionCard id="transporteur-tunisie" title="Transporteur - Toute la Tunisie" description="Paiement à la livraison (Livraison gratuite à partir de 300 DT d'achat) | gratuit" selectedOption={shippingOption} onSelect={setShippingOption} />
                            </div>
                             <div className="flex justify-end mt-6"><button onClick={handleNext} className="bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors">Continuer</button></div>
                        </CheckoutStep>

                        <CheckoutStep 
                            stepNumber={4} 
                            title="Paiement" 
                            isActive={activeStep === 4} 
                            isCompleted={false} 
                            onHeaderClick={() => handleGoTo(4)} 
                            isDisabled={activeStep < 4}
                        >
                             <div className="space-y-4">
                                <PaymentMethodSelector 
                                    method="card"
                                    selectedMethod={paymentMethod}
                                    onSelect={setPaymentMethod}
                                    title="Paiement par carte bancaire"
                                    description="Payez par carte bancaire en toute sécurité pour vos achats en ligne."
                                    icons={
                                        <div className="flex items-center gap-1.5">
                                            <VisaIcon className="h-6" />
                                            <MastercardIcon className="h-6" />
                                        </div>
                                    }
                                />
                                <PaymentMethodSelector 
                                    method="cod"
                                    selectedMethod={paymentMethod}
                                    onSelect={setPaymentMethod}
                                    title="Payer comptant à la livraison"
                                    description="Payez en espèces une fois que vous recevez votre commande."
                                />
                            </div>
                             <div className="mt-6 flex items-start">
                                <input type="checkbox" id="terms" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} className="h-4 w-4 rounded text-red-600 focus:ring-red-500 border-gray-300 mt-0.5" />
                                <label htmlFor="terms" className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                    J'ai lu les <a href="#" className="font-medium text-red-600 hover:underline">conditions générales de vente</a> et j'y adhère sans réserve.
                                </label>
                            </div>
                             <div className="flex justify-end pt-6">
                                <button 
                                    onClick={handleConfirmOrder}
                                    disabled={!termsAgreed}
                                    className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-base hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                                >
                                    <LockIcon className="w-5 h-5" />
                                    {paymentMethod === 'card' ? `Payer ${finalTotal.toFixed(3).replace('.',',')} DT` : 'Valider ma commande'}
                                </button>
                            </div>
                        </CheckoutStep>

                    </main>
                    
                    <OrderSummary shippingCost={SHIPPING_COST} fiscalStamp={FISCAL_STAMP} />
                </div>
            </div>
        </div>
    );
};
