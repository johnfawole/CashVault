import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#ff4d4d", "#4d79ff", "#ffcc00", "#33cc33", "#ff66b2", "#9966ff"];

export default function CustomPieChart({ title, data }) {
  return (
    <div className="chart-box">
      <h2>{title}</h2>
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={200}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
