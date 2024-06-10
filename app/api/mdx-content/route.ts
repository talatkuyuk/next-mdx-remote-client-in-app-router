import { delay, getMarkdownExtension, replaceLastDashWithDot } from "@/utils";
import { getMarkdownFromSlug, getSource } from "@/utils/file";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug) {
    return Response.json({
      error: "Please add a query param 'slug' ending with '-mdx' or '-md'",
    });
  }

  if (!/-mdx?$/.test(slug)) {
    return Response.json({
      error:
        "Wrong query parameter 'slug' which should end with '-mdx' or '-md'",
    });
  }

  await delay(500); // iot see the loading state on the client

  try {
    const file = await getMarkdownFromSlug(slug);

    if (!file) {
      return Response.json({ error: "The source file could not found" });
    }

    const { source, format } = file;

    return Response.json({ source, format });
  } catch (error) {
    return Response.json({ error: (error as Error).message });
  }
}
