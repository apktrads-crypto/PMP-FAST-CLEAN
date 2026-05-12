import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({}); // clear existing
  
  const products = [
    {
      name: "PMP Fast Clean Floor Cleaner - Floral",
      description: "99.9% germ kill with long-lasting floral fragrance for all surfaces.",
      price: 149,
      originalPrice: 299,
      image: "/product-1.png",
      tag: "BESTSELLER",
      features: "Kills 99.9% of germs,Removes 100 types of stains,Leaves a long-lasting fragrance",
      rating: 4.8,
      reviews: 124,
    },
    {
      name: "PMP Fast Clean Toilet Cleaner",
      description: "Thick formula that clings to surfaces for maximum stain removal.",
      price: 99,
      originalPrice: 150,
      image: "/product-1.png",
      tag: "",
      features: "Kills 99.9% germs,Thick gel formula,Removes tough stains",
      rating: 4.5,
      reviews: 89,
    },
    {
      name: "PMP Fast Clean Dishwash Gel",
      description: "Cuts through tough grease instantly with the power of lemon.",
      price: 125,
      originalPrice: 199,
      image: "/product-1.png",
      tag: "NEW",
      features: "Lemon power,Gentle on hands,Removes grease easily",
      rating: 4.9,
      reviews: 210,
    },
    {
      name: "PMP Fast Clean Glass Cleaner",
      description: "Streak-free shine for glass and smooth surfaces.",
      price: 85,
      originalPrice: 120,
      image: "/product-1.png",
      tag: "",
      features: "Streak-free shine,Ammonia-free,Multi-surface use",
      rating: 4.6,
      reviews: 76,
    }
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log('Seeded database with products.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
