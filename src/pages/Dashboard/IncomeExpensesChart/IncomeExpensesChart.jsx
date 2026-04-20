import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { getAllTransactions } from "../../../services/storage";
import "./IncomeExpensesChart.css";

function IncomeExpensesChart() {
  const allTransactions = getAllTransactions();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const monthlyMap = allTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    if (Number.isNaN(date.getTime())) return acc;

    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${month}`;

    if (!acc[key]) {
      acc[key] = {
        key,
        year,
        month,
        monthLabel: date.toLocaleString("en-US", { month: "long" }),
        expenses: 0,
      };
    }

    acc[key].expenses += Number(transaction.amount) || 0;
    return acc;
  }, {});

  const chartData = Object.values(monthlyMap)
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    })
    .map((item) => ({
      month: item.monthLabel,
      expenses: Number(item.expenses.toFixed(2)),
    }));

  const hasChartData = chartData.length > 0;

  const maxExpenses = hasChartData
    ? Math.max(...chartData.map((item) => item.expenses), 0)
    : 0;

  const roundedMax =
    maxExpenses > 0 ? Math.ceil(maxExpenses / 1000) * 1000 : 1000;

  const tickStep =
    roundedMax <= 4000
      ? 1000
      : Math.ceil(roundedMax / 4 / 1000) * 1000;

  const yAxisTicks = [0, tickStep, tickStep * 2, tickStep * 3, tickStep * 4];

  const formatYAxisTick = (value) => {
    if (value >= 1000) {
      const shortValue = value / 1000;
      return `$${Number.isInteger(shortValue) ? shortValue : shortValue.toFixed(1)}K`;
    }
    return `$${value}`;
  };

  const formatPointLabel = (value) => {
    if (value >= 1000) {
      const shortValue = value / 1000;
      return `$${Number.isInteger(shortValue) ? shortValue : shortValue.toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="income-expenses-tooltip">
        <p className="tooltip-month">{label}</p>
        <p>Expenses: ${payload[0].value.toFixed(2)}</p>
      </div>
    );
  };

  return (
    <div className="income-expenses-chart">
      <h2>Monthly Spending Trend</h2>

      {!hasChartData ? (
        <div className="income-expenses-chart-empty">
          No transaction data yet
        </div>
      ) : (
        <div className="income-expenses-chart-inner" tabIndex={-1}>
          <ResponsiveContainer width="100%" height={isMobile ? 280 : 360}>
            <AreaChart
              data={chartData}
              accessibilityLayer={false}
              margin={
                isMobile
                  ? { top: 24, right: 24, left: 6, bottom: 16 }
                  : { top: 28, right: 55, left: 8, bottom: 28 }
              }
            >
              <defs>
                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5da2f6" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="#5da2f6" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#e8edf3"
                strokeDasharray="3 3"
                vertical={true}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                padding={isMobile ? { left: 22, right: 22 } : { left: 42, right: 42 }}
                tick={{ fill: "#7d7d7d", fontSize: isMobile ? 11 : 14 }}
                interval={0}
              />

              <YAxis
                domain={[0, yAxisTicks[yAxisTicks.length - 1]]}
                ticks={yAxisTicks}
                axisLine={false}
                tickLine={false}
                tickMargin={isMobile ? 8 : 12}
                tick={{ fill: "#8a8f98", fontSize: isMobile ? 11 : 14 }}
                tickFormatter={formatYAxisTick}
                width={isMobile ? 42 : 60}
              />

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#5da2f6"
                strokeWidth={isMobile ? 2.5 : 3}
                fill="url(#expensesGradient)"
                dot={{
                  r: isMobile ? 3 : 4,
                  stroke: "#5da2f6",
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: isMobile ? 5 : 6,
                  stroke: "#5da2f6",
                  strokeWidth: 2,
                  fill: "#5da2f6",
                }}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="expenses"
                  position="top"
                  formatter={formatPointLabel}
                  offset={isMobile ? 8 : 12}
                  style={{
                    fill: "#6f7680",
                    fontSize: isMobile ? 11 : 13,
                    fontWeight: 600,
                  }}
                />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default IncomeExpensesChart;