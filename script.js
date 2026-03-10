// --- DATA STORE ---
let furniture = [
    { id: 1, name: "Modern Velvet Sofa", price: 45000, style: "Modern", size: "large", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500" },
    { id: 2, name: "Ethiopian Coffee Table", price: 8500, style: "Ethiopian Traditional", size: "small", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=500" }
];

// --- NAVIGATION ---
function navigateTo(viewId) {
    document.querySelectorAll('.view-section').forEach(v => v.style.display = 'none');
    document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
    
    document.getElementById(viewId).style.display = 'block';
    document.getElementById(viewId.replace('view-', 'tab-')).classList.add('active');
}

// --- DISPLAY LOGIC ---
function displayProducts(filteredList = furniture) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = filteredList.map(item => `
        <div class="product-card">
            <img src="${item.image}" style="width:100%; height:200px; object-fit:cover; border-radius:15px;">
            <h3 style="margin:15px 0 5px;">${item.name}</h3>
            <p style="color:var(--accent); font-weight:800;">${item.price} ETB</p>
            <button class="action-btn" style="width:100%;" onclick="window.location.href='details.html?id=${item.id}'">View Piece</button>
        </div>
    `).join('');
}

// --- TOOLS LOGIC ---
function calculateDelivery() {
    const pickup = parseInt(document.getElementById('pickup').value);
    const size = parseInt(document.getElementById('itemSize').value);
    const total = 300 + pickup + (size * 100);
    document.getElementById('deliveryResult').innerText = `Estimate: ${total} ETB`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('themeIcon').innerText = isDark ? '☀️' : '🌙';
}

function initApp() { displayProducts(); }
