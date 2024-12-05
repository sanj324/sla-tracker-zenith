import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface BankFormFieldsProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const BankFormFields = ({ form }: BankFormFieldsProps) => {
  return (
    <div className="space-y-6">
      {/* Basic Information Section */}
      <Card className="p-4 bg-blue-50">
        <h3 className="font-semibold mb-4 text-blue-900">Basic Information</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                    {...field} 
                    onChange={e => field.onChange(Number(e.target.value))}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Mail Status Section */}
      <Card className="p-4 bg-purple-50">
        <h3 className="font-semibold mb-4 text-purple-900">Mail & Courier Status</h3>
        <div className="space-y-4">
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
        </div>
      </Card>

      {/* Processing Status Section */}
      <Card className="p-4 bg-green-50">
        <h3 className="font-semibold mb-4 text-green-900">Processing Status</h3>
        <div className="space-y-4">
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
      </Card>

      {/* Agreement Dates Section */}
      <Card className="p-4 bg-amber-50">
        <h3 className="font-semibold mb-4 text-amber-900">Agreement Dates</h3>
        <div className="space-y-4">
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
            name="addonAgreementDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Addon Agreement Date</FormLabel>
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
      </Card>

      {/* Amount Details Section */}
      <Card className="p-4 bg-rose-50">
        <h3 className="font-semibold mb-4 text-rose-900">Amount Details</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="oldAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Amount</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
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
                    {...field} 
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Additional Information Section */}
      <Card className="p-4 bg-cyan-50">
        <h3 className="font-semibold mb-4 text-cyan-900">Additional Information</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    value={field.value || ''} 
                    className="min-h-[100px]"
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
          
          <FormField
            control={form.control}
            name="resend"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Resend Required</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </Card>
    </div>
  );
};