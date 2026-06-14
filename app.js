function showCategoryById(id) {
  const cat = DATA.categories.find(c => c.id === id);

  const app = document.getElementById("app");
  app.innerHTML = "";

  if (!cat) {
    app.innerHTML = `<h2>${id}</h2><p>No category found</p>`;
    return;
  }

  state.category = cat;
  state.post = null;

  const h = document.createElement("h2");
  h.textContent = cat.title;
  app.appendChild(h);

  // ✅ CATEGORY DESCRIPTION ADDED
  if (cat.description && cat.description.trim() !== "") {
    const desc = document.createElement("p");
    desc.textContent = cat.description;
    desc.style.opacity = "0.8";
    desc.style.marginBottom = "15px";
    app.appendChild(desc);
  }

  if (!cat.posts || cat.posts.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No posts";
    app.appendChild(empty);
    return;
  }

  cat.posts.forEach(p => {
    const div = document.createElement("div");
    div.textContent = p.title;
    div.style.cursor = "pointer";

    div.onclick = () => showPost(p);

    app.appendChild(div);
  });
}
