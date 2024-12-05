import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";
import { Checkbox } from "@/components/ui/checkbox";

interface AdditionalDetailsCardProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const AdditionalDetailsCard = ({ form }: AdditionalDetailsCardProps) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg text-sky-600">
          Additional Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter any additional remarks"
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="receivedInTM"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Received in TM</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inFranking"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>In Franking</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};