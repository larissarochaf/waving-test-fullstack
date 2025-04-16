import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Usuário cliente (senha: 123456)
  const hashedClientPassword = await bcrypt.hash('123456', 10);
  const client = await prisma.user.create({
    data: {
      email: 'cliente@teste.com',
      password: hashedClientPassword,
    },
  });

  // Usuário admin (senha: admin123)
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@teste.com',
      password: hashedAdminPassword,
    },
  });

  // Produtos
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Camiseta Mr. Darcy',
        description: 'Camiseta de algodão com estampa divertida do Mr. Darcy de Orgulho e Preconceito',
        price: 99.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Camiseta+Mr.+Darcy',
      },
      {
        name: 'Lightsaber Rosa',
        description: 'Um lightsaber holográfico rosa para acender a força com estilo',
        price: 399.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Lightsaber+Rosa',
      },
      {
        name: 'Planner Jane Austen',
        description: 'Planner elegante inspirado nos romances de Jane Austen, com capa de couro',
        price: 149.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Planner+Jane+Austen',
      },
      {
        name: 'Camiseta Star Wars',
        description: 'Camiseta holográfica com estampa de Star Wars, para fãs da galáxia',
        price: 129.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Camiseta+Star+Wars',
      },
      {
        name: 'Anel Holográfico',
        description: 'Anel holográfico de luxo, inspirado nos filmes de ficção científica',
        price: 249.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Anel+Holográfico',
      },
      {
        name: 'Arranhador Intergaláctico da Luna',
        description: 'Arranhador com design de foguete para gatas que sonham alto',
        price: 199.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Arranhador+Luna',
      },
      {
        name: 'Capa de Almofada Diva Cósmica',
        description: 'Almofada com a estampa da deusa felina Luna para decorar com atitude',
        price: 89.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Almofada+Luna',
      },
      {
        name: 'Tiara com Orelhinhas Estelares',
        description: 'Tiara fashion com orelhinhas brilhantes inspiradas na Luninha',
        price: 59.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Tiara+Estelar',
      },
      {
        name: 'Blusa Oversized “Luna Observa Tudo”',
        description: 'Blusa comfy com frase “Ela observa, julga e reina”',
        price: 139.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Blusa+Luna',
      },
      {
        name: 'Colar Pingente de Olhar Felino',
        description: 'Colar com olho de gato encantador, homenagem à Luna',
        price: 179.90,
        imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Colar+Felino',
      },
    ],
  });

  const allProducts = await prisma.product.findMany({ take: 2 });

  const cart = await prisma.cart.create({
    data: {
      userId: client.id,
      items: {
        create: allProducts.map((product, i) => ({
          productId: product.id,
          quantity: i + 1,
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      cartId: cart.id,
      userId: client.id,
      total: allProducts.reduce((sum, p, i) => sum + p.price * (i + 1), 0),
      status: 'PENDING',
    },
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
