const furniture = [
    { name: "Zuhal Velvet Sofa", price: 75000, style: "Modern", size: "large", premium: true, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400" },
    { name: "Traditional Coffee Table", price: 12000, style: "Ethiopian Traditional", size: "small", premium: false, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400" },
    { name: "Ergo-Plus Chair", price: 18200, style: "Modern", size: "small", premium: false, img: "https://images.unsplash.com/photo-1505797149-43b0000ee20e?auto=format&fit=crop&w=400" }
];

function displayProducts(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = "";

    items.forEach(item => {
        // Logic for 10% platform cut
        const commission = item.price * 0.10;
        
        const card = `
            <div class="product-card">
                ${item.premium ? '<span class="premium-badge">PREMIUM</span>' : ''}
                <img src="${item.img}" style="width:100%; height:200px; object-fit:cover;">
                <div style="padding:15px;">
                    <h3>${item.name}</h3>
                    <p><strong>${item.price.toLocaleString()} ETB</strong></p>
                    <small>Zuhal Fee (10%): ${commission.toLocaleString()} ETB</small>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function filterByStyle(style) {
    if(style === 'All') {
        displayProducts(furniture);
    } else {
        const filtered = furniture.filter(f => f.style === style);
        displayProducts(filtered);
    }
}

// Initial display
displayProducts(furniture);
function submitRequest() {
    const itemName = document.getElementById('customItemName').value;
    if(itemName === "") {
        alert("Please enter what you are looking for!");
        return;
    }
    
    // For now, we simulate a success message
    alert(`Success! Your request for a "${itemName}" has been sent to 15 nearby carpenters. You will receive bids shortly.`);
    
    // Clear the form
    document.getElementById('customItemName').value = "";
    document.getElementById('customDescription').value = "";
}
function calculateDelivery() {
    const baseRate = 500; // Base start price in ETB
    const areaBonus = parseInt(document.getElementById('pickup').value);
    const sizeMultiplier = parseFloat(document.getElementById('itemSize').value);
    
    const total = (baseRate + areaBonus) * sizeMultiplier;
    
    document.getElementById('deliveryResult').innerText = 
        `Estimated Delivery: ${total.toLocaleString()} ETB (Includes loading/unloading)`;
}
function filterBySize() {
    const selectedSize = document.getElementById('roomSize').value;
    
    const filtered = (selectedSize === 'all') 
        ? furniture 
        : furniture.filter(item => item.size === selectedSize);
        
    displayProducts(filtered);
}
function updateEarnings() {
    const price = document.getElementById('itemPrice').value;
    const fee = price * 0.10;
    const earning = price - fee;

    document.getElementById('feeAmount').innerText = fee.toLocaleString();
    document.getElementById('finalEarning').innerText = earning.toLocaleString();
}

function postAd() {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const isPremium = document.getElementById('isPremium').checked;

    if (!name || !price) {
        alert("Please fill in the name and price!");
        return;
    }

    // Logic for Premium Fee
    if (isPremium) {
        alert(`Great choice! Your "${name}" will be featured on the first page once the premium fee is confirmed.`);
    } else {
        alert(`Your ad for "${name}" has been listed!`);
    }
    
    // Redirect back to home
    window.location.href = "index.html";
}
// 1. Initial Data (Defaults if nothing is in storage)
const defaultFurniture = [
    { id: 1, name: "Zuhal Velvet Sofa", price: 75000, style: "Modern", size: "large", premium: true, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400" },
    { id: 2, name: "Traditional Coffee Table", price: 12000, style: "Ethiopian Traditional", size: "small", premium: false, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400" }
];

// 2. Load from LocalStorage or use Defaults
let furniture = JSON.parse(localStorage.getItem('zuhal_products')) || defaultFurniture;

// 3. Display Products on the Page
function displayProducts(items = furniture) {
    const grid = document.getElementById('productGrid');
    if (!grid) return; // Prevent errors if we aren't on the home page
    
    grid.innerHTML = "";

    items.forEach(item => {
        const commission = item.price * 0.10;
        const card = `
            <div class="product-card ${item.premium ? 'premium-card' : ''}">
                ${item.premium ? '<span class="premium-tag">PREMIUM</span>' : ''}
                <img src="${item.img || 'https://via.placeholder.com/400x250?text=No+Image'}" style="width:100%; height:200px; object-fit:cover;">
                <div style="padding:15px;">
                    <h3>${item.name}</h3>
                    <p><strong>${Number(item.price).toLocaleString()} ETB</strong></p>
                    <small>Zuhal Fee (10%): ${commission.toLocaleString()} ETB</small>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// 4. Save a New Ad (For sell.html)
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
        id: Date.now(), // Unique ID
        name: name,
        price: parseInt(price),
        style: style,
        premium: isPremium,
        img: "" // For now, we'll keep it empty or use a placeholder
    };

    // Add to our array
    furniture.push(newAd);

    // SAVE TO LOCAL STORAGE
    localStorage.setItem('zuhal_products', JSON.stringify(furniture));

    alert("Success! Your ad is now live on Zuhal FurniHub.");
    window.location.href = "index.html"; // Redirect to home
}

// 5. Math for the Seller Page
function updateEarnings() {
    const price = document.getElementById('itemPrice').value;
    const fee = price * 0.10;
    const earning = price - fee;
    
    if(document.getElementById('feeAmount')){
        document.getElementById('feeAmount').innerText = fee.toLocaleString();
        document.getElementById('finalEarning').innerText = earning.toLocaleString();
    }
}

// Initialize
displayProducts();
