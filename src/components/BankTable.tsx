import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bank } from "@/types/bank";
import { Button } from "@/components/ui/button";
import { Mail, AlertCircle, CheckSquare, RefreshCw } from "lucide-react";

interface BankTableProps {
  banks: Bank[];
  onEdit: (bank: Bank) => void;
  onDelete: (id: string) => void;
}

const BankTable = ({ banks, onEdit, onDelete }: BankTableProps) => {
  return (
    <div className="rounded-md border overflow-x-auto max-w-[100vw]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Sr No</TableHead>
            <TableHead className="whitespace-nowrap">Bank Name</TableHead>
            <TableHead className="whitespace-nowrap">Branches</TableHead>
            <TableHead className="whitespace-nowrap">Send Mail</TableHead>
            <TableHead className="whitespace-nowrap">Courier Date</TableHead>
            <TableHead className="whitespace-nowrap">Received in TM</TableHead>
            <TableHead className="whitespace-nowrap">In Franking</TableHead>
            <TableHead className="whitespace-nowrap">Last Agreement Date</TableHead>
            <TableHead className="whitespace-nowrap">New Agreement Date</TableHead>
            <TableHead className="whitespace-nowrap">Addon Agreement Date</TableHead>
            <TableHead className="whitespace-nowrap">Old Amount</TableHead>
            <TableHead className="whitespace-nowrap">New Amount</TableHead>
            <TableHead className="whitespace-nowrap">Remarks</TableHead>
            <TableHead className="whitespace-nowrap">Resend</TableHead>
            <TableHead className="whitespace-nowrap">Resend Date</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={17} className="text-center text-muted-foreground p-4">
                No banks found. Please add some banks or import data.
              </TableCell>
            </TableRow>
          ) : (
            banks.map((bank, index) => (
              <TableRow key={bank.id}>
                <TableCell className="whitespace-nowrap">{index + 1}</TableCell>
                <TableCell className="whitespace-nowrap">{bank.name}</TableCell>
                <TableCell className="whitespace-nowrap">{bank.branches}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {bank.mailStatus === "sent" ? (
                    <Mail className="text-green-500" />
                  ) : bank.mailStatus === "pending" ? (
                    <AlertCircle className="text-yellow-500" />
                  ) : (
                    <AlertCircle className="text-red-500" />
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">{bank.courierDate || "-"}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {bank.receivedInTM ? (
                    <CheckSquare className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-yellow-500" />
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {bank.inFranking ? (
                    <CheckSquare className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-yellow-500" />
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">{bank.lastAgreementDate || "-"}</TableCell>
                <TableCell className="whitespace-nowrap">{bank.newAgreementDate || "-"}</TableCell>
                <TableCell className="whitespace-nowrap">{bank.addonAgreementDate || "-"}</TableCell>
                <TableCell className="whitespace-nowrap">{bank.oldAmount || "-"}</TableCell>
                <TableCell className="whitespace-nowrap">{bank.newAmount || "-"}</TableCell>
                <TableCell className="whitespace-nowrap max-w-[200px] truncate" title={bank.remarks || ""}>
                  {bank.remarks || "-"}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {bank.resend ? (
                    <RefreshCw className="text-blue-500" />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">{bank.resendDate || "-"}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      bank.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : bank.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {bank.status}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(bank)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(bank.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BankTable;