const appEl = document.getElementById("app");

let ενεργόΠοστ = null;
let θέσηScroll = 0;

/* ΔΕΔΟΜΕΝΑ */
const ποστ = [
  // ΠΕΡΙΒΑΛΛΩΝ ΧΩΡΟΣ
  { τίτλος: "Κύρια Είσοδος", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Εμπρός Αυλή", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Μετρητής ΔΕΔΔΗΕ", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κεντρικός Ηλεκτρικός Πίνακας", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Αναμονή Φορτιστή EV 230/400V", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Μετρητής ΔΕΥΑΘ", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Λεβητοστάσιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Σκέπαστρο Αυτοκινήτου", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Φορτιστής EV 230V", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Εξωτερική Τραπεζαρία", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Εξωτερική Κουζίνα", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Εξωτερική Αποθήκη", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Δημοτικοί Κάδοι Αποκομιδής", περιεχόμενο: "Lorem ipsum dolor sit amet..." },

  // ΚΑΤΩ ΕΠΙΠΕΔΟ (ΕΣΩΤΕΡΙΚΗ ΣΚΑΛΑ ΕΔΩ ΤΕΛΟΣ)
  { τίτλος: "Πίσω Αυλή", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Ισόγεια Κεραμοσκεπή", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Πίσω Σκάλα", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Είσοδος & Χώλ", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Καθιστικό", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Κλιματισμός", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Access Point", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Θερμοστάτης", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Κουζίνα", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Αποθήκη Κουζίνας", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κάτω Μπάνιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Εσωτερική Σκάλα", περιεχόμενο: "Lorem ipsum dolor sit amet..." },

  // ΕΠΑΝΩ ΕΠΙΠΕΔΟ
  { τίτλος: "Επάνω Χώλ", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Ηλεκτρικός Πίνακας", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Κύριο Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Μπαλκόνι Κύριου Δωματίου", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Δεύτερο Δωμάτιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Κλιματισμός Δωματίων", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Μπάνιο", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Πίνακας Καλοριφέρ", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Καθιστικό", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Κλιματισμός", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Θερμοστάτης", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "LAN Gateway", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Κουζίνα", περιεχόμενο: "Lorem ipsum dolor sit amet..." },
  { τίτλος: "Επάνω Εμπρός Είσοδος", περιεχόμενο: "Lorem ipsum dolor sit amet..." }
];

/* LIST */
function εμφάνισεΛίστα() {
  appEl.innerHTML = "";

  const sections = {
    "ΠΕΡΙΒΑΛΛΩΝ ΧΩΡΟΣ": [],
    "ΚΑΤΩ ΕΠΙΠΕΔΟ": [],
    "ΕΠΑΝΩ ΕΠΙΠΕΔΟ": []
  };

  ποστ.forEach(p => {
    if ([
      "Κύρια Είσοδος","Εμπρός Αυλή","Μετρητής ΔΕΔΔΗΕ",
      "Κεντρικός Ηλεκτρικός Πίνακας","Αναμονή Φορτιστή EV 230/400V",
      "Μετρητής ΔΕΥΑΘ","Λεβητοστάσιο","Σκέπαστρο Αυτοκινήτου",
      "Φορτιστής EV 230V","Εξωτερική Τραπεζαρία","Εξωτερική Κουζίνα",
      "Εξωτερική Αποθήκη","Δημοτικοί Κάδοι Αποκομιδής"
    ].includes(p.τίτλος)) {
      sections["ΠΕΡΙΒΑΛΛΩΝ ΧΩΡΟΣ"].push(p);
    }
    else if (p.τίτλος.includes("Κάτω") || p.τίτλος.includes("Ισόγεια")) {
      sections["ΚΑΤΩ ΕΠΙΠΕΔΟ"].push(p);
    }
    else {
      sections["ΕΠΑΝΩ ΕΠΙΠΕΔΟ"].push(p);
    }
  });

  Object.entries(sections).forEach(([title, items]) => {
    if (!items.length) return;

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

/* POST */
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
  if (ενεργόΠοστ) εμφάνισεΠοστ();
  else εμφάνισεΛίστα();
}

render();
