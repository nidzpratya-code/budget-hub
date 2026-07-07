import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Personnel from "./pages/Personnel";
import Operation from "./pages/Operation";
import Investment from "./pages/Investment";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import BudgetEntry from "./pages/BudgetEntry";
import LinkLine from "./pages/LinkLine";
import ProvinceDetail from "./pages/ProvinceDetail.tsx";

function ProtectedRoute({
  children,
  allowRoles,
}: {
  children: React.ReactNode;
  allowRoles?: string[];
}) {
  const currentUserText = localStorage.getItem("currentUser");

  if (!currentUserText) {
    return <Navigate to="/login" replace />;
  }

  const currentUser = JSON.parse(currentUserText);

  if (allowRoles && !allowRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  const allRoles = ["admin", "province", "manager", "region"];
  const reportRoles = ["admin", "manager", "region"];
  const entryRoles = ["admin", "province"];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute allowRoles={allRoles}><Dashboard /></ProtectedRoute>} />
        <Route path="/budget-entry" element={<ProtectedRoute allowRoles={entryRoles}><BudgetEntry /></ProtectedRoute>} />
        <Route path="/personnel" element={<ProtectedRoute allowRoles={allRoles}><Personnel /></ProtectedRoute>} />
        <Route path="/operation" element={<ProtectedRoute allowRoles={allRoles}><Operation /></ProtectedRoute>} />
        <Route path="/investment" element={<ProtectedRoute allowRoles={allRoles}><Investment /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowRoles={reportRoles}><Reports /></ProtectedRoute>} />
        <Route path="/link-line" element={<ProtectedRoute allowRoles={allRoles}><LinkLine /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute allowRoles={["admin"]}><Users /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowRoles={["admin"]}><Settings /></ProtectedRoute>} />
        <Route path="/province/:province"element={<ProtectedRoute allowRoles={allRoles}><ProvinceDetail /></ProtectedRoute>}/>
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;