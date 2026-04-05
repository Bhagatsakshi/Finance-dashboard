import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);

export default function Dashboard({ transactions }) {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const labels = transactions.map(t => t.date);
  const amounts = transactions.map(t => t.amount);

  const dataLine = {
    labels,
    datasets: [
      {
        label: "Trend",
        data: amounts,
        borderColor: "#4bc0c0",
        backgroundColor: "#4bc0c0"
      }
    ]
  };

  const dataBar = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Summary",
        data: [income, expense],
        backgroundColor: ["#36a2eb", "#ff6384"]
      }
    ]
  };

  const commonOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#fff"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" }
      }
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card p-3">Balance ₹{income - expense}</div>
      </div>
      <div className="col-md-4">
        <div className="card p-3">Income ₹{income}</div>
      </div>
      <div className="col-md-4">
        <div className="card p-3">Expense ₹{expense}</div>
      </div>

      {/* Charts */}
      <div className="col-md-6 mt-4">
        <Line data={dataLine} options={commonOptions} />
      </div>

      <div className="col-md-6 mt-4">
        <Bar data={dataBar} options={commonOptions} />
      </div>
    </div>
  );
}