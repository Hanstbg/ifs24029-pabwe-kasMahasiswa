# KasMahasiswa

Aplikasi web sederhana untuk mencatat pengeluaran harian mahasiswa. Dikembangkan untuk **Tugas I – 11S3133 Pengembangan Aplikasi Berbasis Web (PABWE)** dengan Generative AI (Claude) sebagai asisten pemrograman. Kode AI **tidak diterima begitu saja**: setiap versi diuji, kesalahan dicatat, lalu diperbaiki (lihat `docs/dokumentasi.md`).

> Pemilik: [ISI NAMA] – [ISI NIM] – Kelas [ISI KELAS]

## Fitur
- Tambah pengeluaran (judul, nominal, kategori, tanggal) dengan validasi.
- Nominal berformat Indonesia: `15000`, `15.000`, `Rp 15.000`.
- Hapus pengeluaran; filter per bulan dan kategori.
- Total dan rincian per kategori; data tersimpan di `localStorage`.
- Judul pengguna di-escape sehingga aman dari XSS.

## Teknologi
HTML, CSS, JavaScript murni (tanpa framework) · Node.js ≥ 18 (`node:test`) untuk uji unit · Python + Playwright untuk uji UI dan screenshot.

## Menjalankan aplikasi
Tidak perlu instalasi. Buka `src/index.html` di peramban (klik dua kali).

## Menjalankan pengujian
```bash
# Uji unit (14 kasus) - butuh Node.js saja
node --test tests/logic.test.js

# Uji UI (10 kasus) + screenshot ke assets/images/
pip install playwright
playwright install chromium
python tests/e2e.py
```

## Struktur proyek
```
├── README.md
├── proposal/        proposal.md, Proposal_Tugas_I_PABWE.docx/.pdf
├── src/             index.html, style.css, logic.js, script.js
├── tests/           logic.test.js, e2e.py, test-cases.md
├── assets/          images/ (screenshot), diagrams/ (.dot + .png)
└── docs/            dokumentasi.md, panduan-pengumpulan.md
```

## Dokumentasi
- Proses penggunaan AI dan evaluasi: [`docs/dokumentasi.md`](docs/dokumentasi.md)
- Rencana dan hasil pengujian: [`tests/test-cases.md`](tests/test-cases.md)
- Langkah GitHub dan checklist pengumpulan: [`docs/panduan-pengumpulan.md`](docs/panduan-pengumpulan.md)
