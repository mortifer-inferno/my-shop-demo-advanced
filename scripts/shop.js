// ---------- loading screen ----------
// Turned on by the small script in <head> (first visit only). Waits for the page
// to finish loading but never shows for less than MIN_MS or more than MAX_MS,
// then swings the doors open and removes itself.
(function () {
  const preloader = document.getElementById("preloader");
  const root = document.documentElement;
  if (!preloader || !root.classList.contains("preload")) return;

  const MIN_MS = 2300; // long enough for the monogram to finish drawing
  const MAX_MS = 4500; // never make anyone wait longer than this
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    preloader.classList.add("is-leaving");
    root.classList.add("site-revealed"); // lets the logo letters drop in as the doors open
    setTimeout(() => {
      root.classList.remove("preload");
      preloader.remove();
      try {
        sessionStorage.setItem("preloaded", "1");
      } catch (e) {}
    }, 2000);
  }

  function whenReady() {
    // performance.now() counts from the start of navigation
    setTimeout(finish, Math.max(0, MIN_MS - performance.now()));
  }

  if (document.readyState === "complete") whenReady();
  else window.addEventListener("load", whenReady, { once: true });

  setTimeout(finish, MAX_MS);
})();

// ---------- secondary loading bar (every refresh after the first) ----------
(function () {
  const bar = document.getElementById("secondaryLoader");
  const mark = document.getElementById("secondaryMark");
  const root = document.documentElement;
  if (!bar || !root.classList.contains("preload-secondary")) return;

  setTimeout(() => {
    bar.classList.add("is-done");
    setTimeout(() => {
      root.classList.remove("preload-secondary");
      bar.remove();
      if (mark) mark.remove();
    }, 300);
  }, 700);
})();

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ---------- logo: split into letters so they can animate one by one ----------
(function () {
  const logo = document.querySelector(".logo-container a");
  if (!logo) return;
  const text = logo.textContent.trim();
  const chars = [...text];
  logo.setAttribute("aria-label", text);
  logo.style.setProperty("--n", chars.length);
  logo.textContent = "";
  chars.forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "logo-letter";
    span.setAttribute("aria-hidden", "true");
    span.style.setProperty("--i", i);
    span.textContent = ch === " " ? "\u00A0" : ch;
    logo.appendChild(span);
  });

  // clicking the mark takes you back to the top, like the wordmark does
  const mark = document.getElementById("logoMark");
  if (mark) {
    mark.addEventListener("click", () =>
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      })
    );
  }
})();

