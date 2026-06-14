const appEl = document.getElementById("app");
const searchEl = document.getElementById("search");

let ενεργόΠοστ = null;
let θέσηScroll = 0;
let query = "";

/* ΔΕΔΟΜΕΝΑ */
const ποστ = [
  // ΠΕΡΙΒΑΛΛΩΝ ΧΩΡΟΣ
  { τίτλος: "Κύρια Είσοδος", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Εμπρός Αυλή", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Πίσω Αυλή", περιεχόμενο: "Lorem ipsum dolor sit amet..." },

  // ΚΑΤΩ ΕΠΙΠΕΔΟ
  { τίτλος: "Ισόγεια Κεραμοσκεπή", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Πίσω Σκάλα", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Είσοδος & Χώλ", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Καθιστικό", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Κουζίνα", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Αποθήκη Κουζίνας", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Μπάνιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },

  // ΕΣΩΤΕΡΙΚΗ ΣΚΑΛΑ
  { τίτλος: "Εσωτερική Σκάλα", περιεχόμενο: "Lorem ipsum dolor sit amet..." },

  // ΕΠΑΝΩ ΕΠΙΠΕΔΟ
  { τίτλος: "Επάνω Χώλ", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Ηλεκτρικός Πίνακας", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Κύριο Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Δεύτερο Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Μπάνιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Πίνακας Καλοριφέρ", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Καθιστικό", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Εμπρός Είσοδος", περιεχόμενο: "Lorem ipsum dolor sit amet..." },

  // ΥΠΟΔΟΜΕΣ
  { τίτλος: "Αποχέτευση & Λύματα", περιεχόμενο: "Lorem ipsum dolor sit amet..." }
];

/* SEARCH FILTER */
function φιλτραρισμένα() {
  return ποστ.filter(p =>
    p.τίτλος.toLowerCase().includes(query.toLowerCase())
  );
}

/* LIST VIEW */
function εμφάνισεΛίστα() {
  appEl.innerHTML = "";

  const λίστα = φιλτραρισμένα();

  const sections = {
    "ΠΕΡΙΒΑΛΛΩΝ ΧΩΡΟΣ": [],
    "ΚΑΤΩ ΕΠΙΠΕΔΟ": [],
    "ΕΣΩΤΕΡΙΚΑ": [],
    "ΕΠΑΝΩ ΕΠΙΠΕΔΟ": [],
    "ΥΠΟΔΟΜΕΣ": []
  };

  λίστα.forEach(p => {
    if (["Κύρια Είσοδος","Εμπρός Αυλή","Πίσω Αυλή"].includes(p.τίτλος)) {
      sections["ΠΕΡΙΒΑΛΛΩΝ ΧΩΡΟΣ"].push(p);
    }
    else if (p.τίτλος.includes("Κάτω") || p.τίτλος.includes("Ισόγεια")) {
      sections["ΚΑΤΩ ΕΠΙΠΕΔΟ"].push(p);
    }
    else if (p.τίτλος === "Εσωτερική Σκάλα") {
      sections["ΕΣΩΤΕΡΙΚΑ"].push(p);
    }
    else if (p.τίτλος.includes("Επάνω")) {
      sections["ΕΠΑΝΩ ΕΠΙΠΕΔΟ"].push(p);
    }
    else {
      sections["ΥΠΟΔΟΜΕΣ"].push(p);
    }
  });

  Object.entries(sections).forEach(([title, items]) => {
    if (items.length === 0) return;

    const h = document.createElement("div");
    h.className = "section-title";
    h.textContent = title;
    appEl.appendChild(h);

    items.forEach(post => {
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
  });

  requestAnimationFrame(() => {
    window.scrollTo(0, θέσηScroll);
  });
}

/* POST VIEW */
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

/* SEARCH INPUT */
searchEl.addEventListener("input", (e) => {
  query = e.target.value;
  if (!ενεργόΠοστ) render();
});

render();
