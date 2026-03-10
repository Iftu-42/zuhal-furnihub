// 1. Data Setup
const defaultFurniture = [
    { id: 1, name: "Zuhal Velvet Sofa", price: 75000, style: "Modern", size: "large", premium: true, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400" },
    { id: 2, name: "Traditional Coffee Table", price: 12000, style: "Ethiopian Traditional", size: "small", premium: false, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400" },
    { id: 3, name: "Ergo-Plus Chair", price: 18200, style: "Modern", size: "small", premium: false, img: "https://images.unsplash.com/photo-1505797149-43b0000ee20e?auto=format&fit=crop&w=400" }
];

let furniture = JSON.parse(localStorage.getItem('zuhal_products')) || defaultFurniture;

// 2. Main Display Function
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
                        <button class="buy-btn" style="flex: 1; background:var(--zuhal-green); color:white; border:none; padding:8px; border-radius:4px; cursor:pointer;">View</button>
                        <button class="delete-btn" onclick="deleteItem(${item.id})" style="background:#ffeded; color:#cc0000; border:none; padding:8px; border-radius:4px; cursor:pointer; font-size:12px;">Remove</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// 3. Search Logic
function searchFurniture() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = furniture.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.style.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
}

// 4. Delete Logic
function deleteItem(id) {
    if(confirm("Delete this listing from Zuhal?")) {
        furniture = furniture.filter(item => item.id !== id);
        localStorage.setItem('zuhal_products', JSON.stringify(furniture));
        displayProducts();
    }
}

// 5. Filter Logic
function filterByStyle(style) {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(c => c.classList.remove('active'));
    // Note: You can add logic to add 'active' class to the clicked button if desired
    
    if(style === 'All') {
        displayProducts(furniture);
    } else {
        const filtered = furniture.filter(f => f.style === style);
        displayProducts(filtered);
    }
}

function filterBySize() {
    const selectedSize = document.getElementById('roomSize').value;
    const filtered = (selectedSize === 'all') ? furniture : furniture.filter(item => item.size === selectedSize);
    displayProducts(filtered);
}

// 6. Seller Math & Posting
function updateEarnings() {
    const price = document.getElementById('itemPrice').value;
    const fee = price * 0.10;
    const earning = price - fee;
    if(document.getElementById('feeAmount')){
        document.getElementById('feeAmount').innerText = fee.toLocaleString();
        document.getElementById('finalEarning').innerText = earning.toLocaleString();
    }
}

function postAd() {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const style = document.getElementById('itemStyle').value;
    const isPremium = document.getElementById('isPremium').checked;

    if (!name || !price) return alert("Fill name and price!");

    const newAd = { id: Date.now(), name, price: parseInt(price), style, premium: isPremium, img: "" };
    furniture.push(newAd);
    localStorage.setItem('zuhal_products', JSON.stringify(furniture));
    window.location.href = "index.html";
}

// 7. Delivery & Custom Request
function calculateDelivery() {
    const baseRate = 500;
    const areaBonus = parseInt(document.getElementById('pickup').value);
    const sizeMultiplier = parseFloat(document.getElementById('itemSize').value);
    const total = (baseRate + areaBonus) * sizeMultiplier;
    document.getElementById('deliveryResult').innerText = `Estimate: ${total.toLocaleString()} ETB`;
}

function submitRequest() {
    const itemName = document.getElementById('customItemName').value;
    if(!itemName) return alert("Enter item name!");
    alert(`Request for "${itemName}" sent!`);
}

// Init
displayProducts();
