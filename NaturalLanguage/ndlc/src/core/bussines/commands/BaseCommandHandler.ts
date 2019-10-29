import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommand } from './BaseCommand';

@CommandHandler(BaseCommand)
export class BaseCommandHandler implements ICommandHandler<BaseCommand> {
    constructor(){
    }
    async execute(command: BaseCommand) {
    }
}