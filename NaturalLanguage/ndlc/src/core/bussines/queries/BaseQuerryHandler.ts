import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseQuerry } from './BaseQuerry';

@QueryHandler(BaseQuerry)
export class BaseQuerryHandler implements IQueryHandler<BaseQuerry> {
    async execute(query: BaseQuerry) {
    }
}
