import Modebtn from "@/components/Modebtn";
import Profiledropdown from "@/components/Profiledropdown";
import { genreCheck } from "@/utils/genreCheck";
import { genret } from "@/utils/genreLista";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo.png";
import "../global.css";
import Providers from "../Providers";

interface Props {
  children: React.ReactNode;
}

export default function GeneralLayout({ children }: Props) {

  return (
    <Providers>
      <div className="grid grid-cols-2">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={225} height={275} />
        </Link>
        <Modebtn />
        <Profiledropdown />
      </div>

      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary bg-red-600 hover:bg-red-800 drawer-button mt-2 lg:hidden"
      >
        Kategoriat
      </label>

      <div className="flex flex-row mt-2 drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side w-80 h-1/3 max-lg:absolute max-lg:z-10 overflow-hidden">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <ul className="menu w-full bg-white dark:bg-inherit text-base-content h-full">
            {genret.map((genre: string, idx: number) => {
              const nimi: string = genreCheck(genre);

              return (
                <Link href={`/${genre}/1`}>
                  <li className="rounded-full bg-red-600 p-1 hover:bg-red-800 text-white mt-1 text-center">
                    {nimi}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>

        <div className="lg:pl-8 pl-2 drawer-content lg:w-7/12 w-max">
          {children}
        </div>
      </div>
    </Providers>
  );
}
