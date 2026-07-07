import { useEffect, useState } from "react";
import {
  getProjects,
  saveBudget,
  type ProjectItem,
} from "../api/budgetEntryApi";
import MainLayout from "../layouts/MainLayout";
import { getCurrentUser } from "../services/auth";

export default function BudgetEntry() {
  const currentUser = getCurrentUser();

  const [fiscalYear] = useState("2569");
  const [budgetType, setBudgetType] = useState("งบบุคลากร");
  const [projectCode, setProjectCode] = useState("GENERAL");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [allocated, setAllocated] = useState("");
  const [transferred, setTransferred] = useState("");
  const [paid, setPaid] = useState("");
  const [saving, setSaving] = useState(false);

  const province = currentUser?.province || "";
  const username = currentUser?.username || "";

  useEffect(() => {
    if (budgetType !== "งบดำเนินงาน") {
      setProjectCode("GENERAL");
      setProjects([]);
      return;
    }

    getProjects(fiscalYear, "งบดำเนินงาน").then((result) => {
      if (result.success) {
        setProjects(result.data);
        setProjectCode(result.data[0]?.projectCode || "");
      }
    });
  }, [budgetType, fiscalYear]);

  async function handleSave() {
    if (!province) {
      alert("ไม่พบจังหวัดของผู้ใช้งาน");
      return;
    }

    if (budgetType === "งบดำเนินงาน" && !projectCode) {
      alert("กรุณาเลือกโครงการ");
      return;
    }

    setSaving(true);

    try {
      const result = await saveBudget({
        fiscalYear,
        province,
        budgetType,
        projectCode,
        allocated: Number(allocated || 0),
        transferred: Number(transferred || 0),
        paid: Number(paid || 0),
        updatedBy: username,
      });

      if (result.success) {
        alert("บันทึกงบประมาณสำเร็จ");
        localStorage.setItem("budgetUpdatedAt", String(Date.now()));
        setAllocated("");
        setTransferred("");
        setPaid("");
      } else {
        alert(result.message || "บันทึกไม่สำเร็จ");
      }
    } catch {
      alert("เชื่อมต่อ API ไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-950">บันทึกงบประมาณ</h2>
        <p className="text-slate-500">
          บันทึกข้อมูลงบประมาณจังหวัด {province} ปีงบประมาณ {fiscalYear}
        </p>
      </div>

      <div className="max-w-3xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="grid gap-4">
          <div>
            <label className="mb-2 block font-bold text-blue-950">จังหวัด</label>
            <input
              className="w-full rounded-xl border bg-slate-100 p-3"
              value={province}
              readOnly
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-blue-950">
              ปีงบประมาณ
            </label>
            <input
              className="w-full rounded-xl border bg-slate-100 p-3"
              value={fiscalYear}
              readOnly
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-blue-950">
              ประเภทงบ
            </label>
            <select
              className="w-full rounded-xl border p-3"
              value={budgetType}
              onChange={(e) => setBudgetType(e.target.value)}
            >
              <option value="งบลงทุน">งบลงทุน</option>
              <option value="งบบุคลากร">งบบุคลากร</option>
              <option value="งบดำเนินงาน">งบดำเนินงาน</option>
              
            </select>
          </div>

          {budgetType === "งบดำเนินงาน" && (
            <div>
              <label className="mb-2 block font-bold text-blue-950">
                โครงการ
              </label>

              <select
                className="w-full rounded-xl border p-3"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
              >
                {projects.length === 0 && (
                  <option value="">ไม่พบโครงการ</option>
                )}

                {projects.map((project) => (
                  <option
                    key={project.projectCode}
                    value={project.projectCode}
                  >
                    {project.projectCode} - {project.projectName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-2 block font-bold text-blue-950">
              ได้รับจัดสรร
            </label>
            <input
              type="number"
              className="w-full rounded-xl border p-3"
              value={allocated}
              onChange={(e) => setAllocated(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-blue-950">
              ได้รับโอน
            </label>
            <input
              type="number"
              className="w-full rounded-xl border p-3"
              value={transferred}
              onChange={(e) => setTransferred(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-bold text-blue-950">
              เบิกจ่าย
            </label>
            <input
              type="number"
              className="w-full rounded-xl border p-3"
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 rounded-xl bg-blue-950 px-4 py-4 text-xl font-bold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกงบประมาณ"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
}