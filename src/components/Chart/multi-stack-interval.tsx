import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Spin } from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';

const colorMap = ['#81E2FF', '#00B2FF', '#246EFF'];

function MultiInterval({ data, loading }: { data: any[]; loading: boolean }) {
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

  // 转换数据格式：将数据按 time 分组
  const transformedData = useMemo(() => {
    const grouped: Record<string, any> = {};
    data.forEach((item) => {
      if (!grouped[item.time]) {
        grouped[item.time] = { time: item.time };
      }
      grouped[item.time][item.name] = item.count;
    });
    return Object.values(grouped);
  }, [data]);

  // 自定义 Tooltip
  const CustomTooltipWrapper = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const tooltipData = payload.map((item: any) => ({
        name: item.name,
        value: item.value,
        color: item.fill,
      }));

      return <CustomTooltip title={label} data={tooltipData} />;
    }
    return null;
  };

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={370}>
        <BarChart data={transformedData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e8ef" />
          <XAxis dataKey="time" tick={{ fill: '#86909C', fontSize: 12 }} />
          <YAxis
            tick={{ fill: '#86909C', fontSize: 12 }}
            tickFormatter={(value) => `${Number(value) / 1000}k`}
          />
          <Tooltip
            content={<CustomTooltipWrapper />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          {names.map((name, index) => (
            <Bar
              key={name}
              dataKey={name}
              stackId="stack"
              fill={colorMap[index % colorMap.length]}
              barSize={16}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default MultiInterval;
