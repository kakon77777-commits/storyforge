import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const storyViews = sqliteTable("story_views", {
  storyId: text("story_id").primaryKey(),
  views: integer("views").notNull().default(0),
  updatedAt: text("updated_at").notNull(),
});
