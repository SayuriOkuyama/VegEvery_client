import Image from 'next/image'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { PiBooksThin } from 'react-icons/pi'

const Shelf = ({ userId, bookshelfId, thumbnailUrl, name }) => {
  return (
    <div className="border border-button-color h-44 w-full">
      <Link href={`/bookshelves/${userId}/${bookshelfId}`}>
        <div className="relative">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              width={300}
              height={300}
              alt="本棚のサムネイル"
              className="object-cover m-auto"
            />
          ) : (
            <div>
              <IconContext.Provider
                value={{ size: '80px', className: 'mx-auto h-36 block' }}>
                <PiBooksThin />
              </IconContext.Provider>
            </div>
          )}
        </div>
        <div className="text-center p-1 border-t h-8">{name}</div>
      </Link>
    </div>
  )
}

export default Shelf
