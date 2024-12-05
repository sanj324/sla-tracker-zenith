import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";

interface MailStatusCardProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const MailStatusCard = ({ form }: MailStatusCardProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-purple-600">
          <Mail className="w-5 h-5" />
          Mail Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="mailStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail Status</FormLabel>
              <FormControl>
                <select 
                  className="w-full p-2 border rounded"
                  {...field}
                >
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
              <FormLabel>Courier Date</FormLabel>
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
              <FormLabel>Resend Date</FormLabel>
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
      </CardContent>
    </Card>
  );
};