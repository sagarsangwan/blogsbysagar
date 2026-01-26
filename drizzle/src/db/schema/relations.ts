import { relations } from "drizzle-orm/relations";
import { blog, comment, tag, blogTag } from "./schema";

export const commentRelations = relations(comment, ({one}) => ({
	blog: one(blog, {
		fields: [comment.blogId],
		references: [blog.id]
	}),
}));

export const blogRelations = relations(blog, ({many}) => ({
	comments: many(comment),
	blogTags: many(blogTag),
}));

export const blogTagRelations = relations(blogTag, ({one}) => ({
	tag: one(tag, {
		fields: [blogTag.tagId],
		references: [tag.id]
	}),
	blog: one(blog, {
		fields: [blogTag.blogId],
		references: [blog.id]
	}),
}));

export const tagRelations = relations(tag, ({many}) => ({
	blogTags: many(blogTag),
}));