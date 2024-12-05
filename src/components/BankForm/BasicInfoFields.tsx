import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";

interface BasicInfoFieldsProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const BasicInfoFields = ({ form }: BasicInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">
              Bank Name <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter bank name" required />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="branches"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">
              Number of Branches <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field} 
                onChange={e => field.onChange(Number(e.target.value))}
                value={field.value || ''}
                placeholder="Enter number of branches"
                required
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};