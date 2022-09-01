import { Request, Response, Router } from 'express';
import UserService from '../../services/userService';
import wrap from 'express-async-handler';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.post(
    '/',
    wrap(async (req: Request, res: Response) => {
      const { name, dob, address, description } = req.body;
      const newUser = await UserService.createUser(name, dob, address, description);
      res.json(newUser).status(200);
    }),
  );

  route.get(
    '/:userId',
    wrap(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const users = await UserService.getUser(userId);
      res.json(users).status(200);
    }),
  );

  route.patch(
    '/:userId',
    wrap(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const updatedUserFields = req.body;
      const updatedUser = await UserService.updateUser(userId, updatedUserFields);
      res.json(updatedUser).status(200);
    }),
  );

  route.delete(
    '/:userId',
    wrap(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const deletedUser = await UserService.deleteUser(userId);
      res.json(deletedUser).status(200);
    }),
  );
};
