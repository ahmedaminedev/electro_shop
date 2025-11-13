import React, { useState, useRef, useEffect } from 'react';
import type { Category } from '../types';
import { ListBulletIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDownIcon } from './IconComponents';

interface VerticalNavProps {
    categories: Category[];
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    onCategoryClick: (categoryName: string) => void;
    onNavigateToPacks: () => void;
}

export const VerticalNav: React.FC<VerticalNavProps> = ({ categories, isCollapsed, onToggleCollapse, onCategoryClick, onNavigateToPacks }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const navRef = useRef<HTMLElement>(null);

    const handleCategoryClick = (e: React.MouseEvent, categoryName: string) => {
        e.preventDefault();
        
        if (categoryName === 'Pack électroménager') {
            onNavigateToPacks();
            setActiveCategory(null);
            return;
        }

        const category = categories.find(c => c.name === categoryName);
        if (category?.subCategories || category?.megaMenu) {
            setActiveCategory(prev => (prev === categoryName ? null : categoryName));
        } else {
            setActiveCategory(null);
            onCategoryClick(categoryName);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setActiveCategory(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
        if (isCollapsed) {
            setActiveCategory(null);
        }
    }, [isCollapsed]);

    return (
        <nav ref={navRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hidden lg:block sticky top-24">
            <div
                onClick={onToggleCollapse}
                className="bg-yellow-400 text-gray-800 font-bold text-lg p-3 flex items-center justify-between rounded-t-lg cursor-pointer select-none"
            >
                <div className="flex items-center overflow-hidden">
                    <ListBulletIcon className="w-6 h-6 mr-3 shrink-0" />
                    {!isCollapsed && <span className="truncate">Tous les départements</span>}
                </div>
                <ChevronDoubleLeftIcon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </div>

            <div className={isCollapsed ? 'hidden' : 'block'}>
                <ul className="py-2">
                    {categories.map((category) => (
                        <li key={category.name} className="relative border-b last:border-b-0 border-gray-100 dark:border-gray-700/50">
                            <a 
                                href="#" 
                                onClick={(e) => handleCategoryClick(e, category.name)}
                                className="flex items-center justify-between p-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                aria-haspopup={!!(category.subCategories || category.megaMenu)}
                                aria-expanded={activeCategory === category.name}
                            >
                                <span className="truncate">{category.name}</span>
                                {(category.subCategories || category.megaMenu || category.name === 'Pack électroménager') && (
                                    activeCategory === category.name ? 
                                    <ChevronDownIcon className="w-4 h-4 text-gray-400" /> :
                                    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                                )}
                            </a>
                            
                            {category.subCategories && !category.megaMenu && (
                                <div className={`absolute left-full top-0 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 border border-gray-200 dark:border-gray-700 z-30 transition-all duration-200 ${activeCategory === category.name ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                    {category.subCategories.map((sub, i) => (
                                        <a key={i} href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(sub); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">{sub}</a>
                                    ))}
                                </div>
                            )}

                            {category.megaMenu && (
                                <div className={`absolute left-full -top-px w-[960px] max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 shadow-lg rounded-r-md border border-gray-200 dark:border-gray-700 border-t-4 border-yellow-400 z-30 transition-all duration-200 ${activeCategory === category.name ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                    <div className="grid grid-cols-4 gap-x-10 gap-y-8 p-8">
                                        {category.megaMenu.map((group) => (
                                            <div key={group.title} className="flex flex-col space-y-2 py-1">
                                                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mb-3 whitespace-nowrap">{group.title}</h3>
                                                <ul className="space-y-2">
                                                    {group.items.map((item, i) => (
                                                        <li key={i}>
                                                            <a href="#" onClick={(e) => { e.preventDefault(); onCategoryClick(item.name); }} className="block text-base text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 whitespace-nowrap">{item.name}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};