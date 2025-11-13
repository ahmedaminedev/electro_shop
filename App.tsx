
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
import type { Product } from './types';
import { CartProvider } from './components/CartContext';
import { CartSidebar } from './components/CartSidebar';

type View =
  | { name: 'home'; data: null }
  | { name: 'productList'; data: { categoryName: string } }
  | { name: 'packs'; data: null }
  | { name: 'promotions'; data: null }
  | { name: 'blog'; data: null }
  | { name: 'blogPost'; data: { slug: string } }
  | { name: 'contact'; data: null }
  | { name: 'login'; data: null }
  | { name: 'checkout'; data: null };


const App: React.FC = () => {
    const [view, setView] = useState<View>({ name: 'home', data: null });
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const renderContent = () => {
        switch (view.name) {
            case 'home':
                return <HomePage 
                    onNavigate={handleNavigateToCategory} 
                    isNavCollapsed={isNavCollapsed}
                    onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                    onPreview={handlePreviewProduct}
                />;
            case 'productList':
                return <ProductListPage 
                    categoryName={view.data.categoryName} 
                    onNavigateHome={handleNavigateHome}
                    onNavigateToCategory={handleNavigateToCategory}
                    isNavCollapsed={isNavCollapsed}
                    onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                    onPreview={handlePreviewProduct}
                />;
            case 'packs':
                return <PacksPage
                    onNavigateHome={handleNavigateHome}
                    onNavigateToCategory={handleNavigateToCategory}
                    isNavCollapsed={isNavCollapsed}
                    onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                />;
            case 'promotions':
                return <PromotionsPage
                    onNavigateHome={handleNavigateHome}
                    onNavigateToCategory={handleNavigateToCategory}
                    onPreview={handlePreviewProduct}
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
                return <CheckoutPage onNavigateHome={handleNavigateHome} />;
            default:
                return <HomePage 
                    onNavigate={handleNavigateToCategory} 
                    isNavCollapsed={isNavCollapsed}
                    onToggleNav={() => setIsNavCollapsed(!isNavCollapsed)}
                    onPreview={handlePreviewProduct}
                />;
        }
    };
    
    return (
        <ThemeProvider>
            <CartProvider>
                <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
                    <TopBar />
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
