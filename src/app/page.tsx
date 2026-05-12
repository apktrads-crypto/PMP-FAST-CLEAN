import { prisma } from "@/lib/prisma";
import AnimatedHome from "@/components/AnimatedHome";

export default async function Home() {
  const products = await prisma.product.findMany({ take: 8 });
  return <AnimatedHome products={products as any} />;
}
