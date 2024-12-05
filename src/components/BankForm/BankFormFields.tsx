import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";
import { BasicInfoFields } from "./BasicInfoFields";
import { MailStatusFields } from "./MailStatusFields";
import { AgreementFields } from "./AgreementFields";
import { AdditionalFields } from "./AdditionalFields";

interface BankFormFieldsProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const BankFormFields = ({ form }: BankFormFieldsProps) => {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-blue-600">
          Fields marked with <span className="text-red-500">*</span> are required
        </p>
      </div>
      
      <BasicInfoFields form={form} />
      <MailStatusFields form={form} />
      <AgreementFields form={form} />
      <AdditionalFields form={form} />
    </div>
  );
};