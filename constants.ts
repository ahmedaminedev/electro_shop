
import type { Product, Category, Brand, Pack, BlogPost } from './types';

export const allProducts: Product[] = [
    { id: 1, name: 'Pack encastrable de 2 Pièces de la marque AUXSTAR', brand: 'AUXSTAR', price: 899, oldPrice: 1299, imageUrl: 'https://picsum.photos/id/10/400/400', discount: 30, category: 'Pack encastrable', promo: true, description: 'Un pack complet pour équiper votre cuisine avec style et efficacité. Profitez de la qualité AUXSTAR pour des résultats de cuisson parfaits.' },
    { id: 2, name: 'Pack encastrable de 2 pièces de la marque STARONE', brand: 'STARONE', price: 999, oldPrice: 1399, imageUrl: 'https://picsum.photos/id/11/400/400', discount: 28, category: 'Pack encastrable', promo: true, description: 'Optimisez votre espace avec ce pack encastrable STARONE. Design moderne et performances fiables pour une cuisine fonctionnelle.' },
    { id: 3, name: 'Pack encastrable de 2 pièces de la marque AUXSTAR', brand: 'AUXSTAR', price: 1099, oldPrice: 1429, imageUrl: 'https://picsum.photos/id/12/400/400', discount: 23, category: 'Pack encastrable', description: 'Le meilleur de la technologie AUXSTAR dans un pack encastrable pratique. Idéal pour les cuisines modernes et exigeantes.' },
    { id: 4, name: 'Lave vaisselle Pose libre WHIRLPOOL 14 Couverts Inox', brand: 'WHIRLPOOL', price: 2389, oldPrice: 2599, imageUrl: 'https://picsum.photos/id/13/400/400', discount: 8, category: 'Gros électroménagers', description: 'Une vaisselle impeccable à chaque lavage grâce à la technologie 6ème Sens de Whirlpool. Grande capacité et faible consommation d\'énergie.' },
    { id: 5, name: 'Lave vaisselle Pose libre LG 14 Couverts Inox', brand: 'LG', price: 2349, oldPrice: 2599, imageUrl: 'https://picsum.photos/id/14/400/400', discount: 10, category: 'Gros électroménagers', description: 'Technologie QuadWash pour un nettoyage optimal sous tous les angles. Silencieux, efficace et élégant, il s\'intègre parfaitement dans votre cuisine.' },
    { id: 6, name: 'Lave vaisselle Pose libre TELEFUNKEN 13 couverts Silver', brand: 'TELEFUNKEN', price: 989, oldPrice: 1359, imageUrl: 'https://picsum.photos/id/15/400/400', discount: 27, category: 'Gros électroménagers', description: 'Alliez performance et économie avec ce lave-vaisselle Telefunken. Plusieurs programmes pour s\'adapter à tous vos besoins.' },
    { id: 7, name: 'Lave vaisselle Pose libre ARISTON 14 Couverts Inox', brand: 'ARISTON', price: 1765, oldPrice: 1999, imageUrl: 'https://picsum.photos/id/16/400/400', discount: 11, category: 'Gros électroménagers', description: 'La technologie 3D Zone Wash offre une puissance de lavage ciblée pour éliminer les saletés les plus tenaces. Flexibilité et performance au rendez-vous.' },
    { id: 8, name: 'Lave vaisselle Pose libre BRANDT 14 Couverts noir', brand: 'BRANDT', price: 1689, oldPrice: 1799, imageUrl: 'https://picsum.photos/id/17/400/400', discount: 6, category: 'Gros électroménagers', description: 'Design élégant noir et performance de lavage supérieure. Optimisez votre temps avec ses programmes rapides et efficaces.' },
    { id: 9, name: 'Climatiseur NEWSTAR 12000 BTU Inverter Chaud & froid', brand: 'NEWSTAR', price: 1239, oldPrice: 1599, imageUrl: 'https://picsum.photos/id/18/400/400', discount: 23, category: 'Climatiseurs', description: 'Confort thermique toute l\'année avec la technologie Inverter. Économies d\'énergie et silence de fonctionnement assurés.' },
    { id: 10, name: 'Climatiseur BIOLUX 12000 BTU Tropical smart chaud & froid', brand: 'BIOLUX', price: 1435, oldPrice: 1559, imageUrl: 'https://picsum.photos/id/19/400/400', discount: 8, category: 'Climatiseurs', description: 'Conçu pour les climats exigeants, ce climatiseur tropicalisé offre une performance fiable même par fortes chaleurs. Contrôlez-le à distance grâce à ses fonctions smart.' },
    { id: 11, name: 'Climatiseur GREE 24000 BTU Tropicalisé Chaud & froid', brand: 'GREE', price: 2959, oldPrice: 3299, imageUrl: 'https://picsum.photos/id/20/400/400', discount: 10, category: 'Climatiseurs', description: 'Puissance et robustesse pour les grands espaces. Le climatiseur GREE 24000 BTU assure un confort optimal en toutes saisons.' },
    { id: 12, name: 'Climatiseur MIDEA 18000 BTU Inverter Chaud & froid', brand: 'MIDEA', price: 1999, oldPrice: 2299, imageUrl: 'https://picsum.photos/id/21/400/400', discount: 13, category: 'Climatiseurs', description: 'La performance Inverter de Midea pour un refroidissement rapide et des économies d\'énergie substantielles. Un choix intelligent pour votre confort.' },
    { id: 13, name: 'ARISTON Product', brand: 'ARISTON', price: 1500, imageUrl: 'https://picsum.photos/id/22/400/400', category: 'Petit électroménagers cuisine', description: 'Un appareil de petit électroménager fiable et performant de la marque ARISTON pour faciliter votre quotidien en cuisine.' },
    { id: 14, name: 'Candy Product', brand: 'Candy', price: 750, imageUrl: 'https://picsum.photos/id/23/400/400', category: 'Tv-son-photos', description: 'Découvrez l\'univers Tv-son-photos avec ce produit de la marque Candy, alliant design et technologie.' },
    { id: 15, name: 'Appareil à raclette TECHWOOD 6 Poêlons 800 W (TRA-64)', brand: 'Techwood', price: 145, oldPrice: 199, imageUrl: 'https://picsum.photos/seed/raclette1/400/400', discount: 27, category: 'Appareil à raclette', description: 'Pour des soirées conviviales, cet appareil à raclette Techwood pour 6 personnes est l\'allié idéal. Simple d\'utilisation et efficace.' },
    { id: 16, name: 'Appareil à raclette PRINCESS Gril Party 6 800W noir (162725)', brand: 'Princess', price: 149, oldPrice: 195, imageUrl: 'https://picsum.photos/seed/raclette2/400/400', discount: 24, category: 'Appareil à raclette', description: 'Profitez de moments chaleureux avec cet appareil à raclette et gril Princess. Parfait pour 6 convives.' },
    { id: 17, name: 'Appareil à raclette LIVOVO 800W noir (DOC207)', brand: 'livoo', price: 157, oldPrice: 199, imageUrl: 'https://picsum.photos/seed/raclette3/400/400', discount: 21, category: 'Appareil à raclette', material: 'Inox', description: 'Un design moderne en inox pour cet appareil à raclette Livoo. Robuste et facile à nettoyer pour des repas réussis.' },
    { id: 18, name: 'Appareil à raclette PRINCESS 4 Stone Grill Party 1600 Watts Noir', brand: 'Princess', price: 161, oldPrice: 196, imageUrl: 'https://picsum.photos/seed/raclette4/400/400', discount: 18, category: 'Appareil à raclette', description: 'Double fonction avec sa pierre de grill, cet appareil Princess est parfait pour varier les plaisirs lors de vos repas.' },
    { id: 19, name: 'Livoo - Appareil à raclette 6 personnes - 800W, plateau grill amovible', brand: 'livoo', price: 140, oldPrice: 182, imageUrl: 'https://picsum.photos/seed/raclette5/400/400', discount: 23, category: 'Appareil à raclette', description: 'Compact et pratique avec son plateau grill amovible, cet appareil Livoo est idéal pour des raclettes en famille ou entre amis.' },
    { id: 20, name: 'Appareil à Raclette LIVOVO 1200W Noir (DOC242)', brand: 'livoo', price: 170, oldPrice: 200, imageUrl: 'https://picsum.photos/seed/raclette6/400/400', discount: 15, category: 'Appareil à raclette', material: 'Inox', description: 'Plus de puissance pour une chauffe rapide. L\'appareil à raclette Livoo 1200W en inox est parfait pour les grandes tablées.' },
    { id: 21, name: 'Appareil à raclette multifonction SEVERIN 1300W Noir (RG2371)', brand: 'severin', price: 180, oldPrice: 277, imageUrl: 'https://picsum.photos/seed/raclette7/400/400', discount: 35, category: 'Appareil à raclette', material: 'bois clair', description: 'Un appareil polyvalent avec une pierre naturelle et un gril. La finition en bois clair apporte une touche d\'élégance à votre table.' },
    { id: 22, name: 'Appareil à Fondue électrique SEVERIN 1500W inox (FO2470)', brand: 'severin', price: 120, oldPrice: 240, imageUrl: 'https://picsum.photos/seed/fondue1/400/400', discount: 50, category: 'Appareil à raclette', description: 'Variez les plaisirs avec cet appareil à fondue électrique Severin. Parfait pour les fondues savoyardes, bourguignonnes ou au chocolat.' },
];

