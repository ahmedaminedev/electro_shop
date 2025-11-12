
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
    { id: 23, name: 'Plaque de cuisson à gaz STARONE', brand: 'STARONE', price: 550, category: 'Gros électroménagers', material: 'Inox', imageUrl: 'https://picsum.photos/seed/plaque_pack/400/400' },
    { id: 24, name: 'Four encastrable électrique WHIRLPOOL', brand: 'WHIRLPOOL', price: 950, category: 'Gros électroménagers', material: 'Inox', imageUrl: 'https://picsum.photos/seed/four_pack/400/400' },
    { id: 25, name: 'Hotte décorative 60cm BRANDT', brand: 'BRANDT', price: 850, category: 'Gros électroménagers', material: 'Noir', imageUrl: 'https://picsum.photos/seed/hotte_pack/400/400' },
    { id: 26, name: 'Lave-linge frontal 9kg LG', brand: 'LG', price: 1800, category: 'Gros électroménagers', imageUrl: 'https://picsum.photos/seed/lavelinge_pack/400/400' },
    { id: 27, name: 'Sèche-linge à condensation CANDY', brand: 'CANDY', price: 1300, category: 'Gros électroménagers', imageUrl: 'https://picsum.photos/seed/sechelinge_pack/400/400' },
    { id: 28, name: 'Cafetière à filtre programmable MIDEA', brand: 'MIDEA', price: 250, category: 'Petit électroménagers cuisine', imageUrl: 'https://picsum.photos/seed/cafetiere_pack/400/400' },
    { id: 29, name: 'Grille-pain 2 fentes TELEFUNKEN', brand: 'TELEFUNKEN', price: 180, category: 'Petit électroménagers cuisine', imageUrl: 'https://picsum.photos/seed/grillepain_pack/400/400' },
    { id: 30, name: 'Bouilloire électrique 1.7L BIOLUX', brand: 'BIOLUX', price: 220, category: 'Petit électroménagers cuisine', imageUrl: 'https://picsum.photos/seed/bouilloire_pack/400/400' },
    { id: 31, name: 'Réfrigérateur combiné 350L ARISTON', brand: 'ARISTON', price: 2450, category: 'Gros électroménagers', material: 'Silver', imageUrl: 'https://picsum.photos/seed/frigo_pack/400/400' }
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
        // FIX: Add missing properties to conform to the Pack type
        imageUrl: 'https://picsum.photos/seed/pack1/400/300',
        includedItems: ['Plaque de cuisson à gaz STARONE', 'Four encastrable électrique WHIRLPOOL', 'Hotte décorative 60cm BRANDT'],
        includedProductIds: [23, 24, 25]
    },
    { 
        id: 2, 
        name: 'Pack Buanderie Performant', 
        description: 'Optimisez votre espace buanderie avec ce duo lave-linge et sèche-linge efficace et économique.',
        price: 3000,
        oldPrice: 3100,
        imageUrl: 'https://picsum.photos/seed/pack2/400/300',
        includedItems: ['Lave-linge frontal 9kg LG', 'Sèche-linge à condensation CANDY'],
        includedProductIds: [26, 27]
    },
    { 
        id: 3, 
        name: 'Pack Petit Déjeuner Complet', 
        description: 'Commencez la journée du bon pied avec notre sélection d\'appareils pour un petit déjeuner parfait.',
        price: 600,
        oldPrice: 650,
        imageUrl: 'https://picsum.photos/seed/pack3/400/300',
        includedItems: ['Cafetière à filtre programmable MIDEA', 'Grille-pain 2 fentes TELEFUNKEN', 'Bouilloire électrique 1.7L BIOLUX'],
        includedProductIds: [28, 29, 30]
    },
    { 
        id: 4, 
        name: 'Pack Cuisine Premium', 
        description: 'Équipez entièrement votre cuisine avec des appareils de haute qualité pour une expérience culinaire exceptionnelle.',
        price: 4800,
        oldPrice: 5650,
        imageUrl: 'https://picsum.photos/seed/pack4/400/300',
        includedItems: ['Plaque de cuisson à gaz STARONE', 'Four encastrable électrique WHIRLPOOL', 'Hotte décorative 60cm BRANDT', 'Réfrigérateur combiné 350L ARISTON'],
        includedProductIds: [23, 24, 25, 31]
    }
];

