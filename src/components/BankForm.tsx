import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Bank } from "@/types/bank";
import { BasicDetailsCard } from "./bank-form/BasicDetailsCard";
import { MailStatusCard } from "./bank-form/MailStatusCard";
import { AgreementDetailsCard } from "./bank-form/AgreementDetailsCard";
import { AmountDetailsCard } from "./bank-form/AmountDetailsCard";
import { AdditionalDetailsCard } from "./bank-form/AdditionalDetailsCard";
import { useToast } from "@/components/ui/use-toast";

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
      addOnAgreement: false
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (data: Partial<Bank>) => {
    try {
      onSubmit(data);
      onOpenChange(false);
      form.reset();
      toast({
        title: initialData ? "Bank Updated" : "Bank Added",
        description: initialData 
          ? "Bank information has been updated successfully."
          : "New bank has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the bank information.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Bank" : "Add New Bank"}
          </DialogTitle>
          <DialogDescription>
            {initialData ? "Update bank information" : "Add a new bank to the system"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BasicDetailsCard form={form} />
              <MailStatusCard form={form} />
              <AgreementDetailsCard form={form} />
              <AmountDetailsCard form={form} />
              <AdditionalDetailsCard form={form} />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Update" : "Add"} Bank
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BankForm;