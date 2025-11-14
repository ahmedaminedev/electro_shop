import React from 'react';
import { Logo } from '../Logo';
import { ChartPieIcon, ShoppingBagIcon, TagIcon, CubeIcon, UsersIcon, InboxIcon, WrenchIcon, ArrowLongLeftIcon, SparklesIcon } from '../IconComponents';
import type { AdminPageName } from './AdminPage';

interface AdminSidebarProps {
    activePage: AdminPageName;
    setActivePage: (page: AdminPageName) => void;
    onNavigateHome: () => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <li>
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            <span className="w-6 h-6">{icon}</span>
            <span className="ml-4 font-semibold">{label}</span>
        </a>
    </li>
);

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage, setActivePage, onNavigateHome }) => {
    
    const navItems: { id: AdminPageName, label: string, icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <ChartPieIcon /> },
        { id: 'products', label: 'Produits', icon: <ShoppingBagIcon /> },
        { id: 'categories', label: 'Catégories', icon: <TagIcon /> },
        { id: 'packs', label: 'Packs', icon: <CubeIcon /> },
        { id: 'orders', label: 'Commandes', icon: <UsersIcon /> },
        { id: 'messages', label: 'Messages', icon: <InboxIcon /> },
        { id: 'promotions', label: 'Promotions', icon: <SparklesIcon /> },
        { id: 'ads', label: 'Publicités', icon: <WrenchIcon /> },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col flex-shrink-0">
            <div className="h-20 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <Logo />
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <NavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={activePage === item.id}
                            onClick={() => setActivePage(item.id)}
                        />
                    ))}
                </ul>
            </nav>
            <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
                 <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
                    className="flex items-center p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <ArrowLongLeftIcon className="w-6 h-6" />
                    <span className="ml-4 font-semibold">Retour à la boutique</span>
                </a>
            </div>
        </aside>
    );
};