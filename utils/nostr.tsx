import { SimplePool } from "nostr-tools";

export const Relays: string[] = [
    "wss://nostr-pub.wellorder.net",
    "wss://nostr.drss.io",
    "wss://nostr.swiss-enigma.ch",
    "wss://relay.damus.io",
]

export const Pool: SimplePool = new SimplePool();
