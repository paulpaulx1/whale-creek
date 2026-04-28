import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);

    console.log("🔥 Sanity webhook hit");
    console.log("Secret env present:", Boolean(WEBHOOK_SECRET));
    console.log("Signature header name:", SIGNATURE_HEADER_NAME);
    console.log("Signature present:", Boolean(signature));
    console.log("Body length:", body.length);

    if (!WEBHOOK_SECRET) {
      console.log("❌ Missing SANITY_WEBHOOK_SECRET env var");
      return NextResponse.json(
        { success: false, message: "Missing secret env var" },
        { status: 401 }
      );
    }

    if (!signature) {
      console.log("❌ Missing Sanity signature header");
      return NextResponse.json(
        { success: false, message: "Missing signature" },
        { status: 401 }
      );
    }

    const isValid = await isValidSignature(body, signature, WEBHOOK_SECRET);

    console.log("Signature valid:", isValid);

    if (!isValid) {
      console.log("❌ Invalid Sanity signature");
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    const json = JSON.parse(body);
    console.log("✅ Webhook body:", json);

    revalidateTag("sanity");
    revalidatePath("/", "layout");
    revalidatePath("/project-gallery");
    revalidatePath("/project-gallery/underground");
    revalidatePath("/blog");

    return NextResponse.json({
      success: true,
      revalidated: true,
      now: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Revalidation error:", error);

    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}