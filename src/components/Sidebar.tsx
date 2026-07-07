import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { getCurrentUser } from "../services/auth";

type MenuItem = {
  label: string;
  path: string;
  roles: string[];
};


const menus: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", roles: ["admin", "province", "manager", "region"] },
  { label: "บันทึกงบประมาณ", path: "/budget-entry", roles: ["admin", "province"] },
  { label: "งบบุคลากร", path: "/personnel", roles: ["admin", "province", "manager", "region"] },
  { label: "งบดำเนินงาน", path: "/operation", roles: ["admin", "province", "manager", "region"] },
  { label: "งบลงทุน", path: "/investment", roles: ["admin", "province", "manager", "region"] },
  { label: "รายงาน", path: "/reports", roles: ["admin", "manager", "region"] },

  {
    label: "🔗 เชื่อม LINE",
    path: "/link-line",
    roles: ["admin", "province", "manager", "region"],
  },

  { label: "จัดการผู้ใช้งาน", path: "/users", roles: ["admin"] },
  { label: "ตั้งค่า", path: "/settings", roles: ["admin"] },
];

export default function Sidebar() {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const role = currentUser?.role || "";

  const visibleMenus = menus.filter((menu) => menu.roles.includes(role));

  return (
    <aside className="min-h-screen w-72 max-w-[85vw] bg-[#0A2540] text-white">
      <div className="border-b border-white/10 p-6 text-center">
        <img
          src={logo}
          className="mx-auto h-20 w-20 rounded-full bg-white p-1"
          alt="logo"
        />

        <div className="mt-3 text-lg font-bold">ระบบงบประมาณ</div>
        <div className="text-xs text-sky-200">
          สำนักงานตรวจบัญชีสหกรณ์สตูล
        </div>

        <div className="mt-4 rounded-2xl bg-white/10 p-3 text-xs">
          <div className="font-bold">{currentUser?.name || "ผู้ใช้งาน"}</div>
          <div className="mt-1 text-sky-200">
            {currentUser?.role || "-"} / {currentUser?.province || "-"}
          </div>
        </div>
      </div>

      <nav className="space-y-2 px-4 py-6">
        {visibleMenus.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded-xl px-4 py-3 ${
                active
                  ? "border-l-4 border-yellow-400 bg-sky-500/20 font-bold"
                  : "text-sky-100 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}