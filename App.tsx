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
import type { Product, Pack, Category, Brand, Order, ContactMessage, CartItem } from './types';
import { CartProvider } from './components/CartContext';
import { CartSidebar } from './components/CartSidebar';
import { AdminPage } from './components/admin/AdminPage';
import { allProducts, categories as initialCategories, packs as initialPacks, blogPosts, brands, orders as initialOrders, contactMessages as initialMessages } from './constants';


type View =
  | { name: 'home'; data: null }
  | { name: 'productList'; data: { categoryName: string } }
  | { name: 'packs'; data: null }
  | { name: 'promotions'; data: null }
  | { name: 'blog'; data: null }
  | { name: 'blogPost'; data: { slug: string } }
  | { name: 'contact'; data: null }
  | { name: 'login'; data: null }
  | { name: 'checkout'; data: null }
  | { name: 'admin'; data: null };


const App: React.FC = () => {
    const [view, setView] = useState<View>({ name: 'home', data: null });
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Centralized data management for admin CRUD
    const [products, setProducts] = useState<Product[]>(allProducts);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [packs, setPacks] = useState<Pack[]>(initialPacks);
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);

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

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        handleNavigateToCheckout();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        handleNavigateHome();
    };

    const handlePreviewProduct = (product: Product) => {
        setPreviewProduct(product);
    };

    const handleClosePreview = () => {
        setPreviewProduct(null);
    };

    const handleOrderComplete = (cartItems: CartItem[]) => {
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
            customerName: "Nouveau Client",
            date: new Date().toISOString().split('T')[0],
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: 'En attente',
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
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
                />;
            case 'promotions':
                return <PromotionsPage
                    onNavigateHome={handleNavigateHome}
                    onNavigateToCategory={handleNavigateToCategory}
                    onPreview={handlePreviewProduct}
                    products={products}
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
                return <CheckoutPage onNavigateHome={handleNavigateHome} onOrderComplete={handleOrderComplete} />;
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
                />;
        }
    };
    
    if (view.name === 'admin') {
        return (
             <ThemeProvider>
                <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
                   {renderContent()}
                </div>
            </ThemeProvider>
        );
    }
    
    return (
        <ThemeProvider>
            <CartProvider>
                <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                    <TopBar onNavigateToAdmin={handleNavigateToAdmin} />
                    <Header 
                        onNavigateToLogin={handleNavigateToLogin}
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
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
            </CartProvider>
        </ThemeProvider>
    );
};

export default App;