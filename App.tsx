
import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { ThemeProvider } from './components/ThemeContext';
import { HomePage } from './components/HomePage';
import { ProductListPage } from './components/ProductListPage';
import { ProductPreviewModal } from './components/ProductPreviewModal';
import { PacksPage } from './components/PacksPage';
import { BlogPage } from './components/BlogPage';
import { BlogPostPage } from './components/BlogPostPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { PromotionsPage } from './components/PromotionsPage';
import { CheckoutPage } from './components/CheckoutPage';
import type { Product, Pack, Category, Brand, Order, ContactMessage, CartItem, Advertisements, User, Promotion, CustomerInfo, Store } from './types';
import { CartProvider } from './components/CartContext';
import { FavoritesProvider } from './components/FavoritesContext';
import { ToastProvider, useToast } from './components/ToastContext'; // Import Toast
import { CompareProvider } from './components/CompareContext'; // Import Compare
import { ComparePage } from './components/ComparePage'; // Import Compare Page
import { CartSidebar } from './components/CartSidebar';
import { AdminPage } from './components/admin/AdminPage';
import { allProducts, categories as initialCategories, packs as initialPacks, blogPosts, brands, orders as initialOrders, contactMessages as initialMessages, initialAdvertisements, mockUser, mockPromotions, initialStores } from './constants';
import { FavoritesPage } from './components/FavoritesPage';
import { ProfilePage } from './components/ProfilePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { PackDetailPage } from './components/PackDetailPage';
import { PaymentGatewayPage } from './components/PaymentGatewayPage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { StoresPage } from './components/StoresPage';


type View =
  | { name: 'home'; data: null }
  | { name: 'productList'; data: { categoryName: string } }
  | { name: 'productDetail'; data: { productId: number } }
  | { name: 'packDetail'; data: { packId: number } }
  | { name: 'packs'; data: null }
  | { name: 'promotions'; data: null }
  | { name: 'blog'; data: null }
  | { name: 'blogPost'; data: { slug: string } }
  | { name: 'contact'; data: null }
  | { name: 'login'; data: null }
  | { name: 'checkout'; data: null }
  | { name: 'paymentGateway'; data: { orderId: string; total: number; customerInfo: CustomerInfo } }
  | { name: 'admin'; data: null }
  | { name: 'favorites'; data: null }
  | { name: 'profile'; data: null }
  | { name: 'orderHistory'; data: null }
  | { name: 'orderDetail'; data: { orderId: string } }
  | { name: 'compare'; data: null }
  | { name: 'stores'; data: null }; // Add compare view


