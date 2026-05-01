import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getAllTransactions } from "../../../services/storage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { formatCurrency } from "../../../utils/currency";
import { isCurrentMonthToDate } from "../../../utils/dateFilters";
import "./PieChartBox.css";

function PieChartBox() {
  const currentUser = useCurrentUser();
  const currency = currentUser?.currency || "USD";

  const allTransactions = getAllTransactions().filter((transaction) =>
    isCurrentMonthToDate(transaction.date)
  );

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    "Family",
    "Essentials",
    "Lifestyle",
    "Education",
    "Travel",
    "Health",
    "Other",
  ];

  const categoryMap = categories.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {});

  allTransactions.forEach((transaction) => {
    if (categoryMap[transaction.category] !== undefined) {
      categoryMap[transaction.category] += Number(transaction.amount) || 0;
    }
  });

  const chartData = Object.entries(categoryMap)
    .map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
    }))
    .filter((item) => item.value > 0);

  const hasChartData = chartData.length > 0;

  const COLORS = [
    "#4F8EF7",
    "#34C759",
    "#F59E0B",
    "#8B5CF6",
    "#14B8A6",
    "#F97316",
    "#94A3B8",
  ];

  const isMobile = screenWidth <= 640;
  const isTablet = screenWidth <= 1024;

  const chartHeight = isMobile ? 260 : isTablet ? 300 : 420;
  const outerRadius = isMobile ? "78%" : isTablet ? "72%" : "78%";
  const RADIAN = Math.PI / 180;

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (!percent || percent <= 0) return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        className="pie-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${Math.round(percent * 100)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const item = payload[0].payload;

    return (
      <div className="pie-tooltip">
        <p className="pie-tooltip-title">{item.name}</p>
        <p>{formatCurrency(item.value, currency)}</p>
      </div>
    );
  };

  if (!hasChartData) {
    return (
      <div className="pie-chart-box">
        <div className="pie-chart-empty">No category data yet</div>
      </div>
    );
  }

  return (
    <div className="pie-chart-box">
      <div className="pie-chart-box-inner">
        <div className="pie-chart-graphic">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="0%"
                outerRadius={outerRadius}
                dataKey="value"
                labelLine={false}
                label={renderLabel}
                stroke="none"
                isAnimationActive={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="pie-legend">
          {chartData.map((item, index) => (
            <div className="pie-legend-item" key={item.name}>
              <span
                className="pie-legend-dot"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="pie-legend-label">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PieChartBox;