const products = [
  {
    id: "p1",
    name: "boat music headphones",
    image: "../images/product1.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 3,
    colors: [
      { name: "Charcoal", hex: "#2B2B2B" },
      { name: "Ivory", hex: "#EDE6D6" },
    ],
    sizes: ["One Size"],
  },
  {
    id: "p2",
    name: "athletic wear t-shirt",
    image: "../images/product2.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 2,
    colors: [
      { name: "Forest Green", hex: "#2F4A3D" },
      { name: "Sand", hex: "#C7B89A" },
      { name: "Black", hex: "#1F1B16" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p3",
    name: "athletic wear shirt",
    image: "../images/product3.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 4,
    colors: [
      { name: "Burgundy", hex: "#6B2C2C" },
      { name: "Navy", hex: "#10203D" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p4",
    name: "athletic socks",
    image: "../images/product4.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 2,
    colors: [
      { name: "Charcoal", hex: "#2B2B2B" },
      { name: "White", hex: "#F4EFE3" },
    ],
    sizes: ["One Size"],
  },
  {
    id: "p5",
    name: "athletic wear t-shirt",
    image: "../images/product5.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 3,
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Black", hex: "#1F1B16" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p6",
    name: "athletic wear t-shirt",
    image: "../images/product6.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 5,
    colors: [
      { name: "Slate", hex: "#4A5568" },
      { name: "Cream", hex: "#EDE6D6" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p7",
    name: "athletic wear shoes",
    image: "../images/product1.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 6,
    colors: [
      { name: "Steel Blue", hex: "#3E5C76" },
      { name: "Grey", hex: "#6E5D49" },
    ],
    sizes: ["7", "8", "9", "10", "11"],
  },
  {
    id: "p8",
    name: "running shoes",
    image: "../images/product3.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 4,
    colors: [
      { name: "Black", hex: "#1F1B16" },
      { name: "White", hex: "#F4EFE3" },
    ],
    sizes: ["7", "8", "9", "10", "11"],
  },
  {
    id: "p9",
    name: "athletic shirt",
    image: "../images/product4.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 3,
    colors: [
      { name: "Maroon", hex: "#6B2C2C" },
      { name: "Navy", hex: "#10203D" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p10",
    name: "athletic wear shoes",
    image: "../images/product6.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 5,
    colors: [
      { name: "Taupe", hex: "#B08A45" },
      { name: "Charcoal", hex: "#2B2B2B" },
    ],
    sizes: ["7", "8", "9", "10", "11"],
  },
  {
    id: "p11",
    name: "leather tote bag",
    image: "../images/product2.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 4,
    colors: [
      { name: "Cognac Brown", hex: "#7B4B2A" },
      { name: "Black", hex: "#1F1B16" },
    ],
    sizes: ["One Size"],
  },
  {
    id: "p12",
    name: "formal shoes",
    image: "../images/product3.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 6,
    colors: [
      { name: "Black", hex: "#1F1B16" },
      { name: "Brown", hex: "#5C3A21" },
    ],
    sizes: ["7", "8", "9", "10", "11"],
  },
  {
    id: "p13",
    name: "noise cancelling headphones",
    image: "../images/product1.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 3,
    colors: [
      { name: "Charcoal", hex: "#2B2B2B" },
      { name: "Champagne Gold", hex: "#C9A227" },
    ],
    sizes: ["One Size"],
  },

  // ---- newer pieces ----
  // To use a real photo, replace the `image` value with a full URL you have
  // the rights to use, e.g. "https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=800&q=80"
  {
    id: "p14",
    name: "linen shirt",
    image: "../images/product2.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 3,
    colors: [
      { name: "Oat", hex: "#D9CDB4" },
      { name: "Sage", hex: "#8A9A7B" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p15",
    name: "wool scarf",
    image: "../images/product4.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 4,
    colors: [
      { name: "Camel", hex: "#B08A45" },
      { name: "Navy", hex: "#10203D" },
    ],
    sizes: ["One Size"],
  },
  {
    id: "p16",
    name: "leather belt",
    image: "../images/product5.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 3,
    colors: [
      { name: "Brown", hex: "#5C3A21" },
      { name: "Black", hex: "#1F1B16" },
    ],
    sizes: ["S", "M", "L"],
  },
  {
    id: "p17",
    name: "canvas sneakers",
    image: "../images/product3.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 5,
    colors: [
      { name: "Off White", hex: "#EDE6D6" },
      { name: "Forest Green", hex: "#2F4A3D" },
    ],
    sizes: ["7", "8", "9", "10", "11"],
  },
  {
    id: "p18",
    name: "slim leather wallet",
    image: "../images/product6.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 2,
    colors: [
      { name: "Cognac Brown", hex: "#7B4B2A" },
      { name: "Black", hex: "#1F1B16" },
    ],
    sizes: ["One Size"],
  },
  {
    id: "p19",
    name: "classic sunglasses",
    image: "../images/product1.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 3,
    colors: [
      { name: "Tortoise", hex: "#6B4A2B" },
      { name: "Black", hex: "#1F1B16" },
    ],
    sizes: ["One Size"],
  },
  {
    id: "p20",
    name: "everyday backpack",
    image: "../images/product2.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 4,
    colors: [
      { name: "Slate", hex: "#4A5568" },
      { name: "Olive", hex: "#556B2F" },
    ],
    sizes: ["One Size"],
  },
  {
    id: "p21",
    name: "minimal wrist watch",
    image: "../images/product4.png",
    ratingCount: 4.5,
    pricePaise: 1096,
    deliveryDays: 6,
    colors: [
      { name: "Champagne Gold", hex: "#C9A227" },
      { name: "Charcoal", hex: "#2B2B2B" },
    ],
    sizes: ["One Size"],
  },
];

function getDeliveryDate(days) {
  if (typeof dayjs === "function") {
    return dayjs().add(days, "day").format("ddd, D MMM");
  }
  // dayjs failed to load (e.g. CDN blocked) — fall back so the rest of the
  // page still renders instead of the whole script throwing.
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
        <div class="items" data-product-id="${
          product.id
        }" tabindex="0" role="button" aria-label="View details for ${
    product.name
  }">
          <div class="image-container">
              <img src="${product.image}">
              <div class="card-image-tint"></div>
          </div>
          <div class="product-details-container">
              <h1>${product.name}</h1>
              <h2>₹${(product.pricePaise / 100).toFixed(2)}</h2>
              <p class="delivery-info">Delivery by ${getDeliveryDate(
                product.deliveryDays
              )}</p>
              <div class="card-swatches" data-product-id="${product.id}">
                ${product.colors
                  .map(
                    (c, i) =>
                      `<button type="button" class="card-swatch${
                        i === 0 ? " active" : ""
                      }" style="background:${c.hex}" data-color="${
                        c.name
                      }" data-hex="${c.hex}" data-original="${
                        i === 0
                      }" aria-label="${c.name}" title="${c.name}"></button>`
                  )
                  .join("")}
              </div>
              <button class="view-details-btn" data-product-id="${
                product.id
              }" type="button">View Details</button>
          </div>
          <button class="add-to-cart-button primary-button" data-product-id="${
            product.id
          }">Add To Cart</button>
        </div>
    `;
});

document.querySelector(".js-items-grid").innerHTML = productsHTML;

// ---------- card color swatches ----------
// The first color is the one actually shown in the photo, so it starts
// untinted; other colors are an approximation until real per-color photos exist.
document.querySelectorAll(".card-swatches").forEach((group) => {
  const card = group.closest(".items");
  const tint = card ? card.querySelector(".card-image-tint") : null;
  const firstSwatch = group.querySelector(".card-swatch");
  if (card && firstSwatch)
    card.dataset.selectedColor = firstSwatch.dataset.color;
  if (tint) tint.style.background = "transparent";

  group.querySelectorAll(".card-swatch").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // don't also open the detail dialog
      group
        .querySelectorAll(".card-swatch")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (card) card.dataset.selectedColor = btn.dataset.color;
      if (tint) {
        tint.style.background =
          btn.dataset.original === "true" ? "transparent" : btn.dataset.hex;
      }
    });
  });
});

// ---------- product card 3D tilt + scroll reveal ----------
const cardEls = document.querySelectorAll(".items");

if (!prefersReducedMotion) {
  const maxTilt = 10;

  cardEls.forEach((card, i) => {
    card.classList.add("items--reveal");
    card.style.setProperty("--reveal-delay", `${(i % 4) * 60}ms`);

    card.addEventListener("mouseenter", () => card.classList.add("is-tilting"));

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(
        -y * maxTilt
      ).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(
        2
      )}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-tilting");
      card.style.transform = "";
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("in-view");
          revealObserver.unobserve(el);
          // once revealed, drop the reveal state (and its delay) so hover is instant
          el.addEventListener("transitionend", function done(e) {
            if (e.target !== el || e.propertyName !== "opacity") return;
            el.removeEventListener("transitionend", done);
            el.classList.remove("items--reveal", "in-view");
            el.style.removeProperty("--reveal-delay");
          });
        }
      });
    },
    { threshold: 0.15 }
  );

  cardEls.forEach((card) => revealObserver.observe(card));
}

// ---------- search ----------
// Live filter over name, colour names and sizes. Every word must match (so
// "black leather" narrows), plurals are forgiven, and a few synonyms are
// understood ("sneakers" also finds "shoes").
const searchSynonyms = {
  sneakers: ["shoes"],
  sneaker: ["shoes"],
  trainers: ["shoes", "sneakers"],
  shoes: ["sneakers"],
  tee: ["t-shirt"],
  tshirt: ["t-shirt"],
  bag: ["backpack"],
  glasses: ["sunglasses"],
  shades: ["sunglasses"],
  earphones: ["headphones"],
  headset: ["headphones"],
};

// quick-search chips; any with no matching product are dropped automatically
const searchSuggestions = [
  "shirt",
  "shoes",
  "leather",
  "black",
  "gold",
  "headphones",
];

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  const searchBar = document.getElementById("searchBar");
  const searchForm = document.getElementById("searchForm");
  const searchClear = document.getElementById("searchClear");
  const searchCount = document.getElementById("searchCount");
  const searchChips = document.getElementById("searchChips");
  const searchEmpty = document.getElementById("searchEmpty");
  const searchEmptyTerm = document.getElementById("searchEmptyTerm");
  const searchEmptyClear = document.getElementById("searchEmptyClear");
  const navSearchBtn = document.getElementById("navSearchBtn");
  const searchSection = document.getElementById("searchSection");

  const escapeHtml = (str) =>
    str.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[c])
    );
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const searchIndex = products.map((product) => {
    const card = document.querySelector(
      `.items[data-product-id="${product.id}"]`
    );
    return {
      product,
      card,
      title: card.querySelector("h1"),
      hay: [
        product.name,
        ...product.colors.map((c) => c.name),
        ...product.sizes,
      ]
        .join(" ")
        .toLowerCase(),
    };
  });

  // one word from the query -> every spelling that should count as a hit
  function alternativesFor(word) {
    const stripped =
      word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;
    return [
      ...new Set([
        word,
        stripped,
        ...(searchSynonyms[word] || []),
        ...(searchSynonyms[stripped] || []),
      ]),
    ];
  }

  function highlight(text, terms) {
    const safe = escapeHtml(text);
    if (!terms.length) return safe;
    const re = new RegExp(`(${terms.map(escapeRegex).join("|")})`, "gi");
    return safe.replace(re, "<mark>$1</mark>");
  }

  function runSearch() {
    const raw = searchInput.value.trim();
    const q = raw.toLowerCase();
    const groups = q ? q.split(/\s+/).map(alternativesFor) : [];
    const terms = [...new Set(groups.flat())].sort(
      (a, b) => b.length - a.length
    );

    let shown = 0;
    let flipIndex = 0;

    searchIndex.forEach((item) => {
      const match = groups.every((alts) =>
        alts.some((a) => item.hay.includes(a))
      );
      const wasHidden = item.card.classList.contains("is-filtered-out");

      item.card.classList.toggle("is-filtered-out", !match);
      item.title.innerHTML = match
        ? highlight(item.product.name, terms)
        : escapeHtml(item.product.name);

      if (!match) return;
      shown++;

      // cards coming back into view flip down, staggered — unless the scroll-in
      // reveal hasn't played for them yet (it will handle them)
      if (
        wasHidden &&
        !prefersReducedMotion &&
        !item.card.classList.contains("items--reveal")
      ) {
        item.card.style.setProperty(
          "--flip-delay",
          `${Math.min(flipIndex++, 8) * 45}ms`
        );
        item.card.classList.remove("flip-in");
        void item.card.offsetWidth; // restart the animation
        item.card.classList.add("flip-in");
        item.card.addEventListener(
          "animationend",
          () => item.card.classList.remove("flip-in"),
          { once: true }
        );
      }
    });

    const total = products.length;
    searchClear.hidden = !raw;
    searchEmpty.hidden = shown !== 0;
    searchEmptyTerm.textContent = raw;
    searchCount.textContent = raw
      ? shown
        ? `${shown} of ${total} pieces for “${raw}”`
        : "No pieces found"
      : `${total} pieces`;

    searchChips.querySelectorAll(".search-chip").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.term === q);
    });
  }

  function setSearch(value, { keepFocus = true } = {}) {
    searchInput.value = value;
    runSearch();
    if (keepFocus) searchInput.focus({ preventScroll: true });
  }

  // chips: only suggest words that actually find something
  searchSuggestions
    .filter((term) => {
      const groups = [alternativesFor(term)];
      return searchIndex.some((item) =>
        groups.every((alts) => alts.some((a) => item.hay.includes(a)))
      );
    })
    .forEach((term) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "search-chip";
      chip.dataset.term = term;
      chip.textContent = term;
      chip.addEventListener("click", () =>
        setSearch(searchInput.value.trim().toLowerCase() === term ? "" : term)
      );
      searchChips.appendChild(chip);
    });

  searchInput.addEventListener("input", runSearch);
  searchClear.addEventListener("click", () => setSearch(""));
  searchEmptyClear.addEventListener("click", () => setSearch(""));

  // Enter jumps down to the results instead of submitting anything
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector(".items-grid-container").scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (searchInput.value) setSearch("");
      else searchInput.blur();
    }
  });

  // "/" focuses the search from anywhere (unless you're typing or a dialog is open)
  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t.closest("input, textarea, select, [contenteditable]")) return;
    if (document.querySelector("dialog[open]")) return;
    e.preventDefault();
    searchInput.focus({ preventScroll: true });
    searchSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  });

  // navbar magnifier: scroll to the search and start typing
  navSearchBtn.addEventListener("click", () => {
    searchInput.focus({ preventScroll: true });
    searchSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  });

  // 3D: the slab tilts toward the pointer
  if (!prefersReducedMotion) {
    const maxTilt = 4;
    searchBar.addEventListener("mouseenter", () =>
      searchBar.classList.add("is-tilting")
    );
    searchBar.addEventListener("mousemove", (e) => {
      const rect = searchBar.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      searchBar.style.setProperty(
        "--rx",
        `${(-y * maxTilt * 2).toFixed(2)}deg`
      );
      searchBar.style.setProperty("--ry", `${(x * maxTilt * 2).toFixed(2)}deg`);
    });
    searchBar.addEventListener("mouseleave", () => {
      searchBar.classList.remove("is-tilting");
      searchBar.style.removeProperty("--rx");
      searchBar.style.removeProperty("--ry");
    });
  }

  runSearch();
}

// ---------- feedback dialog ----------
const dialog = document.getElementById("feedbackDialog");
const dialogAnimMs = prefersReducedMotion ? 0 : 300;

function openFeedbackDialog() {
  const status = document.getElementById("feedbackStatus");
  if (status) status.textContent = "";
  dialog.showModal();
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      dialog.classList.add("is-open");
    })
  );
}

function closeFeedbackDialog() {
  dialog.classList.remove("is-open");
  setTimeout(() => dialog.close(), dialogAnimMs);
}

document
  .getElementById("feedbackDialogBtn")
  .addEventListener("click", openFeedbackDialog);
document
  .getElementById("closeFeedbackBtn")
  .addEventListener("click", closeFeedbackDialog);

// Feedback is emailed to this address through FormSubmit (formsubmit.co).
const FEEDBACK_EMAIL = "mohammed.affanvh@gmail.com";
const feedbackForm = document.getElementById("feedbackForm");
const feedbackStatus = document.getElementById("feedbackStatus");

feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // the hidden spam-trap field is filled in → a bot; pretend it worked
  if (document.getElementById("feedbackHoney").value) {
    closeFeedbackDialog();
    feedbackForm.reset();
    return;
  }

  const submitBtn = feedbackForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  feedbackStatus.textContent = "";
  feedbackStatus.classList.remove("is-error");

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FEEDBACK_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("feedbackEmail").value,
        message: document.getElementById("feedbackMessage").value,
        _subject: "New feedback from Modestia Dux",
        _template: "table",
      }),
    });
    const data = await res.json();
    if (!res.ok || data.success === false || data.success === "false") {
      throw new Error(data.message || "Send failed");
    }

    feedbackStatus.textContent = "Thank you — your feedback has been sent.";
    feedbackForm.reset();
    setTimeout(() => {
      closeFeedbackDialog();
      feedbackStatus.textContent = "";
    }, 1800);
  } catch (err) {
    feedbackStatus.classList.add("is-error");
    feedbackStatus.textContent =
      "Your feedback couldn't be sent. Check your connection and try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Feedback";
  }
});

// ---------- product detail dialog ----------
const productDialog = document.getElementById("productDetailDialog");
const pdMainImage = document.getElementById("pdMainImage");
const pdColorTint = document.getElementById("pdColorTint");
const pdThumbs = document.getElementById("pdThumbs");
const pdName = document.getElementById("pdName");
const pdPrice = document.getElementById("pdPrice");
const pdColors = document.getElementById("pdColors");
const pdSelectedColor = document.getElementById("pdSelectedColor");
const pdSelectedDot = document.getElementById("pdSelectedDot");
const pdSizes = document.getElementById("pdSizes");
const pdSelectedSize = document.getElementById("pdSelectedSize");
const pdDelivery = document.getElementById("pdDelivery");
const pdAddToCart = document.getElementById("pdAddToCart");
const pdNote = document.getElementById("pdNote");

let activeProduct = null;
let activeColor = null;
let activeSize = null;
let activeDelivery = null;
let productCloseTimer = null;

const EXPRESS_FEE_PAISE = 9900;

function formatRupees(paise) {
  return "₹" + (paise / 100).toFixed(2);
}

function getDeliveryOptions(product) {
  return [
    {
      id: "standard",
      label: "Standard Delivery — Free",
      days: product.deliveryDays,
      feePaise: 0,
    },
    {
      id: "express",
      label: `Express Delivery — ₹${EXPRESS_FEE_PAISE / 100}`,
      days: Math.max(1, product.deliveryDays - 2),
      feePaise: EXPRESS_FEE_PAISE,
    },
  ];
}

// Real photos are used when a product defines `images: [url, url, ...]`.
// Otherwise, since there's only one real photo, we synthesize a "Side"
// framing from it (panned + slightly rotated, no zoom) rather than hiding
// the thumbnail strip entirely — clearly still the same photo, just
// reframed, until real multi-angle photography exists.
const FALLBACK_FRAMINGS = [
  { label: "Front", transform: "rotate(0deg)", objectPosition: "50% 50%" },
  { label: "Side", transform: "rotate(-2deg)", objectPosition: "22% 50%" },
];

function getProductFramings(product) {
  if (product.images && product.images.length > 1) {
    return product.images.map((src, i) => ({
      src,
      label: `Photo ${i + 1}`,
      transform: "rotate(0deg)",
      objectPosition: "50% 50%",
    }));
  }
  const src = (product.images && product.images[0]) || product.image;
  return FALLBACK_FRAMINGS.map((f) => ({ ...f, src }));
}

// the button always shows what will actually be charged per item
function updateAddButton() {
  if (!activeProduct || !activeDelivery) return;
  pdAddToCart.textContent = `Add To Cart — ${formatRupees(
    activeProduct.pricePaise + activeDelivery.feePaise
  )}`;
}

function setPressed(group, selector, activeEl) {
  group.querySelectorAll(selector).forEach((el) => {
    const on = el === activeEl;
    el.classList.toggle("active", on);
    el.setAttribute("aria-pressed", String(on));
  });
}

function openProductDetail(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  clearTimeout(productCloseTimer);

  const deliveryOptions = getDeliveryOptions(product);
  activeProduct = product;
  activeColor = product.colors[0].name;
  activeSize = product.sizes.length === 1 ? product.sizes[0] : null;
  activeDelivery = deliveryOptions[0];

  pdName.textContent = product.name;
  pdPrice.textContent = formatRupees(product.pricePaise);

  // ----- gallery -----
  const framings = getProductFramings(product);
  pdMainImage.src = framings[0].src;
  pdMainImage.alt = product.name;
  pdMainImage.style.transform = framings[0].transform;
  pdMainImage.style.objectPosition = framings[0].objectPosition;
  pdThumbs.hidden = framings.length < 2;
  pdThumbs.innerHTML =
    framings.length < 2
      ? ""
      : framings
          .map(
            (f, i) => `
      <button type="button" class="${i === 0 ? "active" : ""}" data-src="${
              f.src
            }" data-transform="${f.transform}" data-object-position="${
              f.objectPosition
            }" aria-label="${f.label} view" aria-pressed="${i === 0}">
        <img src="${f.src}" alt="" style="transform:${
              f.transform
            }; object-position:${f.objectPosition};">
      </button>`
          )
          .join("");

  pdThumbs.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPressed(pdThumbs, "button", btn);
      pdMainImage.src = btn.dataset.src;
      pdMainImage.style.transform = btn.dataset.transform || "rotate(0deg)";
      pdMainImage.style.objectPosition =
        btn.dataset.objectPosition || "50% 50%";
    });
  });

  // ----- colour -----
  // The first color always matches the actual photo, so it gets no tint —
  // tinting is only an approximation for the *other* colors, which have no
  // real photo of their own yet.
  pdColors.innerHTML = product.colors
    .map(
      (color, i) => `
      <button type="button" class="pd-swatch${
        i === 0 ? " active" : ""
      }" style="background:${color.hex}" data-color="${color.name}" data-hex="${
        color.hex
      }" data-original="${i === 0}" aria-label="${color.name}" aria-pressed="${
        i === 0
      }" title="${color.name}"></button>`
    )
    .join("");
  pdSelectedColor.textContent = activeColor;
  pdSelectedDot.style.background = product.colors[0].hex;
  pdColorTint.style.background = "transparent";

  pdColors.querySelectorAll(".pd-swatch").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPressed(pdColors, ".pd-swatch", btn);
      activeColor = btn.dataset.color;
      pdSelectedColor.textContent = activeColor;
      pdSelectedDot.style.background = btn.dataset.hex;
      pdColorTint.style.background =
        btn.dataset.original === "true" ? "transparent" : btn.dataset.hex;
    });
  });

  // ----- size -----
  if (product.sizes.length === 1) {
    pdSizes.innerHTML = "";
    pdSelectedSize.textContent = product.sizes[0];
  } else {
    pdSizes.innerHTML = product.sizes
      .map(
        (size) =>
          `<button type="button" class="pd-size-btn" data-size="${size}" aria-pressed="false">${size}</button>`
      )
      .join("");
    pdSelectedSize.textContent = "Select a size";

    pdSizes.querySelectorAll(".pd-size-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setPressed(pdSizes, ".pd-size-btn", btn);
        activeSize = btn.dataset.size;
        pdSelectedSize.textContent = activeSize;
        pdNote.textContent = "";
      });
    });
  }

  // ----- delivery (a radio group: exactly one is always selected) -----
  pdDelivery.setAttribute("role", "radiogroup");
  pdDelivery.setAttribute("aria-label", "Delivery speed");
  pdDelivery.innerHTML = deliveryOptions
    .map(
      (opt, i) => `
      <li class="delivery-choice${i === 0 ? " active" : ""}" data-id="${
        opt.id
      }" role="radio" aria-checked="${i === 0}" tabindex="0">
        <span>${opt.label}</span><span>${getDeliveryDate(opt.days)}</span>
      </li>`
    )
    .join("");

  pdDelivery.querySelectorAll(".delivery-choice").forEach((li) => {
    li.addEventListener("click", () => {
      pdDelivery.querySelectorAll(".delivery-choice").forEach((l) => {
        l.classList.remove("active");
        l.setAttribute("aria-checked", "false");
      });
      li.classList.add("active");
      li.setAttribute("aria-checked", "true");
      activeDelivery = deliveryOptions.find((o) => o.id === li.dataset.id);
      updateAddButton();
    });
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        li.click();
      }
    });
  });

  pdNote.textContent = "";
  updateAddButton();

  document.body.style.overflow = "hidden"; // stop the page scrolling behind the popup
  productDialog.showModal();
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      productDialog.classList.add("is-open");
    })
  );
}

