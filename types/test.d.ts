/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

declare namespace Vi {
    type JestAssertion<T = unknown> = jest.Matchers<void, T>
  }