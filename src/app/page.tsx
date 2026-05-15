import { prisma } from "@/lib/prisma";
import AnimatedHome from "@/components/AnimatedHome";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({ 
    orderBy: { createdAt: "desc" },
    take: 20 
  });
  return <AnimatedHome products={products as any} />;
}