function closeProductDetail() {
  if (!productDialog.open) return;
  productDialog.classList.remove("is-open");
  clearTimeout(productCloseTimer);
  productCloseTimer = setTimeout(() => productDialog.close(), dialogAnimMs);
}

// always give the page its scroll back, however the popup was closed
productDialog.addEventListener("close", () => {
  document.body.style.overflow = "";
});

// Esc plays the same closing animation as the ✕ button
productDialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeProductDetail();
});

// clicking the dimmed area outside the popup closes it
productDialog.addEventListener("click", (e) => {
  const r = productDialog.getBoundingClientRect();
  const outside =
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom;
  if (outside) closeProductDetail();
});

document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", () => openProductDetail(btn.dataset.productId));
});

// clicking the card itself (not its buttons) also opens the detail dialog
cardEls.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (
      e.target.closest(".add-to-cart-button") ||
      e.target.closest(".view-details-btn")
    ) {
      return;
    }
    openProductDetail(card.dataset.productId);
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProductDetail(card.dataset.productId);
    }
  });
});

document
  .getElementById("closeProductDetailBtn")
  .addEventListener("click", closeProductDetail);

pdAddToCart.addEventListener("click", () => {
  if (!activeProduct) return;
  if (activeProduct.sizes.length > 1 && !activeSize) {
    pdNote.textContent = "Please select a size.";
    const firstSize = pdSizes.querySelector(".pd-size-btn");
    if (firstSize) firstSize.focus();
    return;
  }
  addToCart(
    activeProduct.id,
    activeColor,
    activeSize || activeProduct.sizes[0],
    activeDelivery
  );
  closeProductDetail();
});

