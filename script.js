// 1. Initial Data & LocalStorage Setup
const defaultFurniture = [
    { id: 1, name: "Zuhal Velvet Sofa", price: 75000, style: "Modern", size: "large", premium: true, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400" },
    { id: 2, name: "Traditional Coffee Table", price: 12000, style: "Ethiopian Traditional", size: "small", premium: false, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400" },
    { id: 3, name: "Ergo-Plus Chair", price: 18200, style: "Modern", size: "small", premium: false, img: "https://images.unsplash.com/photo-1505797149-43b0000ee20e?auto=format&fit=crop&w=400" }
];

let furniture = JSON.parse(localStorage.getItem('zuhal_products')) || defaultFurniture;

// 2. Display Products (Updated with Remove Button)
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
                    <small>Zuhal Fee (10%): ${commission.toLocaleString()} ETB</small>
                    
                    <div style="display:flex; justify-content: space-between; margin-top:10px;">
                        <button class="buy-btn" style="background:var(--zuhal-green); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">View</button>
                        
                        <button class="delete-btn" onclick="deleteItem(${item.id})" style="background:#ffeded; color:#cc0000; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:12px;">Remove</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// 3. NEW: Delete Item Function
function deleteItem(id) {
    if(confirm("Delete this listing from Zuhal FurniHub?")) {
        // Remove from the array
        furniture = furniture.filter(item => item.id !== id);
        // Update LocalStorage
        localStorage.setItem('zuhal_products', JSON.stringify(furniture));
        // Refresh the UI
        displayProducts();
    }
}

// 4. Filtering Logic
function filterByStyle(style) {
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

// 5. Seller & Math Logic (sell.html)
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

    if (!name || !price) {
        alert("Please fill in the name and price!");
        return;
    }

    const newAd = {
        id: Date.now(), 
        name: name,
        price: parseInt(price),
        style: style,
        premium: isPremium,
        img: "" 
    };

    furniture.push(newAd);
    localStorage.setItem('zuhal_products', JSON.stringify(furniture));
    alert("Ad Posted!");
    window.location.href = "index.html";
}

// 6. Tools (Delivery & Requests)
function calculateDelivery() {
    const baseRate = 500;
    const areaBonus = parseInt(document.getElementById('pickup').value);
    const sizeMultiplier = parseFloat(document.getElementById('itemSize').value);
    const total = (baseRate + areaBonus) * sizeMultiplier;
    document.getElementById('deliveryResult').innerText = `Estimated Delivery: ${total.toLocaleString()} ETB`;
}

function submitRequest() {
    const itemName = document.getElementById('customItemName').value;
    if(itemName === "") return alert("Enter item name!");
    alert(`Request for "${itemName}" sent to carpenters!`);
}

// Initialize
displayProducts();
