import { supabase } from './supabase.js';

export class SessionManager {
  async saveSession(sessionType, sessionData, thumbnailUrl = null) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('design_sessions')
      .insert([{
        user_id: user.id,
        session_type: sessionType,
        session_data: sessionData,
        thumbnail_url: thumbnailUrl
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateSession(sessionId, sessionData, thumbnailUrl = null) {
    const updates = {
      session_data: sessionData
    };

    if (thumbnailUrl) {
      updates.thumbnail_url = thumbnailUrl;
    }

    const { data, error } = await supabase
      .from('design_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getSessions(sessionType = null) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    let query = supabase
      .from('design_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (sessionType) {
      query = query.eq('session_type', sessionType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getSession(sessionId) {
    const { data, error } = await supabase
      .from('design_sessions')
      .select('*')
      .eq('id', sessionId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async deleteSession(sessionId) {
    const { error } = await supabase
      .from('design_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) throw error;
  }
}

export const sessionManager = new SessionManager();
