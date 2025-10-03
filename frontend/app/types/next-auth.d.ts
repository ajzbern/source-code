// In types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // Add the custom fields
      id?: string;
    };
  }

  interface JWT {
    adminId?: string;
    adminName?: string;
    adminEmail?: string;
    accessToken?: string;
    refreshToken?: string;
    githubAccessToken?: string;
  }
}