// ---------- cart state ----------
// cart is keyed by "productId|color|size|deliveryType" so each colour, size and
// delivery-speed combination is its own line. Express carries a per-item fee.
// { variantKey: { productId, color, size, deliveryType, deliveryDays, feePaise, qty } }
// The cart is saved in the browser (localStorage) so it survives refreshes, closing
// the tab, and coming back later.
const CART_STORAGE_KEY = "modestiaDuxCart_v1";

function variantKey(productId, color, size, deliveryType) {
  return `${productId}|${color}|${size}|${deliveryType}`;
}

// Read the saved cart. Nothing saved is trusted blindly: every line is checked against
// the current product list, and prices / delivery days are rebuilt from it, so old,
// edited or corrupted data can never break the cart or show a wrong total.
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return {};
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return {};

    const restored = {};
    Object.values(saved).forEach((item) => {
      if (!item || typeof item !== "object") return;
      const product = products.find((p) => p.id === item.productId);
      if (!product) return; // product no longer exists
      const color = product.colors.find((c) => c.name === item.color);
      if (!color || !product.sizes.includes(item.size)) return;
      const delivery = getDeliveryOptions(product).find(
        (d) => d.id === item.deliveryType
      );
      if (!delivery) return;
      const qty = Math.min(99, Math.floor(Number(item.qty)));
      if (!(qty > 0)) return;

      restored[variantKey(product.id, color.name, item.size, delivery.id)] = {
        productId: product.id,
        color: color.name,
        size: item.size,
        deliveryType: delivery.id,
        deliveryDays: delivery.days,
        feePaise: delivery.feePaise,
        qty,
      };
    });
    return restored;
  } catch (e) {
    return {}; // storage blocked or data unreadable: start with an empty cart
  }
}

