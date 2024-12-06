import { Bank } from "@/types/bank";

export const validateHeaders = (headers: string[]) => {
  // More flexible header matching
  const bankNameHeader = headers.find(header => 
    header.toLowerCase().includes('bank') || 
    header.toLowerCase().includes('name')
  );
  
  const branchesHeader = headers.find(header =>
    header.toLowerCase().includes('branch')
  );
  
  const mailHeader = headers.find(header =>
    header.toLowerCase().includes('send') ||
    header.toLowerCase().includes('mail')
  );
  
  const courierHeader = headers.find(header =>
    header.toLowerCase().includes('courice') ||
    header.toLowerCase().includes('courier') ||
    header.toLowerCase().includes('date')
  );
  
  const receivedHeader = headers.find(header =>
    header.toLowerCase().includes('recvd') ||
    header.toLowerCase().includes('received') ||
    header.toLowerCase().includes('tm')
  );

  const frankingHeader = headers.find(header =>
    header.toLowerCase().includes('franking')
  );

  const finishDateHeader = headers.find(header =>
    header.toLowerCase().includes('finish')
  );

  if (!bankNameHeader) {
    throw new Error("Invalid CSV format. CSV must contain a bank name column.");
  }

  return {
    bankNameHeader,
    branchesHeader,
    mailHeader,
    courierHeader,
    receivedHeader,
    frankingHeader,
    finishDateHeader
  };
};

export const parseMailStatus = (status: string): "sent" | "pending" | "failed" => {
  if (!status) return "pending";
  status = status.toLowerCase().trim();
  if (status === "done" || status === "sent" || status === "yes") return "sent";
  if (status === "p" || status === "pending") return "pending";
  return "failed";
};

export const parseBranches = (value: string): number => {
  if (!value || value.trim() === '' || value.trim() === ' ') return 0;
  const parsed = parseInt(value.trim());
  return isNaN(parsed) ? 0 : parsed;
};

export const parseDate = (date: string): string | null => {
  if (!date || 
      date.trim() === '' || 
      date.toLowerCase() === 'h2h' || 
      date === '-' || 
      date === '----------' ||
      date === '---------') return null;
  return date.trim();
};

export const parseBoolean = (value: string): boolean => {
  if (!value) return false;
  value = value.toLowerCase().trim();
  return value === 'yes' || value === 'true' || value === '1' || value === 'done';
};

export const processCSVData = (csvText: string): Bank[] => {
  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
  const headers = lines[0].split('\t').map(header => header.trim());
  
  const {
    bankNameHeader,
    branchesHeader,
    mailHeader,
    courierHeader,
    receivedHeader,
    frankingHeader,
    finishDateHeader
  } = validateHeaders(headers);

  const bankNameIndex = headers.indexOf(bankNameHeader);
  const branchesIndex = headers.indexOf(branchesHeader);
  const mailStatusIndex = headers.indexOf(mailHeader);
  const courierDateIndex = headers.indexOf(courierHeader);
  const receivedIndex = headers.indexOf(receivedHeader);
  const frankingIndex = headers.indexOf(frankingHeader);
  const finishDateIndex = headers.indexOf(finishDateHeader);

  return lines.slice(1)
    .filter(line => line.trim() !== '')
    .map((line, index) => {
      const values = line.split('\t').map(value => value.trim());
      const bankName = values[bankNameIndex]?.trim();
      
      if (!bankName) {
        console.warn(`Row ${index + 2}: Empty bank name, skipping row`);
        return null;
      }

      const mailStatus = parseMailStatus(values[mailStatusIndex] || '');
      const status = mailStatus === "sent" ? "completed" as const : "pending" as const;

      const bank: Bank = {
        id: `imported-${Date.now()}-${index}`,
        name: bankName,
        branches: parseBranches(values[branchesIndex]),
        mailStatus,
        courierDate: parseDate(values[courierDateIndex] || ''),
        receivedInTM: parseBoolean(values[receivedIndex] || ''),
        inFranking: parseBoolean(values[frankingIndex] || ''),
        status,
        lastAgreementDate: null,
        newAgreementDate: null,
        resendDate: null,
        oldAmount: 0,
        newAmount: 0,
        remarks: "",
        addOnAgreement: false,
        finishDate: parseDate(values[finishDateIndex] || '')
      };

      return bank;
    })
    .filter((bank): bank is Bank => bank !== null);
};