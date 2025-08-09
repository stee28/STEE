// Archivo modificado por Steven
// Variables globales para autenticación
let currentUser = null;

// Inicializar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
});

// Función para inicializar la autenticación
function initAuth() {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');

    if (token && userData) {
        currentUser = JSON.parse(userData);
        showDashboard();
    } else {
        showLoginForm();
    }
}

// Mostrar formulario de login
function showLoginForm() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('dashboardScreen').classList.add('hidden');
    document.getElementById('userNav').classList.add('hidden');
}

// Mostrar formulario de registro
function showRegisterForm() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.remove('hidden');
    document.getElementById('dashboardScreen').classList.add('hidden');
    document.getElementById('userNav').classList.add('hidden');
}

// Mostrar dashboard
function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('dashboardScreen').classList.remove('hidden');
    document.getElementById('userNav').classList.remove('hidden');
    
    // Actualizar información del usuario
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.nombre;
    }
    
    // Cargar datos del dashboard
    loadDashboardData();
}

// Manejar formulario de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const contraseña = document.getElementById('loginPassword').value;
    
    if (!email || !contraseña) {
        showMessage('Por favor complete todos los campos', 'error');
        return;
    }
    
    try {
        const response = await api.login({ email, contraseña });
        
        if (response.success) {
            currentUser = response.data.usuario;
            showMessage('Login exitoso', 'success');
            showDashboard();
        }
    } catch (error) {
        showMessage(`Error en login: ${error.message}`, 'error');
    }
});

// Manejar formulario de registro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const contraseña = document.getElementById('registerPassword').value;
    
    if (!nombre || !email || !contraseña) {
        showMessage('Por favor complete todos los campos', 'error');
        return;
    }
    
    if (contraseña.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    try {
        const response = await api.register({ nombre, email, contraseña });
        
        if (response.success) {
            showMessage('Usuario registrado exitosamente. Ahora puedes iniciar sesión.', 'success');
            showLoginForm();
            document.getElementById('registerForm').reset();
        }
    } catch (error) {
        showMessage(`Error en registro: ${error.message}`, 'error');
    }
});

// Cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
        api.clearAuth();
        currentUser = null;
        showLoginForm();
        showMessage('Sesión cerrada exitosamente', 'success');
    }
}