function saveCart() {
  try {
    if (Object.keys(cart).length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }
    const json = JSON.stringify(cart);
    if (localStorage.getItem(CART_STORAGE_KEY) !== json) {
      localStorage.setItem(CART_STORAGE_KEY, json);
    }
  } catch (e) {
    // private mode / storage full: the cart still works for this visit
  }
}

let cart = loadCart();

document.querySelectorAll(".add-to-cart-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const product = products.find((p) => p.id === btn.dataset.productId);
    if (!product) return;
    // quick-add from the grid uses whichever color swatch is selected
    // (defaulting to the first), the default size, and standard delivery
    const card = btn.closest(".items");
    const color =
      (card && card.dataset.selectedColor) || product.colors[0].name;
    addToCart(
      product.id,
      color,
      product.sizes[0],
      getDeliveryOptions(product)[0]
    );
  });
});

function addToCart(productId, color, size, delivery) {
  const key = variantKey(productId, color, size, delivery.id);
  if (cart[key]) {
    cart[key].qty += 1;
  } else {
    cart[key] = {
      productId,
      color,
      size,
      deliveryType: delivery.id,
      deliveryDays: delivery.days,
      feePaise: delivery.feePaise,
      qty: 1,
    };
  }
  renderCart();
}

function changeQty(key, delta) {
  if (!cart[key]) return;
  cart[key].qty += delta;
  if (cart[key].qty <= 0) delete cart[key];
  renderCart();
}

