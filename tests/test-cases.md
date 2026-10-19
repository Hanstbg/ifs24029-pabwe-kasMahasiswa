# Dokumentasi Pengujian KasMahasiswa

## Uji unit (`node --test tests/logic.test.js`)
Hasil pada sesi pengembangan 19 Oktober 2026 (dijalankan benar-benar):

| Versi `logic.js` | Lulus | Gagal | Bukti |
|---|---|---|---|
| 1 (draf awal AI) | 6 | 8 (TC-02, 03, 05, 06, 07, 09, 10, 14) | `assets/images/05-uji-v1-gagal.png` |
| 2 (setelah perbaikan) | 14 | 0 | `assets/images/06-uji-v2-lulus.png` |

| Kode | Kasus | Harapan |
|---|---|---|
| TC-01 | parseAmount("15000") | 15000 |
| TC-02 | parseAmount("15.000") | 15000 |
| TC-03 | parseAmount("Rp 25.000") | 25000 |
| TC-04 | parseAmount("abc") | NaN |
| TC-05 | nominal -5000 | ditolak |
| TC-06 | nominal 0 | ditolak |
| TC-07 | judul "   " | ditolak |
| TC-08 | data valid | tanpa error |
| TC-09 | addExpense | array asal tidak berubah; id unik |
| TC-10 | deleteExpense | hapus sesuai id |
| TC-11 | filter bulan & kategori | sesuai filter |
| TC-12 | summarize | total & per kategori benar |
| TC-13 | formatRupiah(1500000) | "Rp1.500.000" |
| TC-14 | escapeHtml("<img ...>") | tag dinetralkan |

## Uji UI (`python tests/e2e.py`)
Hasil pada sesi pengembangan: 10/10 lulus (E2E-01 sampai E2E-10, daftar lengkap di `tests/e2e.py` dan proposal Bab IV).

## Pengujian manual yang harus Anda lakukan sendiri
Isi kolom "Hasil Anda" setelah menjalankan sendiri di komputer Anda.

| Skenario | Peramban | Hasil Anda | Tanggal |
|---|---|---|---|
| Tambah data dengan "Rp 15.000" | [ISI] | [ISI] | [ISI] |
| Muat ulang halaman, data tetap ada | [ISI] | [ISI] | [ISI] |
| Tampilan di lebar layar ponsel (DevTools) | [ISI] | [ISI] | [ISI] |
| Uji di peramban kedua (Firefox/Edge) | [ISI] | [ISI] | [ISI] |
