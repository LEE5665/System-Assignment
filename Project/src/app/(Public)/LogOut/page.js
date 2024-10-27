'use client'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    router.push('/');
    return null;
}