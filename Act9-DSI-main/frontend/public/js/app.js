// Archivo modificado por Steven
// Variables globales
let productos = [];
let movimientos = [];

// Cargar datos del dashboard
async function loadDashboardData() {
    try {
        const response = await api.getProducts();
        if (response.success) {
            productos = response.data;
            updateDashboardStats();
            renderProductsTable();
        }
        
        const movResponse = await api.getMovements();
        if (movResponse.success) {
            movimientos = movResponse.data;
            renderMovementsTable();
        }
    } catch (error) {
        showMessage('Error cargando datos del dashboard', 'error');
    }
}

// Actualizar estadísticas del dashboard
function updateDashboardStats() {
    document.getElementById('totalProductos').textContent = productos.length;
    
    const hoy = new Date().toDateString();
    const movimientosHoy = movimientos.filter(m => 
        new Date(m.createdAt).toDateString() === hoy
    );
    
    const entradasHoy = movimientosHoy
        .filter(m => m.tipo === 'entrada')
        .reduce((sum, m) => sum + m.cantidad, 0);
    
    const salidasHoy = movimientosHoy
        .filter(m => m.tipo === 'salida')
        .reduce((sum, m) => sum + m.cantidad, 0);
    
    document.getElementById('entradasHoy').textContent = entradasHoy;
    document.getElementById('salidasHoy').textContent = salidasHoy;
    
    const stockBajo = productos.filter(p => p.stock < 10).length;
    document.getElementById('stockBajo').textContent = stockBajo;
}

// Gestión de pestañas con transiciones
function showTab(tabName) {
    const productosTab = document.getElementById('productosTab');
    const movimientosTab = document.getElementById('movimientosTab');
    const currentTab = !productosTab.classList.contains('hidden') ? productosTab : movimientosTab;
    const targetTab = tabName === 'productos' ? productosTab : movimientosTab;
    
    // Si estamos cambiando de pestaña
    if (currentTab !== targetTab) {
        // Animar salida de la pestaña actual
        currentTab.classList.add('tab-exiting');
        
        setTimeout(() => {
            // Ocultar pestaña actual
            currentTab.classList.add('hidden');
            currentTab.classList.remove('tab-exiting');
            
            // Mostrar nueva pestaña
            targetTab.classList.remove('hidden');
            targetTab.classList.add('tab-entering');
            
            setTimeout(() => {
                targetTab.classList.remove('tab-entering');
            }, 50);
        }, 200);
    }
    
    // Actualizar estilos de los botones
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('border-blue-600', 'text-blue-600');
        button.classList.add('border-transparent', 'text-gray-500');
    });
    
    if (event && event.target) {
        event.target.classList.remove('border-transparent', 'text-gray-500');
        event.target.classList.add('border-blue-600', 'text-blue-600');
    }
}

