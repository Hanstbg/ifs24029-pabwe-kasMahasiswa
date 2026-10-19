/* script.js - menghubungkan logika (KasLogic) dengan tampilan (DOM) */
(function () {
  const L = window.KasLogic;
  const KEY = 'kasmahasiswa.v1';
  const $ = (id) => document.getElementById(id);
  let expenses = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }              // data rusak -> mulai kosong, jangan crash
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(expenses)); }

  function init() {
    L.CATEGORIES.forEach((c) => {
      $('category').add(new Option(c, c));
      $('f-category').add(new Option(c, c));
    });
    $('date').value = new Date().toISOString().slice(0, 10);
    $('form').addEventListener('submit', onSubmit);
    $('f-month').addEventListener('input', render);
    $('f-category').addEventListener('change', render);
    $('list').addEventListener('click', onDelete);
    render();
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const input = { title: $('title').value, amount: L.parseAmount($('amount').value),
                    category: $('category').value, date: $('date').value };
    const errors = L.validateExpense(input);
    $('errors').innerHTML = errors.map((m) => '<li>' + L.escapeHtml(m) + '</li>').join('');
    if (errors.length) return;
    expenses = L.addExpense(expenses, input);
    save();
    $('title').value = ''; $('amount').value = '';
    render();
  }

  function onDelete(ev) {
    const btn = ev.target.closest('button[data-id]');
    if (!btn) return;
    expenses = L.deleteExpense(expenses, btn.dataset.id);
    save();
    render();
  }

  function render() {
    const shown = L.filterExpenses(expenses, $('f-month').value, $('f-category').value)
      .sort((a, b) => b.date.localeCompare(a.date));
    const sum = L.summarize(shown);
    $('total').textContent = L.formatRupiah(sum.total);
    $('by-category').innerHTML = Object.keys(sum.byCategory).map((c) =>
      '<li><span>' + L.escapeHtml(c) + '</span><span>' + L.formatRupiah(sum.byCategory[c]) + '</span></li>').join('');
    $('list').innerHTML = shown.map((e) =>
      '<li><div class="info"><div>' + L.escapeHtml(e.title) + '</div><div class="meta">' +
      L.escapeHtml(e.category) + ' &middot; ' + L.escapeHtml(e.date) + '</div></div>' +
      '<span class="amt">' + L.formatRupiah(e.amount) + '</span>' +
      '<button class="del" data-id="' + L.escapeHtml(e.id) + '" aria-label="Hapus ' + L.escapeHtml(e.title) + '">Hapus</button></li>').join('');
    $('empty').hidden = shown.length > 0;
  }

  init();
})();
