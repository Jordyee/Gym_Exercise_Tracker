# Agent Workflow - Gym Exercise Tracker

Dokumen ini adalah konteks kerja untuk Codex CLI dan sub-agent. Baca file ini sebelum mengubah kode.

## Ringkasan Proyek

Gym Exercise Tracker adalah web app sederhana untuk pengguna gym pemula sampai menengah yang latihan mandiri.

MVP berfokus pada:

- Memilih exercise dari katalog default.
- Mencari dan memfilter exercise.
- Menambahkan exercise custom.
- Mencatat set latihan satu per satu.
- Melihat 3 catatan terakhir untuk exercise aktif.
- Melihat riwayat per exercise dengan filter 7 hari, 30 hari, dan semua.
- Mengedit dan menghapus catatan set.
- Menyimpan data dan preferensi di local browser storage.
- Mendukung satuan kg/lbs dan bahasa English/Indonesia.

Sumber kebenaran dokumen:

- Requirements: `docs/01-requirements.md`
- PRD: `docs/02-prd.md`
- Vertical slice issues: `docs/03-vertical-slice-issues.md`
- Design: `docs/04-design.md`
- TDD/testing evidence: `docs/05-tdd-and-testing.md`
- Reflection: `docs/06-reflection.md`

## Branch Workflow

Jangan bekerja langsung di `master`.

Branch utama:

- `master`: branch stabil/submission.
- `development`: branch integrasi semua pekerjaan.

Aturan kerja:

- Semua feature branch dibuat dari `development`.
- Satu GitHub issue atau satu vertical slice dikerjakan dalam satu feature branch.
- PR feature branch harus target ke `development`, bukan `master`.
- Setelah fitur selesai dan diverifikasi, merge ke `development`.
- `master` hanya menerima hasil akhir dari `development` saat delivery.

Format branch yang disarankan:

```text
feature/exercise-catalog
feature/exercise-search-filter
feature/custom-exercise
feature/log-set
feature/exercise-history
feature/edit-delete-record
feature/local-storage-preferences
```

## Status Implementasi Saat Ini

Issue 1 sudah dikerjakan pada branch:

```text
feature/exercise-catalog
```

Issue 1 scope:

- Setup React + Vite + Vitest.
- Katalog exercise default.
- Exercise dikelompokkan berdasarkan muscle group.
- User dapat memilih satu exercise.
- Exercise aktif terlihat jelas.
- Test katalog exercise.

Verifikasi Issue 1:

```powershell
npm test
npm run build
```

Preview lokal:

```text
http://127.0.0.1:5173
```

Catatan: pastikan PR Issue 1 target ke `development`, bukan `master`.

## Status Terbaru Setelah Sesi Sub-Agent

Pada sesi 2026-06-11 sampai 2026-06-12, sisa MVP vertical slices sudah diselesaikan pada branch:

```text
feature/mvp-remaining-issues
```

Branch tersebut sudah dipush ke remote:

```text
origin/feature/mvp-remaining-issues
```

Pull Request sudah dibuat ke `development`:

```text
https://github.com/Jordyee/Gym_Exercise_Tracker/pull/9
```

Status PR #9:

- Sudah merged ke `development` pada 2026-06-11.
- Merge commit: `acc61fca4ad5eaebf35bc1ce4b7b68ff9136b18e`.
- Local feature branch terakhir: `feature/mvp-remaining-issues` dengan commit dokumentasi TDD `c5d49c0`.
- Setelah sesi baru dimulai, pindah ke `development` dan pull remote terbaru sebelum lanjut:

```powershell
git switch development
git pull --ff-only origin development
```

PR #9 menautkan minimal satu issue dan mencantumkan:

```text
Closes #2
Closes #3
Closes #4
Closes #5
Closes #6
Closes #7
```

Catatan GitHub Issues:

- Issues #2 sampai #7 belum otomatis tertutup setelah PR #9 merge karena default branch repo adalah `master`, sedangkan PR #9 merge ke `development`.
- Jangan menganggap ini error.
- Saat final delivery dari `development` ke `master`, cantumkan lagi `Closes #2` sampai `Closes #7` di PR final agar GitHub menutup issue otomatis.
- Jika workflow dosen menganggap merge ke `development` sudah selesai, issue dapat ditutup manual dengan komentar bahwa scope selesai melalui PR #9.

Scope yang sudah selesai:

- Issue 2: Search dan filter exercise.
- Issue 3: Tambah exercise custom.
- Issue 4: Catat set dan lihat 3 catatan terakhir.
- Issue 5: Riwayat per exercise dengan filter 7 hari, 30 hari, dan semua.
- Issue 6: Edit dan hapus catatan set dengan konfirmasi.
- Issue 7: Persistensi localStorage, preferensi kg/lbs, dan bahasa English/Indonesia.

Dokumentasi tambahan yang dibuat:

- `README.md`: instruksi instalasi, penggunaan, test/build, dan catatan PR.
- `subAgentsTask.md`: log pembagian kerja sub-agent, review tiap issue, dan final verification.

Verifikasi final yang sudah dijalankan:

```powershell
npm test
npm run build
```

Hasil verifikasi:

- `npm test` passed: 4 test files, 29 tests.
- `npm run build` passed.
- Browser verification di `http://127.0.0.1:5173` passed untuk:
  - tambah exercise custom,
  - simpan set,
  - ubah tampilan ke lbs,
  - ubah bahasa ke Indonesia,
  - refresh browser dan memastikan data/preferensi tetap ada,
  - tampilan mobile tanpa horizontal overflow,
  - tanpa console error.

Catatan untuk chat/sesi berikutnya:

