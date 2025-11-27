
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { ToastProvider, useToast } from './components/ToastContext';
import { CartProvider } from './components/CartContext';
import { FavoritesProvider } from './components/FavoritesContext';
import { CompareProvider } from './components/CompareContext';

import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { SupportWidget } from './components/SupportWidget';
import { CartSidebar } from './components/CartSidebar';
import { ProductPreviewModal } from './components/ProductPreviewModal';

// Pages
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { ProductListPage } from './components/ProductListPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { PacksPage } from './components/PacksPage';
import { PackDetailPage } from './components/PackDetailPage';
import { PromotionsPage } from './components/PromotionsPage';
import { BlogPage } from './components/BlogPage';
import { BlogPostPage } from './components/BlogPostPage';
import { ContactPage } from './components/ContactPage';
import { CheckoutPage } from './components/CheckoutPage';
import { PaymentGatewayPage } from './components/PaymentGatewayPage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { StoresPage } from './components/StoresPage';
import { ComparePage } from './components/ComparePage';
import { FavoritesPage } from './components/FavoritesPage';
import { AdminPage } from './components/admin/AdminPage';

// Utils & Data
import { api } from './utils/api';
import type { User, Product, Category, Pack, Order, CartItem, CustomerInfo } from './types';
import { initialAdvertisements } from './constants';

