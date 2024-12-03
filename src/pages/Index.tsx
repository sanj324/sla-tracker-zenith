import { useState } from "react";
import { Bank, DashboardStats } from "@/types/bank";
import StatsCard from "@/components/StatsCard";
import BankTable from "@/components/BankTable";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle, AlertCircle, Mail, FileCheck, Import, ArrowUpDown } from "lucide-react";
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

  const validateCsvData = (headers: string[], values: string[]) => {
    const expectedHeaders = ["Bank Name", "Branches", "Mail Status", "Courier Date", "Received in TM", "In Franking", "Status"];
    const headerString = headers.join(',').toLowerCase();
    const expectedHeaderString = expectedHeaders.join(',').toLowerCase();
    
    if (headerString !== expectedHeaderString) {
      throw new Error("Invalid CSV format. Please ensure the headers match the expected format.");
    }
    
    if (values.length !== headers.length) {
      throw new Error("Invalid data format. Please ensure all fields are present.");
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const csvText = event.target?.result as string;
            const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
            const headers = lines[0].split(',').map(header => header.trim());
            
            validateCsvData(headers, lines[1]?.split(',') || []);
            
            const importedBanks: Bank[] = lines.slice(1).map((line, index) => {
              const values = line.split(',').map(value => value.trim());
              
              if (!values[0]) {
                throw new Error(`Row ${index + 2}: Bank name is required`);
              }

              return {
                id: `imported-${index}`,
                name: values[0],
                branches: parseInt(values[1]) || 0,
                mailStatus: (values[2] as "sent" | "pending" | "failed") || "pending",
                courierDate: values[3] || null,
                receivedInTM: values[4]?.toLowerCase() === 'true',
                inFranking: values[5]?.toLowerCase() === 'true',
                status: (values[6] as "completed" | "pending" | "failed") || "pending"
              };
            });

            setBanks(prevBanks => [...prevBanks, ...importedBanks]);
            toast({
              title: "Import successful",
              description: `${importedBanks.length} banks have been imported successfully.`,
            });
          } catch (error) {
            toast({
              title: "Import failed",
              description: error instanceof Error ? error.message : "Failed to import CSV file",
              variant: "destructive",
            });
          }
        };

        reader.onerror = () => {
          toast({
            title: "Import failed",
            description: "Failed to read the CSV file",
            variant: "destructive",
          });
        };

        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const headers = ["Bank Name,Branches,Mail Status,Courier Date,Received in TM,In Franking,Status"];
    const csvData = banks.map(bank => (
      `${bank.name},${bank.branches},${bank.mailStatus},${bank.courierDate || ''},${bank.receivedInTM},${bank.inFranking},${bank.status}`
    ));
    
    const csv = headers.concat(csvData).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
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
          <Button 
            onClick={handleImport}
            variant="secondary"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Import className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button 
            onClick={handleExport}
            variant="secondary"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
        <Button 
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add Bank
        </Button>
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