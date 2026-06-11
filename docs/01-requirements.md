# Requirements - Gym Exercise Tracker

## Ide Produk

Gym Exercise Tracker adalah web app sederhana untuk pengguna gym pemula sampai menengah yang latihan mandiri. Aplikasi membantu pengguna mencatat set latihan langsung setelah menyelesaikan exercise tertentu, lalu melihat riwayat beban dan repetisi per exercise.

MVP dirancang untuk dikerjakan dalam waktu sekitar 5 jam, sehingga scope fitur dijaga tetap kecil dan fokus pada workflow inti.

## Pernyataan Masalah (Problem Statement)

Pengguna gym pemula sampai menengah sering lupa latihan terakhir yang dilakukan, beban yang dipakai, jumlah set, dan jumlah reps. Akibatnya, mereka sulit mengetahui apakah progres latihan meningkat dari minggu ke minggu.

Aplikasi ini menyelesaikan masalah tersebut dengan menyediakan pencatatan set yang cepat, riwayat per exercise, dan penyimpanan lokal di browser.

## Target Pengguna

Target pengguna utama adalah pengguna gym pemula sampai menengah yang latihan mandiri tanpa personal trainer.

Karakteristik pengguna:

- Berlatih menggunakan exercise umum di gym.
- Membutuhkan pencatatan cepat saat berada di gym.
- Ingin melihat riwayat sederhana tanpa fitur analitik kompleks.
- Menggunakan browser modern di desktop atau mobile.

## Tujuan Pengguna (User Goals)

- Pengguna dapat memilih exercise dari daftar umum.
- Pengguna dapat menambahkan exercise sendiri jika exercise belum tersedia.
- Pengguna dapat mencatat set langsung setelah latihan tertentu selesai.
- Pengguna dapat mencatat nama exercise, beban, jumlah reps, nomor set, dan tanggal.
- Pengguna dapat melihat 3 catatan terakhir untuk exercise yang sedang dipilih.
- Pengguna dapat melihat riwayat per exercise.
- Pengguna dapat memfilter riwayat exercise berdasarkan 7 hari terakhir, 30 hari terakhir, atau semua data.
- Pengguna dapat mengedit catatan set yang salah.
- Pengguna dapat menghapus catatan set yang salah dengan konfirmasi.
- Pengguna dapat mengganti tampilan satuan berat antara kg dan lbs.
- Pengguna dapat mengganti bahasa aplikasi antara English dan Indonesia.
- Pengguna dapat membuka ulang aplikasi dan tetap menemukan data latihan yang pernah dicatat.

## Kebutuhan Fungsional (Functional Requirements)

### Exercise

- Aplikasi harus menyediakan daftar exercise umum.
- Exercise harus dikelompokkan berdasarkan muscle group.
- Kategori muscle group yang digunakan adalah Chest, Back, Shoulders, Arms, Core, Legs, Upper Body, dan Lower Body.
- Upper Body dan Lower Body digunakan sebagai fallback jika user tidak mengetahui muscle group yang lebih spesifik.
- Pengguna harus dapat mencari exercise berdasarkan nama.
- Pengguna harus dapat memfilter exercise berdasarkan muscle group.
- Pengguna harus dapat menambahkan exercise custom.
- Saat menambahkan exercise custom, pengguna wajib mengisi nama exercise dan memilih muscle group.

### Pencatatan Set

- Halaman utama harus langsung menampilkan form catat set.
- Pengguna harus dapat memilih exercise sebelum mencatat set.
- Setelah exercise dipilih, aplikasi harus menampilkan 3 catatan terakhir untuk exercise tersebut.
- Pengguna harus dapat mencatat beban, jumlah reps, nomor set, dan tanggal.
- Beban disimpan sebagai integer dalam satuan kg.
- Beban bernilai 0 harus diizinkan untuk latihan bodyweight.
- Reps dan nomor set harus berupa integer positif.
- Pencatatan dilakukan satu set demi satu set, tanpa konsep sesi latihan atau workout day pada MVP.

### Riwayat Exercise

- Aplikasi harus menyediakan halaman riwayat per exercise.
- Riwayat harus ditampilkan berdasarkan exercise yang dipilih.
- Riwayat harus dapat difilter dengan pilihan cepat: 7 hari terakhir, 30 hari terakhir, dan semua.
- Halaman riwayat harus menampilkan ringkasan sederhana berupa beban tertinggi dan total set dalam periode filter yang dipilih.

