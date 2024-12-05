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
  resendDate: string | null;
  oldAmount: number;
  newAmount: number;
  remarks: string;
  addOnAgreement: boolean;
  finishDate?: string | null;
}

export interface DashboardStats {
  totalBanks: number;
  totalBranches: number;
  completedProcess: number;
  pendingProcess: number;
  mailsSent: number;
  frankingCompleted: number;
}