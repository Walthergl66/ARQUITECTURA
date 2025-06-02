import {AppDataSource} from './data-source';
import 'reflect-metadata';
export const iniciar = async() => {
    try{
        await AppDataSource.initialize();
        return AppDataSource;
    }
    catch(ex){
        throw(ex)
    }
}