# PRD - Gym Exercise Tracker

## Ringkasan Produk (Product Overview)

Gym Exercise Tracker adalah web app sederhana untuk pengguna gym pemula sampai menengah yang latihan mandiri. Aplikasi membantu pengguna mencatat set latihan langsung setelah menyelesaikan exercise, menyimpan data di browser, dan melihat riwayat beban serta reps per exercise.

Produk ini dibatasi sebagai MVP berdurasi sekitar 5 jam. Fokus utamanya adalah workflow inti: pilih atau tambah exercise, catat set, lihat riwayat per exercise, edit/hapus data salah, ubah satuan berat, dan ubah bahasa.

## Tujuan (Goals)

- Membuat aplikasi pencatatan latihan yang cepat digunakan saat user berada di gym.
- Membantu user mengingat beban, reps, set, dan tanggal latihan terakhir.
- Menyediakan riwayat per exercise dengan filter 7 hari terakhir, 30 hari terakhir, dan semua data.
- Menyimpan data latihan dan preferensi di local browser storage.
- Mendukung tampilan satuan kg dan lbs.
- Mendukung bahasa English dan Indonesia.
- Menghasilkan work product yang terdokumentasi dengan baik untuk kebutuhan penilaian proyek rekayasa perangkat lunak.

## Hal-Hal di Luar Tujuan (Non-Goals)

- Aplikasi tidak bertujuan menjadi platform fitness lengkap.
- Aplikasi tidak menyediakan akun, login, backend, atau sinkronisasi antarperangkat.
- Aplikasi tidak membuat program latihan otomatis.
- Aplikasi tidak menganalisis kalori, nutrisi, atau recovery.
- Aplikasi tidak menyediakan fitur personal trainer.
- Aplikasi tidak menargetkan implementasi native mobile.
- Aplikasi tidak menargetkan offline mode atau PWA pada MVP.

## Target Pengguna

Target pengguna utama adalah pengguna gym pemula sampai menengah yang latihan mandiri.

Karakteristik target pengguna:

- Berlatih sendiri tanpa personal trainer.
- Membutuhkan cara cepat mencatat set setelah latihan.
- Ingin melihat riwayat sederhana per exercise.
- Menggunakan browser modern di desktop atau mobile.
- Tidak membutuhkan akun atau sinkronisasi data pada MVP.

## User Stories

1. Sebagai pengguna gym mandiri, saya ingin memilih exercise dari daftar umum, sehingga saya bisa mencatat latihan tanpa mengetik semuanya dari awal.
2. Sebagai pengguna gym mandiri, saya ingin mencari exercise berdasarkan nama, sehingga saya bisa menemukan exercise dengan cepat saat sedang latihan.
3. Sebagai pengguna gym mandiri, saya ingin memfilter exercise berdasarkan muscle group, sehingga saya bisa menemukan exercise walau tidak ingat nama persisnya.
4. Sebagai pengguna gym mandiri, saya ingin menambahkan exercise custom, sehingga saya bisa mencatat exercise yang belum tersedia di daftar default.
5. Sebagai pengguna gym mandiri, saya ingin mencatat beban, reps, nomor set, dan tanggal, sehingga riwayat latihan saya tersimpan dengan jelas.
6. Sebagai pengguna gym mandiri, saya ingin mencatat set satu per satu, sehingga pencatatan sesuai dengan alur latihan saya di gym.
7. Sebagai pengguna gym mandiri, saya ingin melihat 3 catatan terakhir untuk exercise yang dipilih, sehingga saya tahu beban dan reps sebelumnya sebelum mencatat set baru.
8. Sebagai pengguna gym mandiri, saya ingin melihat riwayat lengkap per exercise, sehingga saya bisa meninjau progres latihan tersebut.
9. Sebagai pengguna gym mandiri, saya ingin memfilter riwayat 7 hari, 30 hari, atau semua data, sehingga saya bisa melihat progres dalam periode yang relevan.
10. Sebagai pengguna gym mandiri, saya ingin melihat beban tertinggi dan total set pada periode filter, sehingga saya mendapat ringkasan progres sederhana.
11. Sebagai pengguna gym mandiri, saya ingin mengedit catatan set yang salah, sehingga data latihan saya tetap akurat.
12. Sebagai pengguna gym mandiri, saya ingin menghapus catatan set dengan konfirmasi, sehingga saya bisa menghapus kesalahan input tanpa risiko tidak sengaja.
13. Sebagai pengguna gym mandiri, saya ingin mengganti tampilan satuan kg/lbs, sehingga aplikasi sesuai dengan preferensi saya.
14. Sebagai pengguna gym mandiri, saya ingin mengganti bahasa English/Indonesia, sehingga aplikasi nyaman digunakan.
15. Sebagai pengguna gym mandiri, saya ingin data tetap tersedia setelah browser di-refresh, sehingga catatan latihan tidak hilang.

## Fitur Utama

