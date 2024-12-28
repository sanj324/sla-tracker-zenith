import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Bank } from "@/types/bank";
import { useToast } from "@/components/ui/use-toast";
import BasicDetailsCard from "./bank-form/BasicDetailsCard";
import MailStatusCard from "./bank-form/MailStatusCard";
import AgreementDetailsCard from "./bank-form/AgreementDetailsCard";
import AmountDetailsCard from "./bank-form/AmountDetailsCard";
import AdditionalDetailsCard from "./bank-form/AdditionalDetailsCard";

interface BankFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Bank>) => void;
  initialData?: Bank;
}

const BankForm = ({ open, onOpenChange, onSubmit, initialData }: BankFormProps) => {
  const { toast } = useToast();
  const form = useForm<Partial<Bank>>({
    defaultValues: initialData || {
      name: "",
      branches: 0,
      mailStatus: "pending",
      courierDate: null,
      receivedInTM: false,
      inFranking: false,
      status: "pending",
      lastAgreementDate: null,
      newAgreementDate: null,
      resendDate: null,
      oldAmount: 0,
      newAmount: 0,
      remarks: "",
      addOnAgreement: false,
      finishDate: null,
    },
  });

  const handleSubmit = (data: Partial<Bank>) => {
    try {
      const updatedData = {
        ...data,
        status: data.status || "pending"
      };
      
      onSubmit(updatedData);
      onOpenChange(false);
      form.reset();
      toast({
        title: initialData ? "Bank Updated" : "Bank Added",
        description: `Bank ${initialData ? "updated" : "added"} successfully with status: ${updatedData.status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the bank.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Bank" : "Add New Bank"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <BasicDetailsCard form={form} />
          <MailStatusCard form={form} />
          <AgreementDetailsCard form={form} />
          <AmountDetailsCard form={form} />
          <AdditionalDetailsCard form={form} />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              {initialData ? "Update Bank" : "Add Bank"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BankForm;