import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Bank } from "@/types/bank";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Mail, FileCheck, IndianRupee } from "lucide-react";

interface BankFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Bank>) => void;
  initialData?: Bank;
}

const BankForm = ({ open, onOpenChange, onSubmit, initialData }: BankFormProps) => {
  const form = useForm<Partial<Bank>>({
    defaultValues: initialData || {
      name: "",
      branches: 0,
      mailStatus: "pending",
      courierDate: null,
      receivedInTM: false,
      inFranking: false,
      status: "pending",
      lastAgreementDate: null,
      newAgreementDate: null,
      resendDate: null,
      oldAmount: 0,
      newAmount: 0,
      remarks: "",
      addOnAgreement: false
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (data: Partial<Bank>) => {
    onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Bank" : "Add New Bank"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update bank information" : "Add a new bank to the system"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Details Card */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
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
                </CardContent>
              </Card>

              {/* Mail Status Card */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
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

              {/* Agreement Details Card */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
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

              {/* Amount Details Card */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
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

              {/* Additional Details Card */}
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Additional Details</CardTitle>
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
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Update" : "Add"} Bank
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BankForm;