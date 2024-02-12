import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav className="mb-6 block">
      <ul className="flex">
        {
          breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.href}
              className={clsx({
                'font-bold text-gray-900': breadcrumb.active,
                'text-gray-500': !breadcrumb.active
              })}
            >
              <Link href={breadcrumb.href}>{ breadcrumb.label }</Link>
              {
                index < breadcrumbs.length - 1 ? (
                  <span className="mx-3 inline-block font-normal">/</span>
                ) : null
              }
            </li>
          ))
        }
      </ul>
    </nav>
  );
}
