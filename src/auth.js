import { supabase } from './supabase.js';

export class AuthManager {
  constructor() {
    this.user = null;
    this.session = null;
    this.listeners = [];
  }

  async initialize() {
    const { data: { session } } = await supabase.auth.getSession();
    this.session = session;
    this.user = session?.user || null;

    supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        this.session = session;
        this.user = session?.user || null;
        this.notifyListeners(event, session);

        if (event === 'SIGNED_IN' && session?.user) {
          await this.ensureProfile(session.user);
        }
      })();
    });

    return this.user;
  }

  async ensureProfile(user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile) {
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          full_name: user.email?.split('@')[0] || 'User',
          role: 'architect'
        }]);

      if (error) console.error('Error creating profile:', error);
    }
  }

  onAuthChange(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners(event, session) {
    this.listeners.forEach(callback => callback(event, session));
  }

  async signUp(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) throw error;
    return data;
  }

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async updateProfile(updates) {
    if (!this.user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', this.user.id);

    if (error) throw error;
  }

  async getProfile() {
    if (!this.user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', this.user.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  isAuthenticated() {
    return !!this.user;
  }

  getUser() {
    return this.user;
  }
}

export const authManager = new AuthManager();
