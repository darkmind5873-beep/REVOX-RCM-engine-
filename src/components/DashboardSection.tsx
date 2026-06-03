import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  CheckCircle,
  TrendingUp,
  Zap
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { ClayCard, StatCard } from "./ClayCard";

type DashboardStats = {
  totalClaimsAnalyzed: number;
  denialsPrevented: number;
  averageRiskScore: number;
  potentialSavings: number;
};

type Props = {
  stats: DashboardStats;
};

export default function DashboardSection({ stats }: Props) {
  const pieData = [
    { name: "Low Risk", value: 65, color: "#2f9e63" },
    { name: "Medium Risk", value: 25, color: "#d9932f" },
    { name: "High Risk", value: 10, color: "#d95d39" }
  ];

  const denialReasons = [
    { reason: "Missing Prior Auth", count: 145 },
    { reason: "Invalid NPI", count: 98 },
    { reason: "Coding Mismatch", count: 76 },
    { reason: "Incomplete Docs", count: 64 },
    { reason: "Coverage Issue", count: 52 }
  ];

  return (
    // FIX: Added pt-8 (padding-top) to instantly open up the spacing gap below the menu toggle buttons.
    // FIX: Increased the gap between sections using display flex column + 40px row gap layout.
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", paddingTop: "32px" }}>
      
      {/* 1. Spacing Between Top Summary Cards */}
      {/* FIX: Forced inline grid override style to guarantee deep structural layout column gaps */}
      <div 
        className="dashboard-stats-grid"
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "28px",
          width: "100%"
        }}
      >
        <StatCard
          title="Claims Analyzed"
          value={stats.totalClaimsAnalyzed.toLocaleString()}
          subtitle="Across recent payer submissions"
          variant="blue"
          icon={<Activity />}
        />
        <StatCard
          title="Denials Prevented"
          value={stats.denialsPrevented.toLocaleString()}
          subtitle="Estimated improvement opportunity"
          variant="green"
          icon={<CheckCircle />}
        />
        <StatCard
          title="Avg Risk Score"
          value={stats.averageRiskScore}
          subtitle="Across current analyzed claims"
          variant="amber"
          icon={<TrendingUp />}
        />
        <StatCard
          title="Potential Savings"
          value={`₹${(stats.potentialSavings / 1000).toFixed(0)}K`}
          subtitle="Projected pre-submission recovery"
          variant="purple"
          icon={<Zap />}
        />
      </div>

      {/* 2. Spacing Between Upper and Lower Sections */}
      {/* FIX: Forced explicit custom structural grid column layout gaps on the lower chart items */}
      <div 
        className="dashboard-chart-grid"
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "28px",
          width: "100%" 
        }}
      >
        <ClayCard>
          <div className="mb-4">
            <h3
              className="text-lg font-semibold flex items-center gap-2"
              style={{ color: "var(--text-main)" }}
            >
              <BarChart3 size={20} style={{ color: "var(--accent)" }} />
              Risk Distribution
            </h3>
            <p className="text-sm mt-2" style={{ color: "var(--text-soft)" }}>
              Based on recent claim validation and denial patterns.
            </p>
          </div>

          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>

        <ClayCard>
          <div className="mb-4">
            <h3
              className="text-lg font-semibold flex items-center gap-2"
              style={{ color: "var(--text-main)" }}
            >
              <AlertTriangle size={20} style={{ color: "var(--risk-medium)" }} />
              Top Denial Reasons
            </h3>
            <p className="text-sm mt-2" style={{ color: "var(--text-soft)" }}>
              Most recurring issues identified from payer-side review patterns.
            </p>
          </div>

          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={denialReasons}
                margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="reason" type="category" width={90} />
                <Tooltip />
                <Bar dataKey="count" fill="#2d6a4f" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>
      </div>

      <ClayCard glow>
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--brand))",
              color: "white"
            }}
          >
            <Brain size={24} />
          </div>

          <div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--text-main)" }}
            >
              AI Insights
            </h3>
            <ul
              className="space-y-2 text-sm md:text-base"
              style={{ color: "var(--text-soft)" }}
            >
              <li className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                Claims with missing prior authorization have 4.2x higher denial probability
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--brand)" }}
                />
                E/M codes 99214–99215 often require stronger documentation support
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--risk-low)" }}
                />
                Provider NPI validation shows measurable reduction in denial frequency
              </li>
            </ul>
          </div>
        </div>
      </ClayCard>
    </div>
  );
}
