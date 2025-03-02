"use client";

import Image from "next/image";
import choso from "@/assets/choso.png";
import React, { useState } from "react";

interface Message {
  data: string;
  author: "self" | "guest";
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { author: "guest", data: "Hello boy" },
    { author: "self", data: "Heyyyy" },
    { author: "self", data: "yo boy hfasjfdklajs kfajsf fasjkdkkfjsak fkasjdkfj fjkasdjf jkfasd fkjs jfsdkjfk fjdskfjas jksadfjkf jkasfdjfa" },
    { author: "guest", data: "kfajsf fasjkdkkfjsak fkasjdkfj fjkasdjf jkfasd fkjs jfsdkjfk fjdskfjas jksadfjkf jkasfdjfa" },
    { author: "self", data: "Heyyyy" },
    { author: "guest", data: " kjfsajf jkfsddjfk kjfadksjf jfsdkjfka jfsdkjf jkfdasfjf k fdjaskkjfkas fasjdkfjasddfj asdf ads fasd f asf asd fsad fasd f asdf asd fsad f asdf  asdf as fs a" },
  ]);

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex mb-3 gap-3 ${
            message.author === "self" ? "justify-end" : ""
          }`}
        >
          {message.author === "guest" && (
            <div className="w-10 h-10 rounded-full bg-[#ee8686] self-end">
              <Image alt="display" src={choso} objectFit="fill" />
            </div>
          )}
          <div
            className={`bg-[#5f36b2] p-3 rounded-t-xl  min-w-[150px] max-w-[500px] flex flex-col gap-3 ${message.author === 'guest' ? "rounded-r-xl" : "rounded-l-xl"} `}
          >
            <div className="flex justify-between text-xs">
              <div>John Cena</div>
              <div>14:11</div>
            </div>
            <div className="">{message.data}</div>
          </div>

          {message.author === "self" && (
            <div className="w-10 h-10 rounded-full bg-[#ee8686] self-end">
              <Image alt="display" src={choso} objectFit="fill" />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default Chat;
