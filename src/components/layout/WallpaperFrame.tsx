import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  innerClassName?: string;
};

export function WallpaperFrame({
  children,
  innerClassName = 'mx-auto max-w-[1080px] px-6 py-16 md:px-10 md:py-24',
}: Props) {
  return (
    <div className="menu-wallpaper">
      <section className="menu-wallpaper-well">
        <div className={`relative z-[2] ${innerClassName}`}>{children}</div>
      </section>
    </div>
  );
}
