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

        <div className='flex flex-row mt-2'>
        
          <div>

            <h2 className="text-3xl pb-2">Kategoriat:</h2>

            <ul className='list-none'>
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

          <div className='pl-8'>

            {children}
            
          </div>

        </div>

        <p>&copy; Joni H</p>
        
      </body>
    </html>
  )
}
