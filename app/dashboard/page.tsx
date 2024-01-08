'use client'
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth';
const DashboardPage = () => {
  const router = useRouter();
  const dataUser = useAuthStore(state => state.dataUser);
  const isAuth = useAuthStore(state => state.isAuth);

  React.useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth, router]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center ">
        <h5>
         {
            dataUser?.name
         }
        </h5>
        <Link href="/login">
          <Button>
            Login
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default DashboardPage