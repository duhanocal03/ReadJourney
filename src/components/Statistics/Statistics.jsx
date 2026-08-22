import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import css from "./Statistics.module.css";

const Statistics = ({ entries }) => {
  if (!entries || entries.length === 0) return null;

  const chartData = entries.map((entry, index) => ({
    session: `#${index + 1}`,
    pages: (entry.finishPage ?? entry.startPage ?? 0) - (entry.startPage ?? 0),
  }));

  return (
    <div className={css.wrapper}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3e3e3e" />
          <XAxis dataKey="session" stroke="#686868" fontSize={11} />
          <YAxis stroke="#686868" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: "#262626",
              border: "none",
              borderRadius: 8,
              color: "#f9f9f9",
            }}
          />
          <Bar dataKey="pages" fill="#4f92f7" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;