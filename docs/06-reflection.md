# Reflection - Gym Exercise Tracker

## Bagaimana AI Digunakan Selama Klarifikasi Kebutuhan

AI digunakan untuk membantu memperjelas ruang lingkup MVP dari ide awal aplikasi pencatatan latihan gym. Bantuan utama AI adalah merapikan kebutuhan menjadi daftar fitur yang realistis untuk aplikasi tanpa backend, memisahkan fitur MVP dari fitur yang sebaiknya ditunda, dan memastikan kebutuhan utama pengguna tetap sederhana: memilih exercise, mencatat set, melihat riwayat, mengedit atau menghapus kesalahan, serta menyimpan data di browser.

AI juga membantu mengubah kebutuhan yang masih umum menjadi acceptance criteria yang lebih mudah diuji. Contohnya adalah aturan bahwa berat `0 kg` valid, reps dan nomor set harus integer positif, data berat internal tetap disimpan sebagai kg integer, dan tampilan lbs hanya hasil konversi untuk display.

## Bagaimana AI Digunakan Selama Pembuatan PRD

AI digunakan untuk menyusun struktur PRD, termasuk product overview, goals, non-goals, target pengguna, user stories, fitur utama, acceptance criteria, success criteria, risiko, dan out-of-scope items. Saya menggunakan AI untuk menjaga agar dokumen PRD tidak melebar ke fitur yang terlalu besar seperti login, backend, grafik lanjutan, program latihan otomatis, atau sinkronisasi antarperangkat.

Peran AI pada tahap ini adalah membantu membuat PRD lebih eksplisit dan terukur. Hasilnya, PRD dapat dipakai sebagai sumber kebenaran saat implementasi dan testing.

## Bagaimana AI Digunakan Selama Pemecahan Isu

AI digunakan untuk memecah MVP menjadi vertical slice issues yang bisa dikerjakan bertahap. Urutannya dibuat berdasarkan dependency:

1. Exercise catalog.
2. Search dan filter.
3. Custom exercise.
4. Log set dan recent records.
5. History per exercise.
6. Edit dan delete record.
7. Local storage, unit preference, dan language preference.

Pembagian ini membantu menjaga scope setiap issue tetap kecil dan dapat diverifikasi. AI juga membantu menulis acceptance criteria dan testing notes untuk setiap issue, sehingga implementasi tidak hanya berdasarkan intuisi UI tetapi berdasarkan perilaku yang bisa diuji.

## Bagaimana AI Digunakan Saat Coding

AI digunakan sebagai coding assistant untuk membuat struktur React + Vite, helper domain, komponen UI, dan test. Pada bagian logika penting, AI membantu membuat fungsi yang lebih mudah diuji seperti filtering exercise, validasi custom exercise, validasi set record, recent records, history filtering, update/delete record, storage helper, dan unit conversion.

AI juga digunakan untuk menjaga implementasi tetap sesuai PRD. Misalnya, aplikasi tetap memakai `localStorage`, tidak menambahkan backend, tidak menambahkan fitur di luar MVP, dan menjaga data berat internal sebagai `weightKg`.

## Bagaimana AI Digunakan Selama Testing

AI digunakan untuk menyusun strategi TDD dan browser verification. Untuk testing otomatis, AI membantu menentukan helper mana yang perlu dites dan membantu mendokumentasikan proses red-green-refactor di `docs/05-tdd-and-testing.md`.

Untuk browser testing, AI membantu membuat checklist QA yang mencakup main user flow, acceptance criteria, invalid input, responsive layout, Chrome DevTools Console, Network, dan Application Storage. Evidence pengujian kemudian disimpan di `assets/screenshots/` dan diringkas dalam dokumen testing.

## Di Bagian Mana AI Membuat Kesalahan atau Memberikan Saran Lemah

AI kadang memberi saran yang terlalu umum dan perlu diarahkan kembali ke scope MVP. Contohnya, beberapa ide fitur seperti analitik lanjutan, export/import, atau workflow yang lebih kompleks tidak dimasukkan karena tidak sesuai batas waktu dan non-goals PRD.

