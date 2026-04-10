document.addEventListener("DOMContentLoaded", function () {

    // --- FITUR NAMA TAMU OTOMATIS ---
    // 1. Ambil parameter '?to=' dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');

    // 2. Jika ada nama di URL, ganti teks di HTML
    if (namaTamu) {
        const elemenNamaTamu = document.getElementById('nama-tamu');
        if (elemenNamaTamu) {
            elemenNamaTamu.innerText = namaTamu;
        }
    }
    // --------------------------------
    
    // 1. Logika Buka Undangan & Putar Musik
    const btnOpen = document.getElementById("btn-open");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainWrapper = document.getElementById("main-wrapper");
    
    // Siapkan Audio dan Tombol Musik
    const btnMusic = document.getElementById("btn-music");
    const iconMusic = btnMusic.querySelector("i");
    
    // PENTING: Ganti 'lagu.mp3' dengan nama file lagumu dan pastikan lokasinya benar!
    const bgMusic = new Audio('./src/assets/music/Ultah.mp3'); 
    bgMusic.loop = true; // Lagu akan mengulang terus menerus
    let isPlaying = false;

    btnOpen.addEventListener("click", function () {
        // Hilangkan layar welcome
        welcomeScreen.classList.add("fade-out");
        mainWrapper.classList.remove("d-none");
        
        // Putar lagu saat tombol open diklik
        bgMusic.play();
        isPlaying = true;
        btnMusic.classList.remove("d-none"); // Munculkan tombol musik di pojok
        
        // Mainkan animasi AOS
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            AOS.init({
                duration: 1000, 
                once: true      
            });
        }, 800);
    });

    // 2. Logika Tombol Pause/Play Musik
    btnMusic.addEventListener("click", function () {
        if (isPlaying) {
            bgMusic.pause();
            iconMusic.classList.add("paused"); // Hentikan animasi putar
        } else {
            bgMusic.play();
            iconMusic.classList.remove("paused"); // Lanjutkan animasi putar
        }
        isPlaying = !isPlaying; // Balikkan status
    });

    // 3. Logika Hitung Mundur (Countdown)
    // Bulan dimulai dari 0 (0 = Januari, 8 = September)
    const weddingDate = new Date(2026, 4, 12, 18, 0, 0).getTime();

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "<h3 class='text-warning font-esthetic'>Acara Sedang Berlangsung</h3>";
        }
    }, 1000);
});

// 4. Fungsi untuk tombol Copy (Salin Teks)
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Berhasil disalin: " + text);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
    });
}