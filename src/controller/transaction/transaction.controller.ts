import { TransactionDetails } from "./transaction.schema";
import { Request, Response } from "express";
import { db } from "../../prisma";
import { uploadToS3 } from "../../services/aws-config";
import { AttachmentDetails } from "./transaction.schema";
import { StatusCodes } from "http-status-codes";

export const transactionHandler = async (
  req: Request<{}, {}, TransactionDetails> & {
    files?:
      | Express.Multer.File[]
      | { [fieldname: string]: Express.Multer.File[] };
  },
  res: Response
) => {
  const {
    documentType,
    subject,
    forwardedTo,
    forwardedFrom,
    remarks,
    accountId,
    dueDate,
    forwardedBy,
    toDepartment,
    fromDepartment,
    dateForwarded,
    documentSection
  } = req.body;
  const files = req.files;

  const attachments: AttachmentDetails[] = [];
  if (files && Array.isArray(files) && files.length > 0) {
    for (const file of files) {
      const result = await uploadToS3(file);

      if (result instanceof Error) {
        res.status(500).json({ message: "Error uploading file to S3" });
      }

      const key = result as AttachmentDetails;

      attachments.push(key);
    }

    const insertTransaction = await db.documentInfo.create({
      data: {
        documentType,
        subject,
        dueDate,
        accountId,
        documentSection,
        documentHistory: {
          create: {
            forwardedTo,
            forwardedFrom,
            remarks,
            subject,
            dateForwarded,
            forwardedBy,
            toDepartment,
            fromDepartment,
            attachments: {
              createMany: {
                data: attachments,
              },
            },
          },
        },
      },
    });
    if (insertTransaction) {
      res
        .status(StatusCodes.CREATED)
        .json({ message: "Transaction created successfully" });
    }
  }
};
