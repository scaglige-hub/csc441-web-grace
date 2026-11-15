// Lab 20 · Task 2: final rendering with optional images and refresh
const showcaseGrid = document.querySelector("#showcase-grid");
const showcaseStatus = document.querySelector("#showcase-status");
const showcaseCount = document.querySelector("#showcase-count");
const refreshButton = document.querySelector("#showcase-refresh");
async function loadShowcase() {
    if (!showcaseGrid || !showcaseStatus) return;
    showcaseStatus.textContent = "Loading from Supabase...";
    showcaseGrid.replaceChildren();
    if (showcaseCount) showcaseCount.textContent = "";
    try {
        const url = SHOWCASE_CONFIG.url +
            "/rest/v1/showcase_items" + "?order=id.desc";
        const response = await fetch(url, {
            headers: { apikey: SHOWCASE_CONFIG.key }
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        const items = await response.json();
        for (const item of items) {
            const card = document.createElement("article");
            card.className = "showcase-card";
            if (item.image_url && item.image_url.startsWith("https://")) {
                const photo = document.createElement("img");
                photo.className = "showcase-photo";
                photo.src = item.image_url;
                photo.alt = "Photo for " + item.title;
                photo.loading = "lazy";
                photo.addEventListener("error", () => photo.remove());
                card.appendChild(photo);
            }
            const body = document.createElement("div");
            body.className = "showcase-body";
            const title = document.createElement("h3");
            title.textContent = item.title;
            const category = document.createElement("small");
            category.textContent = item.category;
            const description = document.createElement("p");
            description.textContent = item.description;
            body.append(title, category, description);
            card.appendChild(body);
            showcaseGrid.appendChild(card);
        }
        showcaseStatus.textContent = items.length ? "Loaded successfully." : "No items yet.";
        if (showcaseCount) showcaseCount.textContent = items.length + " items";
    } catch (error) {
        showcaseStatus.textContent = "Could not load the items. Check the Console.";
        console.error("Showcase API error:", error);
    }
}
if (showcaseGrid && showcaseStatus) loadShowcase();
if (refreshButton) refreshButton.addEventListener("click", loadShowcase);