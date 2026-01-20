const colors = ['#E3E993', '#F2C1D5', '#ACD9CF'];
let currentIndex = -1;

// Глобальный (на уровне модуля) цикл: каждый вызов возвращает следующий цвет по кругу.
export function getNextColor(): string {
  currentIndex = (currentIndex + 1) % colors.length;
  return colors[currentIndex];
}

