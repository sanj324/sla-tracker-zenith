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
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Basic Information Section */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <h3 className="font-semibold mb-4 text-blue-900">Basic Information</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-800">Bank Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branches"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-800">Branches</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(Number(e.target.value))}
                    value={field.value || ''}
                    className="bg-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Mail Status Section */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
        <h3 className="font-semibold mb-4 text-purple-900">Mail & Courier Status</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="mailStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-800">Mail Status</FormLabel>
                <FormControl>
                  <select 
                    className="w-full p-2 border rounded bg-white"
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
                <FormLabel className="text-purple-800">Courier Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''} 
                    className="bg-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Processing Status Section */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
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
                <FormLabel className="text-green-800">Received in TM</FormLabel>
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
                <FormLabel className="text-green-800">In Franking</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Agreement Dates Section */}
      <Card className="p-6 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
        <h3 className="font-semibold mb-4 text-amber-900">Agreement Dates</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="lastAgreementDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-800">Last Agreement Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''} 
                    className="bg-white"
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
                <FormLabel className="text-amber-800">New Agreement Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''} 
                    className="bg-white"
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
                <FormLabel className="text-amber-800">Addon Agreement Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''} 
                    className="bg-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Amount Details Section */}
      <Card className="p-6 bg-gradient-to-r from-rose-50 to-rose-100 border-rose-200">
        <h3 className="font-semibold mb-4 text-rose-900">Amount Details</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="oldAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-rose-800">Old Amount</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                    value={field.value || ''}
                    className="bg-white"
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
                <FormLabel className="text-rose-800">New Amount</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                    value={field.value || ''}
                    className="bg-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Additional Information Section */}
      <Card className="p-6 bg-gradient-to-r from-cyan-50 to-cyan-100 border-cyan-200">
        <h3 className="font-semibold mb-4 text-cyan-900">Additional Information</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyan-800">Remarks</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    value={field.value || ''} 
                    className="min-h-[100px] bg-white"
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
                <FormLabel className="text-cyan-800">Resend Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''} 
                    className="bg-white"
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
                <FormLabel className="text-cyan-800">Resend Required</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </Card>
    </div>
  );
};