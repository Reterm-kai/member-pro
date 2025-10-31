import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Spin } from '@arco-design/web-react';

function HorizontalInterval({
  data,
  loading,
  height,
}: {
  data: any[];
  loading: boolean;
  height?: number;
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
          <p style={{ margin: 0, color: '#666' }}>{payload[0].payload.name}</p>
          <p style={{ margin: '5px 0 0 0', color: '#4086FF', fontWeight: 'bold' }}>
            {Number(payload[0].value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={height || 370}>
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e8ef" />
          <XAxis
            type="number"
            tick={{ fill: '#86909C', fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#86909C', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="count"
            fill="#4086FF"
            barSize={10}
            radius={[0, 5, 5, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default HorizontalInterval;
