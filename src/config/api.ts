/**
 * API Configuration
 * 
 * Development: http://localhost:5000
 * Production: Uses VITE_API_URL environment variable
 */

export const API_URL = 
  import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin);

/**
 * Fetch wrapper that automatically includes the correct API URL
 */
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[v0] API Call Error:', {
      url,
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

// Specific API methods
export const api = {
  // Products
  getProducts: () => apiCall('/api/products'),
  getProduct: (id: string) => apiCall(`/api/products/${id}`),
  createProduct: (data: any) => apiCall('/api/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id: string, data: any) => apiCall(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: string) => apiCall(`/api/products/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => apiCall('/api/categories'),
  createCategory: (data: any) => apiCall('/api/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id: string, data: any) => apiCall(`/api/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id: string) => apiCall(`/api/categories/${id}`, { method: 'DELETE' }),

  // Subcategories
  getSubcategories: () => apiCall('/api/subcategories'),
  createSubcategory: (data: any) => apiCall('/api/subcategories', { method: 'POST', body: JSON.stringify(data) }),
  deleteSubcategory: (id: string) => apiCall(`/api/subcategories/${id}`, { method: 'DELETE' }),

  // Orders
  getOrders: () => apiCall('/api/orders'),
  getOrder: (id: string) => apiCall(`/api/orders/${id}`),
  createOrder: (data: any) => apiCall('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateOrder: (id: string, data: any) => apiCall(`/api/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Customers
  getCustomers: () => apiCall('/api/customers'),
  getCustomer: (id: string) => apiCall(`/api/customers/${id}`),

  // Reviews
  getReviews: () => apiCall('/api/reviews'),
  createReview: (data: any) => apiCall('/api/reviews', { method: 'POST', body: JSON.stringify(data) }),
  deleteReview: (id: string) => apiCall(`/api/reviews/${id}`, { method: 'DELETE' }),

  // Health
  checkHealth: () => apiCall('/api/health'),
};
