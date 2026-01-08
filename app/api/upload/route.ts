import { cloudinary } from "@/app/Lib/cloudinary";
import { NextResponse } from "next/server";

// Configurações de limite
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
        }

        // 1. Validação de Tamanho
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "O arquivo deve ter no máximo 5MB" }, { status: 400 });
        }

        // 2. Validação de Formato
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: "Formato de arquivo não suportado" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "products",
                    transformation: [
                        {
                            width: 800,
                            height: 800,
                            crop: "fill",
                            gravity: "center",
                            quality: "auto",
                            fetch_format: "auto"
                        }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id 
        });

    } catch (error) {
        console.error("Erro no upload:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}