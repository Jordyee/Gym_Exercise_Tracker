# Laporan TDD dan Pengujian

Dokumen ini mencatat bukti TDD untuk beberapa isu potongan vertikal MVP. Fokus pengujian adalah perilaku yang terlihat dari antarmuka publik aplikasi atau helper domain publik yang dipakai oleh komponen UI, bukan detail implementasi privat.

## Isu yang diuji
[Issue #3 - Pengguna dapat menambahkan exercise custom](https://github.com/Jordyee/Gym_Exercise_Tracker/issues/3)

## Perilaku yang diuji
Pengguna dapat menambahkan exercise custom yang valid, lalu exercise tersebut tetap bisa ditemukan melalui search dan filter muscle group.

## Antarmuka Publik (Public Interface)
Fungsi publik `createCustomExercise`, `validateCustomExerciseInput`, dan `filterExercises` dari `src/lib/exercise.js`. Fungsi ini mewakili perilaku form tambah exercise custom dan daftar exercise yang dipakai UI.

## RED
Pengujian pertama ditulis di `tests/exercise.test.js` untuk perilaku custom exercise:

```js
it("keeps custom exercises searchable and filterable", () => {
  const result = createCustomExercise(
    {
      name: "Farmer Carry",
      muscleGroup: "Upper Body",
    },
    DEFAULT_EXERCISES,
  );
  const exercises = [...DEFAULT_EXERCISES, result.exercise];

  const filteredExercises = filterExercises(exercises, {
    query: "farmer",
    muscleGroup: "Upper Body",
  });

  expect(filteredExercises).toEqual([result.exercise]);
});
```

Bukti gagal awal: sub-agent Issue 3 melaporkan TDD red karena helper custom exercise belum tersedia sebelum implementasi. Pada kondisi awal, import/fungsi `createCustomExercise` belum ada sehingga test custom exercise tidak dapat lolos.

## GREEN
Implementasi minimal:

- Menambahkan `validateCustomExerciseInput` untuk validasi nama dan muscle group.
- Menambahkan `createCustomExercise` untuk membuat object exercise custom dengan `id`, `name`, `muscleGroup`, dan `source: "custom"`.
- Memakai `filterExercises` yang sudah ada agar daftar gabungan default + custom tetap searchable dan filterable.

## REFACTOR
Refaktor dilakukan dengan memisahkan validasi input custom exercise dari pembuatan exercise. Pembuatan id juga dibuat stabil melalui slug nama exercise dan suffix angka jika id sudah dipakai.

## Hasil Akhir
Lolos (Pass). `npm test` akhir lulus dan test custom exercise menjadi bagian dari total 29 test yang berhasil.

---

## Isu yang diuji
[Issue #4 - Pengguna dapat mencatat set dan melihat 3 catatan terakhir](https://github.com/Jordyee/Gym_Exercise_Tracker/issues/4)

## Perilaku yang diuji
Pengguna dapat menyimpan set untuk exercise aktif, berat `0 kg` tetap valid, nilai numerik disimpan sebagai integer, dan aplikasi hanya menampilkan 3 catatan terakhir untuk exercise aktif.

## Antarmuka Publik (Public Interface)
Fungsi publik `validateSetInput`, `createSetRecord`, dan `getRecentRecords` dari `src/lib/records.js`. Fungsi ini mewakili perilaku form catat set dan panel 3 catatan terakhir.

## RED
Pengujian pertama ditulis di `tests/records.test.js` untuk validasi dan pembuatan set:

```js
it("accepts zero weight with positive integer reps, set number, and a date", () => {
  const validation = validateSetInput({
    exerciseId: "bench-press",
    weightKg: "0",
    reps: "10",
    setNumber: "1",
    date: "2026-06-11",
  });

  expect(validation).toEqual({
    isValid: true,
    errors: {},
  });
});
```

Test berikutnya memastikan 3 catatan terakhir:

```js
it("returns only the latest three records for the active exercise", () => {
  const recentRecords = getRecentRecords(records, "bench-press");

  expect(recentRecords.map((record) => record.id)).toEqual([
    "bench-latest",
    "bench-second",
    "bench-third",
  ]);
});
```

Bukti gagal awal: sub-agent Issue 4 melaporkan TDD coverage untuk validasi input set dan urutan recent records sebelum implementasi. Pada kondisi awal, `validateSetInput`, `createSetRecord`, dan `getRecentRecords` belum tersedia sehingga test gagal pada RED.

## GREEN
Implementasi minimal:

- Menambahkan validasi input set: exercise wajib ada, berat harus integer non-negatif, reps dan set number harus integer positif, tanggal wajib ada.
- Menambahkan `createSetRecord` untuk menyimpan `weightKg`, `reps`, dan `setNumber` sebagai number integer.
- Menambahkan `getRecentRecords` untuk filter berdasarkan `exerciseId`, sort terbaru, dan limit 3 data.

## REFACTOR
Validasi angka dipisah menjadi helper kecil `isNonNegativeInteger` dan `isPositiveInteger`. Sorting catatan terbaru dipusatkan di `compareNewestRecords` agar recent records dan history memakai aturan urutan yang konsisten.

## Hasil Akhir
Lolos (Pass). `npm test` akhir lulus dan alur manual menyimpan set juga sudah diverifikasi di browser.

---

## Isu yang diuji
[Issue #6 - Pengguna dapat mengedit dan menghapus catatan set](https://github.com/Jordyee/Gym_Exercise_Tracker/issues/6)

## Perilaku yang diuji
Pengguna dapat mengedit field catatan set tanpa mengganti identitas record, edit invalid ditolak, dan delete hanya menghapus record yang diminta.

## Antarmuka Publik (Public Interface)
Fungsi publik `updateSetRecord` dan `deleteSetRecord` dari `src/lib/records.js`. Fungsi ini mewakili perilaku modal edit dan aksi hapus setelah konfirmasi UI.

## RED
Pengujian pertama ditulis di `tests/records.test.js` untuk update record:

```js
it("updates editable fields while preserving the record identity and creation timestamp", () => {
  const result = updateSetRecord(records, "set-1", input, "2026-06-12T09:30:00.000Z");

  expect(result.record).toEqual({
    id: "set-1",
    exerciseId: "lat-pulldown",
    weightKg: 35,
    reps: 12,
    setNumber: 3,
    date: "2026-06-12",
    createdAt: "2026-06-10T08:00:00.000Z",
    updatedAt: "2026-06-12T09:30:00.000Z",
  });
});
```

Pengujian delete:

```js
it("removes the requested record and leaves other records in place", () => {
  const updatedRecords = deleteSetRecord(records, "set-2");

  expect(updatedRecords.map((record) => record.id)).toEqual([
    "set-1",
    "set-3",
  ]);
});
```

Bukti gagal awal: sub-agent Issue 6 melaporkan TDD red/green untuk update dan delete helpers. Pada kondisi awal, helper edit/delete belum ada sehingga test gagal pada RED.

## GREEN
Implementasi minimal:

- `updateSetRecord` memakai validasi yang sama dengan create set.
- Record yang diedit mempertahankan `id` dan `createdAt`, lalu memperbarui field editable dan `updatedAt`.
- `deleteSetRecord` mengembalikan array tanpa record yang id-nya diminta.

## REFACTOR
Validasi create dan edit disatukan lewat `validateSetInput`, sehingga aturan input tidak bercabang antara form create dan modal edit. Penghapusan dibuat sebagai fungsi pure agar mudah dites dan mudah dipakai oleh UI setelah konfirmasi.

## Hasil Akhir
Lolos (Pass). `npm test` akhir lulus dan browser verification akhir tidak menemukan console error.

---

## Isu yang diuji
[Issue #7 - Pengguna dapat menyimpan data dan preferensi di browser](https://github.com/Jordyee/Gym_Exercise_Tracker/issues/7)

## Perilaku yang diuji
Data custom exercise, set records, preferensi bahasa, dan preferensi satuan tersimpan di browser storage. Data berat internal tetap integer kg walaupun tampilan bisa berubah ke lbs.

## Antarmuka Publik (Public Interface)
Fungsi publik `saveAppState` dan `loadAppState` dari `src/lib/storage.js`, serta `formatWeight` dan `kilogramsToRoundedPounds` dari `src/lib/units.js`. Fungsi ini mewakili perilaku persistensi localStorage dan tampilan satuan berat di UI.

## RED
Pengujian pertama ditulis di `tests/storage.test.js`:

```js
it("saves and loads custom exercises, set records, and preferences", () => {
  saveAppState(appState, storage);

  expect(loadAppState(storage)).toEqual(appState);
  expect(JSON.parse(storage.getItem(APP_STORAGE_KEY)).setRecords[0].weightKg).toBe(42);
});
```

Pengujian konversi satuan ditulis di `tests/units.test.js`:

```js
it("converts kg to rounded whole pounds for display only", () => {
  expect(kilogramsToRoundedPounds(20)).toBe(44);
  expect(formatWeight(20, "lbs")).toBe("44 lbs");
});
```

Bukti gagal awal: sebelum implementasi Issue 7, belum ada helper storage dan unit formatting yang memenuhi kontrak ini, sehingga test RED gagal karena fungsi belum tersedia atau belum mengembalikan struktur state yang diharapkan.

## GREEN
Implementasi minimal:

- Menambahkan `APP_STORAGE_KEY`, `DEFAULT_PREFERENCES`, `loadAppState`, dan `saveAppState`.
- Menyimpan `customExercises`, `setRecords`, dan `preferences` sebagai satu app state.
- Menambahkan fallback default jika storage kosong atau invalid.
- Menambahkan konversi `kg` ke `lbs` dengan pembulatan untuk tampilan saja.

## REFACTOR
Normalisasi preferensi dipusatkan di storage layer agar nilai bahasa dan satuan yang tidak valid kembali ke default aman. Konversi berat dipisahkan ke `src/lib/units.js` supaya penyimpanan data tetap menggunakan `weightKg` integer dan UI hanya bertanggung jawab pada format tampilan.

## Hasil Akhir
Lolos (Pass). `npm test` akhir lulus. Browser verification akhir juga memastikan custom exercise, set record, unit `lbs`, dan bahasa Indonesia tetap ada setelah refresh.

---

## Verifikasi Akhir

Command akhir yang dijalankan:

```powershell
npm test
npm run build
```

Hasil:

- `npm test`: Passed, 4 test files, 29 tests.
- `npm run build`: Passed.
- Browser verification: Passed untuk tambah exercise custom, simpan set, ubah unit ke lbs, ubah bahasa ke Indonesia, refresh browser, data/preferensi tetap ada, tampilan mobile tanpa horizontal overflow, dan tanpa console error.