const AppContent: React.FC = () => {
    const [view, setView] = useState<View>({ name: 'home', data: null });
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [pendingRedirect, setPendingRedirect] = useState<View['name'] | null>(null); // State to track where to go after login
    
    const { addToast } = useToast(); // Use hook

    // Centralized data management for admin CRUD
    const [products, setProducts] = useState<Product[]>(allProducts);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [packs, setPacks] = useState<Pack[]>(initialPacks);
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
    const [advertisements, setAdvertisements] = useState<Advertisements>(initialAdvertisements);
    const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
    const [stores, setStores] = useState<Store[]>(initialStores);

    const handleNavigate = (newView: View) => {
        setView(newView);
        window.scrollTo(0, 0);
    };

    const handleNavigateToCategory = (categoryName: string) => handleNavigate({ name: 'productList', data: { categoryName } });
    const handleNavigateHome = () => handleNavigate({ name: 'home', data: null });
    const handleNavigateToPacks = () => handleNavigate({ name: 'packs', data: null });
    const handleNavigateToPromotions = () => handleNavigate({ name: 'promotions', data: null });
    const handleNavigateToBlog = () => handleNavigate({ name: 'blog', data: null });
    const handleNavigateToBlogPost = (slug: string) => handleNavigate({ name: 'blogPost', data: { slug } });
    const handleNavigateToContact = () => handleNavigate({ name: 'contact', data: null });
    const handleNavigateToLogin = () => handleNavigate({ name: 'login', data: null });
    
    // Modified Checkout Navigation Logic
    const handleNavigateToCheckout = () => {
        if (isLoggedIn) {
            handleNavigate({ name: 'checkout', data: null });
        } else {
            setPendingRedirect('checkout'); // Remember user wanted to checkout
            addToast("Veuillez vous connecter pour valider votre commande", "info");
            handleNavigate({ name: 'login', data: null });
        }
    };

    const handleNavigateToAdmin = () => handleNavigate({ name: 'admin', data: null });
    const handleNavigateToFavorites = () => handleNavigate({ name: 'favorites', data: null });
    const handleNavigateToProfile = () => handleNavigate({ name: 'profile', data: null });
    const handleNavigateToOrderHistory = () => handleNavigate({ name: 'orderHistory', data: null });
    const handleNavigateToOrderDetail = (orderId: string) => handleNavigate({ name: 'orderDetail', data: { orderId } });
    const handleNavigateToProductDetail = (productId: number) => handleNavigate({ name: 'productDetail', data: { productId } });
    const handleNavigateToPackDetail = (packId: number) => handleNavigate({ name: 'packDetail', data: { packId } });
    const handleNavigateToPaymentGateway = (orderId: string, total: number, customerInfo: CustomerInfo) => handleNavigate({ name: 'paymentGateway', data: { orderId, total, customerInfo } });
    const handleNavigateToCompare = () => handleNavigate({ name: 'compare', data: null });
    const handleNavigateToStores = () => handleNavigate({ name: 'stores', data: null });


    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setCurrentUser(mockUser);
        addToast("Connexion réussie !", "success");
        
        // Check if there is a pending redirect (e.g., back to checkout)
        if (pendingRedirect === 'checkout') {
            handleNavigate({ name: 'checkout', data: null });
            setPendingRedirect(null); // Clear the pending redirect
        } else {
            handleNavigateToProfile();
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        addToast("Vous avez été déconnecté.", "info");
        handleNavigateHome();
    };

    const handlePreviewProduct = (product: Product) => {
        setPreviewProduct(product);
    };

    const handleClosePreview = () => {
        setPreviewProduct(null);
    };

    const handleOrderComplete = (cartItems: CartItem[], customerInfo: CustomerInfo, paymentId?: string) => {
        setProducts(currentProducts => {
            const newProducts = [...currentProducts];
            const productQuantityUpdates: { [id: number]: number } = {};

            const getProductIdsFromPack = (pack: Pack): number[] => {
                let ids = [...pack.includedProductIds];
                if (pack.includedPackIds) {
                    pack.includedPackIds.forEach(subPackId => {
                        const subPack = packs.find(p => p.id === subPackId);
                        if (subPack) {
                            ids = [...ids, ...getProductIdsFromPack(subPack)];
                        }
                    });
                }
                return ids;
            }

            for (const item of cartItems) {
                if (item.id.startsWith('product-')) {
                    const productId = parseInt(item.id.split('-')[1]);
                    productQuantityUpdates[productId] = (productQuantityUpdates[productId] || 0) + item.quantity;
                } else if (item.id.startsWith('pack-')) {
                    const pack = item.originalItem as Pack;
                    const productIdsInPack = getProductIdsFromPack(pack);
                    for (const productId of productIdsInPack) {
                        productQuantityUpdates[productId] = (productQuantityUpdates[productId] || 0) + item.quantity;
                    }
                }
            }

            return newProducts.map(product => {
                if (productQuantityUpdates[product.id]) {
                    return {
                        ...product,
                        quantity: Math.max(0, product.quantity - productQuantityUpdates[product.id])
                    };
                }
                return product;
            });
        });

        const finalOrderId = paymentId || `ES-${1025 + orders.length}`;

        const newOrder: Order = {
            id: finalOrderId,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            date: new Date().toISOString().split('T')[0],
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: 'En attente',
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            items: cartItems.map(cartItem => {
                const isPack = cartItem.id.startsWith('pack-');
                const originalProduct = isPack ? null : cartItem.originalItem as Product;

                return {
                    id: cartItem.originalItem.id,
                    productId: cartItem.originalItem.id,
                    name: cartItem.name,
                    imageUrl: cartItem.imageUrl,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                    brand: originalProduct?.brand || 'Pack',
                    category: originalProduct?.category || 'Packs',
                    promo: originalProduct?.promo,
                    description: originalProduct?.description,
                };
            }),
            shippingAddress: {
                id: Date.now(),
                type: 'Domicile',
                street: customerInfo.address,
                city: customerInfo.city,
                postalCode: customerInfo.postalCode,
                isDefault: false
            },
            paymentMethod: paymentId ? 'Paiement par carte' : 'Paiement à la livraison',
        };
        
        setOrders(prev => [newOrder, ...prev]);

        addToast(`Merci pour votre commande ${finalOrderId} !`, "success");
        handleNavigateToOrderDetail(finalOrderId);
    };

    const renderContent = () => {
        switch (view.name) {
            case 'home':
                return <HomePage 
                    onNavigate={handleNavigateToCategory} 
                    isNavCollapsed={isNavCollapsed}
                    onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                    onPreview={handlePreviewProduct}
                    onNavigateToPacks={handleNavigateToPacks}
                    products={products}
                    packs={packs}
                    advertisements={advertisements}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                />;
            case 'productList':
                return <ProductListPage 
                    categoryName={view.data.categoryName} 
                    onNavigateHome={handleNavigateHome}
                    onNavigateToCategory={handleNavigateToCategory}
                    isNavCollapsed={isNavCollapsed}
                    onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                    onPreview={handlePreviewProduct}
                    onNavigateToPacks={handleNavigateToPacks}
                    products={products}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                />;
            case 'productDetail':
                const product = products.find(p => p.id === view.data.productId);
                if (!product) {
                    return <div>Produit non trouvé</div>
                }
                return <ProductDetailPage 
                    product={product} 
                    allProducts={products}
                    onNavigateHome={handleNavigateHome}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                    onPreview={handlePreviewProduct}
                />
            case 'packDetail':
                const packToDisplay = packs.find(p => p.id === view.data.packId);
                if (!packToDisplay) {
                    return <div>Pack non trouvé</div>;
                }
                return <PackDetailPage
                    pack={packToDisplay}
                    allProducts={products}
                    allPacks={packs}
                    onNavigateHome={handleNavigateHome}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                    onNavigateToPackDetail={handleNavigateToPackDetail}
                    onNavigateToPacks={handleNavigateToPacks}
                />;
            case 'packs':
                return <PacksPage
                    onNavigateHome={handleNavigateHome}
                    onNavigateToCategory={handleNavigateToCategory}
                    isNavCollapsed={isNavCollapsed}
                    onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                    packs={packs}
                    allProducts={products}
                    allPacks={packs}
                    onNavigateToPacks={handleNavigateToPacks}
                    onNavigateToPackDetail={handleNavigateToPackDetail}
                />;
            case 'promotions':
                return <PromotionsPage
                    onNavigateHome={handleNavigateHome}
                    onNavigateToCategory={handleNavigateToCategory}
                    onPreview={handlePreviewProduct}
                    products={products}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                />;
            case 'blog':
                return <BlogPage onNavigateHome={handleNavigateHome} onSelectPost={handleNavigateToBlogPost} />;
            case 'blogPost':
                return <BlogPostPage slug={view.data.slug} onNavigateHome={handleNavigateHome} onNavigateToBlog={handleNavigateToBlog} />;
            case 'contact':
                return <ContactPage onNavigateHome={handleNavigateHome} stores={stores} />;
            case 'login':
                return <LoginPage onNavigateHome={handleNavigateHome} onLoginSuccess={handleLoginSuccess} />;
            case 'checkout':
                return <CheckoutPage 
                    onNavigateHome={handleNavigateHome} 
                    onOrderComplete={handleOrderComplete} 
                    onNavigateToPaymentGateway={handleNavigateToPaymentGateway}
                    stores={stores}
                />;
            case 'paymentGateway':
                return <PaymentGatewayPage
                    orderId={view.data.orderId}
                    total={view.data.total}
                    customerInfo={view.data.customerInfo}
                    onNavigateHome={handleNavigateHome}
                    onOrderComplete={handleOrderComplete}
                    onGoBack={handleNavigateToCheckout}
                />;
            case 'favorites':
                return <FavoritesPage 
                    onNavigateHome={handleNavigateHome} 
                    onPreview={handlePreviewProduct}
                    allProducts={products}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                />;
            case 'profile':
                 if (!currentUser) {
                    handleNavigateToLogin();
                    return null;
                }
                return <ProfilePage 
                    user={currentUser} 
                    onNavigateHome={handleNavigateHome} 
                    onUpdateUser={setCurrentUser}
                />;
            case 'orderHistory':
                if (!currentUser) {
                    handleNavigateToLogin();
                    return null;
                }
                return <OrderHistoryPage
                    orders={orders}
                    onNavigateHome={handleNavigateHome}
                    onNavigateToProfile={handleNavigateToProfile}
                    onNavigateToOrderDetail={handleNavigateToOrderDetail}
                />;
            case 'orderDetail':
                if (!currentUser) {
                    handleNavigateToLogin();
                    return null;
                }
                const order = orders.find(o => o.id === view.data.orderId);
                if (!order) {
                    return <div className="text-center p-20">Commande non trouvée.</div>
                }
                return <OrderDetailPage
                    order={order}
                    allProducts={products}
                    onNavigateToOrderHistory={handleNavigateToOrderHistory}
                    onNavigateHome={handleNavigateHome}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                />;
            case 'compare':
                return <ComparePage onNavigateHome={handleNavigateHome} />;
            case 'stores':
                return <StoresPage onNavigateHome={handleNavigateHome} stores={stores} />;
            case 'admin':
                return <AdminPage 
                            onNavigateHome={handleNavigateHome}
                            productsData={products}
                            setProductsData={setProducts}
                            categoriesData={categories}
                            setCategoriesData={setCategories}
                            packsData={packs}
                            setPacksData={setPacks}
                            ordersData={orders}
                            setOrdersData={setOrders}
                            messagesData={messages}
                            setMessagesData={setMessages}
                            advertisementsData={advertisements}
                            setAdvertisementsData={setAdvertisements}
                            promotionsData={promotions}
                            setPromotionsData={setPromotions}
                            storesData={stores}
                            setStoresData={setStores}
                        />;
            default:
                return <HomePage 
                    onNavigate={handleNavigateToCategory} 
                    isNavCollapsed={isNavCollapsed}
                    onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                    onPreview={handlePreviewProduct}
                    onNavigateToPacks={handleNavigateToPacks}
                    products={products}
                    packs={packs}
                    advertisements={advertisements}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                />;
        }
    };
    
    return (
        <>
            {view.name === 'admin' ? (
                <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
                    {renderContent()}
                </div>
            ) : (
                <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                    <TopBar onNavigateToAdmin={handleNavigateToAdmin} onNavigateToStores={handleNavigateToStores}/>
                    <Header 
                        onNavigateToLogin={handleNavigateToLogin}
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                        onNavigateToFavorites={handleNavigateToFavorites}
                        onNavigateToProfile={handleNavigateToProfile}
                        onNavigateToOrderHistory={handleNavigateToOrderHistory}
                        allProducts={products}
                        allPacks={packs}
                        allCategories={categories}
                        onNavigateToCategory={handleNavigateToCategory}
                        onNavigateToProductDetail={handleNavigateToProductDetail}
                        onNavigateToCompare={handleNavigateToCompare}
                    />
                    <NavBar 
                        onNavigateHome={handleNavigateHome}
                        onNavigateToPacks={handleNavigateToPacks}
                        onNavigateToPromotions={handleNavigateToPromotions}
                        onNavigateToBlog={handleNavigateToBlog}
                        onNavigateToContact={handleNavigateToContact}
                    />

                    {renderContent()}
                    
                    <Footer />
                    <WhatsAppButton />
                    <ScrollToTopButton />
                    <ProductPreviewModal product={previewProduct} onClose={handleClosePreview} />
                    <CartSidebar 
                        isLoggedIn={isLoggedIn}
                        onNavigateToCheckout={handleNavigateToCheckout}
                        onNavigateToLogin={handleNavigateToLogin}
                        allProducts={products}
                    />
                </div>
            )}
        </>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <FavoritesProvider>
                    <CompareProvider>
                        <CartProvider>
                            <AppContent />
                        </CartProvider>
                    </CompareProvider>
                </FavoritesProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};

export default App;
