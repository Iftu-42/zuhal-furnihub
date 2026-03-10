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
