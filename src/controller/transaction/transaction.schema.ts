 import { z } from "zod";

 export const transactionDetailsSchema = z.object({
     documentType: z.string(),
     specification: z.string(),
     subject:z.string(),
     company: z.string(),
     forwardedTo: z.string(),
     forwardedFrom: z.string(),
     remarks: z.string(),
     accountId: z.string(),
     dueDate: z.string().transform(value => new Date(value)),
     forwardedBy: z.string(),
     department: z.string(),
   });
export const attachmentSchema = z.object({
  fileName: z.string(),
  fileUrl : z.string()
})
export type AttachmentDetails= z.infer<typeof attachmentSchema>;
export type TransactionDetails = z.infer<typeof transactionDetailsSchema>;