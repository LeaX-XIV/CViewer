function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function orderNumbersDesc(a, b) {
  return b.endDate - a.endDate;
}

export {formatDate, orderNumbersDesc };