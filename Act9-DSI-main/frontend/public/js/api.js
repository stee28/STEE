// Archivo modificado por Steven
class ApiClient {
    constructor() {
        this.baseURL = '';
        this.token = localStorage.getItem('authToken');
    }

    async request(url, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        if (this.token) {
            config.headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(`${this.baseURL}${url}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en la petición');
            }

            return data;
        } catch (error) {
            console.error('Error en request:', error);
            throw error;
        }
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    clearAuth() {
        this.token = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
    }

    // Auth
    async login(credenciales) {
        const response = await this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credenciales)
        });
        
        if (response.success) {
            this.setToken(response.data.token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.usuario));
        }
        
        return response;
    }

    async register(userData) {
        return await this.request('/api/auth/registro', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    // Productos
    async getProducts() {
        return await this.request('/api/productos');
    }

    async createProduct(productData) {
        return await this.request('/api/productos', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    async updateProduct(id, productData) {
        return await this.request(`/api/productos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }

    async deleteProduct(id) {
        return await this.request(`/api/productos/${id}`, {
            method: 'DELETE'
        });
    }

    async updateStock(id, stockData) {
        return await this.request(`/api/productos/${id}/stock`, {
            method: 'PATCH',
            body: JSON.stringify(stockData)
        });
    }

    // Movimientos
    async getMovements() {
        return await this.request('/api/movimientos');
    }
}

const api = new ApiClient();

// Función para mostrar mensajes
function showMessage(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm ${getMessageClasses(type)}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-white hover:text-gray-200">
                ×
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getMessageClasses(type) {
    switch(type) {
        case 'success': return 'bg-green-500 text-white';
        case 'error': return 'bg-red-500 text-white';
        case 'warning': return 'bg-yellow-500 text-white';
        default: return 'bg-blue-500 text-white';
    }
}
