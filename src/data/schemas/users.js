import { schema } from "normalizr";

const userSchema = new schema.Entity("users");

export const UserSchema = {
    USER: userSchema,
    USER_ARRAY: [userSchema],
};