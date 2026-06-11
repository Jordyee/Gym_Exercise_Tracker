# Vertical Slice Issues - Gym Exercise Tracker

## Dependency Order

1. Issue 1: Pengguna dapat memilih exercise dari katalog default yang disepakati
2. Issue 2: Pengguna dapat mencari dan memfilter exercise
3. Issue 3: Pengguna dapat menambahkan exercise custom
4. Issue 4: Pengguna dapat mencatat set dan melihat 3 catatan terakhir
5. Issue 5: Pengguna dapat melihat riwayat per exercise
6. Issue 6: Pengguna dapat mengedit dan menghapus catatan set
7. Issue 7: Pengguna dapat menyimpan data dan preferensi di browser

---

# Issue 1: Pengguna dapat memilih exercise dari katalog default yang disepakati

## Tipe

HITL

## Apa yang harus dibangun

Bangun alur awal agar pengguna dapat membuka aplikasi, melihat katalog exercise default yang sudah dikelompokkan berdasarkan muscle group, lalu memilih satu exercise sebagai konteks latihan aktif. Slice ini membutuhkan keputusan manusia tentang daftar exercise default yang akan dimasukkan dan bentuk tampilan awal yang cukup nyaman untuk mobile.

## User stories yang tercakup

- Sebagai pengguna gym mandiri, saya ingin memilih exercise dari daftar umum, sehingga saya bisa mencatat latihan tanpa mengetik semuanya dari awal.

## Kriteria Penerimaan (Acceptance Criteria)

- [ ] Aplikasi menampilkan daftar exercise default yang dikelompokkan berdasarkan Chest, Back, Shoulders, Arms, Core, Legs, Upper Body, dan Lower Body.
- [ ] Pengguna dapat memilih satu exercise dari daftar default.
- [ ] Exercise yang dipilih terlihat jelas sebagai exercise aktif.
- [ ] Tampilan dasar dapat dibaca pada layar mobile.
- [ ] Daftar exercise default sudah disetujui oleh mahasiswa sebelum implementasi final.

## Diblokir oleh (Blocked by)

Tidak ada.

## Catatan Pengujian (Testing Notes)

Verifikasi dengan test UI bahwa daftar exercise muncul, kategori muscle group tampil, dan pilihan exercise aktif berubah saat user memilih item. Lakukan pengecekan manual pada ukuran layar mobile.

## Catatan Penggunaan AI

AI dapat membantu menyusun kandidat daftar exercise default dan layout awal. Mahasiswa harus memeriksa manual apakah daftar exercise sesuai scope MVP dan apakah tampilan mobile mudah dipakai.

---

# Issue 2: Pengguna dapat mencari dan memfilter exercise

## Tipe

AFK

## Apa yang harus dibangun

Bangun pencarian berdasarkan nama exercise dan filter berdasarkan muscle group agar pengguna dapat menemukan exercise dengan cepat saat sedang latihan. Slice ini harus bekerja pada exercise default dari Issue 1.

## User stories yang tercakup

- Sebagai pengguna gym mandiri, saya ingin mencari exercise berdasarkan nama, sehingga saya bisa menemukan exercise dengan cepat saat sedang latihan.
- Sebagai pengguna gym mandiri, saya ingin memfilter exercise berdasarkan muscle group, sehingga saya bisa menemukan exercise walau tidak ingat nama persisnya.

## Kriteria Penerimaan (Acceptance Criteria)

- [ ] Pengguna dapat mengetik kata kunci dan daftar exercise terfilter berdasarkan nama.
- [ ] Pengguna dapat memilih filter muscle group.
- [ ] Search dan filter muscle group dapat digunakan bersamaan.
- [ ] Jika tidak ada hasil, aplikasi menampilkan empty state yang jelas.
- [ ] Exercise yang dipilih setelah pencarian atau filter tetap menjadi exercise aktif.

## Diblokir oleh (Blocked by)

Issue 1.

## Catatan Pengujian (Testing Notes)

Uji logika filtering untuk pencarian, filter muscle group, kombinasi search + filter, dan empty state. Verifikasi lewat browser bahwa interaksi terasa jelas pada desktop dan mobile.

## Catatan Penggunaan AI

AI dapat membantu membuat fungsi filter dan skenario test. Mahasiswa harus memeriksa manual apakah hasil filter sesuai data exercise yang tampil.

---

# Issue 3: Pengguna dapat menambahkan exercise custom

## Tipe

AFK

## Apa yang harus dibangun

Bangun alur agar pengguna dapat menambahkan exercise custom dengan nama dan muscle group, lalu langsung memilih exercise tersebut untuk pencatatan latihan. Exercise custom harus ikut muncul dalam daftar, pencarian, dan filter.

## User stories yang tercakup

