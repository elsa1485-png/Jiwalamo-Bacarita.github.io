document.addEventListener("DOMContentLoaded", () => {

// Ambil elemen tabs dan daftar tombol tab (Dibiarkan apa adanya karena ini fungsi tabs)
const _TABS = document.querySelector('.tabs');
const _LIST = [..._TABS?.querySelectorAll('button[role=tab]') || []];
const _PANE = [..._TABS?.querySelectorAll('[role=tabpanel]') || []];
const N = _LIST.length;

// Ambil nilai awal index aktif dari CSS variable --k (jika ada)
let k = parseInt(_TABS?.style.getPropertyValue('--k')) || 0;

// Fungsi bantu untuk menukar atribut antar elemen
function switchAttr(e1, e2, attr) {
    const temp = e1.getAttribute(attr);
    e1.setAttribute(attr, e2.getAttribute(attr));
    e2.setAttribute(attr, temp);
}

// Fungsi untuk mengganti tab aktif
function switchTabs(i) {
    if (i === k) return;

    switchAttr(_LIST[i], _LIST[k], 'aria-selected');
    switchAttr(_PANE[i], _PANE[k], 'aria-hidden');

    _LIST[i].tabIndex = 0;
    _LIST[k].tabIndex = -1;

    _LIST[i].focus();
    _TABS.style.setProperty('--k', k = i);
}

// Event klik tab
addEventListener('click', e => {
    const _t = e.target;
    const i = _LIST.indexOf(_t);
    if (i > -1 && _t.tabIndex === 0) {
        switchTabs(i);
    }
});

// Event keyboard navigasi antar tab
addEventListener('keyup', e => {
    const _t = e.target;
    const i = _LIST.indexOf(_t);

    if (i !== -1) {
        switch (e.keyCode) {
            case 39: // panah kanan
                switchTabs((k + 1) % N);
                break;
            case 37: // panah kiri
                switchTabs((k + N - 1) % N);
                break;
            case 36: // HOME
                switchTabs(0);
                break;
            case 35: // END
                switchTabs(N - 1);
                break;
        }
    }
}); // Tutup keyup dengan benar

// ===============================
// SLIDESHOW BERGANTIAN (1 FOTO PER 3 DETIK)
// ===============================
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slides img');
    if (slides.length === 0) return;

    // 1. Sembunyikan semua gambar (opacity: 0)
    slides.forEach(slide => {
        slide.style.opacity = 0;
    });

    // 2. Tampilkan satu gambar berdasarkan index yang aktif (opacity: 1)
    // Dengan CSS transition 1s, pergantian akan halus (fade)
    slides[slideIndex].style.opacity = 1;

    // 3. Pindah ke gambar berikutnya
    slideIndex = (slideIndex + 1) % slides.length;
}

// Jalankan pertama kali, lalu ganti gambar tiap 3 detik
showSlides();
setInterval(showSlides, 3000);

}); // akhir DOMContentLoaded