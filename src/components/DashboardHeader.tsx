import PublishLink from "./PublishLink";
import { Bank } from "@/types/bank";

interface DashboardHeaderProps {
  banks: Bank[];
}

const DashboardHeader = ({ banks }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-4 text-center">SLA Tracking System</h1>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Track and manage bank communications efficiently</p>
        <PublishLink banks={banks} />
      </div>
    </div>
  );
};

export default DashboardHeader;