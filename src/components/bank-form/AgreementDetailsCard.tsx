import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileCheck } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";
import { Checkbox } from "@/components/ui/checkbox";

interface AgreementDetailsCardProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const AgreementDetailsCard = ({ form }: AgreementDetailsCardProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-green-600">
          <FileCheck className="w-5 h-5" />
          Agreement Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="lastAgreementDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Agreement Date</FormLabel>
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
              <FormLabel>New Agreement Date</FormLabel>
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
          name="addOnAgreement"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Add-on Agreement</FormLabel>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};