export const getProductsByCategory = (category: string) => {
    // This is a mock function. In a real application, you would fetch this from an API.
    const categoryProducts = allProducts.filter(p => p.category === category || (category === 'Lave-linge frontal' && p.name.toLowerCase().includes('lave')));
    
    if (categoryProducts.length > 0) return categoryProducts;
    
    // Fallback for demo purposes
    if(category.toLowerCase().includes('raclette')) return allProducts.filter(p => p.category === 'Appareil à raclette');
    
    return allProducts.slice(0, 10).map(p => ({...p, name: `${category} - ${p.name}`}));
};


export const newArrivals: Product[] = allProducts.slice(3, 8);
export const summerSelection: Product[] = allProducts.slice(8, 12);

export const categories: Category[] = [
    { name: 'Pack électroménager' },
    { 
        name: 'Gros électroménagers', 
        megaMenu: [
            { 
                title: 'Lave-linge', 
                items: [
                    { name: 'Lave-linge frontal' },
                    { name: 'Lave-linge top' },
                    { name: 'Lave-linge encastrable' },
                    { name: 'Lave-linge semi-automatique' },
                    { name: 'Machine lavante séchante' },
                    { name: 'Sèche Linge' },
                    { name: 'Support' },
                ]
            },
            { 
                title: 'Réfrigérateur', 
                items: [
                    { name: 'réfrigérateur double porters' },
                    { name: 'Réfrigérateur combiné' },
                    { name: 'Réfrigérateur 1porte' },
                    { name: 'Réfrigérateur américain' },
                    { name: 'Réfrigérateur encastrable' },
                    { name: 'Réfrigérateur mini-bar' },
                ]
            },
            { 
                title: 'Four', 
                items: [
                    { name: 'Four encastrable' },
                    { name: 'Four posable' },
                    { name: 'Four à gaz' },
                    { name: 'Four à Pizza' },
                ]
            },
             { 
                title: 'Air conditionné, climatisation', 
                items: [
                    { name: 'Climatiseur' },
                    { name: 'Chauffage' },
                    { name: 'Climeur et ventilateur' },
                    { name: 'Fontaine d\'eau' },
                ]
            },
            { 
                title: 'Plaque de cuisson', 
                items: [
                    { name: 'Plaque à gaz' },
                    { name: 'Plaque à induction' },
                    { name: 'Plaque électrique' },
                ]
            },
            { 
                title: 'Congélateur', 
                items: [
                    { name: 'Congélateur vertical' },
                    { name: 'Congélateur horizontal' },
                ]
            },
            { 
                title: 'Cuisinière', 
                items: [
                    { name: 'Cuisinière 4 feux' },
                    { name: 'Cuisinière 5 feux' },
                ]
            },
            { 
                title: 'Hotte', 
                items: [
                    { name: 'Hotte inox' },
                    { name: 'Hotte noir' },
                ]
            },
            { 
                title: 'Lave vaisselle', 
                items: [
                    { name: 'Lave vaisselle encastrable' },
                    { name: 'Lave vaisselle pose libre' },
                ]
            },
            { 
                title: 'Micro-onde', 
                items: [
                    { name: 'Micro onde encastrable' },
                    { name: 'Micro onde Pose libre' },
                ]
            },
            { 
                title: 'Chaudière et Chauffe bain', 
                items: [
                    { name: 'Chaudière' },
                    { name: 'Chauffe bain' },
                ]
            },
        ]
    },
    { name: 'Petit électroménagers cuisine', subCategories: ['Appareil à raclette', 'Cafetières & Expresso', 'Blenders & Mixeurs', 'Robots de cuisine', 'Grille-pain & Gaufriers', 'Friteuses', 'Hachoirs', 'Batteurs'] },
    { 
        name: 'Tv-son-photos',
        megaMenu: [
            {
                title: 'Téléviseurs',
                items: [
                    { name: 'TV LED' },
                    { name: 'TV QLED & OLED' },
                    { name: 'Smart TV' },
                    { name: 'TV 4K UHD' },
                    { name: 'Accessoires TV' },
                ]
            },
            {
                title: 'Son',
                items: [
                    { name: 'Home Cinéma' },
                    { name: 'Barres de son' },
                    { name: 'Enceintes Bluetooth' },
                    { name: 'Chaînes Hifi' },
                ]
            },
            {
                title: 'Photo & Caméscopes',
                items: [
                    { name: 'Appareils photo numériques' },
                    { name: 'Caméras sportives' },
                    { name: 'Accessoires photo' },
                ]
            }
        ]
    },
    { name: 'Audio, casque', subCategories: ['Casques audio', 'Écouteurs', 'Enceintes portables', 'Radios & Réveils'] },
    { name: 'Entretien et soin de la maison' },
    { name: 'Matériel de cuisine' },
    { 
        name: 'Téléphonie et objets connectés',
        megaMenu: [
            {
                title: 'Smartphones & Tablettes',
                items: [
                    { name: 'Smartphones' },
                    { name: 'Tablettes tactiles' },
                    { name: 'Accessoires téléphonie' },
                ]
            },
            {
                title: 'Objets Connectés',
                items: [
                    { name: 'Montres connectées' },
                    { name: 'Bracelets connectés' },
                    { name: 'Maison connectée' },
                ]
            }
        ]
    },
    { name: 'Santé et réseaux' },
    { name: 'Bricolage, Literie' },
    { name: 'Sport et loisir' },
    { name: 'Compléments Alimentaires' },
    { name: 'Informatique', subCategories: ['Ordinateurs portables', 'PC de bureau', 'Écrans', 'Imprimantes & Scanners', 'Stockage', 'Accessoires & Périphériques'] },
    { name: 'Hygiène et soin' },
];

