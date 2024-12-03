import { Button } from "@/components/ui/button";
import { Import, ArrowUpDown, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DashboardActionsProps {
  onImport: () => void;
  onExport: () => void;
  onClear: () => void;
}

const DashboardActions = ({ onImport, onExport, onClear }: DashboardActionsProps) => {
  const { toast } = useToast();

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      onClear();
      toast({
        title: "Data cleared",
        description: "All bank data has been cleared successfully.",
      });
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="space-x-4">
        <Button 
          onClick={onImport}
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Import className="mr-2 h-4 w-4" /> Import
        </Button>
        <Button 
          onClick={onExport}
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" /> Export
        </Button>
        <Button 
          onClick={handleClear}
          variant="secondary"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Trash2 className="mr-2 h-4 w-4" /> Clear Data
        </Button>
      </div>
      <Button 
        variant="secondary"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Add Bank
      </Button>
    </div>
  );
};

export default DashboardActions;