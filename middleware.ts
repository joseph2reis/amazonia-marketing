import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/auth/login", // Redireciona para cá se não estiver logado
    },
});

// Define quais rotas serão protegidas
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/perfil/:path*",
        // Adicione aqui outras rotas que precisam de login
    ],
};