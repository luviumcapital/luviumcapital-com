import { z } from "zod";
import { baseProcedure } from "~/server/trpc/main";
import { db } from "~/server/db";

export const submitContactForm = baseProcedure
  .input(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      company: z.string().optional(),
      phone: z.string().optional(),
      message: z.string().min(1),
    })
  )
  .mutation(async ({ input }) => {
    const inquiry = await db.contactInquiry.create({
      data: {
        name: input.name,
        email: input.email,
        company: input.company,
        phone: input.phone,
        message: input.message,
      },
    });

    return {
      success: true,
      id: inquiry.id,
    };
  });
