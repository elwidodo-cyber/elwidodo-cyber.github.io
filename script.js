//Script untuk Conversi Suhu
document.getElementById("convertButton").addEventListener("click", convertToFahrenheit);

function convertToFahrenheit() {
  // Ambil Nilai Celcius dari Input form
  const celcius = parseFloat(document.getElementById("celcius").value);

  // Konversi ke Fahrenheit
  const fahrenheit = (celcius * 9) / 5 + 32;

  // Tampilkan hasil
  document.getElementById("result1Temp").innerText = `Hasil Konversi = ${fahrenheit} °F`;
}

//Script untuk Menghitung Luas Segitiga
function hitungLuasSegitiga() {
  // Ambil nilai alas dan tinggi dari input
  var alas = parseFloat(document.getElementById("alas").value);
  var tinggi = parseFloat(document.getElementById("tinggi").value);

  // Validasi input
  if (isNaN(alas) || isNaN(tinggi) || alas <= 0 || tinggi <= 0) {
    document.getElementById("resultsegitiga").innerText = "Nilai Yang Anda Masukkan Tidak Valid!";
    return;
  }

  // Hitung luas segitiga
  var luas = 0.5 * alas * tinggi;

  // Tampilkan hasil
  document.getElementById("resultsegitiga").innerText = "Luas Segitiga adalah = " + luas.toFixed(1);
}

//Script untuk Menghitung Luas Persegi Panjang
function hitungLuasPersegi() {
  const panjang = document.getElementById("panjang").value;
  const lebar = document.getElementById("lebar").value;
  const luas = panjang * lebar;
  document.getElementById("resultpersegi").innerText = `Luas Persegi Panjang = ${luas}`;
}

document.getElementById("generateBtn").addEventListener("click", function () {
  const rows = document.getElementById("rowInput").value;
  let result = "";

  for (let i = 1; i <= rows; i++) {
    result += " ".repeat(rows - i) + "* ".repeat(i) + "<br>";
  }

  document.getElementById("resultContent").innerHTML = result;
  $("#resultModal").modal("show");
});

//Script untuk Lampu Seri/Parallel
  const seriesButton = document.getElementById("seriesButton");
  const parallelButton = document.getElementById("parallelButton");
  const lampContainer = document.getElementById("lampContainer");

seriesButton.addEventListener("click", () => {
  lampContainer.innerHTML = ""; // Kosongkan kontainer lampu
  const seriesLamp = document.createElement("div");
  seriesLamp.classList.add("lamp", "series");
  lampContainer.appendChild(seriesLamp);

  // Tambahkan tombol untuk lampu seri
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "ON/OFF";
  toggleButton.classList.add("btn", "btn-primary", "mt-2",);
  toggleButton.addEventListener("click", () => {
    seriesLamp.classList.toggle("on"); // Nyalakan/matikan lampu
  });
  lampContainer.appendChild(toggleButton);
});

parallelButton.addEventListener("click", () => {
  lampContainer.innerHTML = ""; // Kosongkan kontainer lampu
  for (let i = 0; i < 5; i++) {
    const lamp = document.createElement("div");
    lamp.classList.add("lamp", "parallel");
    lampContainer.appendChild(lamp);

    // Tambahkan tombol untuk setiap lampu
    const button = document.createElement("button");
    button.textContent = `ON/OFF ${i + 1}`;
    button.classList.add("btn", "btn-primary", "mt-2");
    button.addEventListener("click", () => {
      lamp.classList.toggle("on"); // Nyalakan/matikan lampu
    });
    lampContainer.appendChild(button);
  }
});

//Script untuk Kipas Angin
let isOn = false;
let speed = 0; // 0 means off, 1 means slow, 2 means medium, 3 means fast
let interval;
const blades = document.querySelectorAll(".blade");
const toggleButton = document.getElementById("toggleButton");
const speedButtons = document.querySelectorAll(".speedButton");
const clockElement = document.getElementById("clock");

toggleButton.addEventListener("click", () => {
    isOn = !isOn;
    toggleButton.textContent = isOn ? "OFF" : "ON";
    if (isOn) {
        startFan();
    } else {
        stopFan();
    }
});

speedButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (isOn) {
            speed = parseInt(event.target.getAttribute("data-speed"));
            stopFan();
            startFan();
        }
    });
});

function startFan() {
    let rotation = 0;
    blades.forEach((blade) => blade.classList.remove("hidden")); // Tampilkan bilah saat kipas menyala
    interval = setInterval(() => {
        rotation += speed * 40; // Adjust speed multiplier as needed
        blades.forEach((blade, index) => {
            blade.style.transform = `rotate(${rotation + index * 120}deg)`;
        });
    }, 100);
}

function stopFan() {
    clearInterval(interval);
    blades.forEach((blade) => {
        blade.style.transform = "rotate(0deg)";
        blade.classList.add("hidden"); // Sembunyikan bilah saat kipas berhenti
    });
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately
