
export class BaseRepository<T> {
    private name;

    getAllEntities(): Promise<T[]> {
        const newPromise = new Promise<T[]>((resolve, reject) => {
            resolve([]);
        });
        return newPromise;
    }
    getEntityById(id: string): Promise<T> {
        const newPromise = new Promise<T>((resolve, reject) => {
            resolve();
        });
        return newPromise;
    }
    createEntity(entity: T): Promise<boolean> {
        const newPromise = new Promise<boolean>((resolve, reject) => {
            resolve();
        });
        return newPromise;
    }
    deleteEntity(entity: T): Promise<boolean> {
        const newPromise = new Promise<boolean>((resolve, reject) => {
            resolve();
        });
        return newPromise;
    }
}
