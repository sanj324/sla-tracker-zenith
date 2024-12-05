export interface Bank {
  id: string;
  name: string;
  branches: number;
  mailStatus: "sent" | "pending" | "failed";
  courierDate: string | null;
  receivedInTM: boolean;
  inFranking: boolean;
  status: "completed" | "pending" | "failed";
  lastAgreementDate: string | null;
  newAgreementDate: string | null;
  oldAmount: number | null;
  newAmount: number | null;
  resend: boolean;
  resendDate: string | null;
  remarks: string | null;
  addonAgreementDate: string | null;
  receivedDate: string | null;
  frankingDate: string | null;
  processingStatus: "completed" | "pending" | "failed" | null;
  agreementStatus: "completed" | "pending" | "failed" | null;
  paymentStatus: "completed" | "pending" | "failed" | null;
}

export interface DashboardStats {
  totalBanks: number;
  totalBranches: number;
  completedProcess: number;
  pendingProcess: number;
  mailsSent: number;
  frankingCompleted: number;
}