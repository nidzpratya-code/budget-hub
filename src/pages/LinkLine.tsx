import MainLayout from "../layouts/MainLayout";
import { getCurrentUser } from "../services/auth";

export default function LinkLine() {
  const user = getCurrentUser();

  function connectLine() {
    const url =
      "https://YOUR_WEBAPP_URL?action=linkLine&username=" +
      user?.username;

    window.open(url, "_blank");
  }

  return (
    <MainLayout>
      <div className="max-w-xl rounded-3xl bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-900">
          เชื่อมบัญชี LINE
        </h1>

        <p className="mt-3 text-gray-600">
          กดปุ่มด้านล่างเพื่อเชื่อมบัญชี LINE
        </p>

        <button
          onClick={connectLine}
          className="mt-8 w-full rounded-xl bg-green-600 py-4 text-white text-xl font-bold"
        >
          🔗 เชื่อม LINE
        </button>

      </div>
    </MainLayout>
  );
}