- Jangan mulai ulang implementasi Issue 2-7 kecuali ada review feedback dari PR #9.
- Lanjutkan dari branch `feature/mvp-remaining-issues` jika perlu memperbaiki PR #9.
- Jika PR #9 sudah di-merge, pindah ke `development` dan pull terbaru sebelum lanjut.
- Step berikutnya yang disebut user adalah fase Test-Driven Development/documentation evidence; gunakan `docs/05-tdd-and-testing.md` untuk mencatat bukti TDD dan verifikasi jika diminta.

## Vertical Slice Order

Ikuti urutan dari `docs/03-vertical-slice-issues.md`:

1. Pengguna dapat memilih exercise dari katalog default yang disepakati.
2. Pengguna dapat mencari dan memfilter exercise.
3. Pengguna dapat menambahkan exercise custom.
4. Pengguna dapat mencatat set dan melihat 3 catatan terakhir.
5. Pengguna dapat melihat riwayat per exercise.
6. Pengguna dapat mengedit dan menghapus catatan set.
7. Pengguna dapat menyimpan data dan preferensi di browser.

Jangan mengerjakan issue yang belum menjadi scope branch saat ini.

Contoh:

- Jika branch adalah `feature/exercise-search-filter`, jangan menambahkan form catat set.
- Jika branch adalah `feature/log-set`, jangan menambahkan edit/delete kecuali diperlukan sebagai dependency minimal.

## Sub-Agent Rules

Saat memakai sub-agent:

- Berikan satu issue spesifik kepada satu sub-agent.
- Jelaskan file atau area yang boleh disentuh.
- Jangan biarkan dua sub-agent mengedit file yang sama secara bersamaan kecuali benar-benar diperlukan.
- Sub-agent harus membaca `AGENTS.md`, `docs/02-prd.md`, `docs/03-vertical-slice-issues.md`, dan `docs/04-design.md` sebelum coding.
- Sub-agent tidak boleh revert perubahan agent lain.
- Sub-agent harus menjaga scope tetap kecil dan sesuai acceptance criteria issue.
- Sub-agent harus melaporkan file yang diubah, test yang dijalankan, dan risiko yang tersisa.

Template prompt sub-agent:

```text
Baca AGENTS.md, docs/02-prd.md, docs/03-vertical-slice-issues.md, dan docs/04-design.md.
Kerjakan hanya Issue X: <judul issue>.
Gunakan branch feature/<nama-branch> dari development.
Jangan mengerjakan issue lain.
Ikuti acceptance criteria di docs/03-vertical-slice-issues.md.
Gunakan TDD untuk helper/logika penting.
Setelah selesai, jalankan npm test dan npm run build.
Laporkan file yang diubah, hasil test, dan hal yang perlu diverifikasi manual.
```

## TDD dan Testing Workflow

Untuk setiap issue implementasi:

1. Baca acceptance criteria issue.
2. Tulis test kecil untuk logika penting sebelum implementasi jika memungkinkan.
3. Jalankan test dan pastikan gagal karena fitur belum ada.
4. Implement solusi paling kecil.
5. Jalankan test sampai hijau.
6. Jalankan build.
7. Lakukan verifikasi manual di browser untuk alur user.
8. Dokumentasikan bukti TDD dan verifikasi di `docs/05-tdd-and-testing.md` pada akhir fase testing.

Command standar:

```powershell
npm test
npm run build
npm run dev
```

## UI/UX Constraints

Desain harus tetap kecil dan praktis.

- Mobile-first.
- Halaman pertama langsung menampilkan workflow input, bukan landing page.
- Semua input punya label terlihat.
- Error validasi muncul dekat field yang bermasalah.
- Tombol dan kontrol cukup besar untuk layar mobile.
- Jangan memakai UI yang terlalu dekoratif.
- Jangan menambahkan fitur di luar PRD hanya karena mudah.

## Data dan Storage Constraints

MVP tidak memakai backend.

- Data internal disimpan di browser.
- Data berat disimpan sebagai kg integer.
- Tampilan lbs hanya hasil konversi dari kg dan dibulatkan ke bilangan terdekat.
- Bahasa default adalah English.
- Preferensi bahasa dan satuan disimpan di browser.

## GitHub Issues Reminder

GitHub Issues sempat tidak bisa dibuat otomatis dari environment ini karena API issue creation timeout.

User memutuskan membuat GitHub Issues manual dari:

```text
docs/03-vertical-slice-issues.md
```

Sebelum delivery akhir, pastikan:

- Semua issue vertical slice sudah ada di GitHub Issues.
- Issue yang selesai punya checklist acceptance criteria dicentang.
- PR mencantumkan `Closes #<nomor-issue>` jika sesuai.
- Issue yang selesai ditutup setelah PR merge ke `development`.

## CLI Startup Checklist

Jika sesi CLI baru dimulai, lakukan ini dulu:

```powershell
git status --short --branch
git branch --show-current
git fetch origin
```

Pastikan tidak sedang di `master` sebelum coding.

Jika akan mulai issue baru:

```powershell
git switch development
git pull --ff-only origin development
git switch -c feature/<nama-issue>
```

Jika ada perubahan lokal yang tidak dikenal, jangan reset atau checkout paksa. Baca dulu perubahan tersebut dan tanyakan jika konflik dengan task.

## Delivery Notes

Setiap selesai issue:

- Jalankan `npm test`.
- Jalankan `npm run build`.
- Preview manual di browser jika menyentuh UI.
- Commit dengan pesan singkat yang menjelaskan fitur.
- Push feature branch.
- Buat PR ke `development`.
- Update GitHub Issue terkait.

Jangan merge ke `master` sampai seluruh MVP siap untuk final delivery.
