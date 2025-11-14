

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
import type { Product, Pack, Category, Brand, Order, ContactMessage, CartItem, Advertisements, User, Promotion, CustomerInfo } from './types';
import { CartProvider } from './components/CartContext';
import { FavoritesProvider } from './components/FavoritesContext';
import { CartSidebar } from './components/CartSidebar';
import { AdminPage } from './components/admin/AdminPage';
import { allProducts, categories as initialCategories, packs as initialPacks, blogPosts, brands, orders as initialOrders, contactMessages as initialMessages, initialAdvertisements, mockUser, mockPromotions } from './constants';
import { FavoritesPage } from './components/FavoritesPage';
import { ProfilePage } from './components/ProfilePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { PackDetailPage } from './components/PackDetailPage';
import { PaymentGatewayPage } from './components/PaymentGatewayPage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { OrderDetailPage } from './components/OrderDetailPage';


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
  | { name: 'orderDetail'; data: { orderId: string } };


const App: React.FC = () => {
    const [view, setView] = useState<View>({ name: 'home', data: null });
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Centralized data management for admin CRUD
    const [products, setProducts] = useState<Product[]>(allProducts);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [packs, setPacks] = useState<Pack[]>(initialPacks);
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
    const [advertisements, setAdvertisements] = useState<Advertisements>(initialAdvertisements);
    const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);

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
    const handleNavigateToCheckout = () => handleNavigate({ name: 'checkout', data: null });
    const handleNavigateToAdmin = () => handleNavigate({ name: 'admin', data: null });
    const handleNavigateToFavorites = () => handleNavigate({ name: 'favorites', data: null });
    const handleNavigateToProfile = () => handleNavigate({ name: 'profile', data: null });
    const handleNavigateToOrderHistory = () => handleNavigate({ name: 'orderHistory', data: null });
    const handleNavigateToOrderDetail = (orderId: string) => handleNavigate({ name: 'orderDetail', data: { orderId } });
    const handleNavigateToProductDetail = (productId: number) => handleNavigate({ name: 'productDetail', data: { productId } });
    const handleNavigateToPackDetail = (packId: number) => handleNavigate({ name: 'packDetail', data: { packId } });
    const handleNavigateToPaymentGateway = (orderId: string, total: number, customerInfo: CustomerInfo) => handleNavigate({ name: 'paymentGateway', data: { orderId, total, customerInfo } });


    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setCurrentUser(mockUser);
        handleNavigateToProfile();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        handleNavigateHome();
    };

    const handlePreviewProduct = (product: Product) => {
        setPreviewProduct(product);
    };

    const handleClosePreview = () => {
        setPreviewProduct(null);
    };

    const handleOrderComplete = (cartItems: CartItem[], customerInfo: CustomerInfo) => {
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

        // Optionally, add a new order to the list
        const newOrder: Order = {
            id: `ES-${1025 + orders.length}`,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            date: new Date().toISOString().split('T')[0],
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: 'En attente',
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            items: cartItems.map(cartItem => {
                const isPack = cartItem.id.startsWith('pack-');
                const originalProduct = isPack ? null : cartItem.originalItem as Product;

                // FIX: Add missing 'id' property required by the `(OrderItem & Product)` type.
                return {
                    id: cartItem.originalItem.id,
                    productId: cartItem.originalItem.id,
                    name: cartItem.name,
                    imageUrl: cartItem.imageUrl,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                    // These fields below are from Product type, we fill them if we can
                    // This is to satisfy OrderItem which extends Product
                    brand: originalProduct?.brand || 'Pack',
                    category: originalProduct?.category || 'Packs',
                    promo: originalProduct?.promo,
                    description: originalProduct?.description,
                };
            }),
            shippingAddress: mockUser.addresses.find(a => a.isDefault) || mockUser.addresses[0], // Use a default address for now
            paymentMethod: 'Paiement par carte',
        };
        setOrders(prev => [newOrder, ...prev]);

        alert("Merci pour votre commande ! Votre stock a été mis à jour.");
        handleNavigateHome();
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
                    // Fallback if product not found
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
                return <ContactPage onNavigateHome={handleNavigateHome} />;
            case 'login':
                return <LoginPage onNavigateHome={handleNavigateHome} onLoginSuccess={handleLoginSuccess} />;
            case 'checkout':
                return <CheckoutPage 
                    onNavigateHome={handleNavigateHome} 
                    onOrderComplete={handleOrderComplete} 
                    onNavigateToPaymentGateway={handleNavigateToPaymentGateway}
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
        <ThemeProvider>
            <FavoritesProvider>
                <CartProvider>
                    {view.name === 'admin' ? (
                        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
                           {renderContent()}
                        </div>
                    ) : (
                        <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                            <TopBar onNavigateToAdmin={handleNavigateToAdmin} />
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
                            />
                        </div>
                    )}
                </CartProvider>
            </FavoritesProvider>
        </ThemeProvider>
    );
};

export default App;