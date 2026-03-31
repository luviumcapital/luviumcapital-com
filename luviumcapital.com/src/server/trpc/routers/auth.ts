import { z } from "zod";
import { router, publicProcedure } from "../root";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "luvium-secret-key";

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({ where: { email: input.email } });
      if (!user) throw new Error("Invalid credentials");
      // Try bcryptjs first (for users registered via app), then pgcrypto fallback
      let valid = false;
      try {
        valid = await bcrypt.compare(input.password, user.password);
      } catch {
        valid = false;
      }
      if (!valid) {
        // Fallback: pgcrypto crypt() comparison for admin users seeded via SQL
        const result = await db.$queryRaw<Array<{match: boolean}>>`
          SELECT (password = crypt(${input.password}, password)) as match
          FROM "User" WHERE email = ${input.email}
        `;
        valid = result?.[0]?.match === true;
      }
      if (!valid) throw new Error("Invalid credentials");
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
    }),

  register: publicProcedure
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      company: z.string().optional(),
      phone: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const existing = await db.user.findUnique({ where: { email: input.email } });
      if (existing) throw new Error("Email already registered");
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          company: input.company,
          phone: input.phone,
          role: "INVESTOR",
        },
      });
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
    }),
});
