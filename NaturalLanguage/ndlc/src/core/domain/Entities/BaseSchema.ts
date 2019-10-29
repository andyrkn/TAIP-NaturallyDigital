import * as mongoose from 'mongoose';

export const baseSchema = new mongoose.Schema({
    id: String,
    creationDate: Date,
    modifiedDate: Date,
});
