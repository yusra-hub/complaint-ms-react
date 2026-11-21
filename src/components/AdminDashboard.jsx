
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  initializeComplaints,
  getComplaints,
  subscribeToComplaints,
  updateComplaintStatus,
  removeComplaint
} from "./complaintsStore";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  const [complaints, setComplaints] = useState(() =>
    initializeComplaints([])
  );

  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const refresh = () => setComplaints(getComplaints());

    refresh();

    return subscribeToComplaints(refresh);
  }, []);

  const showMessage = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const progress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const filteredComplaints = complaints.filter(c => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      String(c.id).includes(searchText) ||
      String(c.title || "").toLowerCase().includes(searchText) ||
      String(c.studentName || c.student || "").toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All Categories" || c.category === category;

    const matchesStatus =
      statusFilter === "All Status" || c.status === statusFilter;

    const matchesPage =
      activePage === "Pending Complaints"
        ? c.status === "Pending"
        : activePage === "Resolved Complaints"
          ? c.status === "Resolved"
          : true;

    return matchesSearch && matchesCategory &&
      matchesStatus && matchesPage;
  });

  const updateStatus = (id, newStatus) => {
    const updated = updateComplaintStatus(id, newStatus);
    setComplaints(updated);

    setSelectedComplaint(prev =>
      prev && String(prev.id) === String(id)
        ? { ...prev, status: newStatus }
        : prev
    );

    showMessage("Complaint status updated successfully!");
  };

  const deleteComplaint = () => {
    const updated = removeComplaint(deleteId);
    setComplaints(updated);
    setDeleteId(null);

    setSelectedComplaint(prev =>
      prev && String(prev.id) === String(deleteId) ? null : prev
    );

    showMessage("Complaint deleted successfully!");
  };

  const changePage = (page) => {
    setActivePage(page);
    setSearch("");
    setCategory("All Categories");
    setStatusFilter("All Status");
    setSidebarOpen(false);
  };

  const navigation = [
    { name: "Dashboard", icon: "dashboard" },
    { name: "All Complaints", icon: "list" },
    { name: "Pending Complaints", icon: "clock" },
    { name: "Resolved Complaints", icon: "check" }
  ];

  const stats = [
    { title: "Total Complaints", value: total, color: "#14532D", bg: "#DCFCE7", icon: "list" },
    { title: "Pending", value: pending, color: "#CA8A04", bg: "#FEF9C3", icon: "clock" },
    { title: "In Progress", value: progress, color: "#2563EB", bg: "#DBEAFE", icon: "alert" },
    { title: "Resolved", value: resolved, color: "#16A34A", bg: "#DCFCE7", icon: "check" }
  ];

  return (
    <div className="min-h-screen bg-[#FEF9C3] flex">

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#14532D] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">Educare</h1>
          <p className="text-xs tracking-[3px] text-[#FEF9C3]">
            ADMIN PORTAL
          </p>
        </div>

        <div className="p-5 flex-1">
          <p className="text-xs text-green-200 font-bold tracking-widest mb-4">
            MAIN MENU
          </p>

          <nav className="space-y-2">
            {navigation.map(item => (
              <button
                key={item.name}
                onClick={() => changePage(item.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${activePage === item.name ? "bg-[#CA8A04] text-[#14532D] font-bold" : "text-white hover:bg-white/10"}`}
              >
                {item.icon === "dashboard" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                )}

                {item.icon === "list" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 9h10M7 13h10M7 17h6" />
                  </svg>
                )}

                {item.icon === "clock" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                )}

                {item.icon === "check" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                )}

                {item.name}
              </button>
            ))}
          </nav>

          <p className="text-xs text-green-200 font-bold tracking-widest mt-10 mb-4">
            ACCOUNT
          </p>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-left p-3 rounded-xl hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
            </svg>
            Logout
          </button>
        </div>

        <div className="p-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#CA8A04] rounded-full flex items-center justify-center text-[#14532D] font-bold">
              A
            </div>
            <div>
              <h3 className="font-semibold">Administrator</h3>
              <p className="text-xs text-green-200">Admin Account</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 lg:ml-64">

        <header className="bg-white shadow-sm px-5 md:px-8 py-5 flex items-center justify-between sticky top-0 z-30">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#14532D] text-2xl"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#14532D]">
                {activePage}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm">
                Welcome back! Manage campus complaints.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#14532D]">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>
            </span>

            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-[#14532D]">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#14532D] text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-5 md:p-8">

          <div className="mb-8">
            <p className="text-[#CA8A04] text-sm font-bold tracking-widest uppercase">
              Overview
            </p>
            <h1 className="text-3xl font-bold text-[#14532D] mt-2">
              Welcome, Admin!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with campus complaints today.
            </p>
          </div>

          {activePage === "Dashboard" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              {stats.map(stat => (
                <div
                  key={stat.title}
                  className="bg-white p-6 rounded-2xl shadow-sm border-l-4"
                  style={{ borderColor: stat.color }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.title}</p>
                      <h2 className="text-3xl font-bold mt-2" style={{ color: stat.color }}>
                        {stat.value}
                      </h2>
                    </div>

                    <div className="p-4 rounded-xl" style={{ backgroundColor: stat.bg, color: stat.color }}>
                      {stat.icon === "list" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <path d="M7 9h10M7 13h10M7 17h6" />
                        </svg>
                      )}

                      {stat.icon === "clock" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                      )}

                      {stat.icon === "alert" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                          <path d="M12 9v4m0 4h.01" />
                        </svg>
                      )}

                      {stat.icon === "check" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-4">
                    Updated complaint statistics
                  </p>
                </div>
              ))}
            </div>
          )}

          <section className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <div className="p-5 md:p-6 border-b flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#14532D]">
                  {activePage === "Dashboard" ? "Recent Complaints" : activePage}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and monitor student complaints.
                </p>
              </div>

              <div className="text-sm font-semibold text-[#14532D] bg-[#FEF9C3] px-4 py-2 rounded-lg">
                Complaint Management
              </div>
            </div>

            <div className="p-5 flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by ID, title or student..."
                className="flex-1 border border-gray-200 bg-gray-50 rounded-xl py-3 px-4 outline-none focus:border-[#CA8A04]"
              />

              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="border border-gray-200 bg-gray-50 rounded-xl px-4 py-3"
              >
                <option>All Categories</option>
                <option>IT</option>
                <option>Electricity</option>
                <option>Water</option>
                <option>Other</option>
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="border border-gray-200 bg-gray-50 rounded-xl px-4 py-3"
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-[#FEF9C3] text-[#14532D] text-sm">
                  <tr>
                    <th className="px-6 py-4">Complaint ID</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredComplaints.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-6 py-5 font-semibold text-[#14532D]">
                        #{c.id}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {c.studentName || c.student || "Unknown Student"}
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-800">
                        {c.title}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {c.category}
                      </td>

                      <td className="px-6 py-5 font-semibold">
                        <span className={c.priority === "High" ? "text-red-600" : c.priority === "Medium" ? "text-yellow-600" : "text-green-600"}>
                          {c.priority}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-500 text-sm">
                        {c.date}
                      </td>

                      <td className="px-6 py-5">
                        <select
                          value={c.status || "Pending"}
                          onChange={e => updateStatus(c.id, e.target.value)}
                          className={`text-xs font-semibold rounded-lg px-2 py-2 border-0 outline-none ${c.status === "Pending" ? "bg-yellow-100 text-yellow-700" : c.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Resolved</option>
                        </select>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedComplaint(c)}
                            className="text-[#14532D] hover:text-[#CA8A04]"
                            title="View Complaint"
                          >
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>

                          <button
                            onClick={() => setDeleteId(c.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Complaint"
                          >
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
                              <path d="M10 11v5m4-5v5" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredComplaints.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-bold text-[#14532D]">
                    No Complaints Found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    There are no complaints matching your search.
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t text-sm text-gray-500">
              Showing {filteredComplaints.length} complaints
            </div>
          </section>

          <footer className="text-center text-xs text-gray-500 mt-8">
            © 2026 Educare. All Rights Reserved.
            <br />
            Admin Management Portal
          </footer>
        </div>
      </main>

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-5">
          <div className="bg-white rounded-2xl p-7 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-[#14532D]">
              Delete Complaint?
            </h2>

            <p className="text-gray-500 text-sm mt-3">
              Are you sure you want to delete this complaint? This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={deleteComplaint}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-5">
          <div className="bg-white rounded-2xl p-7 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#14532D]">
                Complaint Details
              </h2>

              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-gray-500 hover:text-red-600"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-sm">
              {[
                ["Complaint ID", `#${selectedComplaint.id}`],
                ["Student Name", selectedComplaint.studentName || selectedComplaint.student || "Unknown Student"],
                ["Title", selectedComplaint.title],
                ["Category", selectedComplaint.category],
                ["Priority", selectedComplaint.priority],
                ["Date", selectedComplaint.date],
                ["Status", selectedComplaint.status]
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-400">{label}</p>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}

              <div>
                <p className="text-gray-400 mb-2">Description</p>
                <p className="bg-[#FEF9C3] p-4 rounded-xl text-gray-700">
                  {selectedComplaint.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedComplaint(null)}
              className="w-full mt-7 bg-[#14532D] text-white py-3 rounded-xl font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-5 right-5 z-[100] bg-[#14532D] text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-2">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m5 12 4 4L19 6" />
          </svg>
          {toast}
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
