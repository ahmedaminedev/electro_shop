
import React, { useState, useEffect, useMemo } from 'react';
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
import type { Product, Pack, Category, Order, ContactMessage, Advertisements, User, Promotion, CustomerInfo, Store, Brand, CartItem } from './types';
import { CartProvider } from './components/CartContext';
import { FavoritesProvider } from './components/FavoritesContext';
import { ToastProvider, useToast } from './components/ToastContext';
import { CompareProvider } from './components/CompareContext';
import { ComparePage } from './components/ComparePage';
import { CartSidebar } from './components/CartSidebar';
import { AdminPage } from './components/admin/AdminPage';
import { FavoritesPage } from './components/FavoritesPage';
import { ProfilePage } from './components/ProfilePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { PackDetailPage } from './components/PackDetailPage';
import { PaymentGatewayPage } from './components/PaymentGatewayPage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { StoresPage } from './components/StoresPage';
import { api } from './utils/api';

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
  | { name: 'stores'; data: null };

const emptyAdvertisements: Advertisements = {
    heroSlides: [],
    destockage: [],
    audioPromo: [],
    promoBanners: [
        {id:0, title:'', subtitle:'', buttonText:'', image:'', linkType:'category', linkTarget:''}, 
        {id:1, title:'', subtitle:'', buttonText:'', image:'', linkType:'category', linkTarget:''}
    ],
    smallPromoBanners: []
};

