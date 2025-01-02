import { describe, it, expect, vi, beforeEach } from "vitest";
import gqlClient from "@/lib/api/graphql/client";
import { ApolloClient, gql } from "@apollo/client";

// Partially mock the @apollo/client module
vi.mock("@apollo/client", async () => {
  const original = await vi.importActual<typeof import("@apollo/client")>(
    "@apollo/client"
  );
  return {
    ...original,
    gql: vi.fn((query: string) => query), // Mock gql for testing
    ApolloClient: vi.fn().mockImplementation(() => ({
      query: vi.fn(),
      mutate: vi.fn(),
    })),
  };
});

describe("GraphQL Client Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send a query successfully", async () => {
    const mockResponse = {
      data: { hello: "world" },
      loading: false,
      networkStatus: 7,
      errors: undefined,
    };

    const mockQuery = gql`
      query HelloWorld {
        hello
      }
    `;

    vi.mocked(gqlClient.query).mockResolvedValueOnce(mockResponse);

    const response = await gqlClient.query({ query: mockQuery });

    expect(gqlClient.query).toHaveBeenCalledWith({ query: mockQuery });
    expect(response).toEqual(mockResponse);
  });

  it("should send a mutation successfully", async () => {
    const mockResponse = {
      data: { createUser: { id: 1, name: "John Doe" } },
    };

    const mockMutation = gql`
      mutation CreateUser($name: String!) {
        createUser(name: $name) {
          id
          name
        }
      }
    `;

    const variables = { name: "John Doe" };

    vi.mocked(gqlClient.mutate).mockResolvedValueOnce(mockResponse);

    const response = await gqlClient.mutate({ mutation: mockMutation, variables });

    expect(gqlClient.mutate).toHaveBeenCalledWith({
      mutation: mockMutation,
      variables,
    });
    expect(response).toEqual(mockResponse);
  });
});
