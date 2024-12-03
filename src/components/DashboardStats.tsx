import { Building2, CheckCircle, AlertCircle, Mail, FileCheck } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { DashboardStats as Stats } from "@/types/bank";

interface DashboardStatsProps {
  stats: Stats;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <StatsCard
        title="Total Banks"
        value={stats.totalBanks}
        icon={<Building2 />}
        gradient="bg-gradient-to-r from-blue-600 to-blue-800"
      />
      <StatsCard
        title="Total Branches"
        value={stats.totalBranches}
        icon={<Building2 />}
        gradient="bg-gradient-to-r from-purple-600 to-purple-800"
      />
      <StatsCard
        title="Completed Process"
        value={`${stats.completedProcess} Banks (${
          stats.totalBanks ? Math.round((stats.completedProcess / stats.totalBanks) * 100) : 0
        }%)`}
        icon={<CheckCircle />}
        gradient="bg-gradient-to-r from-green-600 to-green-800"
      />
      <StatsCard
        title="Pending Process"
        value={`${stats.pendingProcess} Banks`}
        icon={<AlertCircle />}
        gradient="bg-gradient-to-r from-yellow-600 to-yellow-800"
      />
      <StatsCard
        title="Mail Status"
        value={`${stats.mailsSent} Sent`}
        icon={<Mail />}
        gradient="bg-gradient-to-r from-blue-500 to-blue-700"
      />
      <StatsCard
        title="Franking Status"
        value={`${stats.frankingCompleted} Completed`}
        icon={<FileCheck />}
        gradient="bg-gradient-to-r from-pink-600 to-pink-800"
      />
    </div>
  );
};

export default DashboardStats;