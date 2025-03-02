import choso from '@/assets/choso.png'
import Image from 'next/image'

function FriendList() {
  return (
    <div className='flex h-16 items-center p-4 justify-between border-b border-[#373737]'>
        <div className='flex gap-4 items-center'>
        <div className='h-10 w-10 rounded-full bg-red-300'>
            <Image alt='display' src={choso}  objectFit='cover' />
        </div>
        <div>John Doe</div>
        </div>
        <div>9:54</div>
    </div>
  )
}

export default FriendList