const AppContent: React.FC = () => {
    const [view, setView] = useState<View>({ name: 'home', data: null });
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [pendingRedirect, setPendingRedirect] = useState<View['name'] | null>(null);
    
    const { addToast } = useToast();

    // State for dynamic data
    const [products, setProducts] = useState<Product[]>([]); 
    const [categories, setCategories] = useState<Category[]>([]);
    const [packs, setPacks] = useState<Pack[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [advertisements, setAdvertisements] = useState<Advertisements>(emptyAdvertisements); 
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [stores, setStores] = useState<Store[]>([]);

    // Dynamically calculate brands based on products
    const brands: Brand[] = useMemo(() => {
        const brandCounts: { [key: string]: number } = {};
        products.forEach(p => {
            if (p.brand) {
                brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
            }
        });
        return Object.entries(brandCounts).map(([name, productCount]) => ({
            name,
            productCount,
            logoUrl: `https://via.placeholder.com/150x60?text=${name}` // You might want to store logo URLs in DB later
        }));
    }, [products]);

    const fetchUserData = async (user: User) => {
        try {
            // Fetch Orders
            let fetchedOrders;
            if (user.role === 'ADMIN') {
                fetchedOrders = await api.getAllOrders();
                // Only fetch messages if admin
                const fetchedMessages = await api.getMessages();
                setMessages(fetchedMessages || []);
            } else {
                fetchedOrders = await api.getMyOrders();
            }
            setOrders(fetchedOrders || []);
        } catch (error) {
            console.error("Failed to fetch user specific data.", error);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [
                    loadedProducts,
                    loadedCategories,
                    loadedPacks,
                    loadedStores,
                    loadedPromotions,
                    loadedAds
                ] = await Promise.all([
                    api.getProducts().catch(() => []),
                    api.getCategories().catch(() => []),
                    api.getPacks().catch(() => []),
                    api.getStores().catch(() => []),
                    api.getPromotions().catch(() => []),
                    api.getAdvertisements().catch(() => ({}))
                ]);

                setProducts(loadedProducts);
                setCategories(loadedCategories);
                setPacks(loadedPacks);
                setStores(loadedStores);
                setPromotions(loadedPromotions);
                
                if (loadedAds && Object.keys(loadedAds).length > 0) {
                    setAdvertisements(prev => ({...prev, ...loadedAds}));
                }
            } catch (e) {
                console.error("API Error: Failed to load initial data.", e);
                addToast("Erreur de connexion au serveur.", "error");
            }
        };

        fetchAllData();

        // Check login status
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const user = await api.getMe();
                setCurrentUser(user);
                setIsLoggedIn(true);
                fetchUserData(user);
            } catch (e) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setCurrentUser(null);
                setOrders([]);
                setMessages([]);
            }
        };
        checkAuth();
    }, []);

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
    
    const handleNavigateToCheckout = () => {
        if (isLoggedIn) {
            handleNavigate({ name: 'checkout', data: null });
        } else {
            setPendingRedirect('checkout');
            addToast("Veuillez vous connecter pour valider votre commande", "info");
            handleNavigate({ name: 'login', data: null });
        }
    };

    const handleNavigateToAdmin = () => {
        if (isLoggedIn && currentUser?.role === 'ADMIN') {
            handleNavigate({ name: 'admin', data: null });
        } else {
            addToast("Accès refusé. Droits d'administrateur requis.", "error");
        }
    };
    
    const handleNavigateToFavorites = () => handleNavigate({ name: 'favorites', data: null });
    const handleNavigateToProfile = () => handleNavigate({ name: 'profile', data: null });
    const handleNavigateToOrderHistory = () => handleNavigate({ name: 'orderHistory', data: null });
    const handleNavigateToOrderDetail = (orderId: string) => handleNavigate({ name: 'orderDetail', data: { orderId } });
    const handleNavigateToProductDetail = (productId: number) => handleNavigate({ name: 'productDetail', data: { productId } });
    const handleNavigateToPackDetail = (packId: number) => handleNavigate({ name: 'packDetail', data: { packId } });
    const handleNavigateToPaymentGateway = (orderId: string, total: number, customerInfo: CustomerInfo) => handleNavigate({ name: 'paymentGateway', data: { orderId, total, customerInfo } });
    const handleNavigateToCompare = () => handleNavigate({ name: 'compare', data: null });
    const handleNavigateToStores = () => handleNavigate({ name: 'stores', data: null });

    const handleLoginSuccess = async () => {
        try {
            const user = await api.getMe();
            setCurrentUser(user);
            setIsLoggedIn(true);
            addToast(`Bienvenue, ${user.firstName} !`, "success");
            
            await fetchUserData(user);

            if (pendingRedirect === 'checkout') {
                handleNavigate({ name: 'checkout', data: null });
                setPendingRedirect(null);
            } else {
                if (user.role === 'ADMIN') {
                    handleNavigate({ name: 'admin', data: null });
                } else {
                    handleNavigateToProfile();
                }
            }
        } catch (error) {
            addToast("Erreur lors de la connexion.", "error");
        }
    };

    const handleLogout = async () => {
        try {
            await api.logout();
        } finally {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setCurrentUser(null);
            setOrders([]); 
            setMessages([]);
            addToast("Déconnecté.", "info");
            handleNavigateHome();
        }
    };

    const handlePreviewProduct = (product: Product) => {
        setPreviewProduct(product);
    };

    const handleClosePreview = () => {
        setPreviewProduct(null);
    };

    const handleOrderComplete = async (cartItems: CartItem[], customerInfo: CustomerInfo, paymentId?: string) => {
        const finalOrderId = paymentId || `ES-${Date.now()}`;
        const orderPayload = {
            id: finalOrderId,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            date: new Date().toISOString().split('T')[0],
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: 'En attente',
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            items: cartItems.map(cartItem => ({
                id: cartItem.originalItem.id,
                productId: cartItem.originalItem.id,
                name: cartItem.name,
                imageUrl: cartItem.imageUrl,
                quantity: cartItem.quantity,
                price: cartItem.price,
                brand: 'originalItem' in cartItem && 'brand' in cartItem.originalItem ? cartItem.originalItem.brand : 'Pack',
            })),
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
        
        try {
            const savedOrder = await api.createOrder(orderPayload);
            setOrders(prev => [savedOrder, ...prev]);
            addToast(`Commande ${finalOrderId} enregistrée !`, "success");
            handleNavigateToOrderDetail(finalOrderId);
        } catch (error: any) {
            addToast("Erreur lors de la création de la commande.", "error");
        }
    };

    const renderContent = () => {
        if (view.name === 'admin') {
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
        }

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
                    categories={categories}
                    brands={brands}
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
                    categories={categories}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                />;
            case 'productDetail':
                const product = products.find(p => p.id === view.data.productId);
                if (!product) return <div>Produit non trouvé.</div>
                return <ProductDetailPage 
                    product={product} 
                    allProducts={products}
                    onNavigateHome={handleNavigateHome}
                    onNavigateToProductDetail={handleNavigateToProductDetail}
                    onPreview={handlePreviewProduct}
                />
            case 'packDetail':
                const packToDisplay = packs.find(p => p.id === view.data.packId);
                if (!packToDisplay) return <div>Pack non trouvé.</div>;
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
                    categories={categories}
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
                 if (!currentUser) { handleNavigateToLogin(); return null; }
                return <ProfilePage user={currentUser} onNavigateHome={handleNavigateHome} onUpdateUser={setCurrentUser} />;
            case 'orderHistory':
                if (!currentUser) { handleNavigateToLogin(); return null; }
                return <OrderHistoryPage orders={orders} onNavigateHome={handleNavigateHome} onNavigateToProfile={handleNavigateToProfile} onNavigateToOrderDetail={handleNavigateToOrderDetail} />;
            case 'orderDetail':
                if (!currentUser) { handleNavigateToLogin(); return null; }
                const order = orders.find(o => o.id === view.data.orderId);
                if (!order) return <div>Commande introuvable.</div>
                return <OrderDetailPage order={order} allProducts={products} onNavigateToOrderHistory={handleNavigateToOrderHistory} onNavigateHome={handleNavigateHome} onNavigateToProductDetail={handleNavigateToProductDetail} />;
            case 'compare':
                return <ComparePage onNavigateHome={handleNavigateHome} />;
            case 'stores':
                return <StoresPage onNavigateHome={handleNavigateHome} stores={stores} />;
            default:
                return <HomePage onNavigate={handleNavigateToCategory} isNavCollapsed={isNavCollapsed} onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)} onPreview={handlePreviewProduct} onNavigateToPacks={handleNavigateToPacks} products={products} packs={packs} advertisements={advertisements} onNavigateToProductDetail={handleNavigateToProductDetail} categories={categories} brands={brands} />;
        }
    };
    
    return (
        <ThemeProvider>
            <ToastProvider>
                <FavoritesProvider>
                    <CompareProvider>
                        <CartProvider>
                            <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                                <TopBar user={currentUser} onNavigateToAdmin={handleNavigateToAdmin} onNavigateToStores={handleNavigateToStores} />
                                <Header onNavigateToLogin={handleNavigateToLogin} isLoggedIn={isLoggedIn} onLogout={handleLogout} onNavigateToFavorites={handleNavigateToFavorites} onNavigateToProfile={handleNavigateToProfile} onNavigateToOrderHistory={handleNavigateToOrderHistory} allProducts={products} allPacks={packs} allCategories={categories} onNavigateToCategory={handleNavigateToCategory} onNavigateToProductDetail={handleNavigateToProductDetail} onNavigateToCompare={handleNavigateToCompare} />
                                <NavBar onNavigateHome={handleNavigateHome} onNavigateToPacks={handleNavigateToPacks} onNavigateToPromotions={handleNavigateToPromotions} onNavigateToBlog={handleNavigateToBlog} onNavigateToContact={handleNavigateToContact} />
                                {renderContent()}
                                <Footer />
                                <WhatsAppButton />
                                <ScrollToTopButton />
                                <ProductPreviewModal product={previewProduct} onClose={handleClosePreview} />
                                <CartSidebar isLoggedIn={isLoggedIn} onNavigateToCheckout={handleNavigateToCheckout} onNavigateToLogin={handleNavigateToLogin} allProducts={products} />
                            </div>
                        </CartProvider>
                    </CompareProvider>
                </FavoritesProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};

export default AppContent;
