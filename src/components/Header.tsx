import { getCurrentUser, logout } from "../services/auth";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const currentUser = getCurrentUser();

  return (
    <header className="border-b-4 border-yellow-400 bg-gradient-to-r from-blue-950 via-blue-800 to-sky-500 px-4 py-4 text-white shadow-md sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl bg-white/15 px-3 py-2 text-xl font-bold lg:hidden"
          >
            ☰
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold sm:text-2xl">
              Dashboard
            </h1>
            <p className="truncate text-xs text-sky-100 sm:text-sm">
              ภาพรวมการติดตามงบประมาณ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-bold">
              {currentUser?.name || "ผู้ใช้งาน"}
            </div>
            <div className="text-xs text-sky-100">
              {currentUser?.role || "-"} / {currentUser?.province || "-"}
            </div>
          </div>

          <button
            onClick={logout}
            className="shrink-0 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold hover:bg-white/25 sm:px-4 sm:text-sm"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </header>
  );
}