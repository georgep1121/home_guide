const appEl = document.getElementById("app");

let ενεργόΠοστ = null;
let θέσηScroll = 0;

/* ΔΕΔΟΜΕΝΑ */
const ποστ = [
  { τίτλος: "Κύρια Είσοδος", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Περιγραφή κύριας εισόδου και λειτουργίας." },
  { τίτλος: "Μπροστινή Αυλή", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Διάταξη και σχεδιασμός μπροστινής αυλής." },
  { τίτλος: "Πίσω Αυλή", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Χρήση και οργάνωση πίσω αυλής." },
  { τίτλος: "Πίσω Βεράντα", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Σχεδιασμός εξωτερικού καθιστικού χώρου." },
  { τίτλος: "Κάτω Πίσω Είσοδος", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ροή πρόσβασης στο κάτω επίπεδο." },
  { τίτλος: "Κάτω Σαλόνι", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Διάταξη και λειτουργία σαλονιού." },
  { τίτλος: "Εσωτερική Σκάλα", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Κατακόρυφη σύνδεση ορόφων." },
  { τίτλος: "Άνω Διάδρομος", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Κυκλοφορία στον άνω όροφο." },
  { τίτλος: "Κύρια Κρεβατοκάμαρα", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Άνεση και διάταξη χώρου ύπνου." },
  { τίτλος: "Άνω Σαλόνι", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Χώρος χαλάρωσης στον άνω όροφο." },
  { τίτλος: "Μπροστινή Είσοδος Ορόφου", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Πρόσβαση και αρχιτεκτονική ορόφου." },
  { τίτλος: "Αποχέτευση & Λύματα", περιεχόμενο: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Υποδομές αποχέτευσης και διαχείρισης υδάτων." }
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

  /* επαναφορά scroll */
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
