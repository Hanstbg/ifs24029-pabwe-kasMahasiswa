# Panduan Repository dan Pengumpulan

> Ketentuan dari file tugas: individu; GitHub + ecourse; dosen dan asisten HARUS diberi akses; bobot proposal 70% (min. 5 halaman, memuat gambar & contoh pemrograman), repository 30%; waktu 1 minggu. Hal lain di bawah adalah rekomendasi.

## 1. Buat repository
1. Masuk ke github.com → **New repository**.
2. Nama: `kas-mahasiswa`. Visibility: **Private** (lalu undang dosen/asisten) atau Public.
3. Jangan centang "Add README" (sudah ada di proyek). Klik **Create repository**.

## 2. Perintah Git (jalankan di folder proyek)
```bash
git init
git branch -M main
git add README.md src/ tests/ assets/ docs/ proposal/
git commit -m "Tambah aplikasi KasMahasiswa, pengujian, dan dokumentasi awal"
git remote add origin https://github.com/<username-anda>/kas-mahasiswa.git
git push -u origin main
```
Disarankan commit bertahap (rekomendasi, agar riwayat memperlihatkan proses):
```bash
git add src/logic.js tests/logic.test.js && git commit -m "Draf logika dan uji unit"
git add src/ && git commit -m "Perbaiki parseAmount, validasi, id, escapeHtml"
git add proposal/ docs/ && git commit -m "Tambah proposal dan dokumentasi"
git push
```
Jika diminta login, gunakan Personal Access Token atau GitHub Desktop.

## 3. Beri akses dosen dan asisten
Settings → **Collaborators** (atau Manage access) → **Add people** → masukkan username GitHub dosen dan asisten ([ISI USERNAME DARI DOSEN]). Pastikan mereka menerima undangan.

## 4. Checklist akses
- [ ] Repository terbuka di akun lain/jendela incognito (jika Public) atau dosen/asisten tercantum di Collaborators (jika Private).
- [ ] Undangan collaborator sudah dikirim ke dosen dan asisten.
- [ ] Tautan repository sudah dicantumkan di halaman judul proposal dan diserahkan lewat ecourse.
- [ ] Riwayat commit lebih dari satu dan berisi pesan yang jelas.

## 5. Checklist akhir
- [ ] Identitas di halaman judul proposal, README, dan dokumentasi sudah diisi.
- [ ] Semua penanda **[ISI SENDIRI]** di proposal sudah diganti.
- [ ] Anda sudah menjalankan `node --test` dan `python tests/e2e.py` sendiri, dan membuka `src/index.html`.
- [ ] Screenshot dan percakapan AI milik Anda ditambahkan (Gambar 9–10).
- [ ] Proposal ≥ 5 halaman, memuat gambar dan contoh kode.
- [ ] Daftar isi dan referensi diperiksa; tautan referensi dibuka.
- [ ] Anda bisa menjelaskan setiap fungsi di `logic.js` (lihat `docs/dokumentasi.md` bagian D).
- [ ] Berkas final ada di repository dan diunggah ke ecourse.
