"use client";

import React, { useState } from 'react'
import { Pool, Relays } from '@/utils/nostr'
import { Event } from 'nostr-tools';

const Search = () => {

    const [hashtag, setHashtag] = useState<string | null>(null);

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
                console.log(event);
            })
        }
    }

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold">Search for Posts</h1>
            </div>
            <div>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => search(e)}>
                    <label className="block">Enter the hashtag</label>
                    <input
                        type="text"
                        placeholder="nostr"
                        name="key"
                        required
                        className="text-black block my-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => hashTag(e)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        </>
    )
}

export default Search