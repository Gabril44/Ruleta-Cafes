const coffeePlaces = [
  {
    name: "Madre",
    note: "Yo solo comi un pancho acá (G).",
    mapUrl: "https://share.google/ihA3kn31YdoEe7uer"
  },
  {
    name: "Cafe negro",
    note: "Tiene un michi.",
    mapUrl: "https://share.google/K0CYa32s740CPZ9Py"
  },
  {
    name: "Cafe Martinez",
    note: "Acá yo venía muy seguido (G)",
    mapUrl: "https://share.google/DuDKuUmLXR6eNvoN4"
  },
  {
    name: "Kieto Cafe",
    note: "Uy kieto.",
    mapUrl: "https://share.google/9ivJmfc9eX2nOkqF2"
  },
  {
    name: "Italia Cafe",
    note: "Fui pero no me acuerdo nada del gusto del cafe (G).",
    mapUrl: "https://share.google/7601sgYOtUZ37sbvW"
  },
  {
    name: "Mirasoles Shopp/ Las heras",
    note: "Classic noma te digo, yo una vez comi tacos (G).",
    mapUrl: "https://share.google/DwldoRY35jo8zX1CW"
  },
  {
    name: "Trópico",
    note: "Fui una vez, muy rico el Café (G).",
    mapUrl: "https://share.google/WtjHVuba7jwfAqUIN"
  }
];

const backgroundPhotos = [
  { src: "assets/photos/nosotros-1.jpeg", label: "Foto 1" },
  { src: "assets/photos/nosotros-2.jpeg", label: "Foto 2" },
  { src: "assets/photos/nosotros-3.jpeg", label: "Foto 3" }
];

const wheel = document.querySelector("#wheel");
const ctx = wheel.getContext("2d");
const spinButton = document.querySelector("#spinButton");
const rerollButton = document.querySelector("#rerollButton");
const resultName = document.querySelector("#resultName");
const resultMeta = document.querySelector("#resultMeta");
const mapLink = document.querySelector("#mapLink");
const photoWall = document.querySelector("#photoWall");

const colors = ["#b94a62", "#2d6d63", "#f0b85b", "#355c7d", "#c65f3d", "#7c5a9b", "#d88b3d", "#3f7f89"];
let currentRotation = 0;
let spinning = false;

function normalizeDegrees(degrees) {
  return ((degrees % 360) + 360) % 360;
}

function drawWheel() {
  const size = wheel.width;
  const radius = size / 2;
  const slice = (Math.PI * 2) / coffeePlaces.length;

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(radius, radius);

  coffeePlaces.forEach((place, index) => {
    const start = index * slice - Math.PI / 2;
    const end = start + slice;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius - 20, start, end);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 247, 235, 0.78)";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.save();
    ctx.rotate(start + slice / 2);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff7eb";
    ctx.font = "900 29px Inter, sans-serif";
    wrapWheelText(place.name, radius - 60, 0, Math.max(96, radius * 0.42));
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(0, 0, radius - 20, 0, Math.PI * 2);
  ctx.lineWidth = 12;
  ctx.strokeStyle = "rgba(255, 247, 235, 0.92)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 88, 0, Math.PI * 2);
  ctx.fillStyle = "#fff7eb";
  ctx.fill();
  ctx.restore();
}

function wrapWheelText(text, x, y, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  lines.push(line);
  const lineHeight = 32;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;

  lines.slice(0, 3).forEach((lineText, index) => {
    ctx.fillText(lineText, x, startY + index * lineHeight);
  });
}

function spinWheel() {
  if (spinning || coffeePlaces.length === 0) return;

  spinning = true;
  spinButton.disabled = true;

  const winnerIndex = Math.floor(Math.random() * coffeePlaces.length);
  const sliceDegrees = 360 / coffeePlaces.length;
  const winnerCenter = winnerIndex * sliceDegrees + sliceDegrees / 2;
  const extraTurns = 5 + Math.floor(Math.random() * 3);
  const currentAngle = normalizeDegrees(currentRotation);
  const targetAngle = normalizeDegrees(360 - winnerCenter);
  const targetRotation = extraTurns * 360 + normalizeDegrees(targetAngle - currentAngle);

  currentRotation += targetRotation;
  wheel.style.setProperty("--rotation", `${currentRotation}deg`);

  window.setTimeout(() => {
    setResult(coffeePlaces[winnerIndex]);
    spinning = false;
    spinButton.disabled = false;
  }, 4900);
}

function setResult(place) {
  resultName.textContent = place.name;
  resultMeta.textContent = place.note;
  mapLink.href = place.mapUrl;
  mapLink.classList.remove("is-disabled");
  mapLink.removeAttribute("aria-disabled");
}

function renderPhotoWall() {
  photoWall.innerHTML = "";

  backgroundPhotos.forEach((photo) => {
    const slot = document.createElement("div");
    slot.className = "photo-slot";
    slot.dataset.label = photo.label;

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = "";
    img.addEventListener("load", () => {
      slot.classList.add("has-photo");
    }, { once: true });
    img.addEventListener("error", () => {
      img.remove();
    }, { once: true });

    slot.appendChild(img);
    photoWall.appendChild(slot);
  });
}

spinButton.addEventListener("click", spinWheel);
rerollButton.addEventListener("click", spinWheel);

renderPhotoWall();
drawWheel();
