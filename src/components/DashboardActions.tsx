import { Button } from "@/components/ui/button";
import { Import, ArrowUpDown, Trash2, Plus, Save, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Bank } from "@/types/bank";

interface DashboardActionsProps {
  onImport: () => void;
  onExport: () => void;
  onClear: () => void;
  onAddBank: () => void;
}

const DashboardActions = ({ onImport, onExport, onClear, onAddBank }: DashboardActionsProps) => {
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

  const handleBackup = () => {
    const data = localStorage.getItem('banks');
    if (!data) {
      toast({
        title: "Backup failed",
        description: "No data found to backup.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bank-data-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Backup created",
      description: "Your data has been backed up successfully.",
    });
  };

  const handleRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;
            const data = JSON.parse(content);
            
            // Validate that the data is an array of Bank objects
            if (!Array.isArray(data) || !data.every(item => 
              typeof item === 'object' && 
              'id' in item && 
              'name' in item && 
              'mailStatus' in item
            )) {
              throw new Error('Invalid backup file format');
            }

            localStorage.setItem('banks', content);
            window.location.reload(); // Reload to reflect restored data

            toast({
              title: "Data restored",
              description: "Your backup has been restored successfully.",
            });
          } catch (error) {
            toast({
              title: "Restore failed",
              description: "Failed to restore backup. Please ensure the file is valid.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
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
        <Button 
          onClick={handleBackup}
          variant="secondary"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Save className="mr-2 h-4 w-4" /> Backup
        </Button>
        <Button 
          onClick={handleRestore}
          variant="secondary"
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          <Upload className="mr-2 h-4 w-4" /> Restore
        </Button>
      </div>
      <Button 
        onClick={onAddBank}
        variant="secondary"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Bank
      </Button>
    </div>
  );
};

export default DashboardActions;