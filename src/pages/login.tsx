import { useState } from "react";
import logo from "../assets/logo.png";
import { login } from "../services/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      window.location.href = "/dashboard";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "ไม่สามารถเชื่อมต่อระบบผู้ใช้งานได้"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 text-white lg:flex">
        <img
          src={logo}
          alt="logo"
          className="h-72 w-72 rounded-full bg-white p-2 shadow-2xl"
        />

        <h1 className="mt-10 text-4xl font-bold">
          ระบบแดชบอร์ดติดตามงบประมาณ
        </h1>

        <p className="mt-3 text-2xl text-blue-100">
          สำนักงานตรวจบัญชีสหกรณ์สตูล
        </p>
      </div>

      <div className="flex items-center justify-center bg-slate-100 p-4">
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
          <h2 className="mb-10 text-center text-4xl font-bold text-blue-900 sm:text-5xl">
            เข้าสู่ระบบ
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-semibold">
                ชื่อผู้ใช้ / Email
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border p-4 outline-none focus:border-sky-500"
                placeholder="กรอกชื่อผู้ใช้"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">รหัสผ่าน</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-xl border p-4 outline-none focus:border-sky-500"
                placeholder="กรอกรหัสผ่าน"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-900 to-sky-500 py-4 text-xl font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </div>

          <div className="mt-12 rounded-2xl bg-slate-100 p-5">
            <div className="text-center text-slate-600">พัฒนาโดย</div>
            <div className="text-center text-xl font-bold text-blue-900">
              นายปรัชญา ศิริภูรี
            </div>
            <div className="text-center text-slate-600">
              เจ้าหน้าที่ระบบงานคอมพิวเตอร์
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}