// FIX: Add blogPosts data to be exported and used in BlogPage and BlogPostPage
export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'comment-choisir-son-refrigerateur',
        title: 'Comment choisir le réfrigérateur parfait pour votre cuisine ?',
        excerpt: 'Le réfrigérateur est un élément central de votre cuisine. Entre les différents types, tailles et technologies, il peut être difficile de s\'y retrouver. Suivez notre guide complet pour faire le bon choix.',
        content: 'Choisir un réfrigérateur n\'est pas une mince affaire. Il doit répondre à vos besoins en termes de capacité, s\'intégrer parfaitement à votre cuisine et être économe en énergie. \n\nPremièrement, évaluez la taille de votre foyer. Pour une personne seule, un volume de 150 litres est suffisant, tandis qu\'une famille de quatre personnes aura besoin d\'au moins 300 litres. Pensez également à l\'espace disponible dans votre cuisine. \n\nEnsuite, considérez le type de froid. Le froid statique est le plus simple, mais nécessite un dégivrage manuel régulier. Le froid brassé (ou dynamique) assure une température homogène, tandis que le froid ventilé (No Frost) empêche la formation de givre, simplifiant l\'entretien. \n\nEnfin, n\'oubliez pas les fonctionnalités additionnelles comme le distributeur d\'eau, la machine à glaçons, ou les zones de conservation spécifiques pour les viandes et légumes. Ces options peuvent grandement améliorer votre confort au quotidien.',
        imageUrl: 'https://picsum.photos/seed/blog1/800/400',
        author: 'Alice Martin',
        authorImageUrl: 'https://i.pravatar.cc/150?u=alice',
        date: '2023-10-26',
        category: 'Guides d\'achat',
        featured: true,
    },
    {
        id: 2,
        slug: 'entretien-lave-linge',
        title: '5 astuces pour entretenir votre lave-linge et prolonger sa durée de vie',
        excerpt: 'Un lave-linge bien entretenu est plus performant et dure plus longtemps. Découvrez nos conseils simples et efficaces pour prendre soin de votre appareil.',
        content: 'Votre lave-linge travaille dur pour garder vos vêtements propres. Pour le remercier, un peu d\'entretien régulier est nécessaire. \n\n1. Nettoyez le filtre de vidange tous les deux ou trois mois pour enlever les résidus qui pourraient l\'obstruer. \n\n2. Lancez un cycle à vide à haute température (90°C) une fois par mois avec du vinaigre blanc pour éliminer les bactéries et le calcaire. \n\n3. Nettoyez le bac à lessive régulièrement pour éviter les moisissures et les mauvaises odeurs. \n\n4. Laissez la porte et le bac ouverts après chaque lavage pour permettre à l\'intérieur de sécher. \n\n5. Vérifiez l\'état des tuyaux d\'arrivée et de sortie d\'eau une fois par an pour prévenir les fuites.',
        imageUrl: 'https://picsum.photos/seed/blog2/800/400',
        author: 'Julien Dubois',
        authorImageUrl: 'https://i.pravatar.cc/150?u=julien',
        date: '2023-10-15',
        category: 'Conseils & Astuces',
    },
    {
        id: 3,
        slug: 'economiser-energie-climatiseur',
        title: 'Comment utiliser votre climatiseur sans faire exploser votre facture d\'électricité ?',
        excerpt: 'La climatisation est un confort appréciable en été, mais elle peut être énergivore. Apprenez à l\'utiliser de manière intelligente pour rester au frais tout en maîtrisant votre budget.',
        content: 'L\'été approche et avec lui, l\'utilisation intensive du climatiseur. Pour éviter les mauvaises surprises sur votre facture, adoptez quelques bons réflexes. \n\nTout d\'abord, ne réglez pas la température trop bas. Une différence de 7 à 8°C avec l\'extérieur est suffisante pour un bon confort. Chaque degré en moins augmente la consommation de 7%. \n\nUtilisez la fonction "nuit" ou "sleep" qui ajuste progressivement la température pendant votre sommeil. Pensez également à fermer les volets et rideaux pendant la journée pour limiter l\'entrée de chaleur. \n\nEnfin, un entretien régulier est primordial. Nettoyez les filtres toutes les deux semaines pour garantir un flux d\'air optimal et une meilleure efficacité énergétique.',
        imageUrl: 'https://picsum.photos/seed/blog3/800/400',
        author: 'Chloé Girard',
        authorImageUrl: 'https://i.pravatar.cc/150?u=chloe',
        date: '2023-09-28',
        category: 'Économie d\'énergie',
    },
    {
        id: 4,
        slug: 'nouveautes-smart-tv-2023',
        title: 'Les dernières innovations en matière de Smart TV',
        excerpt: 'Mini-LED, QD-OLED, nouvelles interfaces... Le monde des téléviseurs est en constante évolution. Faisons le point sur les technologies à surveiller cette année.',
        content: 'Le marché des téléviseurs est plus dynamique que jamais. Les constructeurs rivalisent d\'ingéniosité pour offrir des images toujours plus spectaculaires et des expériences utilisateur plus fluides. \n\nLa technologie Mini-LED se démocratise, offrant un meilleur contrôle du rétroéclairage pour des contrastes plus profonds, se rapprochant de l\'OLED. \n\nLes écrans QD-OLED, combinant les avantages de l\'OLED et des Quantum Dots, promettent des couleurs plus vives et une luminosité accrue. \n\nCôté interfaces, Google TV et Tizen continuent de s\'améliorer avec des recommandations plus pertinentes et une intégration plus poussée des services de streaming. Le gaming n\'est pas en reste, avec la généralisation du HDMI 2.1, du VRR et de l\'ALLM pour une expérience de jeu optimale sur consoles de nouvelle génération.',
        imageUrl: 'https://picsum.photos/seed/blog4/800/400',
        author: 'Alice Martin',
        authorImageUrl: 'https://i.pravatar.cc/150?u=alice',
        date: '2023-09-10',
        category: 'Nouveautés',
    }
];
