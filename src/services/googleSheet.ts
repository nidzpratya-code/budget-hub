export type BudgetItem = {
  ประเภทงบ: string;
  ได้รับจัดสรร: number;
  ได้รับโอน: number;
  เบิกจ่าย: number;
  คงเหลือ: number;
  ร้อยละ: number;
};

const BUDGET_API_URL =
  "https://script.google.com/macros/s/AKfycbz_bX4fzNp2lq_117UjlDoDXC2H88QFpHpCxZT_Fe0SeMohCGwNhSU4ZxdH4QCP0Dcz/exec";

export async function getBudgetData(): Promise<BudgetItem[]> {
  const response = await fetch(BUDGET_API_URL);
  const data = await response.json();
  return data;
}
export type AppUser = {
  username: string;
  password: string;
  name: string;
  role: "admin" | "province" | "manager" | "region";
  province: string;
  region: string;
  active: boolean | string;
};

const USERS_API_URL =
  "https://script.google.com/macros/s/AKfycbyD0LrsYB506BOGSJu-BVTQWsoVbd3lI-iDlcrHdZKj7bNKlX3OH_7p6x0f5fVlwcuKXw/exec";

export async function getUsers(): Promise<AppUser[]> {
  const response = await fetch(USERS_API_URL);
  return response.json();
}