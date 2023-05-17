import {genreCheck} from '@/utils/genreCheck';
import { genret } from '@/utils/genreLista';
import Image from 'next/image';
import Link from 'next/link'
import Logo from '../public/logo.png'
import './global.css'

interface Props{
  children: React.ReactNode
}

export default function RootLayout({children}: Props) {

  return (
    <html>
      <head />
      <body className='p-3 bg-white font-RobotoC text-black'>

        <h1 className='text-3xl'>MyMovieDataBase</h1>

        <label htmlFor="my-drawer-2" className="btn btn-primary bg-red-600 hover:bg-red-800 drawer-button mt-2 lg:hidden">Kategoriat</label>

<div className='flex flex-row mt-2 drawer-mobile'>

<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

  <div className="drawer-side w-80 max-lg:absolute max-lg:z-10">

  <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 

    <ul className="menu w-full bg-white text-base-content">
      {genret.map((genre : string, idx : number) => {

        const nimi :  string = genreCheck(genre);

        return(

          <Link href={`/${genre}`}>
            <li className='rounded-full bg-red-600 p-1 hover:bg-red-800 text-white mt-1 text-center'>
                {nimi}
            </li>
           </Link>

        )

      })}
    </ul>
    
  </div>

  <div className='lg:pl-8 pl-2 drawer-content'>

    {children}
    
  </div>

</div>

<p>&copy; Joni H</p>

</body>
</html>
)
}