- Sebagai pengguna gym mandiri, saya ingin menambahkan exercise custom, sehingga saya bisa mencatat exercise yang belum tersedia di daftar default.

## Kriteria Penerimaan (Acceptance Criteria)

- [ ] Pengguna dapat membuka form tambah exercise custom.
- [ ] Pengguna wajib mengisi nama exercise dan memilih muscle group.
- [ ] Aplikasi menolak exercise custom tanpa nama atau tanpa muscle group.
- [ ] Exercise custom yang berhasil ditambahkan muncul di daftar exercise.
- [ ] Exercise custom dapat ditemukan melalui search dan filter muscle group.
- [ ] Exercise custom dapat dipilih sebagai exercise aktif.

## Diblokir oleh (Blocked by)

Issue 2.

## Catatan Pengujian (Testing Notes)

Uji validasi form tambah exercise, penambahan exercise custom, dan integrasi exercise custom dengan search/filter. Verifikasi manual bahwa exercise custom bisa langsung dipilih setelah dibuat.

## Catatan Penggunaan AI

AI dapat membantu membuat validasi dan test data. Mahasiswa harus memeriksa manual agar kategori muscle group tidak menyimpang dari daftar yang disepakati.

---

# Issue 4: Pengguna dapat mencatat set dan melihat 3 catatan terakhir

## Tipe

AFK

## Apa yang harus dibangun

Bangun alur utama agar pengguna dapat memilih exercise aktif, mengisi beban, reps, nomor set, dan tanggal, lalu menyimpan catatan set. Setelah data tersimpan, aplikasi harus menampilkan maksimal 3 catatan terakhir untuk exercise yang sama.

## User stories yang tercakup

- Sebagai pengguna gym mandiri, saya ingin mencatat beban, reps, nomor set, dan tanggal, sehingga riwayat latihan saya tersimpan dengan jelas.
- Sebagai pengguna gym mandiri, saya ingin mencatat set satu per satu, sehingga pencatatan sesuai dengan alur latihan saya di gym.
- Sebagai pengguna gym mandiri, saya ingin melihat 3 catatan terakhir untuk exercise yang dipilih, sehingga saya tahu beban dan reps sebelumnya sebelum mencatat set baru.

## Kriteria Penerimaan (Acceptance Criteria)

- [ ] Pengguna dapat menyimpan catatan set untuk exercise aktif.
- [ ] Beban dapat bernilai 0 dan harus disimpan sebagai integer kg.
- [ ] Reps dan nomor set harus berupa integer positif.
- [ ] Tanggal wajib tersedia saat catatan disimpan.
- [ ] Aplikasi menampilkan pesan validasi jika input tidak valid.
- [ ] Setelah catatan tersimpan, 3 catatan terakhir untuk exercise aktif diperbarui.

## Diblokir oleh (Blocked by)

Issue 1.

## Catatan Pengujian (Testing Notes)

Gunakan TDD untuk validasi input set dan urutan 3 catatan terakhir. Verifikasi lewat browser bahwa user dapat menyimpan beberapa set dan melihat daftar terbaru berubah.

## Catatan Penggunaan AI

AI dapat membantu membuat test validasi dan fungsi pengurutan catatan. Mahasiswa harus memeriksa manual bahwa form input nyaman digunakan saat alur cepat di gym.

---

# Issue 5: Pengguna dapat melihat riwayat per exercise

## Tipe

AFK

## Apa yang harus dibangun

Bangun halaman riwayat per exercise agar pengguna dapat melihat semua catatan untuk exercise yang dipilih, memfilter periode 7 hari terakhir, 30 hari terakhir, atau semua, serta melihat ringkasan beban tertinggi dan total set pada periode aktif.

## User stories yang tercakup

- Sebagai pengguna gym mandiri, saya ingin melihat riwayat lengkap per exercise, sehingga saya bisa meninjau progres latihan tersebut.
- Sebagai pengguna gym mandiri, saya ingin memfilter riwayat 7 hari, 30 hari, atau semua data, sehingga saya bisa melihat progres dalam periode yang relevan.
- Sebagai pengguna gym mandiri, saya ingin melihat beban tertinggi dan total set pada periode filter, sehingga saya mendapat ringkasan progres sederhana.

## Kriteria Penerimaan (Acceptance Criteria)

- [ ] Pengguna dapat membuka riwayat untuk exercise yang dipilih.
- [ ] Riwayat hanya menampilkan catatan milik exercise tersebut.
- [ ] Pengguna dapat memilih filter 7 hari terakhir, 30 hari terakhir, atau semua.
- [ ] Daftar riwayat berubah sesuai filter aktif.
- [ ] Beban tertinggi dihitung berdasarkan catatan dalam filter aktif.
- [ ] Total set dihitung berdasarkan catatan dalam filter aktif.

