import BudgetDetail from "../components/BudgetDetail";
import MainLayout from "../layouts/MainLayout";

export default function Investment() {
  return (
    <MainLayout>
      <h2 className="mb-6 text-3xl font-bold text-blue-950">งบลงทุน</h2>
      <BudgetDetail budgetType="งบลงทุน" />
    </MainLayout>
  );
}