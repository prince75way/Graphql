export interface MessageDTO {
  senderId?: string;  // Optional, as it might be inferred from the token
  receiverId: string;  // Required, as the message must have a recipient
  content?: string;  // Optional, the message content (text)
  media?: string;  // Optional, the media link or file (could be a URL)
}
