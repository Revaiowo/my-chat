import Image from "next/image";
import choso from "@/assets/choso.png";
import Chat from "./Chat";

function Main() {
  return (
    <div className="w-[70%] bg-[#131313] flex flex-col">

      <div className="h-[15%] flex justify-between border-b-2 border-[#3b3b3b]">
        <div className="flex  gap-3 self-stretch">
          <div className="bg-[#e85dbc] rounded-r-full w-12 flex justify-center items-center">
            <Image
              alt="left arrrow"
              src="/left_arrow.svg"
              width={30}
              height={30}
            />
          </div>
          <div className="w-14 h-14 bg-[#a4eaa4] rounded-full self-center ml-5">
            <Image alt="display" src={choso} objectFit="cover" />
          </div>
          <div className="font-bold text-4xl self-center">John Doe</div>
        </div>

        <div className="flex gap-3 mr-5">
          <div className="bg-[#2f2f2f] self-center w-12 h-12 rounded-full flex justify-center items-center
            hover:bg-red-500 hover:cursor-pointer transition-color duration-100 
          ">
            <Image alt="video" src='/video.svg' width={25} height={25} />
          </div>
          <div className="bg-[#2f2f2f] self-center w-12 h-12 rounded-full flex justify-center items-center
            hover:bg-red-500 hover:cursor-pointer transition-color duration-100
          ">
            <Image alt="call" src='/call.svg' width={25} height={25} />
          </div>
        </div>

      </div>

      <div className="h-[70%] px-10 py-5 overflow-y-auto custom-scrollbar">
          <Chat />
      </div>

      <div className="h-[15%] px-10 py-3 flex justify-between items-center gap-5">
        <div className="flex bg-[#2b2b2b] p-3 gap-1 flex-1 self-stretch rounded-xl">
          <Image className="hover:cursor-pointer" alt="emoji" src='/emoji.svg' width={30} height={30} />
          <input className="bg-[#2b2b2b] w-full outline-none p-3" placeholder="Type a messaage" />
          <Image className="hover:cursor-pointer" alt="attach" src='/attach.svg' width={30} height={30} />
        </div>

        <div className="bg-gradient-to-r from-[#f36b70] to-[#e24694] rounded-full border-8 border-[rgb(28,23,28)] border-opacity-70 hover:cursor-pointer hover:brightness-90">
          <Image className="p-2.5" alt="send" src='/send.svg' width={50} height={50}/>
        </div>
      </div>
    </div>
  );
}

export default Main;
