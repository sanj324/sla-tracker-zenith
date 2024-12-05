import { useState } from "react";
import { Bank, DashboardStats } from "@/types/bank";
import BankTable from "@/components/BankTable";
import DashboardStatsDisplay from "@/components/DashboardStats";
import DashboardActions from "@/components/DashboardActions";
import BankForm from "@/components/BankForm";
import ReportsSection from "@/components/ReportsSection";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | undefined>();
  const { toast } = useToast();

  const stats: DashboardStats = {
    totalBanks: banks.length,
    totalBranches: banks.reduce((acc, bank) => acc + (bank.branches || 0), 0),
    completedProcess: banks.filter((bank) => bank.status === "completed").length,
    pendingProcess: banks.filter((bank) => bank.status === "pending").length,
    mailsSent: banks.filter((bank) => bank.mailStatus === "sent").length,
    frankingCompleted: banks.filter((bank) => bank.inFranking).length,
  };

  const handleAddEditBank = (data: Partial<Bank>) => {
    if (editingBank) {
      // Update existing bank
      setBanks(banks.map(bank => 
        bank.id === editingBank.id 
          ? { 
              ...bank, 
              ...data,
              resendDate: data.resendDate || null // Ensure resendDate is properly handled
            }
          : bank
      ));
      toast({
        title: "Bank updated",
        description: "Bank information has been updated successfully.",
      });
    } else {
      // Add new bank with all required properties
      const newBank: Bank = {
        id: `bank-${Date.now()}`,
        name: data.name || "",
        branches: data.branches || 0,
        mailStatus: data.mailStatus || "pending",
        courierDate: data.courierDate || null,
        receivedInTM: data.receivedInTM || false,
        inFranking: data.inFranking || false,
        status: data.status || "pending",
        lastAgreementDate: data.lastAgreementDate || null,
        newAgreementDate: data.newAgreementDate || null,
        addonAgreementDate: data.addonAgreementDate || null,
        oldAmount: data.oldAmount || null,
        newAmount: data.newAmount || null,
        resend: data.resend || false,
        resendDate: data.resendDate || null,
        remarks: data.remarks || null
      };
      setBanks([...banks, newBank]);
      toast({
        title: "Bank added",
        description: "New bank has been added successfully.",
      });
    }
    setEditingBank(undefined);
  };

  const handleEdit = (bank: Bank) => {
    setEditingBank(bank);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this bank?")) {
      setBanks(banks.filter((bank) => bank.id !== id));
      toast({
        title: "Bank deleted",
        description: "The bank has been deleted successfully.",
      });
    }
  };

  const validateCsvData = (headers: string[]) => {
    const requiredHeader = "bank name";
    const headerString = headers.map(h => h.toLowerCase().trim()).join(',');
    
    if (!headerString.includes(requiredHeader)) {
      throw new Error("Invalid CSV format. CSV must contain the 'Bank Name' column.");
    }
  };

  const parseMailStatus = (status: string): "sent" | "pending" | "failed" => {
    status = status.toLowerCase().trim();
    if (status === "done" || status === "sent") return "sent";
    if (status === "p" || status === "pending") return "pending";
    return "failed";
  };

  const parseBranches = (value: string): number => {
    if (!value || value.trim() === '' || value.trim() === ' ') return 0;
    const parsed = parseInt(value.trim());
    return isNaN(parsed) ? 0 : parsed;
  };

  const parseDate = (date: string): string | null => {
    if (!date || date.trim() === '' || date.toLowerCase() === 'h2h') return null;
    return date.trim();
  };

  const parseBoolean = (value: string): boolean => {
    value = value.toLowerCase().trim();
    return value === 'yes' || value === 'true' || value === '1';
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
            
            validateCsvData(headers);
            
            const bankNameIndex = headers.findIndex(h => h.includes('bank name'));
            const branchesIndex = headers.findIndex(h => h.includes('branches'));
            const mailStatusIndex = headers.findIndex(h => h.includes('send mail'));
            const courierDateIndex = headers.findIndex(h => h.includes('courice date') || h.includes('courier date'));
            const receivedIndex = headers.findIndex(h => h.includes('recvd in tm') || h.includes('received in tm'));
            const frankingIndex = headers.findIndex(h => h.includes('in franking'));
            const resendDateIndex = headers.findIndex(h => h.includes('resend date'));

            const importedBanks: Bank[] = lines.slice(1)
              .filter(line => line.trim() !== '')
              .map((line, index) => {
                const values = line.split(',').map(value => value.trim());
                const bankName = values[bankNameIndex]?.trim();
                
                if (!bankName) {
                  console.warn(`Row ${index + 2}: Empty bank name, skipping row`);
                  return null;
                }

                return {
                  id: `imported-${index}`,
                  name: bankName,
                  branches: parseBranches(values[branchesIndex]),
                  mailStatus: parseMailStatus(values[mailStatusIndex] || ''),
                  courierDate: parseDate(values[courierDateIndex] || ''),
                  receivedInTM: parseBoolean(values[receivedIndex] || ''),
                  inFranking: parseBoolean(values[frankingIndex] || ''),
                  resendDate: parseDate(values[resendDateIndex] || ''),
                  status: values[mailStatusIndex]?.toLowerCase().includes('done') ? 'completed' : 'pending'
                };
              })
              .filter((bank): bank is Bank => bank !== null);

            setBanks(prevBanks => [...prevBanks, ...importedBanks]);
            toast({
              title: "Import successful",
              description: `${importedBanks.length} banks have been imported successfully.`,
            });
          } catch (error) {
            console.error('Import error:', error);
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
    const headers = ["Sr No,Bank Name,Branches,Send Mail,Courice Date,Recvd in TM,In Franking,Resend Date"];
    const csvData = banks.map((bank, index) => (
      `${index + 1},${bank.name},${bank.branches || ''},${bank.mailStatus || ''},${bank.courierDate || ''},${bank.receivedInTM || ''},${bank.inFranking || ''},${bank.resendDate || ''}`
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
    <div className="container mx-auto py-4 px-2 sm:py-8 sm:px-4">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-center">SLA Tracking System</h1>
      <p className="text-center text-gray-600 mb-6 sm:mb-12 text-sm sm:text-base">Track and manage bank communications efficiently</p>

      <div className="space-y-6">
        <DashboardStatsDisplay stats={stats} />
        
        <div className="overflow-hidden">
          <DashboardActions
            onImport={handleImport}
            onExport={handleExport}
            onClear={handleClearData}
            onAddBank={() => {
              setEditingBank(undefined);
              setFormOpen(true);
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <ReportsSection banks={banks} />
        </div>

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <BankTable
            banks={banks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <BankForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleAddEditBank}
        initialData={editingBank}
      />
    </div>
  );
};

export default Index;