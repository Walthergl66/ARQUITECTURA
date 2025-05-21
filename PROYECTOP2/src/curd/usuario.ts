import { AppDataSource } from "../data-source";
import { User } from "../models/cultivos";

export const insertUser = async (username: string, password: string, email: string, role: string) => {
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.role = role; // 'admin' o 'user'
    AppDataSource.manager.save(User, user);   
    return await AppDataSource.manager.save(user);
}

export const getUsers = async () => {
    return await AppDataSource.manager.find(User);
}

export const getUserById = async (id: number) => {
    return await AppDataSource.manager.findOneBy(User, { id });
}

export const updateUser = async (id: number, username: string, password: string, role: string) => {
    const user = await getUserById(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    user.username = username;
    user.password = password;
    user.role = role; // 'admin' o 'user'
    return await AppDataSource.manager.save(user);
}

export const deleteUser = async (id: number) => {
    const user = await getUserById(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return await AppDataSource.manager.remove(user);
}
