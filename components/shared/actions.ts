'use server';
import { cookies } from 'next/headers';

export async function setLocaleCookie(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('preferredLocale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax'
  });
}