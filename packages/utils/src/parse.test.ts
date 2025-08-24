import { describe, it, expect } from 'vitest';
import { safeEqual } from './parse';

describe('safeEqual', () => {
  it('should return true for equal values', () => {
    expect(safeEqual('a', 'a')).toBe(true);
  });

  it('should handle falsy values correctly', () => {
    expect(safeEqual('', '')).toBe(true);
    expect(safeEqual(0, 0)).toBe(true);
    expect(safeEqual(false, false)).toBe(true);
  });

  it('should return false when values differ or are nullish', () => {
    expect(safeEqual('a', 'b')).toBe(false);
    expect(safeEqual(null, 'a')).toBe(false);
    expect(safeEqual(undefined, 'a')).toBe(false);
  });
});
