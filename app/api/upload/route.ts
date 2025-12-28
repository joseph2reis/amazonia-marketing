
import { cloudinary } from "@/app/Lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "products" },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({
            url: uploadResult.secure_url,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro no upload" }, { status: 500 });
    }
}
