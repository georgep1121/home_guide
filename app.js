let DATA;

const MENU_ITEMS = [
  "overview",
  "grounds",
  "lower-level",
  "upper-level",
  "outbuildings",
  "infrastructure"
];

const state = {
  category: null,
  post: null
};

async function init() {
  const res = await fetch("./data.json");
  DATA = await res.json();

  renderMenu();
  showCategoryById("overview");
}

function renderMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  MENU_ITEMS.forEach((id, i) => {
    const cat = DATA.categories.find(c => c.id === id);

    const el = document.createElement("span");
    el.textContent = cat ? cat.title : id;
    el.style.cursor = "pointer";

    el.onclick = () => showCategoryById(id);

    menu.appendChild(el);

    if (i < MENU_ITEMS.length - 1) {
      menu.appendChild(document.createTextNode(" | "));
    }
  });
}

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

function showPost(post) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const h = document.createElement("h1");
  h.textContent = post.title;

  const p = document.createElement("p");
  p.textContent = post.content || "";

  const back = document.createElement("button");
  back.textContent = "Back";
  back.onclick = () => showCategoryById(state.category.id);

  app.appendChild(h);
  app.appendChild(p);
  app.appendChild(back);
}

init();
