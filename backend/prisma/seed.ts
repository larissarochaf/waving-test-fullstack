import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.cartItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.product.deleteMany()

  const product1 = await prisma.product.create({
    data: {
      name: 'Camiseta Mr. Darcy',
      description: 'Camiseta de algodão com estampa divertida do Mr. Darcy de Orgulho e Preconceito',
      price: 99.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Camiseta+Mr.+Darcy'
    }
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Lightsaber Rosa',
      description: 'Um lightsaber holográfico rosa para acender a força com estilo',
      price: 399.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Lightsaber+Rosa'
    }
  })

  const product3 = await prisma.product.create({
    data: {
      name: 'Planner Jane Austen',
      description: 'Planner elegante inspirado nos romances de Jane Austen, com capa de couro',
      price: 149.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Planner+Jane+Austen'
    }
  })

  const product4 = await prisma.product.create({
    data: {
      name: 'Camiseta Star Wars',
      description: 'Camiseta holográfica com estampa de Star Wars, para fãs da galáxia',
      price: 129.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Camiseta+Star+Wars'
    }
  })

  const product5 = await prisma.product.create({
    data: {
      name: 'Anel Holográfico',
      description: 'Anel holográfico de luxo, inspirado nos filmes de ficção científica',
      price: 249.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Anel+Holográfico'
    }
  })

  const product6 = await prisma.product.create({
    data: {
      name: 'Arranhador Intergaláctico da Luna',
      description: 'Arranhador com design de foguete para gatas que sonham alto',
      price: 199.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Arranhador+Luna'
    }
  })

  const product7 = await prisma.product.create({
    data: {
      name: 'Capa de Almofada Diva Cósmica',
      description: 'Almofada com a estampa da deusa felina Luna para decorar com atitude',
      price: 89.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Almofada+Luna'
    }
  })

  const product8 = await prisma.product.create({
    data: {
      name: 'Tiara com Orelhinhas Estelares',
      description: 'Tiara fashion com orelhinhas brilhantes inspiradas na Luninha',
      price: 59.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Tiara+Estelar'
    }
  })

  const product9 = await prisma.product.create({
    data: {
      name: 'Blusa Oversized “Luna Observa Tudo”',
      description: 'Blusa comfy com frase “Ela observa, julga e reina”',
      price: 139.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Blusa+Luna'
    }
  })

  const product10 = await prisma.product.create({
    data: {
      name: 'Colar Pingente de Olhar Felino',
      description: 'Colar com olho de gato encantador, homenagem à Luna',
      price: 179.90,
      imageUrl: 'https://dummyimage.com/300x300/000/fff.png&text=Colar+Felino'
    }
  })

  // Agora com userId para facilitar rastreio no admin
  const cart = await prisma.cart.create({
    data: {
      userId: 'admin@teste.com',
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
          },
          {
            productId: product2.id,
            quantity: 2,
          }
        ]
      }
    }
  })

  await prisma.order.create({
    data: {
      cartId: cart.id,
      userId: 'admin@teste.com',
      total: product1.price * 1 + product2.price * 2,
      status: 'PENDING'
    }
  })

  console.log('✅ Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
