import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";
import { Checkbox } from "@/components/ui/checkbox";

interface AdditionalFieldsProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const AdditionalFields = ({ form }: AdditionalFieldsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
      <FormField
        control={form.control}
        name="addonAgreementDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Addon Agreement Date</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field} 
                value={field.value || ''} 
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="resendDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Resend Date</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field} 
                value={field.value || ''} 
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="remarks"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Remarks</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value || ''} 
                className="min-h-[100px]"
                placeholder="Enter any additional remarks"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="resend"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2 bg-gray-50 p-3 rounded">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="font-medium mb-0">Resend Required</FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
};