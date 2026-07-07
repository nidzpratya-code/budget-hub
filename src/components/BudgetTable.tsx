import type { BudgetItem } from "../services/googleSheet";

type BudgetTableProps = {
  data: BudgetItem[];
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BudgetTable({ data }: BudgetTableProps) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-lg">
      <h3 className="mb-4 text-xl font-bold text-blue-950">
        ตารางสรุปงบประมาณ
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="p-3">ประเภทงบ</th>
              <th className="p-3 text-right">ได้รับจัดสรร</th>
              <th className="p-3 text-right">ได้รับโอน</th>
              <th className="p-3 text-right">เบิกจ่าย</th>
              <th className="p-3 text-right">คงเหลือ</th>
              <th className="p-3 text-right">%</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.ประเภทงบ} className="border-b hover:bg-sky-50">
                <td className="p-3 font-bold text-blue-950">{item.ประเภทงบ}</td>
                <td className="p-3 text-right">{formatMoney(Number(item.ได้รับจัดสรร))}</td>
                <td className="p-3 text-right">{formatMoney(Number(item.ได้รับโอน))}</td>
                <td className="p-3 text-right">{formatMoney(Number(item.เบิกจ่าย))}</td>
                <td className="p-3 text-right">{formatMoney(Number(item.คงเหลือ))}</td>
                <td className="p-3 text-right font-bold">{item.ร้อยละ}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}