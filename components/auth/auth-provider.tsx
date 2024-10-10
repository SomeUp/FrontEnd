'use client';
import { protectedRoutes } from '@/lib/service/auth/constants';
import { useUserProfile } from '@/lib/service/user/use-user-service';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const isPrivateRoute = (path: string) => {
  return protectedRoutes.some((route) => path.startsWith(route));
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useUserProfile();
  const path = usePathname();
  const router = useRouter();
  const isPrivate = isPrivateRoute(path);

  useEffect(() => {
    if (isLoading || !isPrivate) return;
    if (!user) {
      router.push('/');
    }
  }, [user, router, isLoading, isPrivate]);

  if (isPrivate && !user) {
    return null;
  }

  return children;
}