// Renderizar tabla de productos
function renderProductsTable() {
    const tbody = document.getElementById('productsTable');
    
    console.log('🔄 Renderizando tabla de productos. Total productos:', productos.length);
    console.log('📋 Productos actuales:', productos);
    
    if (productos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                    No hay productos registrados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = productos.map(product => `
        <tr class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 font-medium">${product.codigo}</td>
            <td class="px-6 py-4">${product.nombre}</td>
            <td class="px-6 py-4">$${product.precio.toFixed(2)}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 rounded-full text-xs ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                    ${product.stock}
                </span>
            </td>
            <td class="px-6 py-4 text-gray-600">
                ${product.descripcion || 'Sin descripción'}
            </td>
            <td class="px-6 py-4">
                <button onclick="editProduct('${product._id}')" class="text-blue-600 hover:text-blue-900 mr-2">
                    Editar
                </button>
                <button onclick="showStockModal('${product._id}', '${product.nombre}', ${product.stock})" class="text-green-600 hover:text-green-900 mr-2">
                    Stock
                </button>
                <button onclick="deleteProduct('${product._id}')" class="text-red-600 hover:text-red-900">
                    Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

// Mostrar modal de producto
function showProductForm(productId = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('productModalTitle');
    const stockField = document.getElementById('productStock');
    const codeField = document.getElementById('productCode');
    
    if (productId) {
        const product = productos.find(p => p._id === productId);
        title.textContent = 'Editar Producto';
        document.getElementById('productId').value = product._id;
        codeField.value = product.codigo;
        document.getElementById('productName').value = product.nombre;
        document.getElementById('productDescription').value = product.descripcion || '';
        document.getElementById('productPrice').value = product.precio;
        
        // Ocultar y hacer no requerido el campo stock al editar
        stockField.style.display = 'none';
        stockField.removeAttribute('required');
        stockField.closest('div').style.display = 'none'; // Ocultar el div contenedor también
        
        // Hacer el código de solo lectura en lugar de deshabilitado
        codeField.readOnly = true;
        codeField.classList.add('bg-gray-100', 'cursor-not-allowed');
    } else {
        title.textContent = 'Nuevo Producto';
        form.reset();
        
        // Mostrar y hacer requerido el campo stock al crear
        stockField.style.display = 'block';
        stockField.setAttribute('required', '');
        stockField.closest('div').style.display = 'block'; // Mostrar el div contenedor también
        
        // Permitir edición del código en productos nuevos
        codeField.readOnly = false;
        codeField.classList.remove('bg-gray-100', 'cursor-not-allowed');
    }
    
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function editProduct(productId) {
    showProductForm(productId);
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

// Manejar formulario de producto
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productData = {
        codigo: formData.get('codigo')?.trim(),
        nombre: formData.get('nombre')?.trim(),
        descripcion: formData.get('descripcion')?.trim() || '',
        precio: parseFloat(formData.get('precio')) || 0
    };
    
    // Validación en el frontend
    if (!productData.codigo) {
        showMessage('El código es obligatorio', 'error');
        return;
    }
    
    if (!productData.nombre) {
        showMessage('El nombre es obligatorio', 'error');
        return;
    }
    
    if (productData.precio <= 0) {
        showMessage('El precio debe ser mayor a 0', 'error');
        return;
    }
    
    const productId = formData.get('productId');
    
    if (!productId) {
        productData.stock = parseInt(formData.get('stock')) || 0;
    }
    
    console.log('📤 Enviando datos:', productData);
    
    try {
        let response;
        
        if (productId) {
            response = await api.updateProduct(productId, productData);
        } else {
            response = await api.createProduct(productData);
        }
        
        if (response.success) {
            console.log('✅ Producto procesado exitosamente:', response);
            showMessage(
                productId ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente',
                'success'
            );
            closeProductModal();
            
            console.log('🔄 Recargando todos los datos después de crear/actualizar...');
            
            // Limpiar filtros y recargar TODOS los datos
            const searchField = document.getElementById('searchProducts');
            if (searchField) {
                searchField.value = '';
            }
            
            // Usar refreshAllData en lugar de loadProducts para asegurar recarga completa
            await refreshAllData();
            
            console.log('📊 Productos después de recargar:', productos.length);
        }
    } catch (error) {
        console.error('❌ Error al procesar producto:', error);
        
        // Mostrar errores más específicos
        if (error.message.includes('400')) {
            showMessage(`Error de validación: ${error.message}`, 'error');
        } else if (error.message.includes('401')) {
            showMessage('No tienes autorización. Inicia sesión nuevamente.', 'error');
            // Redirigir al login
            window.location.reload();
        } else {
            showMessage(`Error: ${error.message}`, 'error');
        }
    }
});

// Eliminar producto
async function deleteProduct(productId) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
        const response = await api.deleteProduct(productId);
        if (response.success) {
            showMessage('Producto eliminado exitosamente', 'success');
            loadDashboardData();
        }
    } catch (error) {
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Mostrar modal de stock
function showStockModal(productId, productName, currentStock) {
    console.log('📦 Abriendo modal de stock:', { productId, productName, currentStock });
    
    const modal = document.getElementById('stockModal');
    document.getElementById('stockProductId').value = productId;
    document.getElementById('stockProductName').textContent = productName;
    document.getElementById('stockCurrent').textContent = currentStock;
    
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open'); // Prevenir scroll del body
    
    // Limpiar el formulario
    document.getElementById('stockType').value = '';
    document.getElementById('stockQuantity').value = '';
    document.getElementById('stockReason').value = '';
}

function closeStockModal() {
    const modal = document.getElementById('stockModal');
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open'); // Restaurar scroll del body
}

// Manejar formulario de stock
document.getElementById('stockForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const stockData = {
        tipo: formData.get('tipo'),
        cantidad: parseInt(formData.get('cantidad')),
        motivo: formData.get('motivo')
    };
    
    const productId = formData.get('productId');
    
    console.log('📤 Datos del formulario de stock:', {
        productId,
        stockData
    });
    
    // Validaciones
    if (!productId) {
        showMessage('Error: ID de producto no encontrado', 'error');
        return;
    }
    
    if (!stockData.tipo) {
        showMessage('Error: Selecciona el tipo de movimiento', 'error');
        return;
    }
    
    if (!stockData.cantidad || stockData.cantidad <= 0) {
        showMessage('Error: La cantidad debe ser mayor a 0', 'error');
        return;
    }
    
    if (!stockData.motivo?.trim()) {
        showMessage('Error: El motivo es obligatorio', 'error');
        return;
    }
    
    try {
        const response = await api.updateStock(productId, stockData);
        if (response.success) {
            showMessage('Stock actualizado exitosamente', 'success');
            closeStockModal();
            loadDashboardData();
        }
    } catch (error) {
        console.error('❌ Error al actualizar stock:', error);
        showMessage(`Error: ${error.message}`, 'error');
    }
});

// Renderizar tabla de movimientos
function renderMovementsTable() {
    const tbody = document.getElementById('movementsTable');
    
    if (movimientos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                    No hay movimientos registrados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = movimientos.map(movement => {
        const fecha = new Date(movement.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const tipoClass = movement.tipo === 'entrada' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
        
        // Generar observaciones más detalladas
        const tipoTexto = movement.tipo === 'entrada' ? 'Entrada' : 'Salida';
        const observaciones = `${tipoTexto} de ${movement.cantidad} unidades - ${movement.motivo}`;
        
        return `
            <tr class="border-b hover:bg-gray-50">
                <td class="px-6 py-4 font-medium">${movement.productoId?.nombre || 'N/A'}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${tipoClass}">
                        ${movement.tipo}
                    </span>
                </td>
                <td class="px-6 py-4 font-medium">${movement.cantidad}</td>
                <td class="px-6 py-4">${fecha}</td>
                <td class="px-6 py-4 text-gray-600">${movement.motivo}</td>
                <td class="px-6 py-4 text-gray-500 text-sm">${observaciones}</td>
            </tr>
        `;
    }).join('');
}

// Cargar movimientos con filtros
async function loadMovements() {
    try {
        const response = await api.getMovements();
        if (response.success) {
            let movimientosFiltrados = response.data;
            
            // Aplicar filtro de tipo si está seleccionado
            const filtroTipo = document.getElementById('filterMovementType').value;
            if (filtroTipo) {
                movimientosFiltrados = movimientosFiltrados.filter(m => m.tipo === filtroTipo);
            }
            
            movimientos = movimientosFiltrados;
            renderMovementsTable();
            
            showMessage(`${movimientos.length} movimientos encontrados`, 'success');
        }
    } catch (error) {
        console.error('Error cargando movimientos:', error);
        showMessage('Error al cargar movimientos', 'error');
    }
}

// Cargar productos con filtros
async function loadProducts() {
    try {
        console.log('🔍 Cargando productos desde API...');
        const response = await api.getProducts();
        console.log('📡 Respuesta de API:', response);
        
        if (response.success) {
            let productosFiltrados = response.data;
            console.log('📦 Productos recibidos de API:', productosFiltrados.length);
            
            // Aplicar filtro de búsqueda si hay texto
            const filtroTexto = document.getElementById('searchProducts')?.value?.toLowerCase();
            if (filtroTexto) {
                console.log('🔍 Aplicando filtro de búsqueda:', filtroTexto);
                productosFiltrados = productosFiltrados.filter(p => 
                    p.nombre.toLowerCase().includes(filtroTexto) ||
                    p.codigo.toLowerCase().includes(filtroTexto) ||
                    (p.descripcion && p.descripcion.toLowerCase().includes(filtroTexto))
                );
                console.log('📦 Productos después del filtro:', productosFiltrados.length);
            }
            
            productos = productosFiltrados;
            console.log('💾 Productos asignados a variable global:', productos.length);
            
            renderProductsTable();
            updateDashboardStats();
            
            if (filtroTexto) {
                showMessage(`${productos.length} productos encontrados`, 'success');
            }
        } else {
            console.error('❌ Error en respuesta de API:', response);
        }
    } catch (error) {
        console.error('❌ Error cargando productos:', error);
        showMessage('Error al cargar productos', 'error');
    }
}

// Función para actualizar todos los datos (equivalente a refreshAllData)
async function refreshAllData() {
    try {
        console.log('🔄 Iniciando actualización completa de datos...');
        showMessage('Actualizando datos...', 'info');
        
        // Limpiar filtros de búsqueda
        const searchField = document.getElementById('searchProducts');
        if (searchField) {
            searchField.value = '';
            console.log('🧹 Filtros de búsqueda limpiados');
        }
        
        // Cargar productos
        console.log('📦 Cargando productos...');
        const productResponse = await api.getProducts();
        console.log('📡 Respuesta productos:', productResponse);
        
        if (productResponse.success) {
            productos = productResponse.data;
            console.log('✅ Productos cargados:', productos.length);
            renderProductsTable();
            updateDashboardStats();
        } else {
            console.error('❌ Error al cargar productos:', productResponse);
        }
        
        // Cargar movimientos
        console.log('📋 Cargando movimientos...');
        const movementResponse = await api.getMovements();
        if (movementResponse.success) {
            movimientos = movementResponse.data;
            renderMovementsTable();
        }
        
        // Actualizar estadísticas
        updateDashboardStats();
        
        showMessage('Datos actualizados correctamente', 'success');
    } catch (error) {
        console.error('Error actualizando datos:', error);
        showMessage('Error al actualizar los datos', 'error');
    }
}
