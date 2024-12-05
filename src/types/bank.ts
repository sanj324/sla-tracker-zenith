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
}

export interface DashboardStats {
  totalBanks: number;
  totalBranches: number;
  completedProcess: number;
  pendingProcess: number;
  mailsSent: number;
  frankingCompleted: number;
}