function removeFromCart(key) {
  delete cart[key];
  renderCart();
}

function cartTotalPaise() {
  return Object.values(cart).reduce((sum, entry) => {
    const product = products.find((p) => p.id === entry.productId);
    return sum + (product.pricePaise + entry.feePaise) * entry.qty;
  }, 0);
}

function cartMaxDeliveryDays() {
  const entries = Object.values(cart);
  if (entries.length === 0) return 0;
  return Math.max(...entries.map((entry) => entry.deliveryDays));
}

function renderCart() {
  saveCart();
  const container = document.getElementById("cartItemsContainer");
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    container.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
  } else {
    container.innerHTML = entries
      .map(([key, entry]) => {
        const product = products.find((p) => p.id === entry.productId);
        const variantLabel = [
          entry.color,
          entry.size && entry.size !== "One Size" ? `Size ${entry.size}` : null,
          entry.deliveryType === "express" ? "Express delivery" : null,
        ]
          .filter(Boolean)
          .join(" · ");
        return `
  <div class="cart-row">
    <img src="${product.image}" alt="${product.name}">
    <div class="cart-row-info">
      <h3>${product.name}</h3>
      ${variantLabel ? `<p class="cart-row-variant">${variantLabel}</p>` : ""}
      <p>${formatRupees((product.pricePaise + entry.feePaise) * entry.qty)}</p>
      <p class="delivery-info">Delivery by ${getDeliveryDate(
        entry.deliveryDays
      )}</p>
      <div class="qty-control">
        <button data-action="dec" data-key="${key}" aria-label="Decrease quantity">−</button>
        <span>${entry.qty}</span>
        <button data-action="inc" data-key="${key}" aria-label="Increase quantity">+</button>
      </div>
      <button class="remove-btn" data-action="remove" data-key="${key}">Remove</button>
    </div>
  </div>`;
      })
      .join("");

    container.querySelectorAll("[data-action]").forEach((el) => {
      const key = el.dataset.key,
        action = el.dataset.action;
      el.addEventListener("click", () => {
        if (action === "inc") changeQty(key, 1);
        if (action === "dec") changeQty(key, -1);
        if (action === "remove") removeFromCart(key);
      });
    });
  }

  document.getElementById("cartTotal").textContent = formatRupees(
    cartTotalPaise()
  );
  document.getElementById("cartCount").textContent = Object.values(cart).reduce(
    (sum, entry) => sum + entry.qty,
    0
  );

  const footerDelivery = document.getElementById("cartDeliveryEstimate");
  if (footerDelivery) {
    footerDelivery.textContent = Object.keys(cart).length
      ? `Estimated delivery: ${getDeliveryDate(cartMaxDeliveryDays())}`
      : "";
  }
}

