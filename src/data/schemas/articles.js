import { schema } from "normalizr";
import { UserSchema } from "./users";

const articleSchema = new schema.Entity(
    "article",
    {
        user: UserSchema.USER
    }
);

export const ArticleSchema = {
    ARTICLE: articleSchema,
    ARTICLE_ARRAY: [articleSchema],
};