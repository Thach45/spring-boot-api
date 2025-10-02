// Global variables
let productModal;
let categoryModal;

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    
    loadProducts();
    loadCategories();
});

function getAuthHeaders() {
    return {
        'Content-Type': 'application/json'
    };
}

// Product functions
function loadProducts() {
    fetch('/api/products', {
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to load products');
        return response.json();
    })
    .then(products => {
        const tbody = document.getElementById('productTableBody');
        tbody.innerHTML = '';
        products.forEach(product => {
            tbody.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description || ''}</td>
                    <td>$${product.price}</td>
                    <td>${product.categoryName}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editProduct(${product.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    })
    .catch(error => {
        console.error('Error loading products:', error);
        alert('Failed to load products');
    });
}

function openProductModal(product = null) {
    clearFormErrors();
    document.getElementById('productId').value = product ? product.id : '';
    document.getElementById('productName').value = product ? product.name : '';
    document.getElementById('productDescription').value = product ? product.description : '';
    document.getElementById('productPrice').value = product ? product.price : '';
    
    // Load categories for dropdown
    fetch('/api/categories', {
        headers: getAuthHeaders()
    })
    .then(response => response.json())
    .then(categories => {
        const select = document.getElementById('productCategory');
        select.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            if (product && product.categoryId === category.id) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    });
    
    productModal.show();
}

function editProduct(id) {
    fetch(`/api/products/${id}`, {
        headers: getAuthHeaders()
    })
    .then(response => response.json())
    .then(product => openProductModal(product));
}

function saveProduct() {
    const product = {
        id: document.getElementById('productId').value || null,
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        categoryId: parseInt(document.getElementById('productCategory').value)
    };

    // Validation
    if (!validateProduct(product)) {
        return;
    }

    const url = product.id ? `/api/products/${product.id}` : '/api/products';
    const method = product.id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
    })
    .then(response => {
        if (response.ok) {
            productModal.hide();
            loadProducts();
        } else {
            throw new Error('Failed to save product');
        }
    })
    .catch(error => {
        console.error('Error saving product:', error);
        alert('Failed to save product');
    });
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        .then(response => {
            if (response.ok) {
                loadProducts();
            } else {
                throw new Error('Failed to delete product');
            }
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        });
    }
}

function validateProduct(product) {
    let isValid = true;
    
    if (!product.name || product.name.trim().length === 0) {
        showFieldError('productName', 'Product name is required');
        isValid = false;
    }
    
    if (!product.price || product.price <= 0) {
        showFieldError('productPrice', 'Price must be greater than 0');
        isValid = false;
    }
    
    if (!product.categoryId) {
        showFieldError('productCategory', 'Category is required');
        isValid = false;
    }
    
    return isValid;
}

// Category functions
function loadCategories() {
    fetch('/api/categories', {
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to load categories');
        return response.json();
    })
    .then(categories => {
        const tbody = document.getElementById('categoryTableBody');
        tbody.innerHTML = '';
        categories.forEach(category => {
            tbody.innerHTML += `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.name}</td>
                    <td>${category.description || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editCategory(${category.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCategory(${category.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    })
    .catch(error => {
        console.error('Error loading categories:', error);
        alert('Failed to load categories');
    });
}

function openCategoryModal(category = null) {
    clearFormErrors();
    document.getElementById('categoryId').value = category ? category.id : '';
    document.getElementById('categoryName').value = category ? category.name : '';
    document.getElementById('categoryDescription').value = category ? category.description : '';
    categoryModal.show();
}

function editCategory(id) {
    fetch(`/api/categories/${id}`, {
        headers: getAuthHeaders()
    })
    .then(response => response.json())
    .then(category => openCategoryModal(category));
}

function saveCategory() {
    const category = {
        id: document.getElementById('categoryId').value || null,
        name: document.getElementById('categoryName').value,
        description: document.getElementById('categoryDescription').value
    };

    // Validation
    if (!validateCategory(category)) {
        return;
    }

    const url = category.id ? `/api/categories/${category.id}` : '/api/categories';
    const method = category.id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: JSON.stringify(category)
    })
    .then(response => {
        if (response.ok) {
            categoryModal.hide();
            loadCategories();
            loadProducts(); // Reload products to update category names
        } else {
            throw new Error('Failed to save category');
        }
    })
    .catch(error => {
        console.error('Error saving category:', error);
        alert('Failed to save category');
    });
}

function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category? This will also delete all products in this category.')) {
        fetch(`/api/categories/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        .then(response => {
            if (response.ok) {
                loadCategories();
                loadProducts(); // Reload products as some might have been deleted
            } else {
                throw new Error('Failed to delete category');
            }
        })
        .catch(error => {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        });
    }
}

function validateCategory(category) {
    let isValid = true;
    
    if (!category.name || category.name.trim().length === 0) {
        showFieldError('categoryName', 'Category name is required');
        isValid = false;
    }
    
    return isValid;
}

// Utility functions
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    
    field.classList.add('is-invalid');
    errorDiv.textContent = message;
}

function clearFormErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.textContent = '';
    });
}

function logout() {
    window.location.href = '/logout';
}
