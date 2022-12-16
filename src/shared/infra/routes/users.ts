import { Router } from 'express';
import CreateUsersService from 'users/services/CreateUsersService';
import CreateUserDto from 'users/dtos/CreateUsersDtos';

const userService = new CreateUsersService();
const usersRouter = Router();

usersRouter.post('/register/pacient', (req, res) => {
    const dto: CreateUserDto = req.body;
    const pacient = userService.createPacient(dto);

    return res.json(pacient);
});

usersRouter.post('/register/doctor', (req, res) => {
    const dto: CreateUserDto = req.body;
    const doctor = userService.createDoctor(dto);

    return res.json(doctor);
});

usersRouter.post('/register/clinic', (req, res) => {
    const dto: CreateUserDto = req.body;
    const clinic = userService.createClinic(dto);

    return res.json(clinic);
});
