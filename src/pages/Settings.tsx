import { useState } from "react";
import { sendLineMessage } from "../api/lineApi";
import MainLayout from "../layouts/MainLayout";

export default function Settings() {
  const [sending, setSending] = useState(false);

  async function handleTestLine() {
    setSending(true);

    try {
      await sendLineMessage(
        "Budget Hub ทดสอบส่ง LINE จากหน้า Settings สำเร็จ 🎉"
      );
      alert("ส่ง LINE สำเร็จ");
    } catch {
      alert("ส่ง LINE ไม่สำเร็จ");
    } finally {
      setSending(false);
    }
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-950">ตั้งค่าระบบ</h2>
        <p className="text-slate-500">สำหรับผู้ดูแลระบบเท่านั้น</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-bold text-blue-950">Google Sheets</h3>

          <div className="mt-4 space-y-4">
            <input
              className="w-full rounded-xl border p-3"
              value="Budget API เชื่อมต่อแล้ว"
              readOnly
            />
            <input
              className="w-full rounded-xl border p-3"
              value="Users API เชื่อมต่อแล้ว"
              readOnly
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-bold text-blue-950">
            LINE Messaging API
          </h3>

          <div className="mt-4 space-y-4">
            <input
              className="w-full rounded-xl border p-3"
              value="เชื่อมต่อ LINE API แล้ว"
              readOnly
            />

            <button
              onClick={handleTestLine}
              disabled={sending}
              className="rounded-xl bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {sending ? "กำลังส่ง..." : "ทดสอบส่ง LINE"}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}