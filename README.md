# 🛋️ Zuhal FurniHub 
### *Elevating the Furniture Secondary Market in Ethiopia*

## 🌟 The Vision
The digital landscape for buying furniture in Ethiopia is currently fragmented. Buyers are forced to scroll through noisy Telegram channels or general marketplaces (like Jiji) filled with unrelated items. 

**Zuhal FurniHub** was built to provide a **curated, high-trust ecosystem** specifically for home decor. It moves away from the "call for price" culture by providing transparent pricing, clear style categories, and localized logistics.

## 🚀 The "Zuhal" Difference (Unique Value)
* **Curation Over Noise:** 100% furniture-focused. Features like "Room Size" filters (Studio vs. Villa) are designed specifically for the Addis Ababa housing market.
* **The Trust Gap:** Standardized 10% commission model and Premium tiers incentivize high-quality listings.
* **Localized Logistics:** A built-in **Sub-City Delivery Estimator** (Bole, Piassa, CMC, Ayat) provides immediate cost clarity for buyers.
* **Direct Connectivity:** Integrated WhatsApp deep-linking for instant, high-trust communication between neighbors.

## 🛠️ Tech Stack & Architecture
This is a high-performance frontend prototype built with:
* **HTML5 & CSS3:** Mobile-first responsive design with custom CSS Variables for a seamless **Dark Mode** experience.
* **Vanilla JavaScript (ES6+):** * **Dynamic Routing:** Uses URL parameters to generate product pages on the fly.
    * **Data Persistence:** Managed via `localStorage` for a "no-database" functional demo.
    * **Image Handling:** Uses `FileReader` API to convert user uploads into Base64 strings.

## 📂 Project Structure
* `index.html`: The marketplace hub with search, style filters, and delivery calculator.
* `sell.html`: Seller portal with live earnings math and image upload.
* `details.html`: Dynamic item view with WhatsApp integration and "Related Products" logic.
* `script.js`: The central engine managing state, theme, and data.
* `style.css`: The "Forest & Orange" brand identity system.

## 📈 Business Logic
The platform operates on a transparent commission model to fund operations and delivery coordination:

$$Earnings = Listing Price - (Listing Price \times 0.10)$$

## 🗺️ Future Roadmap
* **Telebirr/CBE Birr Integration:** To allow for secure in-app deposits and commission payments.
* **AR Viewer:** Allowing buyers to see how a piece fits in their room using their phone camera.
* **Verified Seller Badges:** To further increase trust for high-volume local workshops.

---

### 💡 How to run the demo:
1. Clone the repository.
2. Open `index.html` in your browser.
3. *Tip:* To reset the marketplace to its default state, clear your browser's local storage.
