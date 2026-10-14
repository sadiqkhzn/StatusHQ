import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Adapter } from "next-auth/adapters";

import { db } from "@openstatus/db";
import {
  account,
  session,
  user,
  verificationToken,
} from "@openstatus/db/src/schema";

import { createUser, getUser } from "./helpers";

export const adapter: Adapter = db ? {
  ...DrizzleAdapter(db, {
    // @ts-expect-error: problem with type
    usersTable: user,
    // @ts-expect-error: problem with type
    accountsTable: account,
    // @ts-expect-error: problem with type
    sessionsTable: session,
    verificationTokensTable: verificationToken,
  }),
  createUser: async (data) => {
    const newUser = await createUser(data);
    return {
      id: newUser.id.toString(),
      email: newUser.email || "",
      emailVerified: newUser.emailVerified || null,
      name: newUser.name || null,
      image: newUser.photoUrl || null,
      tenantId: newUser.tenantId || null,
      firstName: newUser.firstName || "",
      lastName: newUser.lastName || "",
      photoUrl: newUser.photoUrl || "",
      createdAt: newUser.createdAt || null,
      updatedAt: newUser.updatedAt || null,
    };
  },
  getUser: async (id) => {
    const existingUser = await getUser(id);
    if (!existingUser) return null;
    return {
      id: existingUser.id.toString(),
      email: existingUser.email || "",
      emailVerified: existingUser.emailVerified || null,
      name: existingUser.name || null,
      image: existingUser.photoUrl || null,
      tenantId: existingUser.tenantId || null,
      firstName: existingUser.firstName || "",
      lastName: existingUser.lastName || "",
      photoUrl: existingUser.photoUrl || "",
      createdAt: existingUser.createdAt || null,
      updatedAt: existingUser.updatedAt || null,
    };
  },
} : {
  // Minimal adapter for development without database
  createUser: async (data) => ({ 
    id: "dev-user", 
    email: data.email || "dev@example.com",
    emailVerified: null,
    tenantId: null,
    firstName: "",
    lastName: "",
    photoUrl: "",
    name: data.name || null,
    image: null,
    createdAt: null,
    updatedAt: null,
  }),
  getUser: async () => null,
  getUserByEmail: async () => null,
  getUserByAccount: async () => null,
  updateUser: async (data) => ({ 
    id: data.id || "dev-user", 
    email: data.email || "dev@example.com",
    emailVerified: data.emailVerified || null,
    tenantId: null,
    firstName: "",
    lastName: "",
    photoUrl: "",
    name: data.name || null,
    image: null,
    createdAt: null,
    updatedAt: null,
  }),
  deleteUser: async () => ({ 
    id: "dev-user", 
    email: "dev@example.com",
    emailVerified: null,
    tenantId: null,
    firstName: "",
    lastName: "",
    photoUrl: "",
    name: null,
    image: null,
    createdAt: null,
    updatedAt: null,
  }),
  linkAccount: async () => {},
  unlinkAccount: async () => {},
  createSession: async () => ({ sessionToken: "dev-session", userId: "dev-user", expires: new Date() }),
  getSessionAndUser: async () => null,
  updateSession: async () => ({ sessionToken: "dev-session", userId: "dev-user", expires: new Date() }),
  deleteSession: async () => {},
  createVerificationToken: async () => ({ identifier: "", token: "", expires: new Date() }),
  useVerificationToken: async () => null,
} as Adapter;
