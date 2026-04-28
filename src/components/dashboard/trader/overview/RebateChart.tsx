/* eslint-disable @typescript-eslint/no-explicit-any */
import { formattingUsd } from "@/helper/formattingCurrency";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler 
} from "chart.js";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

const crosshairPlugin = {
  id: "crosshairLine",
  afterDatasetsDraw(chart: any) {
    const { ctx, tooltip, chartArea } = chart;

    if (!tooltip || !tooltip._active || tooltip._active.length === 0) return;

    const x = tooltip._active[0].element.x;

    ctx.save();

    // garis vertikal
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#9ca3af"; // abu halus
    ctx.setLineDash([4, 4]); // dashed line (optional)
    ctx.stroke();

    ctx.restore();
  }
};

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  crosshairPlugin 
);

const getOrCreateTooltip = (chart: any) => {
  let tooltipEl = chart.canvas.parentNode.querySelector(".chart-tooltip");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "chart-tooltip";

    tooltipEl.style.position = "fixed"; 
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.background = "#111827";
    tooltipEl.style.color = "#fff";
    tooltipEl.style.padding = "8px 12px";
    tooltipEl.style.borderRadius = "8px";
    tooltipEl.style.fontSize = "12px";
    tooltipEl.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
    tooltipEl.style.opacity = "0";
    tooltipEl.style.transform = 'translate(-50%, -50%)';
    tooltipEl.style.transition = "all .08s ease";
    tooltipEl.style.zIndex = "9999";

    const content = document.createElement("div");
    content.className = "tooltip-content";

    tooltipEl.appendChild(content);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context: any) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  const dataPoint = tooltip.dataPoints[0];
  const value = dataPoint.raw;
  const label = dataPoint.label;

  const content = tooltipEl.querySelector(".tooltip-content");

  content.innerHTML = `
    <div style="font-weight:600; margin-bottom:4px;">
      ${label}
    </div>
    <div style="color:#a5b4fc;">
      ${formattingUsd(Number(value))}
    </div>
  `;

  const rect = chart.canvas.getBoundingClientRect();

  let left = rect.left + tooltip.caretX;
  let top = rect.top + tooltip.caretY - 50;

  const width = tooltipEl.offsetWidth;

  if (left + width > window.innerWidth) {
    left = window.innerWidth - width - 10;
  }

  if (left < 0) left = 10;

  if (top < 0) {
    top = rect.top + tooltip.caretY + 10;
  }

  tooltipEl.style.opacity = "1";
  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
};

const RebateChart = ({
  rebateByDate
}: {
  rebateByDate: Record<string, number>
}) => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  const sortedDate = Object.entries(rebateByDate).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    
    return dateA.getTime() - dateB.getTime(); 
  });

  const readyRebateByDate = Object.fromEntries(sortedDate);
  const labels = Object.keys(readyRebateByDate);
  const dataRebate = Object.values(readyRebateByDate);
  const maxValueChartY = dataRebate.length > 0 ? Math.max(...dataRebate) : 0;
  const valueChartY = Math.max(20, Math.round(maxValueChartY) + 5);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataRebate, 
        borderColor: "#4160ff",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,

        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );

          gradient.addColorStop(0, "rgba(99, 102, 241, 0.4)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)");

          return gradient;
        } 
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false, 
        external: externalTooltipHandler
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#9ca3af",
          font: { size: 11 },
          autoSkip: true,
          maxTicksLimit: 6
        },
        border: { display: false }
      },
      y: {
        min: 0,
        max: valueChartY,
        ticks: {
          stepSize: 5,
          callback: (val: any) => `$${val}`,
          color: "#9ca3af",
          font: { size: 11 }
        },
        grid: {
          color: "#e5e7eb",
          drawBorder: false
        },
        border: { display: false }
      }
    }
  };  
  return (
    <div className="p-6 w-full aspect-2/1 bg-white border border-[#DDDDDD] rounded-lg">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  )
}

export default RebateChart;
