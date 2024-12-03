import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
}

const StatsCard = ({ title, value, icon, gradient }: StatsCardProps) => {
  return (
    <div className={`p-6 rounded-xl ${gradient} text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium opacity-90">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;