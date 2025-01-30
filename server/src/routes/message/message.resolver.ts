import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import jwt from 'jsonwebtoken';
import { sendMessageService, getMessagesService } from './message.service';
import { MessageDTO } from './message.dto';
import User from '../user/user.model';  // Import user model to verify sender
import dotenv from 'dotenv';

const pubsub: PubSubEngine = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';

dotenv.config();

// Secret key used for decoding the token (make sure it's the same key you used when signing the token)
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string; 

export const resolvers = {
  Query: {
    getMessages: async (_: any, { receiverId }: { receiverId: string }, { headers }: any) => {
      const token = headers.authorization?.split(' ')[1]; // Assuming 'Bearer <token>'
      if (!token) {
        throw new Error('Unauthorized: Missing token');
      }

      try {
        const decoded: any = await jwt.verify(token, JWT_SECRET) as { userId: string };
        console.log("Decoded Token:", decoded);

        if (!decoded.userId) {
          throw new Error('Invalid token: Missing userId');
        }

        const messages = await getMessagesService(decoded.userId, receiverId);
        return messages;

      } catch (error: any) {
        console.error("Error decoding token:", error);
        throw new Error(`Failed to decode token or retrieve messages: ${error.message}`);
      }
    },
  },

  Mutation: {
    sendMessage: async (_: any, { messageData }: { messageData: MessageDTO }, { headers }: any) => {
      const token = headers.authorization?.split(' ')[1]; // Assuming 'Bearer <token>'
      if (!token) {
        throw new Error('Unauthorized');
      }

      try {
        const decoded: any = jwt.verify(token, JWT_SECRET) as { userId: string };

        const sender = await User.findById(decoded.userId);
        if (!sender) {
          throw new Error('User not found');
        }

        // Send the message
        const message = await sendMessageService({ ...messageData, senderId: decoded.userId });

        // Log before publishing
        console.log("Publishing message to subscription with receiverId:", messageData.receiverId);
        
        // Publish the message to the subscription channel
      pubsub.publish(MESSAGE_SENT, { messageSent: message, receiverId: messageData.receiverId });
   

        return message;
      } catch (error: any) {
        console.log("Error sending message:", error);
        throw new Error(error.message);
      }
    },
  },

  Subscription: {
    messageSent: {
      subscribe: (_: any, { receiverId }: { receiverId: string }) => {
        // Log when a new subscription is created
        console.log("New subscription for receiverId:", receiverId);

        const iterator = pubsub.subscribe(MESSAGE_SENT, (message: any) => {
          // Log when the message is received by the subscription
          if (message.receiverId === receiverId) {
            console.log("Message received for receiverId:", receiverId);
            return message; // Send to the subscriber
          }
        }, {});

        return iterator;
      },
    },
  },
};
