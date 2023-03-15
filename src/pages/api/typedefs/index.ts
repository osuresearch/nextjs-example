
export default /* GraphQL */`
  scalar File

  type Query {
    """
    Something about greeting
    """
    greetings: String

    """
    Query that uses our upstream REST API
    """
    person(id: String!): Person

    """
    Query that uses our upstream GraphQL API
    """
    person2(id: String!): Person
  }

  type Person {
    id: String!
    name: String!
    username: String!
    email: String!
  }

  type Mutation {
    upload(file: File!): String!
  }
`;
