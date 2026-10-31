import { z } from "zod";

/**
 * In-memory IP rate limiter for API endpoints (e.g., inquiry / contact forms)
 * In production serverless/edge environments, this can easily adapt to Redis (Upstash)
 */
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes window
): { success: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean expired record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      resetInSec: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetInSec: Math.max(0, Math.ceil((record.resetTime - now) / 1000)),
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    resetInSec: Math.ceil((record.resetTime - now) / 1000),
  };
}

/**
 * XSS & HTML string sanitizer
 * Neutralizes tags, javascript schemes, and risky attributes
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/javascript:/gi, "") // Neutralize js protocols
    .replace(/data:/gi, "") // Neutralize data URIs
    .replace(/on\w+=/gi, "") // Neutralize inline event handlers
    .trim();
}

/**
 * Lead Inquiry Schema with strict validation & Honeypot detection
 */
export const LeadInquirySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "Nombre demasiado largo")
    .transform((val) => sanitizeString(val)),
  email: z
    .string()
    .email("Email no válido")
    .max(120, "Email demasiado largo")
    .transform((val) => sanitizeString(val).toLowerCase()),
  company: z
    .string()
    .max(100, "Nombre de empresa demasiado largo")
    .optional()
    .transform((val) => (val ? sanitizeString(val) : "")),
  serviceCategory: z
    .string()
    .min(2, "Por favor selecciona un área de interés")
    .max(160, "Categoría de servicio demasiado extensa")
    .transform((val) => sanitizeString(val)),
  message: z
    .string()
    .min(10, "Cuéntanos un poco más sobre el proyecto (mínimo 10 caracteres)")
    .max(2000, "Mensaje demasiado extenso")
    .transform((val) => sanitizeString(val)),
  // Honeypot field: must be empty. If bots fill it, we reject or silently discard
  _hp: z.string().max(0, "Bot detected").optional().default(""),
});

export type LeadInquiry = z.infer<typeof LeadInquirySchema>;
