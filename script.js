// 1. DATA & STORAGE
const defaultFurniture = [
    { id: 1, name: "Zuhal Velvet Sofa", price: 75000, style: "Modern", size: "large", premium: true, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400" },
    { id: 2, name: "Traditional Coffee Table", price: 12000, style: "Ethiopian Traditional", size: "small", premium: false, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400" },
    { id: 3, name: "Ergo-Plus Chair", price: 18200, style: "Modern", size: "small", premium: false, img: "https://images.unsplash.com/photo-1505797149-43b0000ee20e?auto=format&fit=crop&w=400" }
];

let furniture = JSON.parse(localStorage.getItem('zuhal_products')) || defaultFurniture;

// 2. DISPLAY LOGIC (Main Grid)
function displayProducts(items = furniture) {
    const grid = document.getElementById('productGrid');
    if (!grid) return; 
    grid.innerHTML = "";

    items.forEach(item => {
        const commission = item.price * 0.10;
        grid.innerHTML += `
            <div class="product-card ${item.premium ? 'premium-card' : ''}">
                ${item.premium ? '<span class="premium-tag">PREMIUM</span>' : ''}
                <img src="${item.img || 'https://via.placeholder.com/400x250'}" style="width:100%; height:200px; object-fit:cover;">
                <div style="padding:15px;">
                    <h3>${item.name}</h3>
                    <p><strong>${Number(item.price).toLocaleString()} ETB</strong></p>
                    <div style="display:flex; justify-content: space-between; margin-top:12px;">
                        <button class="buy-btn" onclick="window.location.href='details.html?id=${item.id}'">View</button>
                        <button class="delete-btn" onclick="deleteItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>`;
    });
}

// 3. SEARCH & FILTERS
function searchFurniture() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = furniture.filter(f => f.name.toLowerCase().includes(term));
    displayProducts(filtered);
}

function filterByStyle(style) {
    const filtered = (style === 'All') ? furniture : furniture.filter(f => f.style === style);
    displayProducts(filtered);
}

function filterBySize() {
    const size = document.getElementById('roomSize').value;
    const filtered = (size === 'all') ? furniture : furniture.filter(f => f.size === size);
    displayProducts(filtered);
}

// 4. ITEM DETAILS & RELATED (details.html)
function showItemDetails(id) {
    const view = document.getElementById('detailsView');
    if (!view) return;
    const item = furniture.find(f => f.id == id);
    if (!item) return view.innerHTML = "<h2>Item Not Found</h2>";

    view.innerHTML = `
        <div class="details-image"><img src="${item.img}"></div>
        <div class="details-info">
            <h1>${item.name}</h1>
            <p class="price-tag">${item.price.toLocaleString()} ETB</p>
            <div class="contact-box">
                <a href="https://wa.me/251900000000?text=Interested in ${item.name}" class="whatsapp-btn">Chat on WhatsApp</a>
            </div>
        </div>`;
    showRelated(item.style, item.id);
}

function showRelated(style, id) {
    const related = furniture.filter(f => f.style === style && f.id != id);
    const relatedGrid = document.getElementById('relatedGrid');
    if (relatedGrid) {
        // reuse display logic or simple version here
    }
}

// 5. DARK MODE TOGGLE
const toggleBtn = document.getElementById('dark-mode-toggle');
if (localStorage.getItem('dark-mode') === 'enabled') document.body.classList.add('dark-mode');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const mode = document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled';
        localStorage.setItem('dark-mode', mode);
        toggleBtn.innerText = mode === 'enabled' ? '☀️' : '🌙';
    });
}

// 6. INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(window.location.search).get('id');
    id ? showItemDetails(id) : displayProducts();
});
