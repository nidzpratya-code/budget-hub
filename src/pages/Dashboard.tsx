import { Link } from "react-router-dom";
import BudgetCard from "../components/BudgetCard";
import BudgetChart from "../components/BudgetChart";
import BudgetTable from "../components/BudgetTable";
import KpiCard from "../components/KpiCard";
import { useBudget } from "../hooks/useBudget";
import MainLayout from "../layouts/MainLayout";

function formatMoney(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Dashboard() {
  const { budgets, budgetRows, loading, lastUpdated, refresh } = useBudget();

  const currentUserText = localStorage.getItem("currentUser");
  const currentUser = currentUserText ? JSON.parse(currentUserText) : null;

  const isRegionView =
    currentUser?.role === "region" || currentUser?.role === "admin";

  const total = budgets.find((item) => item.ประเภทงบ === "รวมทั้งสิ้น");
  const budgetCards = budgets.filter((item) => item.ประเภทงบ !== "รวมทั้งสิ้น");

  const provinceSummary = Object.values(
    budgetRows.reduce((acc: any, row: any) => {
      const province = row.province || "-";

      if (!acc[province]) {
        acc[province] = {
          province,
          allocated: 0,
          transferred: 0,
          paid: 0,
          remaining: 0,
        };
      }

      acc[province].allocated += Number(row.allocated || 0);
      acc[province].transferred += Number(row.transferred || 0);
      acc[province].paid += Number(row.paid || 0);
      acc[province].remaining += Number(row.remaining || 0);

      return acc;
    }, {})
  ).map((item: any) => ({
    ...item,
    percent:
      item.transferred > 0
        ? Number(((item.paid / item.transferred) * 100).toFixed(2))
        : 0,
  }));

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-950">
            {isRegionView ? "ภาพรวมการเบิกจ่ายรายจังหวัด" : "ภาพรวมงบประมาณ"}
          </h2>
          <p className="text-sm text-slate-500">
            {isRegionView
              ? "คลิกชื่อจังหวัดเพื่อดูรายละเอียดงบประมาณและโครงการ"
              : "ข้อมูลสรุปงบประมาณแยกตามประเภทงบ จาก Google Sheets"}
          </p>
          {lastUpdated && (
            <p className="mt-1 text-xs text-slate-400">
              อัปเดตล่าสุด: {lastUpdated}
            </p>
          )}
        </div>

        <button
          onClick={refresh}
          className="rounded-xl bg-blue-950 px-4 py-3 text-sm font-bold text-white shadow"
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-6 shadow">กำลังโหลดข้อมูล...</div>
      ) : isRegionView ? (
        <div className="rounded-3xl bg-white p-6 shadow">
          <h3 className="mb-4 text-xl font-bold text-blue-950">
            สรุปการเบิกจ่ายแยกตามจังหวัด
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-950 text-white">
                <tr>
                  <th className="p-3 text-left">จังหวัด</th>
                  <th className="p-3 text-right">ได้รับจัดสรร</th>
                  <th className="p-3 text-right">ได้รับโอน</th>
                  <th className="p-3 text-right">เบิกจ่าย</th>
                  <th className="p-3 text-right">คงเหลือ</th>
                  <th className="p-3 text-right">ร้อยละ</th>
                  <th className="p-3 text-center">รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {provinceSummary.map((item: any) => (
                  <tr key={item.province} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-bold text-blue-900">
                      <Link to={`/province/${encodeURIComponent(item.province)}`}>
                        {item.province}
                      </Link>
                    </td>
                    <td className="p-3 text-right">{formatMoney(item.allocated)}</td>
                    <td className="p-3 text-right">{formatMoney(item.transferred)}</td>
                    <td className="p-3 text-right font-bold">{formatMoney(item.paid)}</td>
                    <td className="p-3 text-right">{formatMoney(item.remaining)}</td>
                    <td className="p-3 text-right font-bold">{item.percent}%</td>
                    <td className="p-3 text-center">
                      <Link
                        to={`/province/${encodeURIComponent(item.province)}`}
                        className="rounded-lg bg-blue-950 px-3 py-2 text-xs font-bold text-white"
                      >
                        ดู
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          {total && (
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard title="ได้รับจัดสรร" value={formatMoney(Number(total.ได้รับจัดสรร))} icon="💰" />
              <KpiCard title="ได้รับโอน" value={formatMoney(Number(total.ได้รับโอน))} icon="📥" />
              <KpiCard title="เบิกจ่าย" value={formatMoney(Number(total.เบิกจ่าย))} icon="📤" />
              <KpiCard title="คงเหลือ" value={formatMoney(Number(total.คงเหลือ))} icon="📊" />
            </div>
          )}

          <div className="mb-8">
            <BudgetChart data={budgets} />
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {budgetCards.map((item) => (
              <BudgetCard
                key={item.ประเภทงบ}
                title={item.ประเภทงบ}
                budget={formatMoney(Number(item.ได้รับจัดสรร))}
                paid={formatMoney(Number(item.เบิกจ่าย))}
                percent={`${item.ร้อยละ}%`}
              />
            ))}
          </div>

          <div className="mt-8">
            <BudgetTable data={budgets} />
          </div>
        </>
      )}
    </MainLayout>
  );
}