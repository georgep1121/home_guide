// Load data and build UI

async function loadApp() {
  const res = await fetch("./data.json");
  const data = await res.json();

  renderCategories(data.categories);
}

function renderCategories(categories) {
  const app = document.getElementById("app");

  categories.forEach(category => {
    const catDiv = document.createElement("div");
    catDiv.style.marginBottom = "20px";

    const title = document.createElement("h2");
    title.textContent = category.name;

    catDiv.appendChild(title);

    const list = document.createElement("ul");

    category.posts.forEach(post => {
      const li = document.createElement("li");

      li.textContent = post.title;

      li.style.cursor = "pointer";
      li.style.color = "blue";

      li.onclick = () => {
        renderPost(post);
      };

      list.appendChild(li);
    });

    catDiv.appendChild(list);
    app.appendChild(catDiv);
  });
}

function renderPost(post) {
  const app = document.getElementById("app");

  app.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = post.title;

  const content = document.createElement("p");
  content.textContent = post.content;

  app.appendChild(title);
  app.appendChild(content);

  // Links
  if (post.links) {
    post.links.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.label;
      a.target = "_blank";
      a.style.display = "block";
      a.style.marginTop = "10px";
      app.appendChild(a);
    });
  }

  // Back button
  const back = document.createElement("button");
  back.textContent = "← Back";

  back.onclick = () => {
    app.innerHTML = "";
    loadApp();
  };

  app.appendChild(back);
}

// Start app
loadApp();
