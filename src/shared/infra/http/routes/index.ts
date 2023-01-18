import { Router } from "express";

import { Request, Response} from "express";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import providersRouter from "@modules/appointments/infra/http/routes/providers.routes";
import doctorsRouter from "@modules/doctor/infra/http/routes/doctor.routes";
import pacientRouter from "@modules/pacient/infra/http/routes/pacient.routes";
import clinicsRouter from "@modules/clinic/infra/http/routes/clinic.routes";
import adminsRouter from "@modules/admin/infra/http/routes/admin.routes";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
    res.json("Wellcome to vitumed-aplication")
})

routes.use("/admin", adminsRouter);
routes.use("/clinic", clinicsRouter);
routes.use("/pacient", pacientRouter);
routes.use("/doctors", doctorsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
routes.use("/appointments", appointmentsRouter);
routes.use("/providers", providersRouter);

export default routes;
