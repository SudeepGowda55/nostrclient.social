"use client";

import React, { useState } from 'react'
import { Pool, Relays } from '@/utils/nostr'
import { Event } from 'nostr-tools';

const Search = () => {

    const [hashtag, setHashtag] = useState<string | null>(null);
    const [searches, setSearches] = useState<Event[]>([]);

    const hashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHashtag(e.target.value)
    }

    const search = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (hashtag !== null && hashtag !== undefined) {
            const sub = Pool.sub(Relays, [
                {
                    kinds: [1],
                    limit: 10,
                    "#t": [hashtag]
                }
            ])
            sub.on("event", (event: Event) => {
                setSearches((prev) => [...prev, event]);
            })
        }
    }

    return (
        <>
            <div className='m-4'>
                <h1 className="text-3xl font-bold">Search for Posts</h1>
            </div>
            <div>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => search(e)} className='flex flex-row items-center justify-between mx-[10vw] w-[30vw]'>
                    <label className="">Enter the hashtag</label>
                    <input
                        type="text"
                        placeholder="nostr"
                        name="key"
                        required
                        className="text-black inline-block my-2 rounded-lg" 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => hashTag(e)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                {(searches.length) > 0 ?
                    (searches.map((event) => (
                        <div key={event.id} className="flex flex-col">
                            <p className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black my-6 mx-[8vw] p-10 rounded-2xl'> {event.content} </p>
                        </div>
                    )))
                    :
                    <p className='text-center m-7'>
                        Please Search
                    </p>
                }
            </div>
        </>
    )
}

export default Search