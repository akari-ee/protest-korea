import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const upload = async (file: Buffer, fileName: string) => {
  const fileBuffer: Buffer = file;
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/*",
    ContentDisposition: "inline",
  });

  const data = await r2.send(command);
  return data;
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const data = await upload(buffer, file.name);
  return NextResponse.json({ data });
}
