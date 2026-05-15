const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  { productCode: 'PMP-FC-B-WH-1L', name: 'Basic White Floor Cleaner', costPrice: 32, price: 85, originalPrice: 85, minSellPrice: 70, maxDiscount: 15, stock: 120, description: 'Economical white floor cleaner with fresh scent.', features: 'Economy, Fresh' },
  { productCode: 'PMP-FC-B-LE-1L', name: 'Basic Lemon Floor Cleaner', costPrice: 35, price: 85, originalPrice: 85, minSellPrice: 70, maxDiscount: 15, stock: 100, description: 'Lemon fresh floor cleaner for daily use.', features: 'Lemon, Daily' },
  { productCode: 'PMP-FC-B-RO-1L', name: 'Basic Rose Floor Cleaner', costPrice: 35, price: 85, originalPrice: 85, minSellPrice: 70, maxDiscount: 15, stock: 100, description: 'Rose scented floor cleaner for daily use.', features: 'Rose, Daily' },
  { productCode: 'PMP-FC-P-WH-1L', name: 'Premium White Floor Cleaner', costPrice: 52, price: 110, originalPrice: 110, minSellPrice: 90, maxDiscount: 20, stock: 80, description: 'High-concentration premium floor cleaner.', features: 'Premium, Extra Strong' },
  { productCode: 'PMP-FC-P-LE-1L', name: 'Premium Lemon Floor Cleaner', costPrice: 55, price: 110, originalPrice: 110, minSellPrice: 90, maxDiscount: 20, stock: 85, description: 'Premium lemon scent with deep cleaning action.', features: 'Premium, Lemon' },
  { productCode: 'PMP-FC-P-RO-1L', name: 'Premium Rose Floor Cleaner', costPrice: 55, price: 110, originalPrice: 110, minSellPrice: 90, maxDiscount: 20, stock: 85, description: 'Premium rose fragrance for luxury floors.', features: 'Premium, Rose' },
  { productCode: 'PMP-HW-CH-250', name: 'Chandan Hand Wash', costPrice: 20, price: 45, originalPrice: 45, minSellPrice: 35, maxDiscount: 10, stock: 55, description: 'Traditional Chandan fragrance hand wash.', features: 'Anti-bacterial, Chandan' },
  { productCode: 'PMP-HW-RO-250', name: 'Rose Hand Wash', costPrice: 20, price: 45, originalPrice: 45, minSellPrice: 35, maxDiscount: 10, stock: 60, description: 'Gentle rose fragrance hand wash.', features: 'Anti-bacterial, Rose' },
  { productCode: 'PMP-HW-STD-500', name: 'Hand Wash 500ml', costPrice: 42, price: 85, originalPrice: 85, minSellPrice: 70, maxDiscount: 15, stock: 45, description: 'Standard family pack hand wash.', features: 'Family Pack' },
  { productCode: 'PMP-DW-250', name: 'Dish Wash 250ml', costPrice: 22, price: 45, originalPrice: 45, minSellPrice: 35, maxDiscount: 10, stock: 70, description: 'Tough on grease dish wash.', features: 'Grease Removal' },
  { productCode: 'PMP-DW-500', name: 'Dish Wash 500ml', costPrice: 45, price: 85, originalPrice: 85, minSellPrice: 70, maxDiscount: 15, stock: 50, description: 'Economy size dish wash liquid.', features: 'Economy' },
  { productCode: 'PMP-TC-250', name: 'Toilet Cleaner 250ml', costPrice: 14, price: 30, originalPrice: 30, minSellPrice: 25, maxDiscount: 5, stock: 40, description: 'Strong action toilet cleaner.', features: 'Acid-free, Strong' },
  { productCode: 'PMP-TC-500', name: 'Toilet Cleaner 500ml', costPrice: 28, price: 55, originalPrice: 55, minSellPrice: 45, maxDiscount: 10, stock: 30, description: 'Germ kill toilet cleaner.', features: '99.9% Germ Kill' },
  { productCode: 'PMP-TC-1L', name: 'Toilet Cleaner 1L', costPrice: 58, price: 110, originalPrice: 110, minSellPrice: 90, maxDiscount: 20, stock: 18, description: 'Mega pack toilet cleaner.', features: 'Mega Pack' },
  { productCode: 'PMP-WL-500', name: 'Washing Liquid 500ml', costPrice: 48, price: 85, originalPrice: 85, minSellPrice: 70, maxDiscount: 15, stock: 25, description: 'Fabric friendly washing liquid.', features: 'Color Protection' },
  { productCode: 'PMP-WL-1L', name: 'Washing Liquid 1L', costPrice: 72, price: 125, originalPrice: 125, minSellPrice: 100, maxDiscount: 25, stock: 20, description: 'Premium washing liquid for machine/hand wash.', features: 'Stain Removal' }
];

async function main() {
  console.log('Seeding secret database...');
  
  // Seed settings with a safe default PIN
  await prisma.settings.upsert({
    where: { id: 'global' },
    update: {},
    create: { 
      id: 'global', 
      adminPin: process.env.ADMIN_PIN || '7869278692' 
    }
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { productCode: product.productCode },
      update: product,
      create: {
        ...product,
        image: '/product-1.png' // Default image
      }
    });
  }
  console.log('Database Seeded Successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
