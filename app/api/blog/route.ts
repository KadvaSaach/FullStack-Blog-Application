import prisma from "@/prisma";
import { NextResponse } from "next/server";

// using export keyword to use this main() function in another files
export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("Database connection unsuccessful : " + error.message);
  }
}

// It will retrieve all the data from the database using findMany() method
export const GET = async (req: Request, res: NextResponse) => {
  try {
    // console.log("GET")
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    // it will disconnect the application from the database
    await prisma.$disconnect();
  }
};

// It will create a new post 
export const POST = async (req: Request, res: NextResponse) => {
    // console.log("POST");
    try {
        const {title, description } = await req.json();
        await main();
        const post = await prisma.post.create({data: { description, title }});
        return NextResponse.json({ message: "Success!" , post}, { status: 201});
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        // it will disconnect the application from the database
        await prisma.$disconnect();
    }
    
};
