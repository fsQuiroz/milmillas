export const number = (n: number): string => {
  if (n === null || n === undefined) return '';
  return Math.floor(n).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
