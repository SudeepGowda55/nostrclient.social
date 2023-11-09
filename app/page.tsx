"use client";

import { Event } from "nostr-tools";
import { useEffect, useState } from "react";
import { Relays, Pool } from "@/utils/nostr";

export default function Home() {

  const [message, setMessage] = useState<Event | null>(null);

  useEffect(() => {
    if (!Pool) return;
 
    const sub = Pool.sub(Relays, [
      {
        kinds: [1],
        limit: 10,
        "#t": ["nostr"]
      }
    ])

    sub.on("event", (event: Event) => {
      console.log(event);
    })

  }, [Pool])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p> Nostr Client </p>
      <div>
      </div>
    </main>
  )
}
