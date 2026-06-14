const categoriesEl = document.getElementById("categories");
const appEl = document.getElementById("app");

let data = null;
let activeCategory = "All";
let activePost = null;

/* RENDER CATEGORIES */
function renderCategories() {
  categoriesEl.innerHTML = "";

  // ALL button first
  const allBtn = document.createElement("button");
  allBtn.className = "category-btn" + (activeCategory === "All" ? " active" : "");
  allBtn.textContent = "All";

  allBtn.onclick = () => {
    activeCategory = "All";
    activePost = null;
    render();
  };

  categoriesEl.appendChild(allBtn);

  // other categories in fixed order
  data.categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn" + (activeCategory === cat.name ? " active" : "");
    btn.textContent = cat.name;

    btn.onclick = () => {
      activeCategory = cat.name;
      activePost = null;
      render();
    };

    categoriesEl.appendChild(btn);
  });
}

/* GET POSTS BASED ON CATEGORY */
function getPosts() {
  if (activeCategory === "All") {
    return data.categories.flatMap(cat => cat.posts);
  }

  const category = data.categories.find(c => c.name === activeCategory);
  return category ? category.posts : [];
}

/* RENDER LIST VIEW */
function renderListView() {
  appEl.innerHTML = "";

  const posts = getPosts();

  posts.forEach(post => {
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

/* RENDER POST VIEW */
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

/* MAIN RENDER */
function render() {
  renderCategories();

  if (activePost) {
    renderPostView();
  } else {
    renderListView();
  }
}

/* LOAD DATA */
fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });
