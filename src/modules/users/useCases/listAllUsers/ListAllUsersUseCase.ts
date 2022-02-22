import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const userExists = users.find((user) => user.id === user_id);

    if (!userExists.admin) {
      throw new Error(`User does't have admin privileges`);
    }

    users.push(userExists);

    return users;
  }
}

export { ListAllUsersUseCase };
