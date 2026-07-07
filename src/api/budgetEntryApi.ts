const BUDGET_API =
  "https://script.google.com/macros/s/AKfycbz0isyNbDkTG_u9bHZDhSW4M3CzVqwP_lMlZDlgMx9w_z5tZ4hfaqVjgmpteFrdpYSxcA/exec";

export interface ProjectItem {
  projectCode: string;
  projectName: string;
  budgetType: string;
  fiscalYear: string;
  active: boolean | string;
}

export interface BudgetEntry {
  fiscalYear: string;
  province: string;
  budgetType: string;
  projectCode: string;
  allocated: number;
  transferred: number;
  paid: number;
  updatedBy: string;
}

async function readJson(response: Response) {
  const text = await response.text();
  return JSON.parse(text);
}

export async function getProjects(
  fiscalYear = "2569",
  budgetType = "งบดำเนินงาน"
) {
  const url =
    `${BUDGET_API}?action=getProjects` +
    `&fiscalYear=${encodeURIComponent(fiscalYear)}` +
    `&budgetType=${encodeURIComponent(budgetType)}`;

  const response = await fetch(url);
  return readJson(response);
}

export async function saveBudget(data: BudgetEntry) {
  const response = await fetch(BUDGET_API, {
    method: "POST",
    body: JSON.stringify({
      action: "saveBudget",
      ...data,
    }),
  });

  return readJson(response);
}

export async function getBudget(
  fiscalYear = "2569",
  province = "",
  region = ""
) {
  const url =
    `${BUDGET_API}?action=getBudget` +
    `&fiscalYear=${encodeURIComponent(fiscalYear)}` +
    `&province=${encodeURIComponent(province)}` +
    `&region=${encodeURIComponent(region)}`;

  const response = await fetch(url);
  return readJson(response);
}