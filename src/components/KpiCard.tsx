type KpiCardProps = {
  title: string;
  value: string;
  icon: string;
};

export default function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-lg shadow-blue-950/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-blue-950">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}