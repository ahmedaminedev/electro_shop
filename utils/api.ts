
export const API_URL = 'http://127.0.0.1:5000/api';

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

const handleResponse = async (res: Response, errorMessage: string) => {
    if (!res.ok) {
        let errorMsg = errorMessage;
        try {
            const error = await res.json();
            errorMsg = error.message || errorMessage;
        } catch (e) {
            // Response was likely not JSON (e.g. 500 HTML page or network error text)
            errorMsg = `${errorMessage} (Status: ${res.status})`;
        }
        console.error(`API Error (${res.url}):`, errorMsg);
        throw new Error(errorMsg);
    }
    return res.json();
};

export const api = {
    // Auth
    login: async (credentials: any) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse(res, 'Erreur de connexion');
    },
    register: async (userData: any) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return handleResponse(res, "Erreur d'inscription");
    },
    getMe: async () => {
        const res = await fetch(`${API_URL}/auth/me`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(res, 'Utilisateur non trouvé');
    },

    // Products
    getProducts: async () => {
        const res = await fetch(`${API_URL}/products`);
        return handleResponse(res, 'Erreur chargement produits');
    },
    createProduct: async (product: any) => {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(product),
        });
        return handleResponse(res, 'Erreur création produit');
    },
    updateProduct: async (id: number, product: any) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(product),
        });
        return handleResponse(res, 'Erreur mise à jour produit');
    },
    deleteProduct: async (id: number) => {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(res, 'Erreur suppression produit');
    },

    // Packs
    getPacks: async () => {
        const res = await fetch(`${API_URL}/packs`);
        return handleResponse(res, 'Erreur chargement packs');
    },

    // Categories
    getCategories: async () => {
        const res = await fetch(`${API_URL}/categories`);
        return handleResponse(res, 'Erreur chargement catégories');
    },

    // Stores
    getStores: async () => {
        const res = await fetch(`${API_URL}/stores`);
        return handleResponse(res, 'Erreur chargement magasins');
    },

    // Promotions
    getPromotions: async () => {
        const res = await fetch(`${API_URL}/promotions`);
        return handleResponse(res, 'Erreur chargement promotions');
    },

    // Advertisements
    getAdvertisements: async () => {
        const res = await fetch(`${API_URL}/advertisements`);
        return handleResponse(res, 'Erreur chargement publicités');
    },

    // Orders
    createOrder: async (order: any) => {
        console.log(`POSTing order to ${API_URL}/orders`, order);
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(order),
        });
        return handleResponse(res, 'Erreur création commande');
    },
    getMyOrders: async () => {
        const res = await fetch(`${API_URL}/orders/myorders`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(res, 'Erreur chargement historique');
    },
    getAllOrders: async () => {
        const res = await fetch(`${API_URL}/orders`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(res, 'Erreur chargement commandes');
    }
};
