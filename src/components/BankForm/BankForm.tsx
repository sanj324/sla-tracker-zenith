import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Bank } from "@/types/bank";
import { BankFormFields } from "./BankFormFields";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BankFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Bank>) => void;
  initialData?: Bank;
}

const BankForm = ({ open, onOpenChange, onSubmit, initialData }: BankFormProps) => {
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
      oldAmount: null,
      newAmount: null,
      resend: false,
      remarks: "",
      addonAgreementDate: null,
      resendDate: null,
      receivedDate: null,
      frankingDate: null,
      processingStatus: "pending",
      agreementStatus: "pending",
      paymentStatus: "pending"
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (data: Partial<Bank>) => {
    onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">{initialData ? "Edit Bank" : "Add New Bank"}</DialogTitle>
          <DialogDescription className="text-sm">
            {initialData ? "Update bank information" : "Add a new bank to the system"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-10rem)] px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <BankFormFields form={form} />
              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 sticky bottom-0 bg-white p-4 shadow-lg">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  {initialData ? "Update" : "Add"} Bank
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BankForm;