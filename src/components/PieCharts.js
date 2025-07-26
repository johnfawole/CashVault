import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#ff4d4d", "#4d79ff", "#ffcc00", "#33cc33",
  "#ff66b2", "#9966ff", "#00bcd4", "#ff9800"
];

export default function CustomPieChart({ title, data }) {
  return (
    <div className="chart-box" style={{ width: "100%", overflow: "visible" }}>
      <h2>{title}</h2>
      <PieChart width={550} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) =>
            `₦${value.toLocaleString(undefined, { minimumFractionDigits: 0 })}`
          }
        />
      </PieChart>
    </div>
  );
}

function renderCustomizedLabel({
  cx, cy, midAngle, innerRadius, outerRadius, index, name, value, percent
}) {
  const RAD = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RAD);
  const y = cy + radius * Math.sin(-midAngle * RAD);

  const fullLabel = `${name} — ₦${value.toLocaleString()} (${(percent * 100).toFixed(1)}%)`;
  const truncatedName = name.length > 12 ? name.slice(0, 12) + "…" : name;
  const labelText = `${truncatedName} (₦${value.toLocaleString()})`;

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      fontSize={12}
      textAnchor={x > cx ? "start" : "end"}
    >
      <title>{fullLabel}</title>
      {labelText}
    </text>
  );
}
