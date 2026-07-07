import { useParams, Link } from "react-router-dom";
import { useBudget } from "../hooks/useBudget";
import MainLayout from "../layouts/MainLayout";

function money(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProvinceDetail() {
  const { province } = useParams();
  const { budgetRows, loading } = useBudget();

  const rows = budgetRows.filter((row) => row.province === province);

  return (
    <MainLayout>
      <Link to="/dashboard" className="text-blue-700 font-bold">
        ← กลับ Dashboard
      </Link>

      <h2 className="mt-4 text-3xl font-bold text-blue-950">
        รายละเอียดงบประมาณจังหวัด {province}
      </h2>

      {loading ? (
        <div className="mt-6 rounded-3xl bg-white p-6 shadow">กำลังโหลด...</div>
      ) : (
        <div className="mt-6 rounded-3xl bg-white p-6 shadow">
          <table className="w-full text-sm">
            <thead className="bg-blue-950 text-white">
              <tr>
                <th className="p-3 text-left">ประเภทงบ</th>
                <th className="p-3 text-left">โครงการ</th>
                <th className="p-3 text-right">ได้รับจัดสรร</th>
                <th className="p-3 text-right">ได้รับโอน</th>
                <th className="p-3 text-right">เบิกจ่าย</th>
                <th className="p-3 text-right">คงเหลือ</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-bold">{row.budgetType}</td>
                  <td className="p-3">{row.projectCode}</td>
                  <td className="p-3 text-right">{money(row.allocated)}</td>
                  <td className="p-3 text-right">{money(row.transferred)}</td>
                  <td className="p-3 text-right">{money(row.paid)}</td>
                  <td className="p-3 text-right">{money(row.remaining)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
}