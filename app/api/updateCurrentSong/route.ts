import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { concertId, nextOrder, concertStatus } = body;

    if (!concertId) {
      return NextResponse.json(
        { ok: false, error: "concertId is required" },
        { status: 400 }
      );
    }

    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;

    if (!serviceDomain || !apiKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is missing",
        },
        { status: 500 }
      );
    }

    const updateBody: Record<string, unknown> = {};

    if (typeof nextOrder === "number") {
      updateBody.currentSongOrder = nextOrder;
    }

    if (typeof concertStatus === "string") {
      updateBody.concertStatus = concertStatus;
    }

    if (Object.keys(updateBody).length === 0) {
      return NextResponse.json(
        { ok: false, error: "nothing to update" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://${serviceDomain}.microcms.io/api/v1/concerts/${concertId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": apiKey,
        },
        body: JSON.stringify(updateBody),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          ok: false,
          error: "microCMS update failed",
          detail: text,
          status: res.status,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      updated: updateBody,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "unexpected error",
        detail: error instanceof Error ? error.message : "unknown error",
      },
      { status: 500 }
    );
  }
}