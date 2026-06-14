const categoriesEl = document.getElementById("categories");
const appEl = document.getElementById("app");

let data = null;
let activeCategory = null;
let activePost = null;

/* Render categories (fixed order) */
function renderCategories() {
  categoriesEl.innerHTML = "";

  data.categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = cat.name;

    btn.onclick = () => {
      activeCategory = cat;
      activePost = null;
      render();
    };

    categoriesEl.appendChild(btn);
  });
}

/* Render list of posts in category */
function renderCategoryView() {
  appEl.innerHTML = "";

  activeCategory.posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `<h2>${post.title}</h2>`;

    div.onclick = () => {
      activePost = post;
      render();
    };

    appEl.appendChild(div);
  });
}

/* Render single post */
function renderPostView() {
  appEl.innerHTML = "";

  const div = document.createElement("div");
  div.className = "post-view";

  div.innerHTML = `
    <h2>${activePost.title}</h2>
    <p>${activePost.content}</p>
  `;

  const back = document.createElement("button");
  back.className = "back-btn";
  back.textContent = "Back";

  back.onclick = () => {
    activePost = null;
    render();
  };

  div.appendChild(back);
  appEl.appendChild(div);
}

/* Main render */
function render() {
  if (!activeCategory) {
    activeCategory = data.categories[0];
  }

  renderCategories();

  if (activePost) {
    renderPostView();
  } else {
    renderCategoryView();
  }
}

/* Load data */
fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });
