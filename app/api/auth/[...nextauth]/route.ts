import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    pages: {
        signIn: "/auth/login", 
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Aqui você faz a chamada para sua API real ou banco de dados
                // Exemplo: const res = await fetch("sua-api.com/login", { ... })

                // Simulação de validação:
                if (credentials?.email === "admin@agro.com" && credentials?.password === "123456") {
                    return { id: "1", name: "Usuário Agro", email: "admin@agro.com" };
                }

                // Se retornar null, o NextAuth exibe erro de credenciais
                return null;
            },
        }),
    ],
    callbacks: {
        // Adiciona o ID do usuário ao token da sessão
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (session.user) (session.user as any).id = token.id;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };