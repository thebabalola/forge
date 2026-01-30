import React from "react";

export type VaultMetricPoint = { date: string; tvl: number };

interface VaultAnalyticsProps {
  vaultId?: string;
  data?: VaultMetricPoint[];
}

const DEFAULT_DATA: VaultMetricPoint[] = [
  { date: "2026-01-24", tvl: 120000 },
  { date: "2026-01-25", tvl: 125000 },
  { date: "2026-01-26", tvl: 123000 },
  { date: "2026-01-27", tvl: 130000 },
  { date: "2026-01-28", tvl: 128500 },
  { date: "2026-01-29", tvl: 135000 },
];

export default function VaultAnalytics({
  vaultId,
  data = DEFAULT_DATA,
}: VaultAnalyticsProps) {
  const points = data;
  const totalAssets = points.length ? points[points.length - 1].tvl : 0;
  const first = points.length ? points[0].tvl : 0;
  const change = first ? ((totalAssets - first) / first) * 100 : 0;

  const values = points.map((p) => p.tvl);
  const min = Math.min(...values);
  const max = Math.max(...values);

  // Simple sparkline path
  const width = 240;
  const height = 48;
  const path = values
    .map((v, i) => {
      const x = (i / (values.length - 1 || 1)) * width;
      const y = height - ((v - min) / (max - min || 1)) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-medium">Vault Performance</h3>
          <p className="text-xs text-gray-500">Vault: {vaultId ?? "—"}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">
            ${(totalAssets / 1000).toFixed(1)}k
          </div>
          <div
            className={`text-xs ${change >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {" "}
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </div>
        </div>
      </div>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
      >
        <path
          d={path}
          fill="none"
          stroke="#4F46E5"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-2 text-xs text-gray-500">
        Shows TVL (total value locked) trend over time. Replace with live data
        via Graph / API.
      </div>
    </div>
  );
}
