const categoriesEl = document.getElementById("categories");
const postsEl = document.getElementById("posts");

let allPosts = [];
let activeCategory = "Ολα";

/* FORMAT RULE:
- κάθε λέξη κεφαλαίο πρώτο γράμμα
- "?" -> "|"
*/
function formatText(text) {
  if (!text) return "";

  return text
    .replace(/\?/g, "|")
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/* RENDER CATEGORIES */
function renderCategories(categories) {
  categoriesEl.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "category-btn";
  allBtn.textContent = "Ολα";
  allBtn.onclick = () => {
    activeCategory = "Ολα";
    renderPosts();
  };
  categoriesEl.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = formatText(cat);

    btn.onclick = () => {
      activeCategory = cat;
      renderPosts();
    };

    categoriesEl.appendChild(btn);
  });
}

/* RENDER POSTS */
function renderPosts() {
  postsEl.innerHTML = "";

  const filtered = activeCategory === "Ολα"
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory);

  filtered.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <h2>${formatText(post.title)}</h2>
      <p>${formatText(post.content)}</p>
    `;

    postsEl.appendChild(div);
  });
}

/* LOAD DATA */
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    allPosts = data.posts;

    const categories = [...new Set(allPosts.map(p => p.category))];

    renderCategories(categories);
    renderPosts();
  });
