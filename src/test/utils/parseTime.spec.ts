import { parseTime } from '@/utils/ruoyi/parseTime'
import { describe, it, expect } from 'vitest'

describe('parseTime', () => {
	it('should return the formatted time', () => {
		// Test case 1: Test with a Date object
		const date = new Date('2023-10-20T12:30:45')
		const result1 = parseTime(date)
		expect(result1).toBe('2023-10-20 12:30:45')

		// Test case 2: Test with a timestamp (number)
		const timestamp = 1634718045000
		const result2 = parseTime(timestamp)
		expect(result2).toBe('2021-10-20 16:20:45')

		// Test case 3: Test with a string in ISO format
		const isoString = '2023-10-20T15:45:30.123Z'
		const result3 = parseTime(isoString)
		expect(result3).toBe('2023-10-20 23:45:30')
	})

	it('should return null for empty input', () => {
		const result = parseTime('')
		expect(result).toBe(null)
	})

	it('should return pattern for wrong pattern', () => {
		const timestamp = 1634718045000
		const result = parseTime(timestamp, 'abcdefg')
		expect(result).toBe('abcdefg')
	})

	// Add more test cases as needed
})
