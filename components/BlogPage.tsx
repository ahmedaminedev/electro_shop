
import React, { useEffect, useMemo } from 'react';
import { blogPosts } from '../constants';
import type { BlogPost } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { CalendarIcon, UserIcon, TagIcon } from './IconComponents';

interface BlogPageProps {
    onNavigateHome: () => void;
    onSelectPost: (slug: string) => void;
}

const BlogPostCard: React.FC<{ post: BlogPost; onSelectPost: (slug: string) => void; }> = ({ post, onSelectPost }) => {
    return (
        <article 
            onClick={() => onSelectPost(post.slug)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            <div className="overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 space-x-4">
                    <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1.5"/> 
                        <span>{post.date}</span>
                    </div>
                     <div className="flex items-center">
                        <TagIcon className="w-4 h-4 mr-1.5"/> 
                        <span>{post.category}</span>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                </p>
                <div className="flex items-center">
                    <img src={post.authorImageUrl} alt={post.author} className="w-8 h-8 rounded-full mr-3" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{post.author}</span>
                </div>
            </div>
        </article>
    );
};

const FeaturedPostCard: React.FC<{ post: BlogPost; onSelectPost: (slug: string) => void; }> = ({ post, onSelectPost }) => {
    return (
        <article
            onClick={() => onSelectPost(post.slug)}
            className="grid lg:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group cursor-pointer mb-12"
        >
            <div className="overflow-hidden h-64 lg:h-full">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-8">
                 <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-6">
                    <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2"/> 
                        <span>{post.date}</span>
                    </div>
                     <div className="flex items-center">
                        <TagIcon className="w-4 h-4 mr-2"/> 
                        <span>{post.category}</span>
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-red-600 transition-colors">
                    {post.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {post.excerpt}
                </p>
                <div className="flex items-center">
                    <img src={post.authorImageUrl} alt={post.author} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">{post.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Rédacteur</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigateHome, onSelectPost }) => {
    useEffect(() => {
        document.title = `Blog - Electro Shop`;
    }, []);
    
    const [featuredPost, ...otherPosts] = useMemo(() => {
        const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const featured = sortedPosts.find(p => p.featured) || sortedPosts[0];
        const others = sortedPosts.filter(p => p.id !== featured.id);
        return [featured, ...others];
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Breadcrumb items={[{ name: 'Accueil', onClick: onNavigateHome }, { name: 'Blog' }]} />
                </div>
                
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Notre Blog</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Conseils, astuces et nouveautés sur l'électroménager et la technologie.</p>
                </header>

                {featuredPost && <FeaturedPostCard post={featuredPost} onSelectPost={onSelectPost} />}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map(post => (
                        <BlogPostCard key={post.id} post={post} onSelectPost={onSelectPost} />
                    ))}
                </div>
            </div>
        </div>
    );
};
