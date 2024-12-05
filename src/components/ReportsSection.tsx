import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Bank } from "@/types/bank";
import { useToast } from "@/components/ui/use-toast";

interface ReportsSectionProps {
  banks: Bank[];
}

const ReportsSection = ({ banks }: ReportsSectionProps) => {
  const { toast } = useToast();

  const generateReport = (status: "pending" | "completed") => {
    const filteredBanks = banks.filter(bank => bank.status === status);
    
    if (filteredBanks.length === 0) {
      toast({
        title: "No data available",
        description: `No ${status} banks found to generate report.`,
        variant: "destructive",
      });
      return;
    }

    const headers = ["Sr No,Bank Name,Branches,Send Mail,Courier Date,Received in TM,In Franking"];
    const csvData = filteredBanks.map((bank, index) => (
      `${index + 1},${bank.name},${bank.branches || ''},${bank.mailStatus || ''},${bank.courierDate || ''},${bank.receivedInTM ? 'Yes' : 'No'},${bank.inFranking ? 'Yes' : 'No'}`
    ));
    
    const csv = headers.concat(csvData).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${status}-banks-report.csv`;
    link.click();
    
    toast({
      title: "Report generated",
      description: `${status.charAt(0).toUpperCase() + status.slice(1)} banks report has been downloaded.`,
    });
  };

  return (
    <div className="flex gap-4 mb-6">
      <Button 
        onClick={() => generateReport("pending")}
        variant="secondary"
        className="bg-yellow-600 hover:bg-yellow-700 text-white"
      >
        <FileText className="mr-2 h-4 w-4" /> Pending Banks Report
      </Button>
      <Button 
        onClick={() => generateReport("completed")}
        variant="secondary"
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        <FileText className="mr-2 h-4 w-4" /> Completed Banks Report
      </Button>
    </div>
  );
};

export default ReportsSection;