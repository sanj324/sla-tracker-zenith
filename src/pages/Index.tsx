import { useState } from "react";
import { Bank, DashboardStats } from "@/types/bank";
import StatsCard from "@/components/StatsCard";
import BankTable from "@/components/BankTable";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle, AlertCircle, Mail, FileCheck, Import, Export } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const { toast } = useToast();

  const stats: DashboardStats = {
    totalBanks: banks.length,
    totalBranches: banks.reduce((acc, bank) => acc + bank.branches, 0),
    completedProcess: banks.filter((bank) => bank.status === "completed").length,
    pendingProcess: banks.filter((bank) => bank.status === "pending").length,
    mailsSent: banks.filter((bank) => bank.mailStatus === "sent").length,
    frankingCompleted: banks.filter((bank) => bank.inFranking).length,
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real app, we would parse the CSV here
        toast({
          title: "Import successful",
          description: "Bank data has been imported successfully.",
        });
      }
    };
    input.click();
  };

  const handleExport = () => {
    // In a real app, we would generate a CSV here
    const csv = "data:text/csv;charset=utf-8," + encodeURIComponent("bank data");
    const link = document.createElement("a");
    link.href = csv;
    link.download = "bank-data.csv";
    link.click();
    toast({
      title: "Export successful",
      description: "Bank data has been exported successfully.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">SLA Tracking System</h1>
      <p className="text-center text-gray-600 mb-12">Track and manage bank communications efficiently</p>

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

      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <Button onClick={handleImport}>
            <Import className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button onClick={handleExport}>
            <Export className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
        <Button variant="default">Add Bank</Button>
      </div>

      <BankTable
        banks={banks}
        onEdit={(bank) => {
          toast({
            title: "Edit bank",
            description: `Editing ${bank.name}`,
          });
        }}
        onDelete={(id) => {
          setBanks(banks.filter((bank) => bank.id !== id));
          toast({
            title: "Bank deleted",
            description: "The bank has been deleted successfully.",
          });
        }}
      />
    </div>
  );
};

export default Index;