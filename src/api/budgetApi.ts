import type { BudgetItem } from "../types/budget";

const BUDGET_API_URL =
  "https://script.google.com/macros/s/AKfycbz_bX4fzNp2lq_117UjlDoDXC2H88QFpHpCxZT_Fe0SeMohCGwNhSU4ZxdH4QCP0Dcz/exec";

export async function fetchBudgetData(): Promise<BudgetItem[]> {
  const response = await fetch(BUDGET_API_URL);
  return response.json();
}