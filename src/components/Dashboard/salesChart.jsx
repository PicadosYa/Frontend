import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Ene', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Abr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
];

export const SalesChart = () => {
  return (
    <div className="h-[400px] backdrop-blur-xl bg-dashboard-glass p-4 rounded-lg border border-white/10">
      <h2 className="text-xl font-bold mb-4 text-white">Ventas Mensuales</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="barHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
              <stop offset="33%" stopColor="#dc2626" stopOpacity={1} />
              <stop offset="66%" stopColor="#b91c1c" stopOpacity={1} />
              <stop offset="100%" stopColor="#991b1b" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: '1px solid rgba(255,255,255,0.1)' 
            }}
          />
          <Bar 
            dataKey="sales" 
            fill="#ef4444"
            className="bar-hover"
            onMouseOver={(data, index) => {
              const bars = document.getElementsByClassName('bar-hover');
              if (bars[index]) {
                bars[index].setAttribute('fill', 'url(#barHover)');
              }
            }}
            onMouseOut={(data, index) => {
              const bars = document.getElementsByClassName('bar-hover');
              if (bars[index]) {
                bars[index].setAttribute('fill', '#ef4444');
              }
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};