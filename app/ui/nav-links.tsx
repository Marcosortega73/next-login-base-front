'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import Icon from '@mdi/react';
import { mdiViewDashboard, mdiAccountGroup, mdiCalendarCheckOutline, mdiAccountHardHatOutline, mdiFinance } from '@mdi/js';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

const links = [
  { name: 'Home', href: '/dashboard', icon: mdiViewDashboard },
  { name: 'Clientes', href: '/dashboard/clientes', icon: mdiAccountGroup },
  { name: 'Ordenes', href: '/dashboard/ordenes', icon: mdiCalendarCheckOutline },
  { name: 'Tecnicos', href: '/dashboard/tecnicos', icon: mdiAccountHardHatOutline },
  { name: 'Contabilidad', href: '/dashboard/contabilidad', icon: mdiFinance },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={
              `${pathName === link.href ? 'bg-sky-100 text-red-600' : 'text-gray-900'}
            flex h-[48px] grow items-center justify-center gap-2 
            rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 
            hover:text-blue-600 md:flex-none md:justify-start 
            md:p-2 md:px-3`}
          >
            <Icon path={link.icon} size={1} color="black" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
