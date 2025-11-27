
import { allProducts, packs, categories, initialStores, mockPromotions, initialAdvertisements, blogPosts, contactMessages, sampleOrders, mockUser } from '../constants';

// Use relative URL to leverage Vite proxy in development
// This works in AI Studio (via the preview URL) and locally (via localhost:3000 -> proxy -> localhost:8080)
const BACKEND_URL = ''; 

const apiRequest = async (endpoint: string, method: string = 'GET', body?: any) => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
        method,
        headers,
        credentials: 'include' // Important for sending cookies/cors
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api${endpoint}`, options);

        if (!response.ok) {
            const errorData = {
                status: response.status,
                message: ''
            };
            
            if (response.status === 401) {
                // Auto logout on 401
                localStorage.removeItem('token');
            }

            // Read the body as text first to avoid stream locking issues
            const textBody = await response.text();
            
            try {
                // Try to parse it as JSON
                const errorJson = JSON.parse(textBody);
                errorData.message = errorJson.message || `API error: ${response.status}`;
            } catch (e) {
                // Fallback to text if JSON parse fails (e.g. HTML error page)
                errorData.message = textBody || `API error: ${response.status}`;
            }
            throw errorData;
        }

        if (response.status === 204) {
            return null;
        }
        return await response.json();
    } catch (error: any) {
        console.error(`API Request failed: ${method} ${endpoint}`, error);
        throw error;
    }
};

// Helper to wrap API calls with mock fallback
const withMockFallback = async <T>(apiCall: () => Promise<T>, mockData: T): Promise<T> => {
    try {
        return await apiCall();
    } catch (error) {
        console.warn('Backend unavailable, using mock data.');
        return mockData;
    }
};

export const api = {
    // Auth
    login: (credentials: any) => apiRequest('/auth/login', 'POST', credentials),
    register: (userData: any) => apiRequest('/auth/register', 'POST', userData),
    getMe: () => withMockFallback(() => apiRequest('/auth/me'), mockUser),
    logout: () => apiRequest('/auth/logout'),

    // Products
    getProducts: () => withMockFallback(() => apiRequest('/products'), allProducts),
    createProduct: (product: any) => apiRequest('/products', 'POST', product),
    updateProduct: (id: number | string, product: any) => apiRequest(`/products/${id}`, 'PUT', product),
    deleteProduct: (id: number | string) => apiRequest(`/products/${id}`, 'DELETE'),

    // Packs
    getPacks: () => withMockFallback(() => apiRequest('/packs'), packs),

    // Categories
    getCategories: () => withMockFallback(() => apiRequest('/categories'), categories),

    // Stores
    getStores: () => withMockFallback(() => apiRequest('/stores'), initialStores),

    // Promotions
    getPromotions: () => withMockFallback(() => apiRequest('/promotions'), mockPromotions),

    // Advertisements
    getAdvertisements: () => withMockFallback(() => apiRequest('/advertisements'), initialAdvertisements),

    // Orders
    createOrder: (order: any) => apiRequest('/orders', 'POST', order),
    getMyOrders: () => withMockFallback(() => apiRequest('/orders/myorders'), sampleOrders),
    getAllOrders: () => withMockFallback(() => apiRequest('/orders'), sampleOrders),

    // Blog
    getBlogPosts: () => withMockFallback(() => apiRequest('/blog'), blogPosts),
    getBlogPostBySlug: (slug: string) => withMockFallback(() => apiRequest(`/blog/${slug}`), blogPosts.find(p => p.slug === slug)),

    // Contact
    sendMessage: (data: { name: string; email: string; subject: string; message: string }) => apiRequest('/contact', 'POST', data),
    getMessages: () => withMockFallback(() => apiRequest('/contact'), contactMessages),

    // Chat
    getChatHistory: (userId: string) => apiRequest(`/chat/${userId}`),
    getAllChats: () => apiRequest('/chat/all'),
};
