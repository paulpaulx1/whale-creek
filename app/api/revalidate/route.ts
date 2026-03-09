import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhookSecret = request.headers.get("x-sanity-webhook-secret");

    if (webhookSecret !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { success: false, message: "Invalid secret" },
        { status: 401 },
      );
    }

    const { _type, _id } = body;
    console.log(`Webhook received: ${_type} (${_id})`);

    revalidatePath("/", "layout");
    revalidateTag("sanity");

    return NextResponse.json({ success: true, revalidated: true });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 },
    );
  }
}
