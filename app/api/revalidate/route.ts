import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);

    if (!WEBHOOK_SECRET || !signature) {
      return NextResponse.json(
        { success: false, message: "Missing secret or signature" },
        { status: 401 },
      );
    }

    const isValid = await isValidSignature(body, signature, WEBHOOK_SECRET);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 },
      );
    }

    const json = JSON.parse(body);
    const { _type, _id } = json;

    console.log(`Webhook received: ${_type} (${_id})`);

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
    console.error("Revalidation error:", error);

    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 },
    );
  }
}
