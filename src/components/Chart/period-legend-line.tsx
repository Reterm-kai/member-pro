import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { Spin } from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';

const lineColor = ['#21CCFF', '#313CA9', '#249EFF'];

function PeriodLine({ data, loading }: { data: any[]; loading: boolean }) {
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
      grouped[item.time][item.name] = item.rate;
    });
    return Object.values(grouped);
  }, [data]);

  // 自定义 Tooltip
  const CustomTooltipWrapper = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const tooltipData = payload.map((item: any) => ({
        name: item.name,
        value: item.value,
        color: item.stroke,
      }));

      return <CustomTooltip title={label} data={tooltipData} />;
    }
    return null;
  };

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={370}>
        <LineChart data={transformedData} margin={{ top: 10, right: 20, bottom: 120, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e8ef" />
          <XAxis dataKey="time" tick={{ fill: '#86909C', fontSize: 12 }} />
          <YAxis
            tick={{ fill: '#86909C', fontSize: 12 }}
            tickFormatter={(value) => `${Number(value)} %`}
          />
          <Tooltip
            content={<CustomTooltipWrapper />}
            cursor={{ stroke: '#86909C', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          {names.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={lineColor[index % lineColor.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#ffffff', stroke: lineColor[index % lineColor.length], strokeWidth: 2 }}
              name={name}
            />
          ))}
          <Brush
            dataKey="time"
            height={80}
            stroke="#165DFF"
            fill="rgba(206, 224, 255, 0.3)"
            travellerWidth={22}
            y={290}
          >
            <LineChart>
              {names.map((name, index) => (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke="rgba(36, 158, 255, 0.3)"
                  strokeWidth={2}
                  dot={false}
                  fill="rgba(4, 135, 255, 0.15)"
                />
              ))}
            </LineChart>
          </Brush>
        </LineChart>
      </ResponsiveContainer>
    </Spin>
  );
}

export default PeriodLine;
