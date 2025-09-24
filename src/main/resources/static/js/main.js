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

// Product functions
function loadProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const tbody = document.getElementById('productTableBody');
            tbody.innerHTML = '';
            products.forEach(product => {
                tbody.innerHTML += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.description || ''}</td>
                        <td>${product.price}</td>
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
        });
}

function openProductModal(product = null) {
    document.getElementById('productId').value = product ? product.id : '';
    document.getElementById('productName').value = product ? product.name : '';
    document.getElementById('productDescription').value = product ? product.description : '';
    document.getElementById('productPrice').value = product ? product.price : '';
    
    // Load categories for dropdown
    fetch('/api/categories')
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
    fetch(`/api/products/${id}`)
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

    const url = product.id ? `/api/products/${product.id}` : '/api/products';
    const method = product.id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if (response.ok) {
            productModal.hide();
            loadProducts();
        }
    });
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/api/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                loadProducts();
            }
        });
    }
}

// Category functions
function loadCategories() {
    fetch('/api/categories')
        .then(response => response.json())
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
        });
}

function openCategoryModal(category = null) {
    document.getElementById('categoryId').value = category ? category.id : '';
    document.getElementById('categoryName').value = category ? category.name : '';
    document.getElementById('categoryDescription').value = category ? category.description : '';
    categoryModal.show();
}

function editCategory(id) {
    fetch(`/api/categories/${id}`)
        .then(response => response.json())
        .then(category => openCategoryModal(category));
}

function saveCategory() {
    const category = {
        id: document.getElementById('categoryId').value || null,
        name: document.getElementById('categoryName').value,
        description: document.getElementById('categoryDescription').value
    };

    const url = category.id ? `/api/categories/${category.id}` : '/api/categories';
    const method = category.id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        if (response.ok) {
            categoryModal.hide();
            loadCategories();
            loadProducts(); // Reload products to update category names
        }
    });
}

function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category? This will also delete all products in this category.')) {
        fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                loadCategories();
                loadProducts(); // Reload products as some might have been deleted
            }
        });
    }
}
