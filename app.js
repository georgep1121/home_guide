const appEl = document.getElementById("app");

let activePost = null;
let scrollPosition = 0;

/* DATA */
const posts = [
  { title: "Κύρια Είσοδος", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Main entrance overview and layout." },
  { title: "Εμπρός Αυλή", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Front yard design and structure." },
  { title: "Πίσω Αυλή", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rear yard planning and usage." },
  { title: "Ισόγεια Κεραμοσκεπή", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rear patio functional space design." },
  { title: "Πίσω Κάτω Σκάλα", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lower rear access and circulation." },
  { title: "Κάτω Καθιστικό", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lower level living room arrangement." },
  { title: "Εσωτερική Σκάλα", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Staircase flow and vertical connection." },
  { title: "Επάνω Χώλ", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Upper hall circulation space." },
  { title: "Επάνω Κύριο Υπνοδωμάτιο", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Master bedroom layout and comfort." },
  { title: "Επάνω Καθιστικό", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Upper living area design concept." },
  { title: "Επάνω Εμπρός Είσοδος", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Upper front access point design." },
  { title: "Διαχείριση Απορριμάτων", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Wastewater and sewage infrastructure system." }
];

/* LIST VIEW */
function renderList() {
  appEl.innerHTML = "";

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `<h2>${post.title}</h2>`;

    div.onclick = () => {
      scrollPosition = window.scrollY;
      activePost = post;
      render();
    };

    appEl.appendChild(div);
  });

  /* restore scroll position */
  requestAnimationFrame(() => {
    window.scrollTo(0, scrollPosition);
  });
}

/* POST VIEW */
function renderPost() {
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

  window.scrollTo(0, 0);
}

/* MAIN RENDER */
function render() {
  if (activePost) {
    renderPost();
  } else {
    renderList();
  }
}

render();
