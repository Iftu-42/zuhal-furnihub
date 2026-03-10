// 1. DATA MANAGEMENT: Load from LocalStorage or use Defaults
const defaultFurniture = [
    { id: 1, name: "Zuhal Velvet Sofa", price: 75000, style: "Modern", size: "large", premium: true, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400" },
    { id: 2, name: "Traditional Coffee Table", price: 12000, style: "Ethiopian Traditional", size: "small", premium: false, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400" },
    { id: 3, name: "Ergo-Plus Chair", price: 18200, style: "Modern", size: "small", premium: false, img: "https://images.unsplash.com/photo-1505797149-43b0000ee20e?auto=format&fit=crop&w=400" }
];

let furniture = JSON.parse(localStorage.getItem('zuhal_products')) || defaultFurniture;

// 2. DISPLAY LOGIC: Renders cards to the grid
function displayProducts(items = furniture) {
    const grid = document.getElementById('productGrid');
    if (!grid) return; // Exit if on the 'Sell' page
    
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
                    <button class="buy-btn" style="width:100%; margin-top:10px; background: #3D5A37; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer;">View Details</button>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// 3. FILTERING LOGIC
function filterByStyle(style) {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(c => c.classList.remove('active')); // Reset active button UI
    
    if(style === 'All') {
        displayProducts(furniture);
    } else {
        const filtered = furniture.filter(f => f.style === style);
        displayProducts(filtered);
    }
}

function filterBySize() {
    const selectedSize = document.getElementById('roomSize').value;
    const filtered = (selectedSize === 'all') 
        ? furniture 
        : furniture.filter(item => item.size === selectedSize);
    displayProducts(filtered);
}

// 4. SEARCH LOGIC
function searchFurniture() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = furniture.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
}

// 5. SELLER LOGIC (sell.html)
function updateEarnings() {
    const priceInput = document.getElementById('itemPrice');
    const feeDisplay = document.getElementById('feeAmount');
    const earningDisplay = document.getElementById('finalEarning');

    if(priceInput && feeDisplay && earningDisplay) {
        const price = priceInput.value || 0;
        const fee = price * 0.10;
        const earning = price - fee;
        feeDisplay.innerText = fee.toLocaleString();
        earningDisplay.innerText = earning.toLocaleString();
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
        img: "" // Placeholder
    };

    furniture.push(newAd);
    localStorage.setItem('zuhal_products', JSON.stringify(furniture));

    alert(isPremium ? "Premium Ad Posted!" : "Ad Posted Successfully!");
    window.location.href = "index.html";
}

// 6. TOOLS (Delivery & Requests)
function calculateDelivery() {
    const baseRate = 500;
    const areaBonus = parseInt(document.getElementById('pickup').value);
    const sizeMultiplier = parseFloat(document.getElementById('itemSize').value);
    const total = (baseRate + areaBonus) * sizeMultiplier;
    document.getElementById('deliveryResult').innerText = `Estimated Delivery: ${total.toLocaleString()} ETB`;
}

function submitRequest() {
    const itemName = document.getElementById('customItemName').value;
    if(!itemName) return alert("Please enter an item name!");
    alert(`Success! Your request for "${itemName}" sent to local carpenters.`);
}

// 7. BOOTSTRAP: Run on Load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});
