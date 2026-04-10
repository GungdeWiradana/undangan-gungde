// export function startCountdown() {
//   const target = new Date("2026-05-12").getTime();
//   const el = document.getElementById("countdown");

//   setInterval(() => {
//     const now = new Date().getTime();
//     const gap = target - now;

//     const days = Math.floor(gap / (1000 * 60 * 60 * 24));

//     if (el) {
//       el.innerHTML = days + " hari lagi 💍";
//     }
//   }, 1000);
// }