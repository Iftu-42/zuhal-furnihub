document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    
    if (itemId) {
        showItemDetails(itemId);
        
        // Find the current item to get its category
        const currentItem = furniture.find(f => f.id == itemId);
        if (currentItem) {
            showRelatedProducts(currentItem.style, currentItem.id);
        }
    } else {
        displayProducts();
    }
});
// 1. Data Setup (Load from LocalStorage or use Defaults)
const defaultFurniture = [
    { id: 1, name: "Zuhal Velvet Sofa", price: 75000, style: "Modern", size: "large", premium: true, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400" },
    { id: 2, name: "Traditional Coffee Table", price: 12000, style: "Ethiopian Traditional", size: "small", premium: false, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400" },
    { id: 3, name: "Ergo-Plus Chair", price: 18200, style: "Modern", size: "small", premium: false, img: "https://images.unsplash.com/photo-1505797149-43b0000ee20e?auto=format&fit=crop&w=400" }
];

let furniture = JSON.parse(localStorage.getItem('zuhal_products')) || defaultFurniture;

// 2. Main Display Function (Home Page)
function displayProducts(items = furniture) {
    const grid = document.getElementById('productGrid');
    if (!grid) return; 
    
    grid.innerHTML = "";

    items.forEach(item => {
        const commission = item.price * 0.10;
        const card = `
            <div class="product-card ${item.premium ? 'premium-card' : ''}">
                ${item.premium ? '<span class="premium-tag">PREMIUM</span>' : ''}
                <img src="${item.img || 'https://via.placeholder.com/400x250?text=Zuhal+Furniture'}" style="width:100%; height:200px; object-fit:cover;">
                <div style="padding:15px;">
                    <h3>${item.name}</h3>
                    <p><strong>${Number(item.price).toLocaleString()} ETB</strong></p>
                    <small style="color: #666;">Zuhal Fee (10%): ${commission.toLocaleString()} ETB</small>
                    
                    <div style="display:flex; justify-content: space-between; margin-top:12px; gap: 8px;">
                        <button class="buy-btn" onclick="window.location.href='details.html?id=${item.id}'" style="flex: 1; background:var(--zuhal-green); color:white; border:none; padding:8px; border-radius:4px; cursor:pointer;">View</button>
                        <button class="delete-btn" onclick="deleteItem(${item.id})" style="background:#ffeded; color:#cc0000; border:none; padding:8px; border-radius:4px; cursor:pointer; font-size:12px;">Remove</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// 3. Item Details Function (details.html)
function showItemDetails(id) {
    const container = document.getElementById
function showRelatedProducts(currentCategory, currentId) {
    const relatedGrid = document.getElementById('relatedGrid');
    if (!relatedGrid) return;

    // Filter items: must be same style BUT not the item we are currently looking at
    const related = furniture.filter(f => f.style === currentCategory && f.id != currentId);

    if (related.length === 0) {
        // If no same style, just show the most recent 3 items
        const recent = furniture.filter(f => f.id != currentId).slice(0, 3);
        renderRelated(recent);
    } else {
        renderRelated(related.slice(0, 3)); // Show top 3 matches
    }
}

function renderRelated(items) {
    const relatedGrid = document.getElementById('relatedGrid');
    relatedGrid.innerHTML = "";

    items.forEach(item => {
        const card = `
            <div class="product-card">
                <img src="${item.img || 'https://via.placeholder.com/400x250'}" style="width:100%; height:180px; object-fit:cover;">
                <div style="padding:15px;">
                    <h3>${item.name}</h3>
                    <p><strong>${item.price.toLocaleString()} ETB</strong></p>
                    <button class="buy-btn" onclick="window.location.href='details.html?id=${item.id}'" style="width:100%; background:var(--zuhal-green); color:white; border:none; padding:8px; border-radius:4px; cursor:pointer;">View</button>
                </div>
            </div>
        `;
        relatedGrid.innerHTML += card;
    });
}
// --- DARK MODE LOGIC ---
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check if user previously liked Dark Mode
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    if(toggleBtn) toggleBtn.innerText = '☀️';
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            toggleBtn.innerText = '☀️';
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            toggleBtn.innerText = '🌙';
        }
    });
}
