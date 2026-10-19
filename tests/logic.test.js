// Jalankan: node --test tests/
const test = require('node:test');
const assert = require('node:assert');
const L = require('../src/logic.js');

const valid = { title: 'Makan siang', amount: 15000, category: 'Makanan', date: '2026-10-19' };

test('TC-01 parseAmount menerima angka polos', () => assert.strictEqual(L.parseAmount('15000'), 15000));
test('TC-02 parseAmount memahami pemisah ribuan titik', () => assert.strictEqual(L.parseAmount('15.000'), 15000));
test('TC-03 parseAmount memahami awalan Rp', () => assert.strictEqual(L.parseAmount('Rp 25.000'), 25000));
test('TC-04 parseAmount menolak teks non-angka', () => assert.ok(Number.isNaN(L.parseAmount('abc'))));
test('TC-05 validasi menolak nominal negatif', () =>
  assert.ok(L.validateExpense({ ...valid, amount: -5000 }).length > 0));
test('TC-06 validasi menolak nominal nol', () =>
  assert.ok(L.validateExpense({ ...valid, amount: 0 }).length > 0));
test('TC-07 validasi menolak judul hanya spasi', () =>
  assert.ok(L.validateExpense({ ...valid, title: '   ' }).length > 0));
test('TC-08 validasi menerima data benar', () => assert.deepStrictEqual(L.validateExpense(valid), []));
test('TC-09 addExpense tidak mengubah array asal & id unik', () => {
  const a = [];
  const b = L.addExpense(a, valid);
  const c = L.addExpense(b, valid);
  assert.strictEqual(a.length, 0);
  assert.notStrictEqual(c[0].id, c[1].id);
});
test('TC-10 deleteExpense menghapus sesuai id', () => {
  const l = L.addExpense(L.addExpense([], valid), valid);
  assert.strictEqual(L.deleteExpense(l, l[0].id).length, 1);
});
test('TC-11 filter per bulan dan kategori', () => {
  const l = [
    { id: 1, title: 'a', amount: 1000, category: 'Makanan', date: '2026-10-01' },
    { id: 2, title: 'b', amount: 2000, category: 'Transport', date: '2026-10-02' },
    { id: 3, title: 'c', amount: 3000, category: 'Makanan', date: '2026-09-30' },
  ];
  assert.strictEqual(L.filterExpenses(l, '2026-10', 'Makanan').length, 1);
  assert.strictEqual(L.filterExpenses(l, '2026-10', '').length, 2);
});
test('TC-12 summarize menghitung total & per kategori', () => {
  const l = [
    { id: 1, amount: 15000, category: 'Makanan' },
    { id: 2, amount: 5000, category: 'Transport' },
    { id: 3, amount: 10000, category: 'Makanan' },
  ];
  assert.deepStrictEqual(L.summarize(l), { total: 30000, byCategory: { Makanan: 25000, Transport: 5000 } });
});
test('TC-13 formatRupiah memakai pemisah titik', () => assert.strictEqual(L.formatRupiah(1500000), 'Rp1.500.000'));
test('TC-14 escapeHtml menetralkan tag HTML', () =>
  assert.strictEqual(L.escapeHtml('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;'));
