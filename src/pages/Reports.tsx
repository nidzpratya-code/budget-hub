import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getBudgetData, type BudgetItem } from "../services/googleSheet";

function formatMoney(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Reports() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);

  useEffect(() => {
    getBudgetData().then((data) => setBudgets(data));
  }, []);

  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-950">รายงานสรุปงบประมาณ</h2>
        <p className="text-slate-500">ข้อมูลจาก Google Sheets</p>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white p-4 shadow-lg">
        <table className="w-full min-w-[800px] border-collapse text-left">
          <thead>
            <tr className="border-b bg-blue-950 text-white">
              <th className="p-4">ประเภทงบ</th>
              <th className="p-4 text-right">ได้รับจัดสรร</th>
              <th className="p-4 text-right">ได้รับโอน</th>
              <th className="p-4 text-right">เบิกจ่าย</th>
              <th className="p-4 text-right">คงเหลือ</th>
              <th className="p-4 text-right">ร้อยละ</th>
            </tr>
          </thead>

          <tbody>
            {budgets.map((item) => (
              <tr key={item.ประเภทงบ} className="border-b hover:bg-sky-50">
                <td className="p-4 font-bold text-blue-950">{item.ประเภทงบ}</td>
                <td className="p-4 text-right">{formatMoney(Number(item.ได้รับจัดสรร))}</td>
                <td className="p-4 text-right">{formatMoney(Number(item.ได้รับโอน))}</td>
                <td className="p-4 text-right">{formatMoney(Number(item.เบิกจ่าย))}</td>
                <td className="p-4 text-right">{formatMoney(Number(item.คงเหลือ))}</td>
                <td className="p-4 text-right font-bold">{item.ร้อยละ}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}