import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    const apiSecret = request.headers.get("X-API-KEY");

    if (apiSecret !== process.env.MODAL_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(text);

    const url = new URL(
      "https://mehmoodosman--dreamlike-anime-demo-model-generate.modal.run/"
    );

    url.searchParams.set("prompt", text);

    console.log("Requesting URL: ", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.MODAL_API_KEY || "",
        Accept: "image/jpg", // Image Format
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const imageBuffer = await response.arrayBuffer();

    const filename = `${crypto.randomUUID()}.jpg`;

    const blob = await put(filename, imageBuffer, {
      access: "public",
      contentType: "image/jpg", // Image Format
    });

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        message: error?.toString(),
      },
      { status: 500 }
    );
  }
}
