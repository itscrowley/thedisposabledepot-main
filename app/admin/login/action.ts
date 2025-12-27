'use server'
import { cookies } from 'next/headers';

export async function checkLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;

  // 👇 YEH HAI JASOOSI WALA CODE (Terminal check karna)
  console.log("---------------- DEBUG START ----------------");
  console.log("1. User ne Type kiya Email:", email);
  console.log("2. Server ke pass Email hai:", envEmail);
  console.log("3. User ne Type kiya Pass:", password);
  console.log("4. Server ke pass Pass hai:", envPassword);
  console.log("---------------- DEBUG END ------------------");

  if (email === envEmail && password === envPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, 
      path: '/',
    });
    return { success: true }; 
  } else {
    return { success: false, message: 'Invalid email or password' };
  }
}