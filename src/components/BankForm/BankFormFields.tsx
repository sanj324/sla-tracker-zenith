import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Bank } from "@/types/bank";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BankFormFieldsProps {
  form: UseFormReturn<Partial<Bank>>;
}

export const BankFormFields = ({ form }: BankFormFieldsProps) => {
  return (
    <ScrollArea className="h-[calc(80vh-8rem)] px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6">
        {/* Basic Information Section */}
        <Card className="p-6 shadow-sm border-l-4 border-l-blue-500">
          <h3 className="font-semibold mb-4 text-lg text-blue-700">Basic Information</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800">Bank Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" placeholder="Enter bank name" />
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
                      placeholder="Number of branches"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Mail Status Section */}
        <Card className="p-6 shadow-sm border-l-4 border-l-purple-500">
          <h3 className="font-semibold mb-4 text-lg text-purple-700">Mail & Courier Status</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="mailStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800">Mail Status</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
        <Card className="p-6 shadow-sm border-l-4 border-l-green-500">
          <h3 className="font-semibold mb-4 text-lg text-green-700">Processing Status</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="receivedInTM"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 bg-white p-2 rounded">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-green-800 m-0">Received in TM</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inFranking"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 bg-white p-2 rounded">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-green-800 m-0">In Franking</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Agreement Dates Section */}
        <Card className="p-6 shadow-sm border-l-4 border-l-amber-500">
          <h3 className="font-semibold mb-4 text-lg text-amber-700">Agreement Dates</h3>
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
          </div>
        </Card>

        {/* Amount Details Section */}
        <Card className="p-6 shadow-sm border-l-4 border-l-rose-500">
          <h3 className="font-semibold mb-4 text-lg text-rose-700">Amount Details</h3>
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
                  <FormLabel className="text-rose-800">New Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      value={field.value || ''}
                      className="bg-white"
                      placeholder="Enter new amount"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Additional Information Section */}
        <Card className="p-6 shadow-sm border-l-4 border-l-cyan-500">
          <h3 className="font-semibold mb-4 text-lg text-cyan-700">Additional Information</h3>
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
                      placeholder="Add any additional remarks"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resend"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 bg-white p-2 rounded">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-cyan-800 m-0">Resend Required</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
};