## Diblokir oleh (Blocked by)

Issue 4.

## Catatan Pengujian (Testing Notes)

Gunakan TDD untuk logika filter tanggal, perhitungan beban tertinggi, dan total set. Verifikasi manual dengan beberapa catatan pada tanggal berbeda.

## Catatan Penggunaan AI

AI dapat membantu membuat kasus uji tanggal dan ringkasan. Mahasiswa harus memeriksa manual boundary 7 hari dan 30 hari agar hasil filter tidak meleset.

---

# Issue 6: Pengguna dapat mengedit dan menghapus catatan set

## Tipe

AFK

## Apa yang harus dibangun

Bangun alur agar pengguna dapat memperbaiki catatan set yang salah dengan mengedit semua field, atau menghapus catatan setelah konfirmasi. Perubahan harus langsung tercermin pada 3 catatan terakhir dan halaman riwayat.

## User stories yang tercakup

- Sebagai pengguna gym mandiri, saya ingin mengedit catatan set yang salah, sehingga data latihan saya tetap akurat.
- Sebagai pengguna gym mandiri, saya ingin menghapus catatan set dengan konfirmasi, sehingga saya bisa menghapus kesalahan input tanpa risiko tidak sengaja.

## Kriteria Penerimaan (Acceptance Criteria)

- [ ] Pengguna dapat membuka mode edit untuk catatan set.
- [ ] Pengguna dapat mengubah exercise, beban, reps, nomor set, dan tanggal.
- [ ] Aplikasi menerapkan validasi yang sama seperti saat membuat catatan.
- [ ] Catatan yang diedit diperbarui di 3 catatan terakhir dan halaman riwayat.
- [ ] Pengguna melihat konfirmasi sebelum menghapus catatan.
- [ ] Jika penghapusan dikonfirmasi, catatan hilang dari tampilan dan data lokal.
- [ ] Jika penghapusan dibatalkan, catatan tetap ada.

## Diblokir oleh (Blocked by)

Issue 4 dan Issue 5.

## Catatan Pengujian (Testing Notes)

Uji edit field, validasi edit, konfirmasi hapus, batal hapus, dan sinkronisasi tampilan setelah perubahan. Verifikasi manual pada halaman utama dan halaman riwayat.

## Catatan Penggunaan AI

AI dapat membantu membuat test regresi untuk update dan delete. Mahasiswa harus memeriksa manual bahwa konfirmasi hapus tidak mudah terlewat dan tidak menghapus data saat dibatalkan.

---

# Issue 7: Pengguna dapat menyimpan data dan preferensi di browser

## Tipe

AFK

## Apa yang harus dibangun

Bangun persistensi local browser storage untuk catatan latihan, exercise custom, preferensi satuan berat, dan preferensi bahasa. Pengguna juga harus dapat mengganti tampilan kg/lbs dan English/Indonesia, lalu melihat preferensi tersebut tetap berlaku setelah browser di-refresh.

## User stories yang tercakup

- Sebagai pengguna gym mandiri, saya ingin mengganti tampilan satuan kg/lbs, sehingga aplikasi sesuai dengan preferensi saya.
- Sebagai pengguna gym mandiri, saya ingin mengganti bahasa English/Indonesia, sehingga aplikasi nyaman digunakan.
- Sebagai pengguna gym mandiri, saya ingin data tetap tersedia setelah browser di-refresh, sehingga catatan latihan tidak hilang.

## Kriteria Penerimaan (Acceptance Criteria)

- [ ] Catatan set tetap tersedia setelah browser di-refresh.
- [ ] Exercise custom tetap tersedia setelah browser di-refresh.
- [ ] Pengguna dapat mengganti tampilan satuan antara kg dan lbs.
- [ ] Data internal tetap disimpan dalam kg integer.
- [ ] Tampilan lbs menggunakan hasil konversi kg ke lbs yang dibulatkan ke bilangan terdekat.
- [ ] Pengguna dapat mengganti bahasa antara English dan Indonesia.
- [ ] Preferensi satuan dan bahasa tetap tersedia setelah browser di-refresh.

## Diblokir oleh (Blocked by)

Issue 3 dan Issue 4.

## Catatan Pengujian (Testing Notes)

Gunakan TDD untuk konversi kg/lbs dan penyimpanan preferensi. Verifikasi browser dengan refresh halaman setelah membuat catatan, menambah exercise custom, mengganti satuan, dan mengganti bahasa.

## Catatan Penggunaan AI

AI dapat membantu membuat helper penyimpanan lokal, test konversi, dan kamus teks bilingual. Mahasiswa harus memeriksa manual bahwa data benar-benar bertahan setelah refresh dan teks UI tidak tercampur bahasa.
