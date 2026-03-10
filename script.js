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
