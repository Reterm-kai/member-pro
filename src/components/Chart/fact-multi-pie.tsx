import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface FactMultiPieProps {
  data: any[];
  loading: boolean;
  height: number;
}

const COLORS = ['#249eff', '#846BCE', '#21CCFF', '#86DF6C', '#0E42D2'];

function FactMultiPie(props: FactMultiPieProps) {
  // 按 category 分组数据
  const groupedData = props.data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const categories = Object.keys(groupedData);
  const chartWidth = 100 / categories.length; // 每个图表的宽度百分比

  // 自定义标签渲染
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(value * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: props.height || 400 }}>
      {categories.map((category, index) => {
        const categoryData = groupedData[category];
        return (
          <div key={category} style={{ width: `${chartWidth}%`, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="46%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius="80%"
                  innerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="type"
                >
                  {categoryData.map((_entry: any, idx: number) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                {index === 0 && (
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                )}
              </PieChart>
            </ResponsiveContainer>
            {/* 中心文本 */}
            <div
              style={{
                position: 'absolute',
                top: '46%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 14,
                fontWeight: 500,
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              {category}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FactMultiPie;
