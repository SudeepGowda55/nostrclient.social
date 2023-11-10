"use client";

import { Event } from "nostr-tools";
import { useEffect, useState } from "react";
import { Relays, Pool } from "@/utils/nostr";
import UserMetadataType from "@/types/usersmetadata";

export default function Home() {

  const [messages, setMessages] = useState<Event[]>([]);

  const [usersMetaData, setUsersMetaData] = useState<Record<string, UserMetadataType>>({});

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

  useEffect(() => {
    if (!Pool) return;

    const authors: string[] = messages.map((message) => message.pubkey);

    const sub = Pool.sub(Relays, [
      {
        kinds: [0],
        authors: authors
      }
    ])

    sub.on("event", (event: Event) => {
      const userDetails: UserMetadataType = JSON.parse(event.content);
      setUsersMetaData((prev) => ({ ...prev, [event.pubkey]: userDetails }))
    })
  }, [messages, Pool])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-[100vw]">
      <p> Nostr Client </p>
      <div>
        {(messages.length) > 0 ?
          (messages.map((message, index) => (
            <div key={`${message.id}_${index}`} className="flex flex-col w-[80vw]">
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black">
                <p className=" mx-[8vw]">{usersMetaData[message.pubkey]?.name}</p>
                <p className=' my-6 mx-[8vw] p-10 rounded-2xl'> {message.content} </p>
              </span>
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
