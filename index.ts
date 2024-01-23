import cors from 'cors';
import express from 'express';
//инициализация
import { PrismaClient } from '@prisma/client';
const app = express();
//по какому порту
const PORT = 5000;
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
//без контроллеров будет
//для получения (res ответ наш)
app.post('/api', async (req, res) => {
	const { email, name } = req.body;
	if (!email || !name) {
		return res
			.status(400)
			.json({ message: 'Email and name required fields!' });
	}
	try {
		const createdRow = await prisma.waitList.create({
			data: { email, name },
		});
		res.json(createdRow);
	} catch (error) {
		res.status(400).send({ message: error });
	}
});

//прослушкка порта
const server = app.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`);
});
