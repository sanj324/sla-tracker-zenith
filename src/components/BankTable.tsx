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
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr No</TableHead>
            <TableHead>Bank Name</TableHead>
            <TableHead>Branches</TableHead>
            <TableHead>Send Mail</TableHead>
            <TableHead>Courier Date</TableHead>
            <TableHead>Received in TM</TableHead>
            <TableHead>In Franking</TableHead>
            <TableHead>Last Agreement Date</TableHead>
            <TableHead>Old Amount</TableHead>
            <TableHead>New Amount</TableHead>
            <TableHead>Resend</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={13} className="text-center text-muted-foreground">
                No banks found. Please add some banks or import data.
              </TableCell>
            </TableRow>
          ) : (
            banks.map((bank, index) => (
              <TableRow key={bank.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bank.name}</TableCell>
                <TableCell>{bank.branches}</TableCell>
                <TableCell>
                  {bank.mailStatus === "sent" ? (
                    <Mail className="text-green-500" />
                  ) : bank.mailStatus === "pending" ? (
                    <AlertCircle className="text-yellow-500" />
                  ) : (
                    <AlertCircle className="text-red-500" />
                  )}
                </TableCell>
                <TableCell>{bank.courierDate || "-"}</TableCell>
                <TableCell>
                  {bank.receivedInTM ? (
                    <CheckSquare className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-yellow-500" />
                  )}
                </TableCell>
                <TableCell>
                  {bank.inFranking ? (
                    <CheckSquare className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-yellow-500" />
                  )}
                </TableCell>
                <TableCell>{bank.lastAgreementDate || "-"}</TableCell>
                <TableCell>{bank.oldAmount || "-"}</TableCell>
                <TableCell>{bank.newAmount || "-"}</TableCell>
                <TableCell>
                  {bank.resend ? (
                    <RefreshCw className="text-blue-500" />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
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
                <TableCell>
                  <div className="flex gap-2">
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