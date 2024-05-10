import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import z from "zod";
import { generateFileName } from "../utils/utils";
import {
  S3RequestPresigner,
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { Hash } from "@smithy/hash-node";
const config = {
  region: "us-east-1",
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.BUCKET_PRIVATE_KEY!,
  },
};
export const s3 = new S3Client(config);

const signer = new S3RequestPresigner({
  region: config.region,
  credentials: config.credentials,
  sha256: Hash.bind(null, "sha256"), // In Node.
});
export const uploadImageToS3 = async (file: Express.Multer.File) => {
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
        ContentType: file.mimetype,
        Metadata: {
          "Content-Disposition": "inline",
        },
      })
    );
    return key;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading image to S3");
  }
};
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
        ContentType: file.mimetype,
        Metadata: {
          "Content-Disposition": "inline",
        },
      })
    );
    return { fileUrl: key, fileName: file.originalname };
  } catch (error) {
    throw new Error("Error uploading file to S3");
  }
};

export const getSignedUrlFromS3 = async (fileName: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: fileName,
    });
    const url = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });
    return url;
  } catch (error) {
    console.log(error);
   throw new Error ('Error getting signed url from S3')
  }
};
