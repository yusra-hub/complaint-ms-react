
import { useEffect, useState } from "react";
import Charts from "./chart";

import {
  getComplaints,
  subscribeToComplaints
} from "./complaintsStore";

const CURRENT_STUDENT_EMAIL = (
  localStorage.getItem("studentEmail") || ""
).trim();

const CURRENT_STUDENT_ID = (
  localStorage.getItem("studentId") || ""
).trim();

const CURRENT_STUDENT_NAME = CURRENT_STUDENT_EMAIL
  ? CURRENT_STUDENT_EMAIL
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, char => char.toUpperCase())
  : "Student";

const STUDENT_INITIALS = CURRENT_STUDENT_NAME
  .split(" ")
  .filter(Boolean)
  .map(word => word[0])
  .join("")
  .substring(0, 2)
  .toUpperCase();

const monthlyData = [
  { month: "Jan", complaints: 5 },
  { month: "Feb", complaints: 8 },
  { month: "Mar", complaints: 6 },
  { month: "Apr", complaints: 12 },
  { month: "May", complaints: 9 },
  { month: "Jun", complaints: 15 }
];

const trendData = [
  { week: "Week 1", complaints: 4 },
  { week: "Week 2", complaints: 7 },
  { week: "Week 3", complaints: 5 },
  { week: "Week 4", complaints: 11 }
];

