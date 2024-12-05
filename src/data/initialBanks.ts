import { Bank } from "@/types/bank";

export const initialBanks: Partial<Bank>[] = [
  {
    id: "bank-1",
    name: "Adarsh Co Op. Bank Ltd",
    branches: 0,
    mailStatus: "pending",
    status: "pending"
  },
  {
    id: "bank-2",
    name: "Alwar Urban Co-Op. Bank Ltd.",
    branches: 1,
    mailStatus: "pending",
    status: "pending"
  },
  {
    id: "bank-3",
    name: "Apani Sahakari Bank Limited",
    branches: 2,
    mailStatus: "sent",
    courierDate: "24-04-2024",
    receivedInTM: true,
    status: "completed"
  },
  // ... Adding more banks from the spreadsheet
  {
    id: "bank-184",
    name: "The Rajasthan Urban Co Op Bank Ltd",
    branches: 0,
    mailStatus: "sent",
    status: "completed"
  }
];