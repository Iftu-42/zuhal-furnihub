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
        if(chip.innerText === style) chip.classList.add('active');
    });

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
        <div class="details-image"><img src="${item.img}" style="width:100%; border-radius:15px;"></div>
        <div class="details-info">
            <h1>${item.name}</h1>
            <p class="price-tag" style="font-size:2rem; color:var(--zuhal-orange); font-weight:bold;">${item.price.toLocaleString()} ETB</p>
            <p>Style: ${item.style} | Size: ${item.size || 'Standard'}</p>
            <div class="contact-box" style="margin-top:30px; padding:20px; background:var(--zuhal-cream); border-radius:12px; text-align:center;">
                <h3>Interested?</h3>
                <a href="https://wa.me/251900000000?text=Hello, I am interested in the ${item.name}" target="_blank" class="whatsapp-btn">Chat on WhatsApp</a>
            </div>
        </div>`;
    showRelated(item.style, item.id);
}

function showRelated(style, id) {
    const relatedGrid = document.getElementById('relatedGrid');
    if (!relatedGrid) return;
    const related = furniture.filter(f => f.style === style && f.id != id).slice(0, 3);
    
    relatedGrid.innerHTML = "";
    related.forEach(item => {
        relatedGrid.innerHTML += `
            <div class="product-card">
                <img src="${item.img}" style="width:100%; height:150px; object-fit:cover;">
                <div style="padding:10px;">
                    <h4>${item.name}</h4>
                    <button class="buy-btn" style="width:100%; margin-top:5px;" onclick="window.location.href='details.html?id=${item.id}'">View</button>
                </div>
            </div>`;
    });
}

// 5. SELLER LOGIC (sell.html)
function postAd() {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const style = document.getElementById('itemStyle').value;
    const size = document.getElementById('itemSize')?.value || 'medium';
    const isPremium = document.getElementById('isPremium').checked;
    const imageInput = document.getElementById('itemImageInput');

    if (!name || !price) return alert("Please fill in the details!");

    const reader = new FileReader();
    reader.onload = function(e) {
        const newAd = {
            id: Date.now(),
            name,
            price: parseInt(price),
            style,
            size,
            premium: isPremium,
            img: e.target.result
        };
        furniture.push(newAd);
        localStorage.setItem('zuhal_products', JSON.stringify(furniture));
        window.location.href = 'index.html';
    };

    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert("Please upload a photo!");
    }
}

function updateEarnings() {
    const price = document.getElementById('itemPrice').value || 0;
    const fee = price * 0.10;
    const earning = price - fee;
    if(document.getElementById('feeAmount')) {
        document.getElementById('feeAmount').innerText = fee.toLocaleString();
        document.getElementById('finalEarning').innerText = earning.toLocaleString();
    }
}

// 6. TOOLS (Delivery & Delete)
function calculateDelivery() {
    const area = parseInt(document.getElementById('pickup').value);
    const size = parseFloat(document.getElementById('itemSize').value);
    const total = (500 + area) * size;
    document.getElementById('deliveryResult').innerText = `Estimated Cost: ${total.toLocaleString()} ETB`;
}

function deleteItem(id) {
    if(confirm("Are you sure you want to remove this listing?")) {
        furniture = furniture.filter(f => f.id !== id);
        localStorage.setItem('zuhal_products', JSON.stringify(furniture));
        displayProducts();
    }
}

// 7. DARK MODE TOGGLE
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

// 8. INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
        showItemDetails(id);
    } else {
        displayProducts();
    }
});