// ---------- drawer open/close ----------
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

document.getElementById("cartIconBtn").addEventListener("click", () => {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
});
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

// ---------- hero 3D scroll animation ----------
const heroSection = document.querySelector(".hero");
const heroMain = document.querySelector(".hero-visual--main");
const heroAccent = document.querySelector(".hero-visual--accent");

if (heroSection && heroMain && heroAccent && !prefersReducedMotion) {
  let ticking = false;

  function updateHeroTilt() {
    const rect = heroSection.getBoundingClientRect();
    // 0 when the hero's top is at the viewport top, 1 once scrolled a full hero-height past it
    const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);

    const mainRotateX = 14 - progress * 22;
    const mainRotateY = -24 + progress * 34;
    const mainTranslateZ = progress * -90;
    const mainTranslateY = progress * 70;

    const accentRotateX = 8 + progress * 14;
    const accentRotateY = 20 - progress * 38;
    const accentTranslateZ = 70 + progress * 50;
    const accentTranslateY = progress * -100;

    heroMain.style.transform = `rotateX(${mainRotateX}deg) rotateY(${mainRotateY}deg) translateZ(${mainTranslateZ}px) translateY(${mainTranslateY}px)`;
    heroMain.style.opacity = String(1 - progress * 0.5);

    heroAccent.style.transform = `rotateX(${accentRotateX}deg) rotateY(${accentRotateY}deg) translateZ(${accentTranslateZ}px) translateY(${accentTranslateY}px)`;
    heroAccent.style.opacity = String(1 - progress * 0.5);

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeroTilt);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateHeroTilt();
}

