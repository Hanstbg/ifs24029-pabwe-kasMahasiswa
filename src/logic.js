/* logic.js - VERSI 2 (setelah evaluasi & perbaikan)
   Fungsi murni (tanpa DOM) agar mudah diuji dengan Node.js. */
(function (root) {
  const CATEGORIES = ['Makanan', 'Transport', 'Pendidikan', 'Hiburan', 'Lainnya'];

  // "Rp 15.000" -> 15000 ; "1.500,50" -> 1501 ; "abc" -> NaN
  function parseAmount(text) {
    const cleaned = String(text).replace(/rp/gi, '').replace(/\s/g, '');
    if (!/^\d{1,3}(\.\d{3})*(,\d+)?$|^\d+(,\d+)?$/.test(cleaned)) return NaN;
    return Math.round(Number(cleaned.replace(/\./g, '').replace(',', '.')));
  }

  function validateExpense(input) {
    const errors = [];
    if (!input.title || !String(input.title).trim()) errors.push('Judul wajib diisi.');
    if (!Number.isFinite(input.amount)) errors.push('Nominal harus berupa angka.');
    else if (input.amount <= 0) errors.push('Nominal harus lebih dari 0.');
    if (!input.date) errors.push('Tanggal wajib diisi.');
    if (!CATEGORIES.includes(input.category)) errors.push('Kategori tidak valid.');
    return errors;
  }

  let seq = 0;
  function newId() { return Date.now().toString(36) + '-' + (seq++).toString(36); }

  function addExpense(list, input) {
    const item = { id: newId(), title: String(input.title).trim(), amount: input.amount,
                   category: input.category, date: input.date };
    return list.concat([item]);
  }

  function deleteExpense(list, id) {
    return list.filter((e) => e.id !== id);
  }

  function filterExpenses(list, month, category) {
    return list.filter((e) =>
      (!month || e.date.slice(0, 7) === month) &&
      (!category || e.category === category));
  }

  function summarize(list) {
    const byCategory = {};
    let total = 0;
    list.forEach((e) => {
      total += e.amount;
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });
    return { total, byCategory };
  }

  function formatRupiah(n) {
    return 'Rp' + Math.round(n).toLocaleString('id-ID');
  }

  // Mencegah XSS: judul pengguna tidak boleh dimasukkan mentah ke innerHTML.
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  const api = { CATEGORIES, parseAmount, validateExpense, addExpense, deleteExpense,
                filterExpenses, summarize, formatRupiah, escapeHtml };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.KasLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
