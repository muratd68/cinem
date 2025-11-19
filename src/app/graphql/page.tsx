'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { GitBranch, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function GraphQLCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-pink-600">
              <GitBranch className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">GraphQL Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Queries, mutations, subscriptions</p>
            </div>
          </div>
          <PDFDownload title="GraphQL" sheetId="graphql" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Schema Definition</h2>

          <CodeBlock
            language="graphql"
            title="Type Definitions"
            code={`# Scalar types
type User {
  id: ID!
  name: String!
  email: String
  age: Int
  score: Float
  isActive: Boolean!
  createdAt: String
}

# Object type with relations
type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
  tags: [String!]
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

# Input type
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}

# Enum
enum Role {
  ADMIN
  USER
  GUEST
}

enum Status {
  DRAFT
  PUBLISHED
  ARCHIVED
}

# Interface
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
}

# Union
union SearchResult = User | Post | Comment

# Custom scalar
scalar DateTime
scalar JSON`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Queries</h2>

          <CodeBlock
            language="graphql"
            title="Query Operations"
            code={`# Basic query
query {
  users {
    id
    name
    email
  }
}

# Query with arguments
query {
  user(id: "123") {
    id
    name
    email
  }
}

# Multiple queries
query {
  user(id: "123") {
    name
  }
  posts(limit: 10) {
    title
  }
}

# Named query
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}

# Nested query
query {
  user(id: "123") {
    name
    posts {
      title
      comments {
        text
        author {
          name
        }
      }
    }
  }
}

# Aliases
query {
  admin: user(id: "1") {
    name
  }
  guest: user(id: "2") {
    name
  }
}`}
          />

          <CodeBlock
            language="graphql"
            title="Fragments"
            code={`# Fragment definition
fragment UserFields on User {
  id
  name
  email
}

# Fragment usage
query {
  user(id: "123") {
    ...UserFields
    posts {
      title
    }
  }
}

# Inline fragment
query {
  search(term: "hello") {
    ... on User {
      name
      email
    }
    ... on Post {
      title
      content
    }
  }
}

# Fragment with variables
fragment PostWithAuthor on Post {
  title
  author {
    ...UserFields
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Mutations</h2>

          <CodeBlock
            language="graphql"
            title="Mutation Operations"
            code={`# Schema
type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User
  deleteUser(id: ID!): Boolean!
  createPost(title: String!, content: String!, authorId: ID!): Post!
}

# Create mutation
mutation {
  createUser(input: {
    name: "John"
    email: "john@example.com"
    age: 30
  }) {
    id
    name
    email
  }
}

# Update mutation
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
  }
}

# Delete mutation
mutation {
  deleteUser(id: "123")
}

# Multiple mutations
mutation {
  user1: createUser(input: { name: "John", email: "john@example.com" }) {
    id
  }
  user2: createUser(input: { name: "Jane", email: "jane@example.com" }) {
    id
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Subscriptions</h2>

          <CodeBlock
            language="graphql"
            title="Subscription Operations"
            code={`# Schema
type Subscription {
  userCreated: User!
  postAdded(authorId: ID): Post!
  commentAdded(postId: ID!): Comment!
}

# Subscribe to new users
subscription {
  userCreated {
    id
    name
    email
  }
}

# Subscribe with filter
subscription OnNewPost($authorId: ID) {
  postAdded(authorId: $authorId) {
    id
    title
    author {
      name
    }
  }
}

# Subscribe to comments
subscription {
  commentAdded(postId: "123") {
    text
    author {
      name
    }
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Directives</h2>

          <CodeBlock
            language="graphql"
            title="Built-in Directives"
            code={`# @include - conditional inclusion
query GetUser($withPosts: Boolean!) {
  user(id: "123") {
    name
    posts @include(if: $withPosts) {
      title
    }
  }
}

# @skip - conditional skip
query GetUser($skipEmail: Boolean!) {
  user(id: "123") {
    name
    email @skip(if: $skipEmail)
  }
}

# @deprecated - mark field as deprecated
type User {
  id: ID!
  name: String!
  username: String @deprecated(reason: "Use name instead")
}

# Custom directive
directive @auth(requires: Role!) on FIELD_DEFINITION

type Query {
  users: [User!]! @auth(requires: ADMIN)
  me: User @auth(requires: USER)
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Pagination</h2>

          <CodeBlock
            language="graphql"
            title="Cursor-based Pagination"
            code={`# Schema
type Query {
  users(first: Int, after: String, last: Int, before: String): UserConnection!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type UserEdge {
  node: User!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# Query
query {
  users(first: 10, after: "cursor123") {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}`}
          />

          <CodeBlock
            language="graphql"
            title="Offset-based Pagination"
            code={`# Schema
type Query {
  users(limit: Int, offset: Int): UserList!
}

type UserList {
  items: [User!]!
  total: Int!
  hasMore: Boolean!
}

# Query
query {
  users(limit: 10, offset: 20) {
    items {
      id
      name
    }
    total
    hasMore
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Apollo Client (React)</h2>

          <CodeBlock
            language="typescript"
            title="Setup"
            code={`import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: \`Bearer \${token}\`,
  },
});

// Provider
function App() {
  return (
    <ApolloProvider client={client}>
      <MyApp />
    </ApolloProvider>
  );
}`}
          />

          <CodeBlock
            language="typescript"
            title="Hooks"
            code={`import { useQuery, useMutation, useSubscription } from '@apollo/client';

// Query
const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
    }
  }
\`;

function Users() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Query with variables
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
\`;

const { data } = useQuery(GET_USER, {
  variables: { id: '123' },
  fetchPolicy: 'cache-and-network',
});

// Mutation
const CREATE_USER = gql\`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
\`;

function CreateUser() {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    // or update cache directly
    update(cache, { data: { createUser } }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: createUser,
              fragment: gql\`
                fragment NewUser on User {
                  id
                  name
                }
              \`
            });
            return [...existingUsers, newUserRef];
          }
        }
      });
    }
  });

  return (
    <button onClick={() => createUser({
      variables: { input: { name: 'John', email: 'john@example.com' } }
    })}>
      Create User
    </button>
  );
}

// Subscription
const USER_CREATED = gql\`
  subscription OnUserCreated {
    userCreated {
      id
      name
    }
  }
\`;

const { data, loading } = useSubscription(USER_CREATED);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Server (Node.js)</h2>

          <CodeBlock
            language="typescript"
            title="Apollo Server"
            code={`import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
\`;

const resolvers = {
  Query: {
    users: () => db.users.findAll(),
    user: (_, { id }) => db.users.findById(id),
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      return db.users.create({ name, email });
    },
  },
  User: {
    // Field resolver
    posts: (parent) => db.posts.findByAuthor(parent.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    token: req.headers.authorization,
    user: await getUser(req.headers.authorization),
  }),
});

console.log(\`Server ready at \${url}\`);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Error Handling</h2>

          <CodeBlock
            language="typescript"
            title="Custom Errors"
            code={`import { GraphQLError } from 'graphql';

// Throw error in resolver
const resolvers = {
  Query: {
    user: (_, { id }, context) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }

      const user = db.users.findById(id);
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
            argumentName: 'id',
          },
        });
      }

      return user;
    },
  },
};

// Client error handling
const { loading, error, data } = useQuery(GET_USER);

if (error) {
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach(({ message, extensions }) => {
      console.log(\`Error: \${message}, Code: \${extensions.code}\`);
    });
  }
  if (error.networkError) {
    console.log(\`Network error: \${error.networkError}\`);
  }
}`}
          />
        </section>
      </div>
    </div>
  )
}
