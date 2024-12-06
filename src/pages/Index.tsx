import { useState, useEffect } from "react";
import { Bank, DashboardStats } from "@/types/bank";
import BankTable from "@/components/BankTable";
import DashboardStatsDisplay from "@/components/DashboardStats";
import DashboardActions from "@/components/DashboardActions";
import BankForm from "@/components/BankForm";
import ReportsSection from "@/components/ReportsSection";
import DashboardHeader from "@/components/DashboardHeader";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { initialBanks } from "@/data/initialBanks";
import { processCSVData } from "@/utils/csvImport";
import * as XLSX from 'xlsx';

const Index = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | undefined>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"pending" | "completed" | "all">("pending");

  useEffect(() => {
    const storedBanks = localStorage.getItem('banks');
    if (storedBanks) {
      setBanks(JSON.parse(storedBanks));
    } else {
      // Convert partial banks to full banks with default values
      const fullBanks = initialBanks.map(bank => ({
        id: bank.id || `bank-${Date.now()}`,
        name: bank.name || "",
        branches: bank.branches || 0,
        mailStatus: bank.mailStatus || "pending",
        courierDate: bank.courierDate || null,
        receivedInTM: bank.receivedInTM || false,
        inFranking: bank.inFranking || false,
        status: bank.status || "pending",
        lastAgreementDate: bank.lastAgreementDate || null,
        newAgreementDate: bank.newAgreementDate || null,
        resendDate: bank.resendDate || null,
        oldAmount: bank.oldAmount || 0,
        newAmount: bank.newAmount || 0,
        remarks: bank.remarks || "",
        addOnAgreement: bank.addOnAgreement || false,
        finishDate: bank.finishDate || null
      }));
      setBanks(fullBanks);
      localStorage.setItem('banks', JSON.stringify(fullBanks));
    }
  }, []);

  // Save banks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('banks', JSON.stringify(banks));
  }, [banks]);

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
      const updatedBanks = banks.map(bank => 
        bank.id === editingBank.id 
          ? { ...bank, ...data }
          : bank
      );
      setBanks(updatedBanks);
      localStorage.setItem('banks', JSON.stringify(updatedBanks));
      toast({
        title: "Bank updated",
        description: "Bank information has been updated successfully.",
      });
    } else {
      // Add new bank
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
        resendDate: data.resendDate || null,
        oldAmount: data.oldAmount || 0,
        newAmount: data.newAmount || 0,
        remarks: data.remarks || "",
        addOnAgreement: data.addOnAgreement || false,
        finishDate: data.finishDate || null
      };
      const updatedBanks = [...banks, newBank];
      setBanks(updatedBanks);
      localStorage.setItem('banks', JSON.stringify(updatedBanks));
      toast({
        title: "Bank added",
        description: "New bank has been added successfully.",
      });
    }
    setEditingBank(undefined);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this bank?")) {
      const updatedBanks = banks.filter((bank) => bank.id !== id);
      setBanks(updatedBanks);
      localStorage.setItem('banks', JSON.stringify(updatedBanks));
      toast({
        title: "Bank deleted",
        description: "The bank has been deleted successfully.",
      });
    }
  };

  const handleEdit = (bank: Bank) => {
    setEditingBank(bank);
    setFormOpen(true);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.txt,.xlsx,.xls";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            // Handle Excel files
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const csvContent = XLSX.utils.sheet_to_csv(firstSheet);
                
                console.log('Converted Excel to CSV:', csvContent.substring(0, 200));
                
                const importedBanks = processCSVData(csvContent);
                setBanks(prevBanks => [...prevBanks, ...importedBanks]);
                toast({
                  title: "Import successful",
                  description: `${importedBanks.length} banks have been imported successfully.`,
                });
              } catch (error) {
                console.error('Excel processing error:', error);
                toast({
                  title: "Import failed",
                  description: "Failed to process Excel file",
                  variant: "destructive",
                });
              }
            };
            reader.readAsArrayBuffer(file);
          } else {
            // Handle CSV/TXT files
            const reader = new FileReader();
            reader.onload = (event) => {
              try {
                const csvText = event.target?.result as string;
                const importedBanks = processCSVData(csvText);
                setBanks(prevBanks => [...prevBanks, ...importedBanks]);
                toast({
                  title: "Import successful",
                  description: `${importedBanks.length} banks have been imported successfully.`,
                });
              } catch (error) {
                console.error('Import error:', error);
                toast({
                  title: "Import failed",
                  description: error instanceof Error ? error.message : "Failed to import file",
                  variant: "destructive",
                });
              }
            };
            reader.readAsText(file);
          }
        } catch (error) {
          console.error('File reading error:', error);
          toast({
            title: "Import failed",
            description: "Failed to read the file",
            variant: "destructive",
          });
        }
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
      <DashboardHeader banks={banks} />
      
      <DashboardStatsDisplay stats={stats} />
      
      <DashboardActions
        onImport={handleImport}
        onExport={handleExport}
        onClear={handleClearData}
        onAddBank={() => {
          setEditingBank(undefined);
          setFormOpen(true);
        }}
      />

      <div className="mt-8">
        <div className="tabs-container">
          <div className="flex space-x-4 mb-4">
            <button
              className={cn(
                "px-4 py-2 rounded-t-lg transition-colors",
                activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
              )}
              onClick={() => setActiveTab("pending")}
            >
              Pending Banks
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-t-lg transition-colors",
                activeTab === "completed" ? "bg-green-500 text-white" : "bg-gray-200"
              )}
              onClick={() => setActiveTab("completed")}
            >
              Completed Banks
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-t-lg transition-colors",
                activeTab === "all" ? "bg-purple-500 text-white" : "bg-gray-200"
              )}
              onClick={() => setActiveTab("all")}
            >
              All Banks
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "pending" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Pending Banks</h3>
              <BankTable
                banks={banks.filter(bank => bank.status === "pending")}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
          {activeTab === "completed" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Completed Banks</h3>
              <BankTable
                banks={banks.filter(bank => bank.status === "completed")}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
          {activeTab === "all" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">All Banks</h3>
              <BankTable
                banks={banks}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>

      <ReportsSection banks={banks} />

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
