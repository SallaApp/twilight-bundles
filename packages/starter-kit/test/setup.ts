import '@testing-library/jest-dom';
import { beforeAll, vi } from 'vitest';

// Mock Salla global object
beforeAll(() => {
    (global as any).Salla = {
        log: vi.fn(),
        success: vi.fn(),
        error: vi.fn(),
    };
});
