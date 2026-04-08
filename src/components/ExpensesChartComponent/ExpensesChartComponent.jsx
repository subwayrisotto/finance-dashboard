import React from "react";
import { AgCharts } from "ag-charts-react";
import {
  ModuleRegistry,
  DonutSeriesModule,
  LegendModule,
} from "ag-charts-community";
import styles from "./ExpensesChartComponent.module.scss";

// Register modules once
ModuleRegistry.registerModules([DonutSeriesModule, LegendModule]);

const availableIcons = ["transport", "house", "subscriptions", "groceries"];

function ExpensesChart({ transactions }) {
  const groupedData = transactions
    ? Object.values(
        transactions.reduce((acc, t) => {
          if (!acc[t.category])
            acc[t.category] = { category: t.category, amount: 0 };
          acc[t.category].amount += t.amount;
          return acc;
        }, {}),
      )
    : [];

  const palette = [
    "#5B8FF9",
    "#61DDAA",
    "#65789B",
    "#F6BD16",
    "#7262fd",
    "#78D3F8",
  ];

  const categoryColors = groupedData.reduce((acc, cat, index) => {
    acc[cat.category] = palette[index % palette.length]; // cycle if more categories than palette
    return acc;
  }, {});

  const options = {
    width: 280,
    height: 280,
    background: { fill: "transparent" },
    data: groupedData,
    series: [
      {
        type: "donut",
        angleKey: "amount",
        labelKey: "category",
        innerRadiusRatio: 0.5,
        fills: groupedData.map((cat) => categoryColors[cat.category]),
        outerRadiusOffset: 10,
        tooltip: {
          renderer: (params) => {
            const { category, amount } = params.datum;
            return `${category}: ${amount.toLocaleString()}$`;
          },
        },
      },
    ],
    legend: { position: "bottom" },
  };

  return (
    <div className={styles.chartCtn}>
      <p className={styles.header}>Expenses by category</p>
      <AgCharts options={options} />

      <ul className={styles.categoriesList}>
        {groupedData.map((category, index) => {
          const total = groupedData.reduce((sum, t) => sum + t.amount, 0);
          const percent = ((category.amount / total) * 100).toFixed(0);

          return (
            <li className={styles.categoriesListItem} key={index}>
              <div className={styles.leftCtn}>
                <div
                  className={styles.categoryIcon}
                  style={{ backgroundColor: categoryColors[category.category] }}
                >
                  <img
                    src={`/assets/icons/${availableIcons.includes(category.category.toLowerCase()) ? category.category.toLowerCase() : "fallback"}.svg`}
                    alt={category.category}
                  />
                </div>
                <p className={styles.categoryName}>{category.category}</p>
              </div>
              <span className={styles.percantageValue}>
                {percent.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ExpensesChart;
