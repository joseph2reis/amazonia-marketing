import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Handler = (req: Request, ctx?: any) => Promise<Response>;

export function withAuth(handler: Handler) {
    return async (req: Request, ctx?: any) => {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        return handler(req, ctx);
    };
}
