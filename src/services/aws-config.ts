import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import z from "zod";
import { generateFileName } from "../utils/utils";

export const s3 = new S3Client({
  region: "us-east-1",
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.BUCKET_PRIVATE_KEY!,
  },
});
export const uploadImageToS3 = async(file: Express.Multer.File) => {
  try {
    const company = "envicomm";
    const folder = "image";
    const generatedName = generateFileName();
    const key = `${company}/${folder}/${generatedName}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
      })
    );
    return key;
  } catch (error ) {
    console.log(error)
    throw new Error("Error uploading image to S3");
  }
}
export const uploadToS3 = async (file: Express.Multer.File) => {
  try {
    const company = "envicomm";
    const generatedName = generateFileName();

    const key = `${company}/${generatedName}`;
     await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
      })
    );
    return {fileUrl : key, fileName: file.originalname};
  } catch (error) {
    console.log(error);
    return error;
  }
};