AI juga perlu dikoreksi pada detail verifikasi mobile. Awalnya checklist mobile menyebut tidak ada horizontal scroll secara umum, tetapi hasil manual menunjukkan ada horizontal scroll lokal di area riwayat ketika tombol Edit/Delete terlihat. Setelah diverifikasi, hal ini dicatat sebagai minor note karena tidak menyebabkan page-level horizontal overflow dan kontrol tetap usable.

Selain itu, bukti failing test perlu dijelaskan lebih praktis. AI perlu memperjelas bahwa failing evidence dapat dibuat dengan mengubah expected value test secara sementara, mengambil screenshot, lalu mengembalikan test ke kondisi benar.

## Apa Saja yang Diverifikasi Secara Manual

Verifikasi manual dilakukan di browser untuk memastikan:

- Aplikasi dapat dibuka dan main user flow berjalan.
- Exercise default tampil dan dapat dipilih.
- Search dan filter muscle group bekerja sendiri maupun bersamaan.
- Empty state tampil saat tidak ada hasil.
- Custom exercise dapat ditambahkan, dicari, difilter, dan dipilih.
- Form set menerima berat `0` dan menolak reps atau set number invalid.
- Recent records hanya menampilkan maksimal 3 catatan terakhir.
- History menampilkan record sesuai exercise aktif.
- Filter history 7 hari, 30 hari, dan all bekerja.
- Highest weight dan total set sesuai periode aktif.
- Record dapat diedit dan hasil edit muncul di recent records dan history.
- Delete memakai konfirmasi, cancel tidak menghapus data, dan confirm menghapus data.
- Unit dapat diganti ke lbs dan tampilan dikonversi dari kg.
- Bahasa dapat diganti antara English dan Indonesia.
- Data custom exercise, set records, unit, dan bahasa tetap ada setelah refresh.
- Chrome DevTools Console tidak menampilkan error tidak terduga.
- Network tidak menunjukkan request API gagal karena aplikasi tidak memakai backend API.
- Local Storage menyimpan app state dengan data berat internal tetap `weightKg`.
- Mobile viewport tetap usable, dengan catatan minor horizontal scroll lokal pada area riwayat.

## Keputusan Rekayasa Perangkat Lunak yang Paling Diyakini

Keputusan yang paling saya yakini adalah memisahkan logika domain dari komponen UI. Validasi input, filtering exercise, pembuatan record, update/delete, storage, dan konversi unit dibuat sebagai helper terpisah sehingga mudah dites dengan Vitest dan tidak bergantung penuh pada interaksi browser.

Keputusan penting lainnya adalah menyimpan berat internal sebagai kg integer dan menjadikan lbs hanya format tampilan. Ini mengurangi risiko data berubah-ubah karena pembulatan. Penggunaan `localStorage` juga tepat untuk MVP karena sesuai non-goal: tidak ada backend, akun, atau sinkronisasi.

Saya juga yakin dengan pendekatan vertical slice karena setiap fitur memiliki acceptance criteria yang jelas dan bisa diverifikasi satu per satu sebelum digabung ke `development`.

## Apa yang Akan Ditingkatkan Jika Memiliki Waktu Lebih Banyak

Jika memiliki waktu lebih banyak, saya akan meningkatkan beberapa area:

- Memperbaiki area history di mobile agar tombol Edit/Delete wrap lebih rapi tanpa horizontal scroll lokal.
- Menambahkan end-to-end tests dengan Playwright untuk main user flow browser.
- Menambahkan export/import JSON agar data lokal bisa di-backup.
- Menambahkan grafik progres sederhana untuk beban tertinggi atau total set per exercise.
- Menambahkan filter atau sorting tambahan di history.
- Menambahkan aksesibilitas yang lebih lengkap, seperti fokus keyboard yang lebih jelas dan pengecekan screen reader.
- Menambahkan dokumentasi deployment jika aplikasi akan dipublikasikan ke hosting statis.
