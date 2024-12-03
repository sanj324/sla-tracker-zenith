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
    totalBranches: banks.reduce((acc, bank) => acc + (bank.branches || 0), 0),
    completedProcess: banks.filter((bank) => bank.status === "completed").length,
    pendingProcess: banks.filter((bank) => bank.status === "pending").length,
    mailsSent: banks.filter((bank) => bank.mailStatus === "sent").length,
    frankingCompleted: banks.filter((bank) => bank.inFranking).length,
  };

  const validateCsvData = (headers: string[], values: string[]) => {
    const expectedHeaders = ["sr no", "bank name", "branches", "send mail", "courice date", "recvd in tm", "in franking", "resend courice"];
    const headerString = headers.map(h => h.toLowerCase().trim()).join(',');
    const expectedHeaderString = expectedHeaders.join(',');
    
    if (!headerString.includes("bank name")) {
      throw new Error("Invalid CSV format. CSV must contain at least the 'Bank Name' column.");
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
            const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
            
            validateCsvData(headers, lines[1]?.split(',') || []);
            
            const bankNameIndex = headers.findIndex(h => h.includes('bank name'));
            const branchesIndex = headers.findIndex(h => h.includes('branches'));
            const mailStatusIndex = headers.findIndex(h => h.includes('send mail'));
            const courierDateIndex = headers.findIndex(h => h.includes('courice date'));
            const receivedIndex = headers.findIndex(h => h.includes('recvd in tm'));
            const frankingIndex = headers.findIndex(h => h.includes('in franking'));

            const importedBanks: Bank[] = lines.slice(1).map((line, index) => {
              const values = line.split(',').map(value => value.trim());
              
              // Only validate bank name as required
              if (!values[bankNameIndex]) {
                throw new Error(`Row ${index + 2}: Bank name is required`);
              }

              return {
                id: `imported-${index}`,
                name: values[bankNameIndex],
                branches: values[branchesIndex] ? parseInt(values[branchesIndex]) : 0,
                mailStatus: (values[mailStatusIndex]?.toLowerCase() === 'done' || values[mailStatusIndex]?.toLowerCase() === 'sent') 
                  ? 'sent' 
                  : values[mailStatusIndex]?.toLowerCase() === 'pending' 
                  ? 'pending' 
                  : 'failed',
                courierDate: values[courierDateIndex] || null,
                receivedInTM: values[receivedIndex]?.toLowerCase() === 'yes' || values[receivedIndex]?.toLowerCase() === 'true',
                inFranking: values[frankingIndex]?.toLowerCase() === 'yes' || values[frankingIndex]?.toLowerCase() === 'true',
                status: values[mailStatusIndex] ? 
                  (values[mailStatusIndex].toLowerCase() === 'completed' ? 'completed' : 
                   values[mailStatusIndex].toLowerCase() === 'pending' ? 'pending' : 'failed')
                  : 'pending'
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
    const headers = ["Sr No,Bank Name,Branches,Send Mail,Courice Date,Recvd in TM,In Franking,Resend Courice"];
    const csvData = banks.map((bank, index) => (
      `${index + 1},${bank.name},${bank.branches || ''},${bank.mailStatus || ''},${bank.courierDate || ''},${bank.receivedInTM || ''},${bank.inFranking || ''},`
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
