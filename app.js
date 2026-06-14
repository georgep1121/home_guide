let DATA = null;

const state = {
  category: null,
  post: null
};

async function init() {
  const res = await fetch("./data.json");
  DATA = await res.json();

  renderMenu();
  showCategory(DATA.categories[0]);
}

function renderMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  DATA.categories.forEach((c, i) => {
    const el = document.createElement("span");
    el.textContent = c.title;
    el.style.cursor = "pointer";

    el.onclick = () => showCategory(c);

    menu.appendChild(el);

    if (i < DATA.categories.length - 1) {
      menu.appendChild(document.createTextNode(" | "));
    }
  });
}

function showCategory(cat) {
  state.category = cat;
  state.post = null;

  const app = document.getElementById("app");
  app.innerHTML = "";

  const h = document.createElement("h2");
  h.textContent = cat.title;
  app.appendChild(h);

  if (!cat.posts.length) {
    const empty = document.createElement("p");
    empty.textContent = "No posts";
    app.appendChild(empty);
    return;
  }

  cat.posts.forEach((p) => {
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
  back.onclick = () => showCategory(state.category);

  app.appendChild(h);
  app.appendChild(p);
  app.appendChild(back);
}

init();
