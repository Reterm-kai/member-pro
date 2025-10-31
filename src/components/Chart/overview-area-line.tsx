import React from 'react';
import { Spin } from '@arco-design/web-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function OverviewAreaLine({
  data,
  loading,
  name = '总内容量',
  color = '#4080FF',
}: {
  data: any[];
  loading: boolean;
  name?: string;
  color?: string;
}) {
  // 自定义 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '4px',
          }}
        >
          <p style={{ margin: 0, color: '#666' }}>{payload[0].payload.date}</p>
          <p style={{ margin: '5px 0 0 0', color, fontWeight: 'bold' }}>
            {name}: {Number(payload[0].value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(17, 126, 255, 0.5)" />
              <stop offset="100%" stopColor="rgba(17, 128, 255, 0)" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1EE7FF" />
              <stop offset="57%" stopColor="#249AFF" />
              <stop offset="85%" stopColor="#6F42FB" />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E5E8EF"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={{ stroke: '#E5E8EF' }}
            tickLine={false}
            tick={{ fill: '#86909C', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#86909C', fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="url(#strokeGradient)"
            strokeWidth={3}
            fill="url(#colorGradient)"
            dot={false}
            activeDot={{
              r: 8,
              fill: '#ffffff',
              stroke: color,
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default OverviewAreaLine;
