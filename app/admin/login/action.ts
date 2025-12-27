'use server'
import { cookies } from 'next/headers';

export async function checkLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 👇 Abhi ke liye DIRECT yahan likh rahe hain taaki login ho jaye
  const envEmail = "admin@tdd.com";
  const envPassword = "kidaji@8N";

  // Debugging ke liye print bhi karwa lete hain
  console.log("Checking:", email, password);
  console.log("Against:", envEmail, envPassword);

  if (email === envEmail && password === envPassword) {
    
    // ✅ Fix: await zaroori hai
    const cookieStore = await cookies();

    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return { success: true }; 
  } else {
    // ✅ Fix: 'message' add kiya hai taaki error na aaye
    return { success: false, message: 'Invalid email or password' };
  }
}