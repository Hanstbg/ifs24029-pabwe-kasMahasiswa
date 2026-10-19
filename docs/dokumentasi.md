# Dokumentasi Penggunaan AI dan Evaluasi

**Alat AI:** Claude (Anthropic). **Prinsip:** AI sebagai asisten; mahasiswa memeriksa, menguji, dan memutuskan.

## A. Alur kerja
1. Tentukan kebutuhan (F1–F7, lihat proposal Bab II).
2. Susun prompt yang spesifik (teknologi, batasan, format data, kriteria keluaran).
3. Periksa kode: apakah dipahami? Adakah kasus tepi yang terlewat?
4. Tulis kasus uji dan jalankan.
5. Catat kegagalan sebagai bukti, kirim ke AI untuk perbaikan.
6. Periksa perbaikan, uji ulang, putuskan.

## B. Catatan iterasi (hasil nyata sesi 19 Oktober 2026)
| Iterasi | Hasil uji | Temuan | Perbaikan |
|---|---|---|---|
| v1 | 6/14 lulus | `parseFloat("15.000")` = 15; "Rp" tidak dikenali; nominal ≤ 0 lolos; judul spasi lolos; id `Date.now()` bisa kembar; tak ada `escapeHtml` | Regex format Indonesia, validasi rentang dan `trim`, id berpenghitung, `escapeHtml` |
| v2 | 14/14 lulus; UI 10/10 | – | Diterima |

## C. Log percakapan Anda sendiri (WAJIB DIISI)
Tugas menilai kemampuan Anda memberi instruksi dan mengevaluasi. Ulangi prompt pada proposal 3.3 dan 3.6 dengan kata-kata Anda sendiri, lalu isi:

| # | Prompt Anda (salin) | Ringkasan jawaban AI | Evaluasi Anda | Bukti (screenshot/berkas) |
|---|---|---|---|---|
| 1 | [ISI] | [ISI] | [ISI] | [ISI] |
| 2 | [ISI] | [ISI] | [ISI] | [ISI] |
| 3 | [ISI] | [ISI] | [ISI] | [ISI] |

## D. Pertanyaan yang sebaiknya bisa Anda jawab
- Mengapa `logic.js` dipisah dari `script.js`? (Agar fungsi murni bisa diuji tanpa browser.)
- Mengapa `parseFloat("15.000")` salah untuk Rupiah? (Titik dibaca desimal; di Indonesia ia pemisah ribuan.)
- Apa itu XSS dan bagaimana `escapeHtml` mencegahnya?
- Mengapa Rupiah disimpan sebagai bilangan bulat?
- Apa batasan `localStorage`? (Per peramban, tidak sinkron antarperangkat, bisa dihapus pengguna.)
- Bagian mana dari kode AI yang Anda tolak, dan mengapa?
