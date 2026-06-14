const appEl = document.getElementById("app");

let ενεργόΠοστ = null;
let θέσηScroll = 0;

/* ΔΕΔΟΜΕΝΑ */
const ποστ = [
  { τίτλος: "Κύρια Είσοδος", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Εμπρός Αυλή", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Πίσω Αυλή", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Ισόγεια Κεραμοσκεπή", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Κάτω Πίσω Σκάλα", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Κάτω Είσοδος & Χώλ", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Κάτω Καθιστικό", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Κάτω Κουζίνα", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Αποθήκη Κουζίνας", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Κάτω Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Κάτω Μπάνιο", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Εσωτερική Σκάλα", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Επάνω Χώλ", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Επάνω Ηλεκτρικός Πίνακας", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Επάνω Κύριο Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.." },
  { τίτλος: "Επάνω Δεύτερο Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Επάνω Μπάνιο", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Επάνω Πίνακας Καλοριφέρ", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Επάνω Καθιστικό", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Επάνω Εμπρός Είσοδος", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { τίτλος: "Αποχέτευση & Λύματα", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
];

/* ΛΙΣΤΑ */
function εμφάνισεΛίστα() {
  appEl.innerHTML = "";

  ποστ.forEach((post) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `<h2>${post.τίτλος}</h2>`;

    div.onclick = () => {
      θέσηScroll = window.scrollY;
      ενεργόΠοστ = post;
      render();
    };

    appEl.appendChild(div);
  });

  /* restore scroll */
  requestAnimationFrame(() => {
    window.scrollTo(0, θέσηScroll);
  });
}

/* ΠΟΛΥ ΣΕΛΙΔΑ */
function εμφάνισεΠοστ() {
  appEl.innerHTML = "";

  const div = document.createElement("div");
  div.className = "post-view";

  div.innerHTML = `
    <h2>${ενεργόΠοστ.τίτλος}</h2>
    <p>${ενεργόΠοστ.περιεχόμενο}</p>
  `;

  const πίσω = document.createElement("button");
  πίσω.className = "back-btn";
  πίσω.textContent = "Πίσω";

  πίσω.onclick = () => {
    ενεργόΠοστ = null;
    render();
  };

  div.appendChild(πίσω);
  appEl.appendChild(div);

  window.scrollTo(0, 0);
}

/* RENDER */
function render() {
  if (ενεργόΠοστ) {
    εμφάνισεΠοστ();
  } else {
    εμφάνισεΛίστα();
  }
}

render();
