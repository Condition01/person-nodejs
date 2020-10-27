import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import * as personRoutes from './router/person-route';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.get('/persons', personRoutes.getPersons);
app.post('/person', personRoutes.createPerson);
app.put('/person', personRoutes.updatePerson);
app.get('/get-person-by-id', personRoutes.getPersonById);
app.delete('/person/:id', personRoutes.deletePerson);