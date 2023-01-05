import { Router } from "express";

import { Request, Response} from "express";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import providersRouter from "@modules/appointments/infra/http/routes/providers.routes";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
    res.json("Wellcome to vitumed-aplication")
})

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
routes.use("/appointments", appointmentsRouter);
routes.use("/providers", providersRouter);

export default routes;
