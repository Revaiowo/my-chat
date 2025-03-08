import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import choso from "@/assets/choso.png";

function Header() {
	const selectedUser = useUserStore((state) => state.selectedUser);

	return (
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
				<div className="font-bold text-4xl self-center">
					{selectedUser ? selectedUser.fullName : "John Doe"}
				</div>
			</div>

			<div className="flex gap-3 mr-5">
				<div
					className="bg-[#2f2f2f] self-center w-12 h-12 rounded-full flex justify-center items-center
            hover:bg-red-500 hover:cursor-pointer transition-color duration-100 
          "
				>
					<Image
						alt="video"
						src="/video.svg"
						width={25}
						height={25}
					/>
				</div>
				<div
					className="bg-[#2f2f2f] self-center w-12 h-12 rounded-full flex justify-center items-center
            hover:bg-red-500 hover:cursor-pointer transition-color duration-100
          "
				>
					<Image alt="call" src="/call.svg" width={25} height={25} />
				</div>
			</div>
		</div>
	);
}

export default Header;
