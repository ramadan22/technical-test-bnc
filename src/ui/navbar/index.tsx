'use client';

import {
  Drawer, Menu, MenuProps, Switch,
} from 'antd';
import { useEffect, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import BncLogo from '@/assets/images/logo_bnc.png';
import Style from './style.module.scss';
import { cn } from '@/lib/classnames';
import { navMenuList } from '@/data/navMenu';
import { LanguageTypes, MenusModeTypes } from '@/types';
import { getLastPatname } from '@/helpers/getDefaultPathname';

interface MenusPropsTypes {
  mode?: MenusModeTypes;
  language: LanguageTypes;
}

const Menus = ({ mode = 'horizontal', language }: MenusPropsTypes) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(`/${language}/${e.key !== 'home' ? e.key : ''}`);
  };

  return (
    <Menu
      onClick={onClick}
      className={Style.customAntMenu}
      mode={mode}
      selectedKeys={[pathname.split('/')[2] || 'home']}
      items={navMenuList}
    />
  );
};

interface NavbarUIPropsTypes {
  language: LanguageTypes;
}

const NavbarUI = ({ language }: NavbarUIPropsTypes) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isSwitch, setIsSwitch] = useState(language === 'id');

  const lastPathname = getLastPatname();

  useEffect(() => {
    setOpenDrawer(false);
  }, [pathname, searchParams]);

  return (
    <div id="navbar" className={Style.navbar}>
      <div>
        <Link href={`/${language}`}>
          <Image
            priority
            src={BncLogo}
            alt="logo"
            quality={75}
            width={0}
            height={0}
          />
        </Link>
        <div className={Style.wrapMenu}>
          <Menus language={language} />
        </div>
        <div>
          <Switch
            checked={isSwitch}
            className={cn(isSwitch ? Style.checked : Style.unChecked)}
            checkedChildren="ID"
            unCheckedChildren="EN"
            onChange={(checked) => {
              setIsSwitch(checked);
              router.push(`/${checked ? 'id' : 'en'}/${lastPathname || ''}`);
            }}
            defaultChecked
          />
          <div className={Style.toggleMenu}>
            <MenuOutlined onClick={() => setOpenDrawer(true)} />
          </div>
        </div>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Menus language={language} mode="vertical" />
        </Drawer>
      </div>
    </div>
  );
};
export default NavbarUI;
