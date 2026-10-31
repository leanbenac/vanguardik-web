import { LeadInquiry } from "./security";
import { siteConfig } from "@/config/site";

/**
 * Universal Lead Notifier
 * Supports Discord, Slack, Telegram or generic webhook without altering API code.
 * Drop `LEAD_WEBHOOK_URL` in `.env.local` whenever you are ready!
 */
export async function notifyLead(lead: LeadInquiry): Promise<void> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  // 1. If webhook is defined, post structured payload
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚀 **Nuevo Lead Recibido en ${siteConfig.name}!**\n**Nombre:** ${lead.name}\n**Email:** ${lead.email}\n**Empresa:** ${lead.company || "No especificada"}\n**Servicio:** ${lead.serviceCategory}\n**Mensaje:** ${lead.message}`,
          text: `Nuevo Lead: ${lead.name} (${lead.email}) para ${lead.serviceCategory}`,
        }),
      });

      if (!response.ok) {
        console.warn(`[LEAD_NOTIFIER] Webhook returned status ${response.status}`);
      }
    } catch (err) {
      console.error("[LEAD_NOTIFIER_ERROR] Failed to post to webhook:", err);
    }
  } else {
    // 2. Default graceful fallback: structured secure log in development/production
    console.log("[LEAD_SAVED_LOCAL]", {
      name: lead.name,
      email: lead.email,
      company: lead.company,
      service: lead.serviceCategory,
      timestamp: new Date().toISOString(),
      note: "Para recibir alertas en Telegram, Slack o Discord, define LEAD_WEBHOOK_URL en .env.local",
    });
  }
}
