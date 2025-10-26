import database from "../config/db.js";

export interface ChatMessage {
  id?: number;
  user_id?: string;
  message: string;
  response: string;
  created_at?: string;
}

export async function setupDatabase() {
  try {
    const { error: checkError } = await database
      .from("chat_messages")
      .select("id")
      .limit(1);

    if (checkError) {
      console.log("Setup the database table...");
      console.log("Please run this SQL in your Supabase dashboard:");
      console.log(`
        CREATE TABLE IF NOT EXISTS chat_messages (
        id BIGSERIAL PRIMARY KEY,
        user_id TEXT,
        message TEXT NOT NULL,
        response TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
        CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
      `);
    } else {
      console.log("Database is ready to store chat messages!");
    }
  } catch (err) {
    console.error("Had trouble checking the database:", err);
  }
}

export async function saveMessage(
  userId: string | null,
  userMessage: string,
  aiReply: string
): Promise<ChatMessage> {
  try {
    const { data: savedMessage, error: saveError } = await database
      .from("chat_messages")
      .insert([
        {
          user_id: userId,
          message: userMessage,
          response: aiReply,
        },
      ])
      .select()
      .single();

    if (saveError) throw saveError;
    return savedMessage;
  } catch (err) {
    console.error("Couldn't save the message:", err);
    throw err;
  }
}

export async function getHistory(
  userId: string,
  maxMessages: number = 50
): Promise<ChatMessage[]> {
  try {
    const { data: messages, error: fetchError } = await database
      .from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(maxMessages);

    if (fetchError) throw fetchError;
    return messages || [];
  } catch (err) {
    console.error("Couldn't fetch chat history:", err);
    throw err;
  }
}

export async function getAllMessages(maxMessages: number = 100): Promise<ChatMessage[]> {
  try {
    const { data: allMessages, error: fetchError } = await database
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(maxMessages);

    if (fetchError) throw fetchError;
    return allMessages || [];
  } catch (err) {
    console.error("Couldn't fetch messages:", err);
    throw err;
  }
}

export async function removeMessage(messageId: number): Promise<boolean> {
  try {
    const { error: deleteError } = await database
      .from("chat_messages")
      .delete()
      .eq("id", messageId);

    if (deleteError) throw deleteError;
    return true;
  } catch (err) {
    console.error("Couldn't delete the message:", err);
    throw err;
  }
}
