let DATA;

async function init() {
  const res = await fetch("./data.json?cache=" + Date.now());
  DATA = await res.json();

  renderMenu();
  showCategory(DATA.categories[0]);
}

function renderMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  DATA.categories.forEach((c, i) => {
    const span = document.createElement("span");
    span.textContent = c.title;
    span.style.cursor = "pointer";

    span.onclick = () => showCategory(c);

    menu.appendChild(span);

    if (i < DATA.categories.length - 1) {
      menu.appendChild(document.createTextNode(" | "));
    }
  });
}

function showCategory(cat) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const h = document.createElement("h2");
  h.textContent = cat.title;
  app.appendChild(h);

  cat.posts.forEach(p => {
    const div = document.createElement("div");
    div.textContent = p.title;
    div.style.color = "blue";
    div.style.cursor = "pointer";

    div.onclick = () => showPost(p, cat);

    app.appendChild(div);
  });
}

function showPost(post, cat) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  app.innerHTML = `
    <h1>${post.title}</h1>
    <p>${post.content}</p>
    <button onclick="location.reload()">Back</button>
  `;
}

init();
