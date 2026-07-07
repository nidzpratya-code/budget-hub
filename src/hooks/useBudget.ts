import { useEffect, useState } from "react";
import { getBudget } from "../api/budgetEntryApi";
import { getCurrentUser } from "../services/auth";
import type { BudgetItem } from "../types/budget";

export type BudgetRow = {
  province: string;
  budgetType: string;
  allocated: number;
  transferred: number;
  paid: number;
  remaining: number;
};

export function useBudget() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [budgetRows, setBudgetRows] = useState<BudgetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  async function refresh() {
    setLoading(true);

    try {
      const currentUser = getCurrentUser();

      let province = "";
      let region = "";

      if (currentUser?.role === "province" || currentUser?.role === "manager") {
        province = currentUser.province || "";
      }

      if (currentUser?.role === "region") {
        region = currentUser.region || "";
      }

      const result = await getBudget("2569", province, region);
      const rows: BudgetRow[] = result.success ? result.data : [];

      setBudgetRows(rows);

      const types = ["งบบุคลากร", "งบดำเนินงาน", "งบลงทุน"];

      const summary = types.map((type) => {
        const items = rows.filter((row) => row.budgetType === type);

        const allocated = items.reduce((sum, row) => sum + Number(row.allocated || 0), 0);
        const transferred = items.reduce((sum, row) => sum + Number(row.transferred || 0), 0);
        const paid = items.reduce((sum, row) => sum + Number(row.paid || 0), 0);
        const remaining = items.reduce((sum, row) => sum + Number(row.remaining || 0), 0);
        const percent = transferred > 0 ? (paid / transferred) * 100 : 0;

        return {
          ประเภทงบ: type,
          ได้รับจัดสรร: allocated,
          ได้รับโอน: transferred,
          เบิกจ่าย: paid,
          คงเหลือ: remaining,
          ร้อยละ: Number(percent.toFixed(2)),
        };
      });

      const totalAllocated = summary.reduce((sum, row) => sum + Number(row.ได้รับจัดสรร), 0);
      const totalTransferred = summary.reduce((sum, row) => sum + Number(row.ได้รับโอน), 0);
      const totalPaid = summary.reduce((sum, row) => sum + Number(row.เบิกจ่าย), 0);
      const totalRemaining = summary.reduce((sum, row) => sum + Number(row.คงเหลือ), 0);
      const totalPercent = totalTransferred > 0 ? (totalPaid / totalTransferred) * 100 : 0;

      setBudgets([
        ...summary,
        {
          ประเภทงบ: "รวมทั้งสิ้น",
          ได้รับจัดสรร: totalAllocated,
          ได้รับโอน: totalTransferred,
          เบิกจ่าย: totalPaid,
          คงเหลือ: totalRemaining,
          ร้อยละ: Number(totalPercent.toFixed(2)),
        },
      ]);

      setLastUpdated(
        new Date().toLocaleString("th-TH", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();

    const timer = window.setInterval(refresh, 300000);

    function handleStorage(event: StorageEvent) {
      if (event.key === "budgetUpdatedAt") {
        refresh();
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return {
    budgets,
    budgetRows,
    loading,
    lastUpdated,
    refresh,
  };
}