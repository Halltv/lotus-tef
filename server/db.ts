import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, InsertContact, contacts, InsertFile, files, InsertNews, news } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function saveContact(contact: InsertContact) {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot save contact: database not available');
    return null;
  }

  try {
    const result = await db.insert(contacts).values(contact);
    return result;
  } catch (error) {
    console.error('[Database] Failed to save contact:', error);
    throw error;
  }
}

export async function saveFileMetadata(fileData: InsertFile) {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot save file metadata: database not available');
    return undefined;
  }

  try {
    const result = await db.insert(files).values(fileData);
    return result;
  } catch (error) {
    console.error('[Database] Failed to save file metadata:', error);
    throw error;
  }
}

export async function getFilesByUser(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot get files: database not available');
    return [];
  }

  try {
    const result = await db.select().from(files).where(eq(files.uploadedBy, userId));
    return result;
  } catch (error) {
    console.error('[Database] Failed to get files:', error);
    return [];
  }
}

export async function deleteFile(fileId: number) {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot delete file: database not available');
    return false;
  }

  try {
    await db.delete(files).where(eq(files.id, fileId));
    return true;
  } catch (error) {
    console.error('[Database] Failed to delete file:', error);
    return false;
  }
}

export async function saveNews(newsData: InsertNews) {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot save news: database not available');
    return null;
  }

  try {
    const result = await db.insert(news).values(newsData);
    return result;
  } catch (error) {
    console.error('[Database] Failed to save news:', error);
    throw error;
  }
}

export async function getAllNews() {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot get news: database not available');
    return [];
  }

  try {
    const result = await db.select().from(news).orderBy(news.published);
    return result;
  } catch (error) {
    console.error('[Database] Failed to get news:', error);
    return [];
  }
}

export async function getNewsByHash(imageHash: string) {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot get news by hash: database not available');
    return undefined;
  }

  try {
    const result = await db.select().from(news).where(eq(news.imageHash, imageHash)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error('[Database] Failed to get news by hash:', error);
    return undefined;
  }
}

// TODO: add feature queries here as your schema grows.
