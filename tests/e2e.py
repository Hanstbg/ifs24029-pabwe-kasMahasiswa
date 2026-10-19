"""Uji end-to-end + pengambilan screenshot.
Jalankan: pip install playwright && playwright install chromium && python tests/e2e.py
"""
import pathlib, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "src" / "index.html").as_uri()
IMG = ROOT / "assets" / "images"
IMG.mkdir(parents=True, exist_ok=True)
results = []

def check(name, cond):
    results.append((name, bool(cond)))
    print(("PASS " if cond else "FAIL ") + name)

def add(page, title, amount, cat="Makanan", date="2026-10-19"):
    page.fill("#title", title); page.fill("#amount", amount)
    page.select_option("#category", cat); page.fill("#date", date)
    page.click("button[type=submit]")

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1000, "height": 780})
    page.goto(URL)
    page.screenshot(path=str(IMG / "01-awal.png"), full_page=True)
    check("E2E-01 tampilan awal menampilkan 'Belum ada data'", page.is_visible("#empty"))

    add(page, "Makan siang", "15.000")
    check("E2E-02 input '15.000' tersimpan sebagai Rp15.000", page.inner_text("#total") == "Rp15.000")

    add(page, "Bensin", "abc", "Transport")
    err = page.inner_text("#errors")
    page.screenshot(path=str(IMG / "02-validasi-error.png"), full_page=True)
    check("E2E-03 nominal 'abc' ditolak dengan pesan error", "angka" in err)
    check("E2E-04 data tidak bertambah setelah input salah", page.locator("#list li").count() == 1)

    add(page, "Ojek ke kampus", "Rp 12.500", "Transport", "2026-10-18")
    add(page, "Buku diktat", "85000", "Pendidikan", "2026-10-17")
    check("E2E-05 total tiga data = Rp112.500", page.inner_text("#total") == "Rp112.500")
    page.screenshot(path=str(IMG / "03-data-terisi.png"), full_page=True)

    page.select_option("#f-category", "Transport")
    check("E2E-06 filter Transport -> total Rp12.500", page.inner_text("#total") == "Rp12.500")
    page.screenshot(path=str(IMG / "04-filter-kategori.png"), full_page=True)
    page.select_option("#f-category", "")

    page.reload()
    check("E2E-07 data tetap ada setelah reload (localStorage)", page.locator("#list li").count() == 3)

    add(page, '<img src=x onerror="window.__xss=1">', "1000", "Lainnya")
    check("E2E-08 judul berisi HTML tidak dieksekusi (anti-XSS)", page.evaluate("window.__xss") is None)
    check("E2E-09 judul HTML ditampilkan sebagai teks biasa", "<img src=x" in page.inner_text("#list"))

    page.click("button.del >> nth=0")
    check("E2E-10 tombol Hapus mengurangi satu data", page.locator("#list li").count() == 3)
    b.close()

failed = [n for n, ok in results if not ok]
print(f"\nRingkasan: {len(results)-len(failed)}/{len(results)} lulus")
sys.exit(1 if failed else 0)
