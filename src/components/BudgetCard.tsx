type BudgetCardProps = {
  title: string;
  budget: string;
  paid: string;
  percent: string;
};

function getStatus(percentText: string) {
  const percent = Number(percentText.replace("%", ""));

  if (percent >= 80) {
    return {
      label: "ดี",
      color: "bg-green-100 text-green-700",
      bar: "from-green-600 to-green-400",
    };
  }

  if (percent >= 60) {
    return {
      label: "ติดตาม",
      color: "bg-yellow-100 text-yellow-700",
      bar: "from-yellow-500 to-yellow-300",
    };
  }

  return {
    label: "เร่งรัด",
    color: "bg-red-100 text-red-700",
    bar: "from-red-600 to-red-400",
  };
}

export default function BudgetCard({
  title,
  budget,
  paid,
  percent,
}: BudgetCardProps) {
  const status = getStatus(percent);

  return (
    <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-lg shadow-blue-950/5 transition hover:-translate-y-1 hover:shadow-xl sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-blue-950 sm:text-xl">{title}</h2>

        <div className={`rounded-full px-3 py-1 text-sm font-bold ${status.color}`}>
          {status.label} {percent}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">ได้รับจัดสรร</p>
          <p className="font-bold text-blue-950">{budget}</p>
        </div>

        <div>
          <p className="text-slate-500">เบิกจ่าย</p>
          <p className="font-bold text-blue-950">{paid}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500">อัตราเบิกจ่าย</span>
          <span className="font-bold text-blue-950">{percent}</span>
        </div>

        <div className="h-3 rounded-full bg-slate-100">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${status.bar}`}
            style={{ width: percent }}
          />
        </div>
      </div>
    </div>
  );
}