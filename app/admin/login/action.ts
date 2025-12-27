'use server'
import { cookies } from 'next/headers';

export async function checkLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Temporary Hardcoded (Baad mein .env kar denge)
  const envEmail = "admin@tdd.com";
  const envPassword = "kidaji@8N";

  if (email === envEmail && password === envPassword) {
    
    const cookieStore = await cookies();

    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    // ✅ Redirect HATA DIYA. Sirf Success bhejo.
    return { success: true }; 

  } else {
    return { success: false, message: 'Invalid email or password' };
  }
}