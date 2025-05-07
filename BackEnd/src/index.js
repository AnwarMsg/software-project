const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data:{
            email: "anwarmous@gmail.com"
        }
    });

    console.log(newUser);
}

main().catch(e => {throw e;
}).finally(async () => {await prisma.$disconnect();});