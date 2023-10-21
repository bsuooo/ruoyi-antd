import {
	selectDictLabel,
	selectDictLabels,
	dict
} from '@/utils/ruoyi/selectDictLabel'
import { describe, it, expect } from 'vitest'

const mockDict: dict = []

for (let index = 0; index < 5; index++) {
	mockDict.push({
		value: index.toString(),
		label: `label${index}`
	})
}

describe('selectDictLabel', () => {
	it('should return the label for the given value', () => {
		const result = selectDictLabel(mockDict, '1')
		expect(result).toBe('label1')
	})

	it('should return the value for the given value', () => {
		const result = selectDictLabel(mockDict, '10')
		expect(result).toBe('10')
	})

	it('should return empty string for undefined value', () => {
		const result = selectDictLabel(mockDict, '')
		expect(result).toBe('')
	})

	it('should return empty dict for the given value', () => {
		const result = selectDictLabel([], '1')
		expect(result).toBe('1')
	})
})

describe('selectDictLabels', () => {
	it('should return the labels for the given values', () => {
		const result = selectDictLabels(mockDict, ['1', '2', '3'])
		expect(result).toBe('label1 label2 label3')
	})

	it('should return the values for the given values', () => {
		const result = selectDictLabels(mockDict, ['1', '2', '3', '10'])
		expect(result).toBe('label1 label2 label3')
	})

	it('should return empty string for undefined values', () => {
		const result = selectDictLabels(mockDict, [])
		expect(result).toBe('')
	})

	it('should return empty string for undefined values', () => {
		const result = selectDictLabels([], ['1', '2', '3'])
		expect(result).toBe('')
	})
})
