"use client";

import { getPublicKey } from "nostr-tools";
import React, { useState } from "react";

const Login = () => {

    const [prvKey, setPrvKey] = useState<string | null>(null);
    const [pubKey, setPubKey] = useState<string | null>(null);

    const privateKeyLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrvKey(e.target.value)
    }

    const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (prvKey !== null && prvKey !== undefined) {
            setPubKey(getPublicKey(prvKey))
        }
    }

    if (pubKey !== null && pubKey !== undefined) {
        console.log(pubKey);
    }

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold">Nostr Network</h1>
                <p className="text-gray-500">Login to your Nostr account.</p>
            </div>
            <div>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => createAccount(e)}>
                    <label className="block">Please Enter Your Private Key</label>
                    <input
                        type="text"
                        placeholder="nsec, npub"
                        name="key"
                        required
                        className="text-black block my-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => privateKeyLogin(e)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login