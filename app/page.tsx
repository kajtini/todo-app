import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const session = auth();

  // Use that cause clerk redirect uri is not working or I don't understand it lol
  if (session) {
    redirect("/todos");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 px-7"></main>
  );
}
