"use client";

import { Event } from "nostr-tools";
import { useEffect, useState } from "react";
import { Relays, Pool } from "@/utils/nostr";

export default function Home() {

  const [messages, setMessages] = useState<Event[]>([]);

  useEffect(() => {
    if (!Pool) return;

    const sub = Pool.sub(Relays, [
      {
        kinds: [1],
        limit: 20,
      }
    ])

    sub.on("event", (event: Event) => {
      setMessages((prev) => [...prev, event]);
    })

  }, [Pool])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-[100vw]">
      <p> Nostr Client </p>
      <div>
        {(messages.length) > 0 ?
          (messages.map((message) => (
            <div key={message.id} className="flex flex-col w-[80vw]">
              <p className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black my-6 mx-[8vw] p-10 rounded-2xl'> {message.content} </p>
            </div>
          )))
          :
          <p className='text-center m-7'>
            Content Loading
          </p>
        }
      </div>
    </main>
  )
}
