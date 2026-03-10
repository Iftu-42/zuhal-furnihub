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

    if (items.length === 0) {
        grid.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">No items found. Try a different search!</p>`;
        return;
    }

    items.forEach(item => {
        grid.innerHTML += `
            <div class="product-card ${item.premium ? 'premium-card' : ''}">
                ${item.premium ? '<span class="premium-tag">PREMIUM</span>' : ''}
                <img src="${item.img || 'https://via.placeholder.com/400x250'}" style="width:100%; height:200px; object-fit:cover;">
                <div style="padding:15px;">
                    <h3>${item.name}</h3>
                    <p><strong>${Number(item.price).toLocaleString()} ETB</strong></p>
                    <div style="display:flex; justify-content: space-between; margin-top:12px; gap:10px;">
                        <button class="buy-btn" style="flex:1; background:var(--zuhal-green); color:white; border:none; padding:8px; border-radius:4px; cursor:pointer;" onclick="window.location.href='details.html?id=${item.id}'">View</button>
                        <button class="delete-btn" onclick="deleteItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>`;
    });
}

// 3. SEARCH & FILTERS
function searchFurniture() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = furniture.filter(f => f.name.toLowerCase().includes(term) || f.style.toLowerCase().includes(term));
    displayProducts(filtered);
}

function filterByStyle(style) {
    // Update active UI for chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.classList.remove('active');
        if(chip.innerText === style) chip.
