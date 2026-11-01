/** Zero-pad to two digits: 3 → "03". */
export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Display code for the project at a zero-based index: 0 → "P-01". */
export const projectCode = (index: number) => `P-${pad2(index + 1)}`;
