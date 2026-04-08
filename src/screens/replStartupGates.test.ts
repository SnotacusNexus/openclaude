import { describe, expect, test } from 'bun:test'

import { shouldRunStartupChecks, STARTUP_CHECK_DELAY_MS } from './replStartupGates.js'

describe('shouldRunStartupChecks', () => {
  test('runs checks when not remote, not started, and not typing', () => {
    expect(shouldRunStartupChecks(false, false, false)).toBe(true)
  })

  test('skips checks in remote sessions', () => {
    expect(shouldRunStartupChecks(true, false, false)).toBe(false)
  })

  test('skips checks if already started', () => {
    expect(shouldRunStartupChecks(false, true, false)).toBe(false)
  })

  test('skips checks while user is typing', () => {
    expect(shouldRunStartupChecks(false, false, true)).toBe(false)
  })

  test('skips checks when remote even if started and typing', () => {
    expect(shouldRunStartupChecks(true, true, true)).toBe(false)
  })
})

describe('STARTUP_CHECK_DELAY_MS', () => {
  test('delay is positive and reasonable', () => {
    expect(STARTUP_CHECK_DELAY_MS).toBeGreaterThan(0)
    expect(STARTUP_CHECK_DELAY_MS).toBeLessThanOrEqual(5000)
  })
})