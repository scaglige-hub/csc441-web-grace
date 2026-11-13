// Class 20: Step 3: find the page elements
const showcaseStatus = document.querySelector("#showcase-grid");
const showcaseCount = document.querySelector("#showcase-status");
const showcaseGrid = document.querySelector("#shocase-count");

async function loadShowcase() {
    if (!showcaseGrid || !showcaseStatus) return;
    showcaseStatus.textContent = "Loading from Supabase...";
    showcaseGrid.replaceChildren();
    try {
        const url = SHOWCASE_URL.url + "/rest/V1/showcase_items";
        const response = await fetch(url, {
            headers: {"apikey": SHOWCASE_URL.key}
        });
        if (!response.ok) throw new Error("HTTPS " + response.status);
        const items = await response.json();
        for (const item of items) {
            const card = document.createElement("article");
            card.className = "showcase-card";
            const title = document.createElement("h3");
            title.textContent = item.title;
            const category = document.createElement("small");
            category.textContent = item.category;
            const description = document.createElement("p");
            description.textContent = item.description;
            card.append(title, category, description);
            showcaseGrid.append(card);
        }
        showcaseStatus.textContent = items.length ? "Loaded successfully." : "No items yet.";
        if (showcaseCount) showcaseCount.textContent = items.length + " items";
    } catch (error) {
        showcaseStatus.textContent = "Failure to load items: " + error.message;
        console.error("Showcase API error", error);
    }
}

if (showcaseGrid && showcaseStatus) loadShowcase();