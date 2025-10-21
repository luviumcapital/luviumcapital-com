import {
  createCallerFactory,
  createTRPCRouter,
} from "~/server/trpc/main";
import * as authProcedures from "~/server/trpc/procedures/auth";
import * as contactProcedures from "~/server/trpc/procedures/contact";

export const appRouter = createTRPCRouter({
  // Auth procedures
  register: authProcedures.register,
  login: authProcedures.login,
  
  // Contact procedures
  submitContactForm: contactProcedures.submitContactForm,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
