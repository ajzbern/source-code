import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { API_URL } from "./server-config";


async function validateAdminAuth(params: {
  name?: string | null;
  email?: string | null;
}) {
  try {
    const response = await fetch(`${API_URL}/admins/validate`, {
      method: "POST",
      headers: {
        "x-api-key": "thisisasdca",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: params.name,
        email: params.email,
        accessToken: "",
      }),
    });

    const data = await response.json();
    if (!data) {
      throw new Error(data.message || "Authentication failed");
    }
    return data;
  } catch (error) {
    console.error("Admin Authentication Error:", error);
    return null;
  }
}

function safeSetLocalStorage(key: string, value: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return false;
      try {
        const authResult = await validateAdminAuth({
          name: profile?.name,
          email: profile?.email,
        });
        if (!authResult) return false;
        return true;
      } catch (error) {
        console.error("GitHub Sign-In Error:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      // Initial sign in
      if (account && profile) {
        try {
          const authResult = await validateAdminAuth({
            name: profile?.name,
            email: profile?.email,
          });
          if (!authResult) return token;

          const { admin } = authResult.data;

          // Store admin details in the JWT token
          return {
            ...token,
            adminId: admin.id,
            adminName: admin.name,
            adminEmail: admin.email,
          };
        } catch (error) {
          console.error("JWT Callback Error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Make sure session.user exists
      if (!session.user) {
        session.user = {};
      }

      // This runs on the client side, so we can safely use localStorage here
      if (token.adminId) {
        // Add admin info to the session with correct typing
        session.user = {
          ...session.user,
          id: token.adminId as string,
          name: token.adminName as string,
          email: token.adminEmail as string,
        };

        // Store tokens in localStorage for client-side API calls
        if (typeof window !== "undefined") {
          localStorage.setItem("adminId", token.adminId as string);
          localStorage.setItem("adminEmail", token.adminEmail as string);
          localStorage.setItem("adminName", token.adminName as string);
        }
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle custom redirects
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

// Separate function for form-based submission
export async function submitAdminAuth(values: { name: string; email: string }) {
  try {
    const authResult = await validateAdminAuth(values);
    if (!authResult) {
      throw new Error("Authentication failed");
    }

    const { admin, accessToken, refreshToken } = authResult.data;

    // Client-side function, so these will work
    safeSetLocalStorage("accessToken", accessToken);
    safeSetLocalStorage("refreshToken", refreshToken);
    safeSetLocalStorage("adminId", admin.id);
    safeSetLocalStorage("adminEmail", admin.email);
    safeSetLocalStorage("adminName", admin.name);

    return authResult;
  } catch (error) {
    console.error("Admin Authentication Error:", error);
    throw error;
  }
}
