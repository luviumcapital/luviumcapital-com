import {
  createCallerFactory,
  createTRPCRouter,
} from "./main";
import * as authProcedures from "./procedures/auth";
import * as contactProcedures from "./procedures/contact";

export const appRouter = createTRPCRouter({
  // Auth procedures
  register: authProcedures.register,
  login: authProcedures.login,
  
  // Contact procedures
  submitContactForm: contactProcedures.submitContactForm,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
