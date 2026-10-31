import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, LeadInquirySchema } from "@/lib/security";
import { notifyLead } from "@/lib/leadNotifier";

export async function POST(req: NextRequest) {
  try {
    // 1. IP Resolution & Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 5, 15 * 60 * 1000); // 5 requests per 15 min
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Demasiadas solicitudes. Por favor intenta de nuevo en unos minutos.",
          retryAfterSec: rateLimit.resetInSec,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSec.toString(),
          },
        }
      );
    }

    // 2. Parse JSON payload safely
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Formato de solicitud no válido." },
        { status: 400 }
      );
    }

    // 3. Honeypot check (Anti-bot trap)
    if (body._hp && typeof body._hp === "string" && body._hp.length > 0) {
      // Deceptive success response: trick the bot into thinking it succeeded
      return NextResponse.json(
        { success: true, message: "Mensaje recibido correctamente." },
        { status: 200 }
      );
    }

    // 4. Schema Validation & Sanitization with Zod
    const validationResult = LeadInquirySchema.safeParse(body);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return NextResponse.json(
        { error: issue?.message || "Datos incompletos o inválidos." },
        { status: 422 }
      );
    }

    const sanitizedData = validationResult.data;

    // 5. Dispatch notification to configured webhook / logger
    await notifyLead(sanitizedData);

    return NextResponse.json(
      {
        success: true,
        message: "¡Mensaje recibido! Nos comunicaremos contigo en menos de 24 horas.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[INQUIRY_ERROR]", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu solicitud. Intenta más tarde." },
      { status: 500 }
    );
  }
}
