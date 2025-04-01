
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, date, timeSlot } = await req.json();

    // This is a placeholder for actual email sending functionality
    // In a real implementation, you would use a service like Resend, SendGrid, etc.
    console.log(`Email would be sent to ${email} for appointment on ${date} at ${timeSlot}`);

    // Sample response showing what would be in the email
    const emailContent = {
      to: email,
      subject: "Your Appointment Confirmation",
      htmlContent: `
        <h2>Appointment Confirmation</h2>
        <p>Hello ${name},</p>
        <p>Your appointment has been confirmed for:</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
        <p>We look forward to meeting with you!</p>
        <p>Best regards,<br>The Team</p>
      `
    };

    return new Response(
      JSON.stringify({ success: true, message: "Confirmation email would be sent", content: emailContent }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-appointment-confirmation function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