- Form utama untuk mencatat set.
- Daftar exercise default yang dikelompokkan berdasarkan muscle group.
- Search exercise berdasarkan nama.
- Filter exercise berdasarkan muscle group.
- Tambah exercise custom dengan nama dan muscle group.
- Tampilan 3 catatan terakhir untuk exercise yang dipilih.
- Halaman riwayat per exercise.
- Filter riwayat: 7 hari terakhir, 30 hari terakhir, dan semua.
- Ringkasan riwayat: beban tertinggi dan total set.
- Edit catatan set.
- Hapus catatan set dengan konfirmasi.
- Penyimpanan lokal menggunakan browser storage.
- Preferensi satuan kg/lbs.
- Preferensi bahasa English/Indonesia.

## Kriteria Penerimaan (Acceptance Criteria)

- Given user membuka aplikasi, when halaman utama tampil, then user dapat langsung memilih exercise dan mencatat set.
- Given user mencari exercise, when user mengetik nama exercise, then daftar exercise terfilter sesuai kata kunci.
- Given user memilih muscle group, when filter diterapkan, then daftar exercise hanya menampilkan exercise pada muscle group tersebut.
- Given exercise belum ada, when user menambahkan exercise custom dengan nama dan muscle group, then exercise tersedia untuk dipilih.
- Given user memilih exercise, when exercise aktif, then aplikasi menampilkan maksimal 3 catatan terakhir untuk exercise tersebut.
- Given user mengisi beban, reps, nomor set, dan tanggal valid, when user menyimpan, then catatan set tersimpan di local browser storage.
- Given beban bernilai 0, when user menyimpan catatan, then aplikasi menerima input tersebut sebagai catatan valid.
- Given reps atau nomor set bukan integer positif, when user mencoba menyimpan, then aplikasi menolak input dan menampilkan pesan validasi.
- Given user membuka halaman riwayat exercise, when exercise dipilih, then semua catatan exercise tersebut tampil dari data lokal.
- Given user memilih filter 7 hari, 30 hari, atau semua, when filter diterapkan, then riwayat hanya menampilkan data sesuai periode.
- Given riwayat difilter, when ringkasan tampil, then beban tertinggi dan total set dihitung berdasarkan periode aktif.
- Given user mengedit catatan, when perubahan disimpan, then catatan lama tergantikan dengan data baru.
- Given user menghapus catatan, when user mengonfirmasi penghapusan, then catatan hilang dari riwayat.
- Given user membatalkan konfirmasi hapus, when dialog ditutup, then catatan tetap tersimpan.
- Given user memilih tampilan lbs, when data beban ditampilkan, then nilai kg dikonversi ke lbs dan dibulatkan ke bilangan terdekat.
- Given user memilih bahasa Indonesia atau English, when preferensi disimpan, then UI menampilkan bahasa yang dipilih.
- Given user me-refresh browser, when aplikasi dibuka kembali, then data latihan dan preferensi tetap tersedia.

## Kriteria Kesuksesan (Success Criteria)

- User dapat menyelesaikan alur utama dari memilih exercise sampai melihat riwayat tanpa backend.
- Data catatan set tetap ada setelah browser di-refresh.
- User dapat memperbaiki kesalahan input melalui edit atau hapus.
- Filter 7 hari, 30 hari, dan semua bekerja pada riwayat per exercise.
- Konversi kg/lbs tampil sesuai preferensi user.
- Bahasa English dan Indonesia dapat dipilih manual.
- MVP dapat dijalankan dan didemokan dalam browser modern desktop dan mobile.
- Minimal dua vertical slice memiliki bukti proses TDD red-green-refactor.
- Verifikasi browser mencakup alur utama, edge case input, konsol, dan tampilan responsif mobile.

## Risiko

- Scope dapat membesar jika fitur future enhancement dimasukkan ke MVP.
- Waktu 5 jam terbatas untuk implementasi, testing, dokumentasi, dan bukti verifikasi.
- Penyimpanan lokal browser berisiko hilang jika user menghapus data browser.
- Tanpa backend, data tidak dapat berpindah antarperangkat.
- Fitur bilingual dapat menambah pekerjaan UI jika teks tidak dikelola dengan rapi.
- Konversi kg/lbs dengan pembulatan dapat membuat angka tampilan berbeda dari nilai internal.
- Jika struktur data lokal tidak dirancang sederhana, fitur edit, hapus, dan filter bisa menjadi rawan bug.

## Item di Luar Ruang Lingkup (Out-of-Scope)

- Login dan akun pengguna.
- Backend API dan database server.
- Sinkronisasi antarperangkat.
- Offline mode atau PWA.
- Program latihan otomatis.
- Riwayat berdasarkan sesi latihan atau workout day.
- Analitik lanjutan seperti grafik progres, volume mingguan kompleks, RPE, rest timer, atau kalori.
- Export/import JSON untuk backup data.
- Arsip exercise custom.
- Native mobile app.
- Integrasi wearable atau perangkat fitness.
