import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Loader2,
  IndianRupee,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import apiClient from "../../apiClient";
import {
  DashboardStats,
  RevenueData,
  TrendingItem,
} from "../../types";

export const AdminDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<"day" | "month" | "year">(
    "day"
  );
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalMenuItems: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });
  const [graphData, setGraphData] = useState<RevenueData[]>();
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true); 
        const response = await apiClient.get("api/v1/admin/dashboard/Stats");
        const data = response.data;

        setStats({
          totalRevenue: data.Revenue || 0,
          totalMenuItems: data.MenuItemCount || 0,
          totalOrders: data.OrderCount || 0,
          totalCustomers: data.StaffCount || 0,
        });

        // We don't fetch graph data here anymore, strictly separate
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch Graph Data on Time Filter Change
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `api/v1/admin/dashboard/Revenue?timeFrame=${timeFilter}`
        );
        if (response.data && response.data.data) {
          // Map backend { label, value } to frontend { name, revenue }
          const mappedData = response.data.data.map(
            (item: { label: string; value: number }) => ({
              name: item.label,
              revenue: item.value,
            })
          );
          setGraphData(mappedData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
        setLoading(false);
      }finally{
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [timeFilter]);

  // Fetch Trending Items
  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          "api/v1/admin/dashboard/Trending"
        );
        if (response.data && response.data.data) {
          setTrendingItems(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch trending items:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchTrendingItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your restaurant's overview and performance.
        </p>
      </div>

      {/* Section 1: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={<IndianRupee className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
        <SummaryCard
          title="Total Menu Items"
          value={stats.totalMenuItems.toString()}
          icon={<UtensilsCrossed className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={<ShoppingBag className="w-6 h-6 text-white" />}
          color="bg-orange-500"
        />
        <SummaryCard
          title="Total Staff" // Changed from Customers to Staff as per plan
          value={stats.totalCustomers.toLocaleString()}
          icon={<Users className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Section 2: Revenue Graph */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Revenue Analytics
            </h2>
            <div className="flex bg-gray-100 p-1 rounded-lg mt-4 sm:mt-0">
              {(["day", "month", "year"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    timeFilter === filter
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  test-id="chart-xaxis"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value: number) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 3: Trending Items */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Trending Items
          </h2>
          <div className="space-y-4">
            {trendingItems.map((item, index) => {
             
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                <span className="text-gray-400 font-bold text-lg min-w-[24px]">
                  #{index + 1}
                </span>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-sm truncate">
                    {item.name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-0.5">
                    <span className="font-medium text-gray-700">
                      ₹{item.price.toFixed(2)}
                    </span>
                    <span className="mx-1.5">•</span>
                    <span className="text-gray-500 truncate">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end ">
                  <span className="font-bold text-gray-800 text-base">
                    {item.sales}
                  </span>
                  <div className="text-xs text-gray-800 pb-2">
                    ₹ {item.revenue}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-transform hover:-translate-y-1">
    <div className={`p-4 rounded-lg ${color} shadow-lg`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);