function StudentDashboard() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const refreshComplaints = () => {
      const allComplaints = getComplaints() || [];

      const myComplaints = allComplaints.filter(complaint => {
        const complaintStudentId = String(
          complaint.studentId ?? ""
        ).trim().toLowerCase();

        const complaintStudentEmail = String(
          complaint.studentEmail ?? ""
        ).trim().toLowerCase();

        return (
          (CURRENT_STUDENT_ID &&
            complaintStudentId === CURRENT_STUDENT_ID.toLowerCase()) ||
          (CURRENT_STUDENT_EMAIL &&
            (
              complaintStudentEmail === CURRENT_STUDENT_EMAIL.toLowerCase() ||
              complaintStudentId === CURRENT_STUDENT_EMAIL.toLowerCase()
            ))
        );
      });

      setComplaints(myComplaints);
    };

    refreshComplaints();

    const unsubscribe = subscribeToComplaints(refreshComplaints);

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  const statusData = [
    {
      status: "Pending",
      count: complaints.filter(c => c.status === "Pending").length
    },
    {
      status: "In Progress",
      count: complaints.filter(c => c.status === "In Progress").length
    },
    {
      status: "Resolved",
      count: complaints.filter(c => c.status === "Resolved").length
    }
  ];

  const totalComplaints = complaints.length;

  const stats = [
    {
      title: "Total Complaints",
      value: totalComplaints,
      description: "All submitted complaints",
      icon: (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h8" />
        </svg>
      ),
      style: "bg-[#FEF9C3] text-[#14532D]"
    },
    {
      title: "Pending Complaints",
      value: statusData[0].count,
      description: "Waiting for review",
      icon: (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      style: "bg-[#FEF3C7] text-[#CA8A04]"
    },
    {
      title: "In Progress",
      value: statusData[1].count,
      description: "Currently being handled",
      icon: (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      style: "bg-[#DCFCE7] text-[#14532D]"
    },
    {
      title: "Resolved",
      value: statusData[2].count,
      description: "Successfully completed",
      icon: (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      style: "bg-[#D1FAE5] text-[#14532D]"
    }
  ];

  const filteredComplaints = complaints.filter(item => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  const statusStyle = {
    Pending: "bg-[#FEF3C7] text-[#92400E]",
    "In Progress": "bg-[#DCFCE7] text-[#14532D]",
    Resolved: "bg-[#D1FAE5] text-[#166534]"
  };

  const resolvedCount = statusData[2].count;

  const resolutionRate = totalComplaints > 0
    ? Math.round((resolvedCount / totalComplaints) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#FEF9C3] flex">

   
      <aside
        className={`fixed md:sticky top-0 h-screen z-50 w-64 bg-[#14532D] text-white flex flex-col transition-transform duration-300 ${
          mobileMenu
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-20 px-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-[#CA8A04] text-[#14532D] rounded-xl flex items-center justify-center">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>

          <div>
            <h1 className="font-bold text-xl tracking-tight">Educare</h1>
            <p className="text-xs text-[#FEF9C3]">Student Portal</p>
          </div>
        </div>

        <div className="px-4 py-7 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-green-200/60 px-3 mb-4">
            Main Menu
          </p>

          <nav className="space-y-2">
            {[
              [
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="9" rx="1" />
                  <rect x="14" y="3" width="7" height="5" rx="1" />
                  <rect x="14" y="12" width="7" height="9" rx="1" />
                  <rect x="3" y="16" width="7" height="5" rx="1" />
                </svg>,
                "Dashboard",
                "/dashboard"
              ],
              [
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8" />
                  <path d="M8 17h8" />
                </svg>,
                "My Complaints",
                "/complaints"
              ],
              [
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>,
                "Submit Complaint",
                "/submit-complaint"
              ],
              [
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>,
                "My Profile",
                "/profile"
              ]
            ].map(([icon, label, link], index) => (
              <a
                key={label}
                href={link}
                onClick={() => setMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition ${
                  index === 0
                    ? "bg-[#CA8A04] text-[#14532D] font-bold shadow-lg"
                    : "text-green-100/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {icon}
                <span>{label}</span>
              </a>
            ))}
          </nav>

          <p className="text-[11px] font-semibold uppercase tracking-widest text-green-200/60 px-3 mt-10 mb-4">
            Support
          </p>

          <a
            href="/help"
            className="flex items-center gap-3 px-4 py-3.5 text-sm text-green-100/80 hover:text-white rounded-xl hover:bg-white/10"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            Help Center
          </a>

          <a
            href="/settings"
            className="flex items-center gap-3 px-4 py-3.5 text-sm text-green-100/80 hover:text-white rounded-xl hover:bg-white/10"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 2.94-.08-.02a1.7 1.7 0 0 0-1.75.5l-.06.06h-3.4l-.06-.08a1.7 1.7 0 0 0-1.75-.5l-.08.02-2.94-1.7.02-.08A1.7 1.7 0 0 0 7.5 16.3l-.06-.06v-3.4l.08-.06a1.7 1.7 0 0 0 .5-1.75L8 10.95l1.7-2.94.08.02a1.7 1.7 0 0 0 1.75-.5l.06-.06h3.4l.06.08a1.7 1.7 0 0 0 1.75.5l.08-.02 2.94 1.7-.02.08a1.7 1.7 0 0 0 .5 1.75l.06.06z" />
            </svg>
            Settings
          </a>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#CA8A04] text-[#14532D] flex items-center justify-center font-bold">
              {STUDENT_INITIALS}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{CURRENT_STUDENT_NAME}</p>
              <p className="text-xs text-green-100/70">Student Account</p>
            </div>

            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-100/70">
              <path d="M9 21h6" />
              <path d="M12 17v4" />
              <path d="M7 7V4h10v3" />
              <path d="M5 7h14l-1 10H6L5 7z" />
            </svg>
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

     
      <main className="flex-1 min-w-0">

        <header className="h-20 bg-white border-b border-[#E5E7EB] px-5 md:px-8 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden text-[#14532D]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>

            <div>
              <h2 className="text-lg font-bold text-[#14532D]">Dashboard</h2>
              <p className="text-xs text-gray-400">
                Welcome to your student portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-[#14532D] hover:text-[#CA8A04]">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>
            </button>

            <div className="flex items-center gap-3 border-l pl-5">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#14532D] flex items-center justify-center font-bold">
                {STUDENT_INITIALS}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#14532D]">
                  {CURRENT_STUDENT_NAME}
                </p>
                <p className="text-xs text-gray-400">Student</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-5 md:p-8 max-w-[1500px] mx-auto">

    
          <section className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-7 shadow-sm">
            <div>
              <p className="text-sm text-[#CA8A04] font-bold mb-2 tracking-wider">
                STUDENT OVERVIEW
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#14532D]">
                Welcome back, {CURRENT_STUDENT_NAME}
              </h2>

              <p className="text-gray-500 text-sm mt-2 max-w-xl">
                Manage your campus complaints, monitor their progress
                and stay updated with the latest status.
              </p>
            </div>

            <a
              href="/submit-complaint"
              className="flex items-center gap-2 bg-[#14532D] hover:bg-[#0F4225] text-white px-5 py-3 rounded-xl text-sm font-semibold transition shadow-md whitespace-nowrap"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              New Complaint
            </a>
          </section>

       
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
            {stats.map(item => (
              <div
                key={item.title}
                className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <h3 className="text-3xl font-bold text-[#14532D] mt-3">
                      {String(item.value).padStart(2, "0")}
                    </h3>
                  </div>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.style}`}>
                    {item.icon}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  {item.description}
                </p>
              </div>
            ))}
          </section>

     
          <Charts
            statusData={statusData}
            monthlyData={monthlyData}
            trendData={trendData}
          />

          
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-7">

            <div className="xl:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              <div className="p-5 md:p-6 flex flex-wrap justify-between items-center gap-3 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-[#14532D] text-lg">
                    Recent Complaints
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Track your latest submissions
                  </p>
                </div>

                <a
                  href="/complaints"
                  className="text-sm text-[#14532D] font-semibold hover:text-[#CA8A04] hover:underline"
                >
                  View All
                </a>
              </div>

              <div className="px-5 pt-4 flex flex-wrap gap-2">
                {["All", "Pending", "In Progress", "Resolved"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      activeTab === tab
                        ? "bg-[#14532D] text-white"
                        : "bg-[#FAFAF9] text-gray-500 hover:bg-[#FEF3C7] hover:text-[#14532D]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {filteredComplaints.length === 0 ? (
                <div className="py-14 text-center">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h8" />
                    <path d="M8 17h8" />
                  </svg>
                  <p className="font-semibold text-gray-700 mt-3">
                    No complaints found
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Submit a complaint to see it here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-left min-w-[620px]">
                    <thead className="bg-[#FAFAF9] text-[11px] uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="px-5 py-4">Complaint</th>
                        <th className="px-5 py-4">Category</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredComplaints.map(item => (
                        <tr
                          key={item.id}
                          className="border-t border-gray-100 hover:bg-[#FEFCE8]"
                        >
                          <td className="px-5 py-4">
                            <p className="text-sm font-semibold text-[#14532D]">
                              {item.title}
                            </p>
                            <p className="text-xs text-[#CA8A04] mt-1">
                              #{item.id}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-500">
                            {item.category}
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.date}
                          </td>

                          <td className="px-5 py-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyle[item.status]}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
              <h3 className="font-bold text-[#14532D] text-lg">
                Complaint Summary
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Your complaint statistics
              </p>

              <div className="mt-7 space-y-6">
                {statusData.map((item, index) => (
                  <div key={item.status}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-600">{item.status}</span>
                      <span className="font-semibold text-[#14532D]">
                        {item.count}
                      </span>
                    </div>

                    <div className="h-2.5 rounded-full bg-[#F3F4E8] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          ["bg-[#CA8A04]", "bg-[#14532D]", "bg-[#86A98D]"][index]
                        }`}
                        style={{
                          width: `${totalComplaints > 0 ? (item.count / totalComplaints) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-7 pt-5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Resolution Rate
                  </span>
                  <span className="text-xl font-bold text-[#14532D]">
                    {resolutionRate}%
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {resolvedCount} of {totalComplaints} complaints successfully resolved.
                </p>
              </div>
            </div>
          </section>

          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FEF3C7] text-[#14532D] rounded-xl flex items-center justify-center shrink-0">
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
              </div>

              <div>
                <h4 className="font-semibold text-[#14532D] text-sm">
                  Keep track of your complaints
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Check your complaint history and latest updates.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#DCFCE7] text-[#14532D] rounded-xl flex items-center justify-center shrink-0">
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>

              <div>
                <h4 className="font-semibold text-[#14532D] text-sm">
                  Need assistance?
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Contact the administration for additional support.
                </p>
              </div>
            </div>
          </section>

          <footer className="text-center text-xs text-[#14532D]/60 mt-9 pb-4">
            © 2026 Educare. All rights reserved.
          </footer>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
