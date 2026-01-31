import {
  pgTable,
  foreignKey,
  text,
  timestamp,
  uniqueIndex,
  integer,
  index,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

/* -------------------- CONTACT -------------------- */
export const contact = pgTable("Contact", {
  id: text()
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  name: text(),
  email: text().notNull(),
  message: text(),
  createdAt: timestamp({ precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

/* -------------------- TAG -------------------- */
export const tag = pgTable(
  "Tag",
  {
    id: text()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    name: text().notNull(),
  },
  (table) => [
    uniqueIndex("Tag_name_key").using(
      "btree",
      table.name.asc().nullsLast().op("text_ops"),
    ),
  ],
);

/* -------------------- NEWSLETTER -------------------- */
export const newsletter = pgTable(
  "Newsletter",
  {
    id: text()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    email: text().notNull(),
    name: text(),
    subscribedAt: timestamp("subscribed_at", {
      precision: 3,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    subscriptionType: text("subscription_type"),
    lastSentEmail: timestamp("last_sent_email", {
      precision: 3,
      mode: "string",
    }),
    unsubscribedAt: timestamp("unsubscribed_at", {
      precision: 3,
      mode: "string",
    }),
    newsletterPreferences: text("newsletter_preferences"),
    sentEmailsCount: integer("sent_emails_count").default(0).notNull(),
  },
  (table) => [
    index("Newsletter_email_idx").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("Newsletter_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
  ],
);

/* -------------------- BLOG -------------------- */
export const blog = pgTable(
  "Blog",
  {
    id: text()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    title: text().notNull(),
    slug: text().notNull(),
    content: text().notNull(),
    coverImage: text(),
    authorId: text(),
    likes: integer().default(0).notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
    description: text(),
    reads: integer().default(0).notNull(),
  },
  (table) => [
    uniqueIndex("Blog_slug_key").using(
      "btree",
      table.slug.asc().nullsLast().op("text_ops"),
    ),
  ],
);

/* -------------------- COMMENT -------------------- */
export const comment = pgTable(
  "Comment",
  {
    id: text()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    content: text().notNull(),
    blogId: text().notNull(),
    userId: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.blogId],
      foreignColumns: [blog.id],
      name: "Comment_blogId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ],
);

/* -------------------- BLOG TAG -------------------- */
export const blogTag = pgTable(
  "BlogTag",
  {
    id: text()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    blogId: text().notNull(),
    tagId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.tagId],
      foreignColumns: [tag.id],
      name: "BlogTag_tagId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.blogId],
      foreignColumns: [blog.id],
      name: "BlogTag_blogId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export type NewsLetter = InferSelectModel<typeof newsletter>;
export type Contact = InferSelectModel<typeof contact>;
export type Blog = InferSelectModel<typeof blog>;

export type Tag = InferSelectModel<typeof tag>;

export type BlogWithTag = Blog & {
  tags: Tag[];
};
export type RelatedBlog = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  likes: number;
  reads: number;
  tags: { name: string }[];
};
