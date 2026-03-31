import { z } from "zod";
import { router, publicProcedure } from "../root";
import { db } from "~/server/db";

export const investorRouter = router({
  submitLead: publicProcedure
    .input(z.object({
      fullName: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(7),
      company: z.string().optional(),
      investmentInterest: z.string().optional(),
      message: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Store investor lead in ContactInquiry table
      const lead = await db.contactInquiry.create({
        data: {
          name: input.fullName,
          email: input.email,
          message: `INVESTOR LEAD | Phone: ${input.phone} | Company: ${input.company || 'N/A'} | Interest: ${input.investmentInterest || 'General'} | ${input.message || ''}`,
        },
      });
      return { success: true, id: lead.id };
    }),
});
