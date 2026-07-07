import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BudgetItem } from "../types/budget";

type BudgetChartProps = {
  data: BudgetItem[];
};

const colors = ["#1E40AF", "#0EA5E9", "#FACC15"];

function formatMoney(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BudgetChart({ data }: BudgetChartProps) {
  const chartData = data
    .filter((item) => item.ประเภทงบ !== "รวมทั้งสิ้น")
    .map((item) => ({
      name: item.ประเภทงบ,
      allocated: Number(item.ได้รับจัดสรร) || 0,
      paid: Number(item.เบิกจ่าย) || 0,
    }));

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-950">
          กราฟเปรียบเทียบการเบิกจ่าย
        </h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatMoney(Number(value))} />
              <Bar dataKey="paid" name="เบิกจ่าย" fill="#1E40AF" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-950">
          สัดส่วนงบประมาณที่ได้รับจัดสรร
        </h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="allocated"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={105}
                paddingAngle={4}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>

              <Tooltip formatter={(value) => formatMoney(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}