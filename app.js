const MENU_ITEMS = [
  "Overview",
  "Grounds",
  "Lower Level",
  "Upper Level",
  "Outbuildings",
  "Infrastructure"
];

let DATA = null;

const state = {
  category: null,
  post: null
};

async function init() {
  const res = await fetch("./data.json");
  DATA = await res.json();

  renderMenu();
  showCategoryByTitle("Overview");
}

function renderMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  MENU_ITEMS.forEach((title, i) => {
    const el = document.createElement("span");
    el.textContent = title;
    el.style.cursor = "pointer";

    el.onclick = () => showCategoryByTitle(title);

    menu.appendChild(el);

    if (i < MENU_ITEMS.length - 1) {
      menu.appendChild(document.createTextNode(" | "));
    }
  });
}

function showCategoryByTitle(title) {
  const cat = DATA.categories.find(c => c.title === title);

  const app = document.getElementById("app");
  app.innerHTML = "";

  if (!cat) {
    state.category = null;
    state.post = null;

    app.innerHTML = `
      <h2>${title}</h2>
      <p>No data found</p>
    `;
    return;
  }

  state.category = cat;
  state.post = null;

  const h = document.createElement("h2");
  h.textContent = cat.title;
  app.appendChild(h);

  if (!cat.posts || cat.posts.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No content";
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
  state.post = post;

  const app = document.getElementById("app");
  app.innerHTML = "";

  const h = document.createElement("h1");
  h.textContent = post.title;

  const p = document.createElement("p");
  p.textContent = post.content;

  const back = document.createElement("button");
  back.textContent = "Back";
  back.onclick = () => showCategoryByTitle(state.category?.title || "Overview");

  app.appendChild(h);
  app.appendChild(p);
  app.appendChild(back);
}

init();
