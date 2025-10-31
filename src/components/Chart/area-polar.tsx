import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Spin } from '@arco-design/web-react';

interface AreaPolarProps {
  data: any[];
  loading: boolean;
  fields: string[];
  height: number;
}

const COLORS = ['#313CA9', '#21CCFF', '#249EFF'];
const FILL_COLORS = [
  'rgba(49, 60, 169, 0.4)',
  'rgba(33, 204, 255, 0.4)',
  'rgba(36, 158, 255, 0.4)',
];

function AreaPolar(props: AreaPolarProps) {
  const { data, loading, fields, height } = props;

  // 转换数据格式：将多个字段转换为 recharts 所需的格式
  // 原始数据: [{ item: 'A', field1: 10, field2: 20 }]
  // 转换后: [{ item: 'A', field1: 10, field2: 20 }] (recharts 直接支持这种格式)

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={height || 400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e5e8ef" />
          <PolarAngleAxis dataKey="item" tick={{ fill: '#86909C', fontSize: 12 }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 80]}
            tick={{ fill: '#86909C', fontSize: 12 }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px',
            }}
          />
          {fields.map((field, index) => (
            <Radar
              key={field}
              name={field}
              dataKey={field}
              stroke={COLORS[index % COLORS.length]}
              fill={FILL_COLORS[index % FILL_COLORS.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
          <Legend
            wrapperStyle={{ right: 0 }}
            iconType="circle"
            iconSize={8}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default AreaPolar;
