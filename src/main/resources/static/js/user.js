// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCategories();
});

function getAuthHeaders() {
    return {
        'Content-Type': 'application/json'
    };
}

// Product functions
function loadProducts(categoryId = null) {
    let url = '/api/products';
    if (categoryId) {
        url = `/api/products/category/${categoryId}`;
    }
    
    fetch(url, {
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
                </tr>
            `;
        });
    })
    .catch(error => {
        console.error('Error loading products:', error);
        alert('Failed to load products');
    });
}

function loadCategories() {
    fetch('/api/categories', {
        headers: getAuthHeaders()
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to load categories');
        return response.json();
    })
    .then(categories => {
        const select = document.getElementById('categoryFilter');
        select.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error loading categories:', error);
    });
}

function filterProducts() {
    const categoryId = document.getElementById('categoryFilter').value;
    loadProducts(categoryId);
}

function logout() {
    window.location.href = '/logout';
}
