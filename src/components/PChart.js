import React, { useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PChart({ finalExpenses }) {
  useEffect(() => {}, [finalExpenses]);
  const categoryPriceData = finalExpenses.reduce((acc, curr) => {
    var currPrice = Number(curr.price);
    if (acc[curr.category]) {
      acc[curr.category] += currPrice;
    } else {
      acc[curr.category] = currPrice;
    }
    return acc;
  }, {});

  const chartData = Object.keys(categoryPriceData).map((category) => {
    return {
      category,
      price: categoryPriceData[category],
    };
  });

  return (
    <PieChart width={300} height={200}>
      <Pie
        data={chartData}
        cx={200}
        cy={100}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="price"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default PChart;
