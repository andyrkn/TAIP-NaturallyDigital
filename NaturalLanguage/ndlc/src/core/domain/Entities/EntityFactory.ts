import { BaseEntity } from './BaseEntity';

export class BaseEntityFactiry {
    createNewBaseEntity(): BaseEntity {
        return new BaseEntity();
    }
}
