import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";

interface AmountDetailsCardProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const AmountDetailsCard = ({ form }: AmountDetailsCardProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-orange-600">
          <IndianRupee className="w-5 h-5" />
          Amount Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="oldAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Amount</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter old amount"
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
          name="newAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Amount</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter new amount"
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                  value={field.value || ''}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};