export const brands: Brand[] = [
    { name: 'ARISTON', productCount: 2, logoUrl: 'https://via.placeholder.com/150x60?text=ARISTON' },
    { name: 'AUXSTAR', productCount: 2, logoUrl: 'https://via.placeholder.com/150x60?text=AUXSTAR' },
    { name: 'BIOLUX', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=BIOLUX' },
    { name: 'BRANDT', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=BRANDT' },
    { name: 'CANDY', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=CANDY' },
    { name: 'GREE', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=GREE' },
    { name: 'LG', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=LG' },
    { name: 'MIDEA', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=MIDEA' },
    { name: 'NEWSTAR', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=NEWSTAR' },
    { name: 'STARONE', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=STARONE' },
    { name: 'TELEFUNKEN', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=TELEFUNKEN' },
    { name: 'WHIRLPOOL', productCount: 1, logoUrl: 'https://via.placeholder.com/150x60?text=WHIRLPOOL' },
];

export const packs: Pack[] = [
    { 
        id: 1, 
        name: 'Pack Cuisine Essentiel', 
        description: 'Le trio parfait pour débuter : plaque de cuisson, four et hotte assortis pour une cuisine moderne et fonctionnelle.',
        price: 1899,
        oldPrice: 2350,
        imageUrl: 'https://picsum.photos/seed/pack1/600/400',
        includedItems: ['Plaque de cuisson à gaz', 'Four encastrable électrique', 'Hotte décorative 60cm']
    },
    { 
        id: 2, 
        name: 'Pack Lavage Expert', 
        description: 'Prenez soin de votre linge avec ce duo lave-linge et sèche-linge haute performance. Économie d\'énergie et efficacité garanties.',
        price: 2599,
        oldPrice: 3100,
        imageUrl: 'https://picsum.photos/seed/pack2/600/400',
        includedItems: ['Lave-linge frontal 9kg', 'Sèche-linge à condensation', 'Kit de superposition']
    },
    { 
        id: 3, 
        name: 'Pack Petit-Déjeuner Complet', 
        description: 'Commencez la journée du bon pied avec notre sélection d\'appareils design et performants.',
        price: 499,
        oldPrice: 650,
        imageUrl: 'https://picsum.photos/seed/pack3/600/400',
        includedItems: ['Cafetière à filtre programmable', 'Grille-pain 2 fentes', 'Bouilloire électrique 1.7L']
    },
    { 
        id: 4, 
        name: 'Pack Froid Intégral', 
        description: 'Conservez vos aliments de manière optimale avec ce combiné réfrigérateur-congélateur grande capacité.',
        price: 1999,
        oldPrice: 2450,
        imageUrl: 'https://picsum.photos/seed/pack4/600/400',
        includedItems: ['Réfrigérateur combiné 350L', 'Technologie No Frost', 'Distributeur d\'eau fraîche']
    },
];

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'comment-choisir-son-lave-linge',
        title: 'Comment choisir le lave-linge parfait pour votre foyer ?',
        excerpt: 'Capacité, vitesse d\'essorage, consommation énergétique... On vous guide à travers les critères essentiels pour trouver le lave-linge qui répond à vos besoins.',
        content: `Choisir un nouveau lave-linge peut s'avérer complexe face à la multitude de modèles disponibles. Pour faire le bon choix, plusieurs critères sont à prendre en compte.\n\nTout d'abord, la capacité du tambour, exprimée en kilogrammes. Pour une personne seule, un modèle de 5-6 kg est suffisant. Un couple s'orientera vers 7-8 kg, tandis qu'une famille de 4 personnes ou plus aura besoin d'une capacité de 9 kg ou plus.\n\nEnsuite, la vitesse d'essorage, mesurée en tours par minute. Une vitesse élevée (1200 trs/min et plus) permet d'obtenir un linge moins humide, ce qui réduit le temps de séchage. C'est un critère important si vous utilisez un sèche-linge.\n\nL'étiquette énergétique est également cruciale. Optez pour un modèle classé A, B ou C selon la nouvelle réglementation. Un appareil économe vous fera réaliser des économies significatives sur vos factures d'électricité et d'eau.\n\nEnfin, intéressez-vous aux programmes spécifiques : cycle rapide, programme vapeur pour défroisser, option anti-allergie... Ces fonctionnalités peuvent grandement vous faciliter le quotidien.`,
        imageUrl: 'https://picsum.photos/seed/blog1/800/400',
        author: 'Léa Martin',
        authorImageUrl: 'https://i.pravatar.cc/40?u=lea',
        date: '22 Juillet 2024',
        category: 'Conseils d\'achat',
        featured: true,
    },
    {
        id: 2,
        slug: 'entretenir-son-climatiseur',
        title: '5 astuces pour entretenir votre climatiseur et prolonger sa durée de vie',
        excerpt: 'Un entretien régulier de votre climatiseur garantit son efficacité et la qualité de l\'air intérieur. Découvrez nos conseils simples et pratiques.',
        content: `Un climatiseur bien entretenu est un climatiseur qui dure et qui fonctionne de manière optimale. Voici 5 astuces pour en prendre soin.\n\n1. Nettoyez les filtres : C'est l'étape la plus importante. Des filtres encrassés réduisent le débit d'air et l'efficacité de l'appareil. Nettoyez-les à l'eau savonneuse toutes les deux semaines en période d'utilisation intensive.\n\n2. Dépoussiérez l'unité intérieure : Utilisez un chiffon doux pour nettoyer la carrosserie et les ailettes de ventilation.\n\n3. Vérifiez l'unité extérieure : Assurez-vous que rien n'obstrue l'unité extérieure (feuilles, branches...). Un bon flux d'air est essentiel.\n\n4. Contrôlez le tuyau d'évacuation : Vérifiez que le tuyau d'évacuation des condensats n'est pas bouché pour éviter les fuites d'eau.\n\n5. Faites appel à un professionnel : Une fois par an, avant l'été, un contrôle par un technicien qualifié est recommandé pour vérifier le circuit de gaz et nettoyer l'appareil en profondeur.`,
        imageUrl: 'https://picsum.photos/seed/blog2/800/400',
        author: 'Marc Dubois',
        authorImageUrl: 'https://i.pravatar.cc/40?u=marc',
        date: '18 Juillet 2024',
        category: 'Entretien',
    },
    {
        id: 3,
        slug: 'tendances-cuisine-2024',
        title: 'Les grandes tendances pour la cuisine en 2024',
        excerpt: 'Du minimalisme chaleureux aux couleurs audacieuses, découvrez les tendances qui vont transformer nos cuisines cette année.',
        content: `La cuisine n'est plus seulement un lieu de préparation, c'est le cœur de la maison. En 2024, plusieurs tendances se dessinent.\n\nLe retour des matières naturelles : le bois clair, la pierre, le marbre sont à l'honneur pour apporter chaleur et authenticité.\n\nLes couleurs audacieuses : Fini le tout blanc ! Le vert sauge, le bleu nuit ou même le terracotta s'invitent sur les façades de meubles pour donner du caractère.\n\nL'électroménager intelligent et intégré : Les appareils connectés se font discrets derrière des portes de placard pour une esthétique épurée. Le four se commande depuis son smartphone, et le réfrigérateur propose des recettes.\n\nL'optimisation de l'espace : Les solutions de rangement intelligentes sont reines. Tiroirs à l'anglaise, meubles d'angle optimisés... chaque centimètre carré est utilisé.`,
        imageUrl: 'https://picsum.photos/seed/blog3/800/400',
        author: 'Chloé Girard',
        authorImageUrl: 'https://i.pravatar.cc/40?u=chloe',
        date: '12 Juillet 2024',
        category: 'Inspiration',
    }
];
