import { NextResponse } from "next/server";
import { main } from "../route";
import primsa from "@/prisma";

// IT will GET a single post by id
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await primsa.post.findFirst({ where: { id } });
    if (!post)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success!", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await primsa.$disconnect();
  }
};

// It will update the single post by its id
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    const { title, description } = await req.json();
    await main();
    const post = await primsa.post.update({
      data: { title, description },
      where: { id },
    });
    // const post = await primsa.post.findFirst({ where: { id } });
    // if (!post)
    //   return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success!", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await primsa.$disconnect();
  }
};

// It will delete the post by id
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    // const { title, description } = await req.json();
    // await main();
    // const post = await primsa.post.update({
    //   data: { title, description },
    //   where: { id },
    // });
    // // const post = await primsa.post.findFirst({ where: { id } });
    // // if (!post)
    // //   return NextResponse.json({ message: "Not Found" }, { status: 404 });
    await main();

    const post = await primsa.post.delete({ where: { id } });
    return NextResponse.json({ message: "Success!", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await primsa.$disconnect();
  }
};
