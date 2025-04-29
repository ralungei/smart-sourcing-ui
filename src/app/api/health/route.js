import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { status: "ok", message: "API is healthy 🚀" },
    { status: 200 }
  );
}
