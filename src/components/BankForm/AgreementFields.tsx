import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";

interface AgreementFieldsProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const AgreementFields = ({ form }: AgreementFieldsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Agreement Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="lastAgreementDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Last Agreement Date</FormLabel>
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
          name="newAgreementDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">New Agreement Date</FormLabel>
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="oldAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Old Amount</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                  value={field.value || ''}
                  placeholder="Enter old amount"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">New Amount</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                  value={field.value || ''}
                  placeholder="Enter new amount"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};