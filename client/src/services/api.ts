import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../redux/slices/userSlice';

interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  data: {
    login: {
      name: string;
      email: string;
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    signup: {
      name: string;
      email: string;
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface RefreshResponse {
  data: {
    accessToken: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.warn('Access token expired, trying to refresh token...');

    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/graphql',
          method: 'POST',
          body: {
            query: `
              mutation RefreshToken($refreshToken: String!) {
                refreshToken(refreshToken: $refreshToken) {
                  accessToken
                }
              }
            `,
            variables: { refreshToken },
          },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const accessToken = (refreshResult.data as RefreshResponse).data.accessToken;
        localStorage.setItem('accessToken', accessToken);

        // Retry the original request with the new accessToken
        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        api.dispatch(logout());
        console.warn('Refresh token is invalid, logging out...');
      }
    } else {
      console.warn('No refresh token found, logging out...');
      api.dispatch(logout());
    }
  }

  return result;
};

export const userService = createApi({
  reducerPath: 'authService',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation Login($email: String!, $password: String!) {
              login(loginData: { email: $email, password: $password }) {
                id
                name
                email
                accessToken
                refreshToken
              }
            }
          `,
          variables: {
            email: credentials.email,
            password: credentials.password,
          },
        },
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (newUser) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation Signup($name: String!, $email: String!, $password: String!) {
              signup(userData: { name: $name, email: $email, password: $password }) {
                id
                name
                email
                accessToken
                refreshToken
              }
            }
          `,
          variables: {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
          },
        },
      }),
    }),
    
    logout: builder.mutation<{}, { accessToken: string }>({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation Logout {
              logout {
                success
                message
              }
            }
          `,
        },
      }),
    }),

    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            query GetAllUsers {
              getAllUsers {
                id
                name
                email
              }
            }
          `,
        },
      }),
    }),

    // Send Message Mutation
    sendMessage: builder.mutation<any, any>({
      query: ({ receiverId, content, media }) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation SendMessage($messageData: MessageInput!) {
  sendMessage(messageData: $messageData) {
    id
    senderId
    receiverId
    content
    media
    createdAt
    updatedAt
  }
}
          `,
          variables: {
            receiverId,
            content,
            media,
          },
        },
      }),
    }),

    // Get Messages Query
    getMessages: builder.query<any, { receiverId: string }>({
      query: ({ receiverId }) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            query GetMessages($receiverId: ID!) {
  getMessages(receiverId: $receiverId) {
    id
    senderId
    receiverId
    content
    media
    createdAt
    updatedAt
  }
}
          `,
          variables: {
            receiverId,
          },
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useSendMessageMutation,      // Add for sending messages
  useGetMessagesQuery,         // Add for fetching messages
} = userService;
