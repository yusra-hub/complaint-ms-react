
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#CA8A04", "#14532D", "#86A98D"];

function Charts({ statusData = [], monthlyData = [], trendData = [] }) {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-7">

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 md:p-6">
        <h3 className="text-lg font-bold text-[#14532D]">
          Complaint Status
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Overview of your complaint statuses
        </p>

        <div className="h-[280px] mt-5">
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.status}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 md:p-6">
        <h3 className="text-lg font-bold text-[#14532D]">
          Monthly Complaints
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Complaints submitted each month
        </p>

        <div className="h-[280px] mt-5">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="complaints"
                  fill="#14532D"
                  radius={[7, 7, 0, 0]}
                  barSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </div>
      </div>

      {/* Weekly Trend Line Chart */}
      <div className="xl:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 md:p-6">
        <h3 className="text-lg font-bold text-[#14532D]">
          Complaint Trends
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Weekly complaint submission activity
        </p>

        <div className="h-[300px] mt-5">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="complaints"
                  stroke="#CA8A04"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#14532D" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </div>
      </div>

    </section>
  );
}

function EmptyChart() {
  return (
    <div className="h-full flex items-center justify-center text-sm text-gray-400">
      No chart data available
    </div>
  );
}

export default Charts;
