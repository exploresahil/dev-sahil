# Test-Driven Development (TDD)

## Overview

Write the test first. Watch it fail. Write minimal code to pass.

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

## When to Use

**Always:** New features, Bug fixes, Refactoring, Behavior changes

**Exceptions:** Throwaway prototypes, Generated code, Configuration files

## The Iron Law

`NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST`

Write code before the test? Delete it. Start over.

## Red-Green-Refactor

### RED - Write Failing Test

Write one minimal test showing what should happen.

### Verify RED

`npm run test:run`

### GREEN - Minimal Code

Write simplest code to pass the test.

### Verify GREEN

`npm run test:run`

### REFACTOR - Clean Up

After green only. Keep tests green.

## Project Testing Setup

### Framework

This project uses Vitest with:
- @testing-library/react - React component testing
- @testing-library/dom - DOM element querying  
- @testing-library/jest-dom - Custom Jest matchers
- @testing-library/user-event - Simulating user interactions
- jsdom - DOM environment for Node.js

### npm Scripts

- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once (CI/pre-commit)
- `npm run test:coverage` - Generate coverage report

### Configuration

Vitest is configured in `vitest.config.ts` with:
- jsdom environment for DOM testing
- Path aliases (@/* -> ./src/*)
- Global test APIs (describe, test, it, expect, etc.)
- Setup file at `src/test/setup.ts`

## File Organization

### Co-located Test Pattern

Place test files next to the code they test:

```
src/
  utils/
    colors.utils.ts
    colors.utils.test.ts
  hooks/
    useBrowser.hook.ts
    useBrowser.hook.test.ts
  components/
    ui/
      Button.tsx
      Button.test.tsx
```

### Test File Naming

- Unit tests: `*.test.ts` or `*.test.tsx`
- Spec tests: `*.spec.ts` or `*.spec.tsx`
- Integration tests: `__tests__/` subdirectory

## Writing Tests

### Structure: Arrange → Act → Assert

```typescript
test('description of expected behavior', () => {
  // Arrange - set up test data
  const input = { email: 'test@example.com' };
  
  // Act - perform the action
  const result = validateEmail(input.email);
  
  // Assert - verify the outcome
  expect(result).toBe(true);
});
```

### Test Naming

**Good:**
- `test('rejects empty email')`
- `test('retries failed operations 3 times')`

**Bad:**
- `test('test1')`
- `test('email and domain and whitespace')`

### One Behavior Per Test

If your test name has "and", split it into multiple tests.

## Mock Patterns

### GSAP

```typescript
vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
    })),
  },
}));
```

### Motion

```typescript
vi.mock('motion', () => ({
  motion: {
    div: { animate: vi.fn() },
  },
  useMotionValue: vi.fn(() => ({ value: 0 })),
  useTransform: vi.fn(),
}));
```

### React Three Fiber

```typescript
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => children,
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({ camera: {} })),
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Environment: () => null,
}));
```

### Zustand

```typescript
const mockStore = {
  isOpen: false,
  open: vi.fn(),
  close: vi.fn(),
};

vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(() => mockStore),
}));
```

### Lenis Smooth Scroll

```typescript
vi.mock('lenis', () => ({
  default: vi.fn(() => ({
    scroll: vi.fn(),
    stop: vi.fn(),
    start: vi.fn(),
    destroy: vi.fn(),
  })),
}));
```

### Next.js Navigation

```typescript
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: vi.fn(() => '/'),
}));
```

## Examples

### Utility Function Test

```typescript
// src/utils/colors.utils.ts
export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

// src/utils/colors.utils.test.ts
import { describe, test, expect } from 'vitest';
import { hexToRgb } from './colors.utils';

describe('hexToRgb', () => {
  test('converts valid hex to RGB', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
  });

  test('returns null for invalid hex', () => {
    expect(hexToRgb('invalid')).toBeNull();
  });
});
```

### Custom Hook Test

```typescript
// src/hooks/useBrowser.hook.test.ts
import { renderHook } from '@testing-library/react';
import { useBrowser } from './useBrowser.hook';

describe('useBrowser', () => {
  test('returns false on server', () => {
    const { result } = renderHook(() => useBrowser());
    expect(result.current).toBe(false);
  });
});
```

### Component with Mocked GSAP

```typescript
// src/components/ui/AnimatedButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AnimatedButton } from './AnimatedButton';
import { gsap } from 'gsap';

vi.mock('gsap');

describe('AnimatedButton', () => {
  test('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<AnimatedButton onClick={onClick}>Click me</AnimatedButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Running Tests

| Command | Description |
|---------|-------------|
| `npm run test` | Watch mode |
| `npm run test:run` | Single run |
| `npm run test:coverage` | With coverage |

## Integration with Biome

Biome linter excludes test files. Test files follow TypeScript strict mode.

## Common Patterns

### Testing Async

```typescript
test('resolves with data', async () => {
  const data = await fetchData();
  expect(data).toEqual({ id: 1 });
});
```

### Testing Errors

```typescript
test('throws on invalid input', () => {
  expect(() => validate('')).toThrow('Input required');
});
```

## Debugging

1. Read the failure message
2. Check if failure is expected (feature missing vs typo)
3. Verify mocks are correct
4. Run single test: `npm run test -- --run src/path/to/test`

## Coverage Guidelines

| Type | Target |
|------|--------|
| Utilities/Hooks | 80%+ |
| Components | 70%+ |
| Integration | 50%+ |

## Best Practices

1. Test behavior, not implementation
2. Avoid testing implementation details
3. Use realistic test data
4. Keep tests independent
5. Name tests descriptively
