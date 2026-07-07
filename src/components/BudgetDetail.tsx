import { useEffect, useState } from "react";
import BudgetCard from "./BudgetCard";
import { getBudgetData, type BudgetItem } from "../services/googleSheet";

type BudgetDetailProps = {
  budgetType: string;
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BudgetDetail({ budgetType }: BudgetDetailProps) {
  const [item, setItem] = useState<BudgetItem | null>(null);

  useEffect(() => {
    getBudgetData().then((data) => {
      const found = data.find((row) => row.ประเภทงบ === budgetType);
      setItem(found || null);
    });
  }, [budgetType]);

  if (!item) {
    return <div className="rounded-3xl bg-white p-6 shadow">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="max-w-3xl">
      <BudgetCard
        title={item.ประเภทงบ}
        budget={formatMoney(Number(item.ได้รับจัดสรร))}
        paid={formatMoney(Number(item.เบิกจ่าย))}
        percent={`${item.ร้อยละ}%`}
      />

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-xl font-bold text-blue-950">รายละเอียดเพิ่มเติม</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-slate-500">ได้รับโอน</p>
            <p className="text-lg font-bold text-blue-950">
              {formatMoney(Number(item.ได้รับโอน))}
            </p>
          </div>

          <div>
            <p className="text-slate-500">คงเหลือ</p>
            <p className="text-lg font-bold text-blue-950">
              {formatMoney(Number(item.คงเหลือ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}