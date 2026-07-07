import { useEffect, useState } from "react";
import {
  addUser,
  deleteUser,
  fetchUsers,
  resetPassword,
  updateUser,
} from "../api/usersApi";
import MainLayout from "../layouts/MainLayout";
import type { AppUser, UserRole } from "../types/user";

const emptyUser: AppUser = {
  username: "",
  password: "",
  name: "",
  role: "province",
  province: "",
  region: "",
  active: "TRUE",
  lineTo: "",
};

function roleLabel(role: string) {
  if (role === "admin") return "ผู้ดูแลระบบ";
  if (role === "province") return "ผู้บันทึกจังหวัด";
  if (role === "manager") return "หัวหน้าจังหวัด";
  if (role === "region") return "หัวหน้าภาค";
  return role;
}

export default function Users() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [form, setForm] = useState<AppUser>(emptyUser);
  const [editingUsername, setEditingUsername] = useState("");
  const [loading, setLoading] = useState(true);

  function loadUsers() {
    setLoading(true);
    fetchUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit() {
    if (!form.username || !form.password || !form.name || !form.role) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (editingUsername) {
      await updateUser(editingUsername, form);
      alert("แก้ไขผู้ใช้งานสำเร็จ");
    } else {
      await addUser(form);
      alert("เพิ่มผู้ใช้งานสำเร็จ");
    }

    setForm(emptyUser);
    setEditingUsername("");
    loadUsers();
  }

  function handleEdit(user: AppUser) {
    setForm({
      ...user,
      lineTo: user.lineTo || "",
    });
    setEditingUsername(user.username);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(username: string) {
    if (!confirm(`ต้องการลบผู้ใช้ ${username} ใช่หรือไม่?`)) return;

    await deleteUser(username);
    alert("ลบผู้ใช้งานสำเร็จ");
    loadUsers();
  }

  async function handleResetPassword(username: string) {
    const newPassword = prompt(`กรอกรหัสผ่านใหม่ของ ${username}`);

    if (!newPassword) return;

    await resetPassword(username, newPassword);
    alert("รีเซ็ตรหัสผ่านสำเร็จ");
    loadUsers();
  }

  const activeUsers = users.filter(
    (u) => u.active === true || String(u.active).toUpperCase() === "TRUE"
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-950">จัดการผู้ใช้งาน</h2>
        <p className="text-slate-500">
          เพิ่ม แก้ไข ลบ รีเซ็ตรหัสผ่าน และจัดการ LINE User ID
        </p>
      </div>

      <div className="mb-6 rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-blue-950">
          {editingUsername ? "แก้ไขผู้ใช้งาน" : "เพิ่มผู้ใช้งาน"}
        </h3>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input
            className="rounded-xl border p-3"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="ชื่อ-สกุล / ชื่อหน่วยงาน"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="rounded-xl border p-3"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value as UserRole })
            }
          >
            <option value="admin">ผู้ดูแลระบบ</option>
            <option value="province">ผู้บันทึกจังหวัด</option>
            <option value="manager">หัวหน้าจังหวัด</option>
            <option value="region">หัวหน้าภาค</option>
          </select>

          <input
            className="rounded-xl border p-3"
            placeholder="จังหวัด เช่น สตูล หรือ ALL"
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="ภาค เช่น 9 หรือ ALL"
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
          />

          <select
            className="rounded-xl border p-3"
            value={String(form.active).toUpperCase()}
            onChange={(e) => setForm({ ...form, active: e.target.value })}
          >
            <option value="TRUE">ใช้งาน</option>
            <option value="FALSE">ปิดใช้งาน</option>
          </select>

          <input
            className="rounded-xl border p-3"
            placeholder="LINE User ID / Group ID เช่น U... หรือ C..."
            value={form.lineTo || ""}
            onChange={(e) => setForm({ ...form, lineTo: e.target.value })}
          />

          <div className="flex gap-2 xl:col-span-4">
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-blue-950 px-6 py-3 font-bold text-white hover:bg-blue-800"
            >
              {editingUsername ? "บันทึกแก้ไข" : "เพิ่มผู้ใช้"}
            </button>

            {editingUsername && (
              <button
                onClick={() => {
                  setForm(emptyUser);
                  setEditingUsername("");
                }}
                className="rounded-xl bg-slate-200 px-6 py-3 font-bold text-slate-700"
              >
                ยกเลิก
              </button>
            )}
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          หมายเหตุ: lineTo ต้องเป็น LINE User ID ที่ขึ้นต้นด้วย U หรือ Group ID
          ที่ขึ้นต้นด้วย C เท่านั้น เช่น U2eb46dc4862a7131cdb9ae73ad6d7361
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow">
          <p className="text-slate-500">ผู้ใช้งานทั้งหมด</p>
          <p className="mt-2 text-3xl font-bold text-blue-950">
            {users.length}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow">
          <p className="text-slate-500">เปิดใช้งาน</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {activeUsers.length}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow">
          <p className="text-slate-500">ปิดใช้งาน</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {users.length - activeUsers.length}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-6 shadow">กำลังโหลดข้อมูล...</div>
      ) : (
        <div className="overflow-x-auto rounded-3xl bg-white p-4 shadow-lg">
          <table className="w-full min-w-[1250px] text-left text-sm">
            <thead>
              <tr className="bg-blue-950 text-white">
                <th className="p-3">ชื่อผู้ใช้</th>
                <th className="p-3">ชื่อ</th>
                <th className="p-3">สิทธิ์</th>
                <th className="p-3">จังหวัด</th>
                <th className="p-3">ภาค</th>
                <th className="p-3">สถานะ</th>
                <th className="p-3">LINE</th>
                <th className="p-3 text-center">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const active =
                  user.active === true ||
                  String(user.active).toUpperCase() === "TRUE";

                const hasLine = Boolean(user.lineTo);

                return (
                  <tr key={user.username} className="border-b hover:bg-sky-50">
                    <td className="p-3 font-bold text-blue-950">
                      {user.username}
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
                        {roleLabel(user.role)}
                      </span>
                    </td>
                    <td className="p-3">{user.province}</td>
                    <td className="p-3">{user.region}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {active ? "ใช้งาน" : "ปิดใช้งาน"}
                      </span>
                    </td>
                    <td className="p-3">
                      {hasLine ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                          เชื่อมแล้ว
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                          ยังไม่เชื่อม
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="rounded-lg bg-yellow-400 px-3 py-2 text-xs font-bold text-yellow-900"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleResetPassword(user.username)}
                          className="rounded-lg bg-sky-500 px-3 py-2 text-xs font-bold text-white"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => handleDelete(user.username)}
                          className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white"
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
}