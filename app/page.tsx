"use client";

import { Event } from "nostr-tools";
import { useEffect, useState } from "react";
import { Relays, Pool } from "@/utils/nostr";
import UserMetadataType from "@/types/usersmetadata";
import Link from "next/link";

export default function Home() {

  const [messages, setMessages] = useState<Event[]>([]);

  const [usersMetaData, setUsersMetaData] = useState<Record<string, UserMetadataType>>({});

  useEffect(() => {
    if (!Pool) return;

    const sub = Pool.sub(Relays, [
      {
        kinds: [1],
        limit: 10,
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
    <main className="flex min-h-screen flex-col items-center justify-between p-10 max-w-[100vw]">
      <div className="flex flex-row items-center justify-between w-[90vw]">
        <p className="text-6xl"> Nostr Client </p>
        <span className=" flex flex-row space-x-10">
          <Link href={"/search"}><p className="text-lg">Search</p></Link>
          <Link href={"/login"}><p className="text-lg">Login</p></Link>
          <Link href={"/newacc"}><p className="text-lg">Create Account</p></Link>
        </span>
      </div>

      <div className="mt-16">
        {(messages.length) > 0 ?
          (messages.map((message, index) => (
            <div key={`${message.id}_${index}`} className="flex flex-col w-[80vw]">
              <span className="flex flex-row mx-[8vw] items-center justify-between">
                <span className="flex flex-row">
                  <img src={usersMetaData[message.pubkey]?.picture} alt="User Profile" className="w-[2vw] rounded-2xl" />
                  <p className="mx-[1vw] pt-1">{usersMetaData[message.pubkey]?.name}</p>
                </span>
                <span>
                  <p>Posted at: {message.created_at}</p>
                </span>
              </span>
              <p className='my-6 mx-[8vw] p-10 rounded-2xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black'> {message.content} </p>
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
