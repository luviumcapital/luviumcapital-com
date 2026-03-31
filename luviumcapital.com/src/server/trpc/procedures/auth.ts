import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { baseProcedure } from "../main";
import { db } from "../../utils/db";
import { env } from "../../utils/env";

export const register = baseProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      company: z.string().optional(),
      phone: z.string().optional(),
    })
  )
  .mutation(async ({ input }) => {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: input.email },
    });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 12);
    // Create user
    const user = await db.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        name: `${input.firstName} ${input.lastName}`,
        company: input.company,
        phone: input.phone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
      },
    });
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return {
      user,
      token,
    };
  });

export const login = baseProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    // Find user
    const user = await db.user.findUnique({
      where: { email: input.email },
    });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // Try bcryptjs first (for users registered via app)
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(input.password, user.password);
    } catch {
      isValidPassword = false;
    }
    // Fallback: pgcrypto crypt() comparison for admin users seeded via SQL
    if (!isValidPassword) {
      const result = await db.$queryRaw<Array<{match: boolean}>>`
        SELECT (password = crypt(${input.password}, password)) as match
        FROM "User" WHERE email = ${input.email}
      `;
      isValidPassword = result?.[0]?.match === true;
    }
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
      },
      token,
    };
  });