### Edit dan Hapus Catatan

- Pengguna harus dapat mengedit semua field pada catatan set, termasuk exercise, beban, reps, nomor set, dan tanggal.
- Pengguna harus dapat menghapus catatan set.
- Aplikasi harus menampilkan konfirmasi sebelum catatan set dihapus.

### Satuan Berat

- Satuan default aplikasi adalah kg.
- Pengguna harus dapat mengubah tampilan satuan ke lbs.
- Data internal tetap disimpan dalam kg integer.
- Jika data ditampilkan dalam lbs dan hasil konversi menghasilkan desimal, aplikasi harus membulatkan ke bilangan terdekat.
- Preferensi satuan berat harus disimpan di browser.

### Bahasa

- Aplikasi harus mendukung English dan Indonesia.
- Bahasa default aplikasi adalah English.
- Pengguna harus dapat memilih bahasa secara manual.
- Preferensi bahasa harus disimpan di browser.

### Penyimpanan Data

- Data aplikasi disimpan di local browser storage.
- Aplikasi tidak membutuhkan akun, login, backend, atau sinkronisasi antarperangkat untuk MVP.
- Data latihan, exercise custom, preferensi bahasa, dan preferensi satuan berat harus tetap tersedia setelah browser di-refresh.

## Kebutuhan Non-Fungsional (Non-Functional Requirements)

- Aplikasi dibuat sebagai web app menggunakan React + Vite.
- Aplikasi harus mendukung browser modern di desktop dan mobile, khususnya Chrome, Edge, dan Safari terbaru.
- Aplikasi harus tetap responsif untuk penggunaan normal pada browser modern, tanpa target performa kuantitatif khusus.
- Input harus memiliki label yang jelas.
- UI harus terbaca dengan baik pada layar mobile.
- Workflow utama harus cepat digunakan saat pengguna berada di gym.
- Fitur utama harus diuji dengan pendekatan TDD default, terutama untuk logika bisnis dan workflow penting.

## Asumsi

- Pengguna menggunakan perangkat pribadi sehingga penyimpanan lokal browser cukup untuk MVP.
- Pengguna mencatat set langsung setelah menyelesaikan latihan tertentu.
- Pengguna tidak membutuhkan akun atau sinkronisasi data pada versi awal.
- Pengguna memahami satuan kg atau lbs.
- Pengguna hanya membutuhkan riwayat per exercise, bukan riwayat berdasarkan sesi latihan.
- Waktu pengerjaan MVP dibatasi sekitar 5 jam.
- Dokumentasi proses penting untuk kebutuhan penilaian tugas.

## Batasan (Constraints)

- MVP harus tetap kecil agar realistis dikerjakan dalam waktu sekitar 5 jam.
- Aplikasi tidak menggunakan backend.
- Aplikasi tidak memiliki fitur login.
- Aplikasi tidak memiliki fitur offline/PWA khusus.
- Aplikasi tidak memiliki konsep sesi latihan atau workout day pada MVP.
- Aplikasi hanya menampilkan riwayat berdasarkan exercise, bukan berdasarkan program latihan.
- Export/import JSON ditunda sebagai future enhancement.
- Arsip exercise custom ditunda sebagai future enhancement.
- Implementasi harus mendukung dokumentasi progress, struktur repo yang rapi, dan work product seperti PRD, design, testing evidence, serta reflection.

## Pertanyaan Terbuka yang Belum Terjawab

- Exercise default apa saja yang akan dimasukkan ke daftar awal?
- Apakah tampilan riwayat exercise perlu berupa tabel, list, atau kombinasi dengan ringkasan visual sederhana?
- Tool testing spesifik apa yang akan digunakan untuk React + Vite?
- Apakah project akan memakai TypeScript atau JavaScript?
- Apakah workflow GitHub akan menggunakan branch dan pull request untuk setiap vertical slice?
- Bagaimana bukti TDD red-green-refactor akan didokumentasikan untuk minimal dua isu?
- Bagaimana bukti pengujian browser dan verifikasi Chrome DevTools akan disimpan di repo?
