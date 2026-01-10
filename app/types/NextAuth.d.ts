import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Extende a sessão para incluir id e role
     */
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }

    /**
     * Extende o usuário retornado no authorize
     */
    interface User {
        id: string;
        role: string;
    }
}

declare module "next-auth/jwt" {
    /**
     * Extende o token JWT para incluir id e role
     */
    interface JWT {
        id: string;
        role: string;
    }
}