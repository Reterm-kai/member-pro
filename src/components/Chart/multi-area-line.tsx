import React, { useMemo } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Spin } from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';

// 渐变色配置（从上到下）
const areaGradients = [
  { id: 'areaGradient0', color1: 'rgba(131, 100, 255, 0.5)', color2: 'rgba(80, 52, 255, 0.001)' },
  { id: 'areaGradient1', color1: 'rgba(100, 255, 236, 0.5)', color2: 'rgba(52, 255, 243, 0.001)' },
  { id: 'areaGradient2', color1: 'rgba(255, 211, 100, 0.5)', color2: 'rgba(255, 235, 52, 0.001)' },
  { id: 'areaGradient3', color1: 'rgba(100, 162, 255, 0.5)', color2: 'rgba(52, 105, 255, 0.001)' },
];

const lineColorMap = ['#722ED1', '#33D1C9', '#F77234', '#165DFF'];

function MultiAreaLine({ data, loading }: { data: any[]; loading: boolean }) {
  // 提取所有唯一的 name
  const names = useMemo(() => {
    const uniqueNames = new Set<string>();
    data.forEach((item) => {
      if (item.name) {
        uniqueNames.add(item.name);
      }
    });
    return Array.from(uniqueNames);
  }, [data]);

  // 自定义 Tooltip
  const CustomTooltipWrapper = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const tooltipData = payload
        .map((item: any) => ({
          name: item.name,
          value: item.value,
          color: item.stroke,
        }))
        .sort((a: any, b: any) => b.value - a.value);

      return (
        <CustomTooltip
          title={label}
          data={tooltipData}
          formatter={(value) => Number(value).toLocaleString()}
        />
      );
    }
    return null;
  };

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={352}>
        <ComposedChart data={data} margin={{ top: 10, right: 0, bottom: 30, left: 30 }}>
          <defs>
            {areaGradients.map((gradient) => (
              <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradient.color1} />
                <stop offset="100%" stopColor={gradient.color2} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e8ef" />
          <XAxis
            dataKey="time"
            tick={{ fill: '#86909C', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: '#86909C', fontSize: 12 }}
            tickFormatter={(value) => `${Number(value) / 100} k`}
          />
          <Tooltip
            content={<CustomTooltipWrapper />}
            cursor={{ stroke: '#86909C', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          {names.map((name, index) => (
            <React.Fragment key={name}>
              <Area
                type="monotone"
                dataKey="count"
                data={data.filter((item) => item.name === name)}
                stroke="none"
                fill={`url(#${areaGradients[index % areaGradients.length].id})`}
                fillOpacity={1}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="count"
                data={data.filter((item) => item.name === name)}
                stroke={lineColorMap[index % lineColorMap.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#ffffff', stroke: lineColorMap[index % lineColorMap.length], strokeWidth: 2 }}
                isAnimationActive={false}
                name={name}
              />
            </React.Fragment>
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default MultiAreaLine;