// ---------- announcements ----------
// Edit the copy here. Each announcement can optionally carry a link:
//   href: "#shop"        -> scrolls to a section
//   productId: "p13"     -> opens that product's detail dialog
const announcements = [
  {
    text: "Free standard delivery on every order.",
    linkText: "Shop the collection",
    href: "#shop",
  },
  {
    text:
      "Need it sooner? Express delivery is ₹99 and arrives up to two days earlier.",
  },
  {
    text: "The noise cancelling headphones are now in.",
    linkText: "View them",
    productId: "p13",
  },
];

// The featured banner between the hero and the product grid.
const featuredPromo = {
  productId: "p13",
  kicker: "New in the collection",
  headline: "Turn the room down.",
  text: "Noise cancelling, in charcoal or champagne gold.",
  buttonText: "View the headphones",
};

const announceBar = document.getElementById("announceBar");

if (announceBar && announcements.length) {
  const announceMsg = document.getElementById("announceMsg");
  const announceClose = document.getElementById("announceClose");
  const announceIntervalMs = 6000;
  let announceIndex = 0;
  let announceTimer = null;

  function paintAnnouncement() {
    const item = announcements[announceIndex];
    const nodes = [document.createTextNode(item.text)];

    if (item.linkText) {
      const link = document.createElement(item.href ? "a" : "button");
      link.className = "announce-link";
      link.textContent = item.linkText;
      if (item.href) {
        link.href = item.href;
      } else {
        link.type = "button";
        link.addEventListener("click", () => openProductDetail(item.productId));
      }
      nodes.push(link);
    }
    announceMsg.replaceChildren(...nodes);
  }

  function showAnnouncement(i) {
    announceMsg.classList.add("is-out");
    setTimeout(() => {
      announceIndex = i;
      paintAnnouncement();
      announceMsg.classList.remove("is-out");
    }, 250);
  }

  function startAnnouncements() {
    if (announcements.length < 2 || announceTimer) return;
    announceTimer = setInterval(
      () => showAnnouncement((announceIndex + 1) % announcements.length),
      announceIntervalMs
    );
  }

  function stopAnnouncements() {
    clearInterval(announceTimer);
    announceTimer = null;
  }

  // pause while someone is reading or tabbing through the bar
  announceBar.addEventListener("mouseenter", stopAnnouncements);
  announceBar.addEventListener("mouseleave", startAnnouncements);
  announceBar.addEventListener("focusin", stopAnnouncements);
  announceBar.addEventListener("focusout", startAnnouncements);

  announceClose.addEventListener("click", () => {
    stopAnnouncements();
    document.documentElement.classList.add("announce-off");
    try {
      sessionStorage.setItem("announceDismissed", "1");
    } catch (e) {}
  });

  paintAnnouncement();
  startAnnouncements();
}

// ---------- featured banner ----------
const promoSection = document.getElementById("promo");
const promoProduct = products.find((p) => p.id === featuredPromo.productId);

if (promoSection && promoProduct) {
  document.getElementById("promoImage").src = promoProduct.image;
  document.getElementById("promoKicker").textContent = featuredPromo.kicker;
  document.getElementById("promoHeadline").textContent = featuredPromo.headline;
  document.getElementById("promoText").textContent = featuredPromo.text;

  const promoButton = document.getElementById("promoButton");
  promoButton.textContent = featuredPromo.buttonText;
  promoButton.addEventListener("click", () =>
    openProductDetail(featuredPromo.productId)
  );

  promoSection.hidden = false;
}

// ---------- keep the cart in sync between open tabs ----------
window.addEventListener("storage", (e) => {
  if (e.key !== CART_STORAGE_KEY && e.key !== null) return;
  cart = loadCart();
  renderCart();
});

// ---------- footer year ----------
const footerYearEl = document.getElementById("footerYear");
if (footerYearEl) footerYearEl.textContent = new Date().getFullYear();

renderCart();
