import Link from 'next/link';
import type { ReactNode } from 'react';

import {useRouter} from "next/router";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  console.log(router.route)

  return (
    <div className="w-full text-gray-700 antialiased">
      {props.meta}

      <div className="menu">
        <div className="mx-auto max-w-screen-900 flex justify-between items-center">
          <Link href="/">
            <a className="menu__home"/>
          </Link>
          <div className="flex justify-between">
            <Link href="/">
              <a className="menu__link">Login</a>
            </Link>
            <Link href="/register/">
              <a className={`menu__link ${router.route === '/register' ? 'menu__link--active' : ''}`}>Register</a>
            </Link>

          </div>
        </div>
      </div>
      <div className="body">
        <div className="mx-auto max-w-screen-900">
          {props.children}
        </div>
      </div>
      <div className="footer">
        <div className="mx-auto max-w-screen-md">
          erewr
        </div>
      </div>
    </div>
  );
}

export { Main };
