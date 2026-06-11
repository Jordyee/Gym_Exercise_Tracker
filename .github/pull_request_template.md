## Ringkasan

Perubahan apa yang dibawa oleh PR ini?

## Isu Terkait

Menutup #...

## Perilaku yang Diimplementasikan

Perilaku menghadap pengguna apa yang diberikan oleh PR ini?

## Perubahan yang Dilakukan

-
-
-

## Bukti TDD

- [ ] RED: Menunjukkan pengujian yang gagal.
- [ ] GREEN: Menunjukkan pengujian yang lolos.
- [ ] REFACTOR: Menjelaskan peningkatan kode yang dilakukan.

## Perintah Pengujian

```bash
npm test
npm run build
```

## Browser Verification

- [ ] Fitur telah diuji secara manual.
- [ ] Konsol browser telah diperiksa dan bebas dari error tidak terduga.
- [ ] Tampilan responsif mobile telah diperiksa.
- [ ] Edge cases dan input tidak valid telah diperiksa.
- [ ] Local Storage atau browser storage telah diperiksa jika fitur memakai penyimpanan browser.
- [ ] Network tab telah diperiksa jika fitur memakai request API.

## AI Usage

Jelaskan bagaimana AI membantu PR ini dan apa yang diverifikasi manual.

Contoh untuk proyek ini:

- AI membantu menyusun PRD, issue breakdown, implementasi helper, komponen UI, test, dan dokumentasi.
- Verifikasi manual dilakukan untuk main user flow: memilih exercise, mencari/filter exercise, menambahkan custom exercise, mencatat set, melihat recent records, membuka history, mengedit record, dan menghapus record dengan konfirmasi.
- Verifikasi manual dilakukan untuk input invalid: custom exercise tanpa nama atau muscle group, reps/set number invalid, tanggal kosong, dan berat `0 kg` sebagai input valid.
- Verifikasi manual dilakukan di Chrome DevTools untuk Console, Network, Application Storage, dan mobile viewport.
- Verifikasi manual memastikan data custom exercise, set records, unit preference, dan language preference tetap tersedia setelah refresh.

## Screenshots

Tambahkan screenshots jika PR mengubah UI, alur browser, tampilan responsive, atau dokumentasi evidence.

Untuk proyek ini, screenshots penting jika PR menyentuh:

- Tampilan aplikasi.
- Form input atau validasi.
- History, edit, atau delete flow.
- Mobile layout.
- Chrome DevTools verification.
- Bukti failing/passing test.

Jika screenshots relevan, simpan di:

```text
assets/screenshots/
```

Lalu tautkan di PR, misalnya:

- Running app: `assets/screenshots/browser-app-running.png`
- Mobile viewport: `assets/screenshots/mobile-viewport.png`
- DevTools console: `assets/screenshots/devtools-console.png`
- Passing test: `assets/screenshots/passing-tests.png`
- Failing test: `assets/screenshots/failing-test.png`

Jika PR hanya mengubah teks kecil atau dokumentasi tanpa perubahan UI, screenshots tidak wajib.
