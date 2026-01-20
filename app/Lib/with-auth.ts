import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

type Handler = (req: Request, ctx: any, user: any) => Promise<Response>;

export function withAuth(handler: Handler) {
    return async (req: Request, ctx?: any) => {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        }

        return handler(req, ctx, session.user);
    };
}