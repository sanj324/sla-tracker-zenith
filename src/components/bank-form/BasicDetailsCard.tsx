import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";

interface BasicDetailsCardProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const BasicDetailsCard = ({ form }: BasicDetailsCardProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-blue-600">
          <Building2 className="w-5 h-5" />
          Basic Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branches"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branches</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Number of branches"
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                  value={field.value || ''}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <select 
                  className="w-full p-2 border rounded"
                  {...field}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};