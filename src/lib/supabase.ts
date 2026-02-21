import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yqjyshirgsevvijwywky.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxanlzaGlyZ3NldnZpand5d2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMjM4NjAsImV4cCI6MjA2NTg5OTg2MH0.WgdI-D6H2EtjyzS8LJcUw5A8IcGNv8XN6qkdxVvd-CY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  
  if (!error && data.user) {
    // Create a profile record in the profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: data.user.id,
          full_name: userData.full_name,
          institution: userData.institution,
          department: userData.department,
          account_type: userData.account_type,
          is_freemium: userData.is_freemium,
          created_at: new Date()
        }
      ])
      
    if (profileError) {
      console.error('Error creating profile:', profileError)
    }
  }
  
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  try {
    // Special handling for test account
    if (email === 'test@drphdai.com' && password === 'testpassword123') {
      console.log('Using test account login')
      
      // Create a mock session that mimics Supabase auth structure
      const mockUser = {
        id: 'test-user-id-12345',
        email: 'test@drphdai.com',
        user_metadata: {
          full_name: 'Test User',
          institution: 'Test University',
          department: 'Computer Science',
          account_type: 'normal',
          is_freemium: false
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const mockSession = {
        access_token: 'mock-access-token-12345',
        refresh_token: 'mock-refresh-token-12345',
        expires_at: Date.now() + 3600000,
        user: mockUser
      }
      
      // Store in localStorage to persist across page reloads
      localStorage.setItem('supabase.auth.token', JSON.stringify(mockSession))
      
      return {
        data: {
          user: mockUser,
          session: mockSession
        },
        error: null
      }
    }
    
    // Regular login for non-test accounts
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    return { data, error }
  } catch (error: any) {
    console.error('Sign in error:', error)
    return { data: null, error }
  }
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/app`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  return { data, error }
}

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  return { data, error }
}

export const updateProfile = async (userData: any) => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: { message: 'No user logged in' } }
  }
  
  // Update auth metadata
  const { data: authData, error: authError } = await supabase.auth.updateUser({
    data: userData
  })
  
  if (authError) {
    return { error: authError }
  }
  
  // Update profile in profiles table
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', user.id)
    .select()
    .single()
    
  return { 
    data: profileData || authData, 
    error: profileError || authError 
  }
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
    
  return { data, error }
}

// New function for updating GAI preferences
export async function updateGAIPref(tool: string, gai: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('No user logged in');
  }
  // Use upsert to create or update the preferences
  const { error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: user.id,
      preferred_gai_per_tool: { [tool]: gai }
    }, {
      onConflict: 'user_id' // Merge on conflict
    });
  
  if (error) {
    console.error('Error updating GAI preference:', error);
    throw error;
  }
}