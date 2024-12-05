import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";
import { Checkbox } from "@/components/ui/checkbox";

interface MailStatusFieldsProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const MailStatusFields = ({ form }: MailStatusFieldsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Mail & Courier Status</h3>
      <FormField
        control={form.control}
        name="mailStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">
              Mail Status <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <select 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                {...field}
                required
              >
                <option value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
              </select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="courierDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Courier Date</FormLabel>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="receivedInTM"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 bg-gray-50 p-3 rounded">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-medium mb-0">Received in TM</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inFranking"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 bg-gray-50 p-3 rounded">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-medium mb-0">In Franking</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};