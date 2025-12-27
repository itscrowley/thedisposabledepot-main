'use server'
import { cookies } from 'next/headers';

export async function checkLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;

  if (email === envEmail && password === envPassword) {
    
    const cookieStore = await cookies();

    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return { success: true }; 
  } else {
    // ✅ FIX: Yahan 'message' add kiya hai taaki TypeScript khush rahe
    return { success: false, message: 'Invalid email or password' };
  }
}