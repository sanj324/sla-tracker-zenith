import { useState } from "react";
import { Bank, DashboardStats } from "@/types/bank";
import BankTable from "@/components/BankTable";
import DashboardStatsDisplay from "@/components/DashboardStats";
import DashboardActions from "@/components/DashboardActions";
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

  const handleClearData = () => {
    setBanks([]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">SLA Tracking System</h1>
      <p className="text-center text-gray-600 mb-12">Track and manage bank communications efficiently</p>

      <DashboardStatsDisplay stats={stats} />
      
      <DashboardActions
        onImport={handleImport}
        onExport={handleExport}
        onClear={handleClearData}
      />

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