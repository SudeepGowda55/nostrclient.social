import UserMetadataType from "./usersmetadata";

interface Post extends UserMetadataType {
    id: string,
    pubkey: string,
    created_at: number,
    content: string,
}

export default Post;