const AppContent: React.FC = () => {
    // Navigation State
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [selectedPackId, setSelectedPackId] = useState<number | null>(null);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<string | null>(null);
    
    // Data State
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [packs, setPacks] = useState<Pack[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [stores, setStores] = useState<any[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [promotionsData, setPromotionsData] = useState<any[]>([]);
    const [advertisements, setAdvertisements] = useState(initialAdvertisements);
    
    // UI State
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const { addToast } = useToast();

    // Initial Data Loading
    useEffect(() => {
        const loadData = async () => {
            try {
                const [productsData, packsData, categoriesData, storesData, adsData] = await Promise.all([
                    api.getProducts(),
                    api.getPacks(),
                    api.getCategories(),
                    api.getStores(),
                    api.getAdvertisements()
                ]);
                
                setProducts(productsData);
                setPacks(packsData);
                setCategories(categoriesData);
                setStores(storesData);
                // Merge ads with defaults to ensure structure
                setAdvertisements({...initialAdvertisements, ...adsData}); 

                // Check User Session
                try {
                    const userData = await api.getMe();
                    if (userData) setUser(userData);
                } catch (e) {
                    // Not logged in - silent fail
                }
            } catch (error) {
                console.error("Error loading initial data:", error);
                addToast("Erreur lors du chargement des données.", "error");
            }
        };
        loadData();
    }, [addToast]);

    // Load user-specific data when user changes
    useEffect(() => {
        if (user) {
            api.getMyOrders().then(setOrders).catch(console.error);
        } else {
            setOrders([]);
        }
    }, [user]);

    // --- Navigation Handlers ---
    const navigateToHome = () => setCurrentPage('home');
    const navigateToCategory = (category: string) => { setSelectedCategory(category); setCurrentPage('product-list'); };
    const navigateToProductDetail = (id: number | string) => { setSelectedProductId(Number(id)); setCurrentPage('product-detail'); };
    const navigateToPackDetail = (id: number | string) => { setSelectedPackId(Number(id)); setCurrentPage('pack-detail'); };
    const navigateToPacks = () => setCurrentPage('packs');
    const navigateToPromotions = () => setCurrentPage('promotions');
    const navigateToBlog = () => setCurrentPage('blog');
    const navigateToBlogPost = (slug: string) => { setSelectedBlogPostSlug(slug); setCurrentPage('blog-post'); };
    const navigateToContact = () => setCurrentPage('contact');
    const navigateToLogin = () => setCurrentPage('login');
    const navigateToProfile = () => setCurrentPage('profile');
    const navigateToCart = () => {}; // Cart is sidebar, but checkout is page
    const navigateToCheckout = () => setCurrentPage('checkout');
    const navigateToOrderHistory = () => setCurrentPage('order-history');
    const navigateToOrderDetail = (id: string) => { setSelectedOrderId(id); setCurrentPage('order-detail'); };
    const navigateToStores = () => setCurrentPage('stores');
    const navigateToCompare = () => setCurrentPage('compare');
    const navigateToFavorites = () => setCurrentPage('favorites');
    const navigateToAdmin = () => setCurrentPage('admin');

    const handleLoginSuccess = async () => {
        try {
            const userData = await api.getMe();
            setUser(userData);
            setCurrentPage('home');
            addToast(`Bienvenue ${userData.firstName} !`, "success");
        } catch (e) {
            console.error("Login data fetch error", e);
        }
    };

    const handleLogout = async () => {
        await api.logout();
        setUser(null);
        localStorage.removeItem('token');
        navigateToHome();
        addToast("Vous avez été déconnecté.", "info");
    };

    const handleOrderComplete = async (cartItems: CartItem[], customerInfo: CustomerInfo, paymentId?: string) => {
        const newOrder = {
            id: paymentId || `ES-${Date.now()}`,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            date: new Date().toISOString(),
            total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            status: 'En attente',
            itemCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
            items: cartItems.map(item => ({
                productId: parseInt(item.id.split('-')[1]),
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                imageUrl: item.imageUrl
            })),
            shippingAddress: {
                type: 'Domicile',
                street: customerInfo.address,
                city: customerInfo.city,
                postalCode: customerInfo.postalCode,
                isDefault: true
            },
            paymentMethod: paymentId ? 'Carte Bancaire' : 'Paiement à la livraison'
        };

        try {
            await api.createOrder(newOrder);
            setOrders(prev => [newOrder as any, ...prev]);
            setCurrentPage('order-history');
            addToast("Commande enregistrée avec succès !", "success");
        } catch (error) {
            addToast("Erreur lors de l'enregistrement de la commande.", "error");
        }
    };

    // --- Render Current Page ---
    const renderPage = () => {
        if (currentPage === 'admin' && user?.role === 'ADMIN') {
            return (
                <AdminPage 
                    onNavigateHome={navigateToHome}
                    onLogout={handleLogout}
                    // Pass data and setters for admin management
                    productsData={products} setProductsData={setProducts}
                    categoriesData={categories} setCategoriesData={setCategories}
                    packsData={packs} setPacksData={setPacks}
                    ordersData={orders} setOrdersData={setOrders} // In real app, admin fetches ALL orders
                    messagesData={[]} setMessagesData={() => {}} // Need to fetch messages for admin
                    advertisementsData={advertisements} setAdvertisementsData={setAdvertisements}
                    promotionsData={promotionsData} setPromotionsData={setPromotionsData}
                    storesData={stores} setStoresData={setStores}
                />
            );
        }

        return (
            <div className="flex flex-col min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
                <TopBar user={user} onNavigateToAdmin={navigateToAdmin} onNavigateToStores={navigateToStores} />
                <Header 
                    user={user}
                    onNavigateToLogin={navigateToLogin} 
                    isLoggedIn={!!user} 
                    onLogout={handleLogout}
                    onNavigateToFavorites={navigateToFavorites}
                    onNavigateToProfile={navigateToProfile}
                    onNavigateToOrderHistory={navigateToOrderHistory}
                    allProducts={products}
                    allPacks={packs}
                    allCategories={categories}
                    onNavigateToCategory={navigateToCategory}
                    onNavigateToProductDetail={navigateToProductDetail}
                    onNavigateToCompare={navigateToCompare}
                />
                <NavBar 
                    onNavigateHome={navigateToHome}
                    onNavigateToPacks={navigateToPacks}
                    onNavigateToPromotions={navigateToPromotions}
                    onNavigateToBlog={navigateToBlog}
                    onNavigateToNews={() => {}}
                    onNavigateToContact={navigateToContact}
                />
                
                <main className="flex-grow">
                    {currentPage === 'home' && (
                        <HomePage 
                            onNavigate={navigateToCategory}
                            isNavCollapsed={isNavCollapsed}
                            onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                            onPreview={setPreviewProduct}
                            onNavigateToPacks={navigateToPacks}
                            products={products}
                            packs={packs}
                            advertisements={advertisements}
                            onNavigateToProductDetail={navigateToProductDetail}
                            categories={categories}
                            brands={[]} // Brands could be derived from products
                        />
                    )}
                    {currentPage === 'product-list' && (
                        <ProductListPage 
                            categoryName={selectedCategory}
                            onNavigateHome={navigateToHome}
                            onNavigateToCategory={navigateToCategory}
                            isNavCollapsed={isNavCollapsed}
                            onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                            onPreview={setPreviewProduct}
                            onNavigateToPacks={navigateToPacks}
                            products={products}
                            onNavigateToProductDetail={navigateToProductDetail}
                            categories={categories}
                        />
                    )}
                    {currentPage === 'product-detail' && selectedProductId && (
                        <ProductDetailPage 
                            product={products.find(p => p.id === selectedProductId) || products[0]} 
                            allProducts={products}
                            onNavigateHome={navigateToHome}
                            onNavigateToProductDetail={navigateToProductDetail}
                            onPreview={setPreviewProduct}
                        />
                    )}
                    {currentPage === 'packs' && (
                        <PacksPage 
                            onNavigateHome={navigateToHome}
                            onNavigateToCategory={navigateToCategory}
                            isNavCollapsed={isNavCollapsed}
                            onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                            packs={packs}
                            allProducts={products}
                            allPacks={packs}
                            onNavigateToPacks={navigateToPacks}
                            onNavigateToPackDetail={navigateToPackDetail}
                            categories={categories}
                        />
                    )}
                    {currentPage === 'pack-detail' && selectedPackId && (
                        <PackDetailPage 
                            pack={packs.find(p => p.id === selectedPackId) || packs[0]}
                            allProducts={products}
                            allPacks={packs}
                            onNavigateHome={navigateToHome}
                            onNavigateToProductDetail={navigateToProductDetail}
                            onNavigateToPackDetail={navigateToPackDetail}
                            onNavigateToPacks={navigateToPacks}
                        />
                    )}
                    {currentPage === 'login' && (
                        <LoginPage 
                            onNavigateHome={navigateToHome} 
                            onLoginSuccess={handleLoginSuccess} 
                        />
                    )}
                    {currentPage === 'profile' && user && (
                        <ProfilePage 
                            user={user} 
                            onNavigateHome={navigateToHome} 
                            onUpdateUser={(updatedUser) => setUser(updatedUser)} 
                        />
                    )}
                    {currentPage === 'contact' && (
                        <ContactPage onNavigateHome={navigateToHome} stores={stores} />
                    )}
                    {currentPage === 'promotions' && (
                        <PromotionsPage 
                            onNavigateHome={navigateToHome} 
                            onNavigateToCategory={navigateToCategory}
                            onPreview={setPreviewProduct}
                            products={products}
                            onNavigateToProductDetail={navigateToProductDetail}
                        />
                    )}
                    {currentPage === 'blog' && (
                        <BlogPage onNavigateHome={navigateToHome} onSelectPost={navigateToBlogPost} />
                    )}
                    {currentPage === 'blog-post' && selectedBlogPostSlug && (
                        <BlogPostPage 
                            slug={selectedBlogPostSlug} 
                            onNavigateHome={navigateToHome} 
                            onNavigateToBlog={navigateToBlog} 
                        />
                    )}
                    {currentPage === 'checkout' && (
                        <CheckoutPage 
                            onNavigateHome={navigateToHome}
                            onOrderComplete={handleOrderComplete}
                            onNavigateToPaymentGateway={(orderId, total, customerInfo) => {
                                // In a real app, we'd pass this data via context or URL state
                                // For now, we simulate navigation
                                setCurrentPage('payment');
                            }}
                            stores={stores}
                        />
                    )}
                    {currentPage === 'payment' && (
                        <PaymentGatewayPage 
                            orderId={`ES-${Date.now()}`} 
                            total={0} // Total would come from context
                            customerInfo={{} as any} 
                            onNavigateHome={navigateToHome}
                            onOrderComplete={handleOrderComplete}
                            onGoBack={navigateToCheckout}
                        />
                    )}
                    {currentPage === 'order-history' && (
                        <OrderHistoryPage 
                            orders={orders}
                            onNavigateHome={navigateToHome}
                            onNavigateToProfile={navigateToProfile}
                            onNavigateToOrderDetail={navigateToOrderDetail}
                        />
                    )}
                    {currentPage === 'order-detail' && selectedOrderId && (
                        <OrderDetailPage 
                            order={orders.find(o => o.id === selectedOrderId) || orders[0]}
                            allProducts={products}
                            onNavigateHome={navigateToHome}
                            onNavigateToOrderHistory={navigateToOrderHistory}
                            onNavigateToProductDetail={navigateToProductDetail}
                        />
                    )}
                    {currentPage === 'stores' && (
                        <StoresPage onNavigateHome={navigateToHome} stores={stores} />
                    )}
                    {currentPage === 'compare' && (
                        <ComparePage onNavigateHome={navigateToHome} />
                    )}
                    {currentPage === 'favorites' && (
                        <FavoritesPage 
                            onNavigateHome={navigateToHome} 
                            onPreview={setPreviewProduct}
                            allProducts={products}
                            onNavigateToProductDetail={navigateToProductDetail}
                        />
                    )}
                </main>

                <Footer />
                {(!user || user.role !== 'ADMIN') && <SupportWidget user={user} />}
                <ScrollToTopButton />
                <CartSidebar 
                    isLoggedIn={!!user} 
                    onNavigateToCheckout={navigateToCheckout} 
                    onNavigateToLogin={navigateToLogin}
                    allProducts={products}
                />
                <ProductPreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
            </div>
        );
    };

    return renderPage();
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <CartProvider>
                    <FavoritesProvider>
                        <CompareProvider>
                            <AppContent />
                        </CompareProvider>
                    </FavoritesProvider>
                </CartProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};

export default App;
