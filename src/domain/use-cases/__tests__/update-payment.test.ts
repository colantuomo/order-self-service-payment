import { describe, test, expect, vi } from 'vitest'

vi.mock('@prisma/client', () => ({
    PrismaClient: vi.fn()
}));