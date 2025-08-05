// lib/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { supabaseAdmin } from "../lib/supabase-admin";

export const { auth, signIn, handlers, signOut } = NextAuth({
  providers: [Google],
  events: {
    async signIn({ user }) {
      // faz upsert na tabela "users" usando o id do NextAuth como chave
      const { id, name, email, image } = user;
      const { error } = await supabaseAdmin
        .from("users")
        .upsert([{ id, name, email, image }], { onConflict: ["id"] });
      if (error) {
        console.error("Erro no upsert Supabase:", error.message);
      }
    },
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});
