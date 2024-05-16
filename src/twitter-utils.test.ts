import { assert, expect, test } from 'vitest'

import {
  getTweetUrl,
  maxTwitterId,
  minTwitterId,
  sanitizeTweetText,
  tweetComparator,
  tweetIdComparator
} from './twitter-utils.js'

test('maxTwitterId', () => {
  expect(maxTwitterId('123', '456')).toBe('456')
  expect(maxTwitterId('1230', '999')).toBe('1230')
  expect(maxTwitterId('', '999')).toBe('999')
  expect(maxTwitterId('0', '1')).toBe('1')
  expect(maxTwitterId('123', '0')).toBe('123')
  expect(maxTwitterId('999', '')).toBe('999')
  expect(maxTwitterId('', undefined)).toBe(undefined)
  expect(maxTwitterId('948392', '948392')).toBe('948392')
})

test('minTwitterId', () => {
  expect(minTwitterId('123', '456')).toBe('123')
  expect(minTwitterId('1230', '999')).toBe('999')
  expect(minTwitterId('', '999')).toBe('999')
  expect(minTwitterId('999', '')).toBe('999')
  expect(minTwitterId('0', '1')).toBe('0')
  expect(minTwitterId('123', '0')).toBe('0')
  expect(minTwitterId('', undefined)).toBe(undefined)
  expect(minTwitterId('948392', '948392')).toBe('948392')
})

test('tweetIdComparator', () => {
  expect(tweetIdComparator('100', '0')).toBe(1)
  expect(tweetIdComparator('0', '100009898')).toBe(-1)
  expect(tweetIdComparator('100', '200')).toBe(-1)
  expect(tweetIdComparator('3000', '999')).toBe(1)
  expect(tweetIdComparator('3001', '3001')).toBe(0)
  expect(tweetIdComparator('0', '1')).toBe(-1)
  expect(tweetIdComparator('123', '0')).toBe(1)
  expect(tweetIdComparator('0', '0')).toBe(0)
  expect(tweetIdComparator(undefined, undefined)).toBe(0)
})

test('tweetComparator', () => {
  expect(tweetComparator({ id: '100' }, { id: '200' })).toBe(-1)
  expect(tweetComparator({ id: '3000' }, { id: '999' })).toBe(1)
  expect(tweetComparator({ id: '3001' }, { id: '3001' })).toBe(0)

  assert.deepEqual(
    [
      { id: '5' },
      { id: '1000' },
      { id: '9999' },
      { id: '5' },
      { id: '15' },
      { id: '500' }
    ].sort(tweetComparator),
    [
      { id: '5' },
      { id: '5' },
      { id: '15' },
      { id: '500' },
      { id: '1000' },
      { id: '9999' }
    ]
  )
})

test('getTweetUrl', async () => {
  expect(
    getTweetUrl({ username: 'foo', id: '123' }),
    'https://twitter.com/foo/status/123'
  )

  expect(
    getTweetUrl({ username: 'foo-abc', id: '12345678' }),
    'https://twitter.com/foo-abc/status/12345678'
  )

  expect(getTweetUrl({ id: '123' })).toBe(undefined)
  expect(getTweetUrl({ username: 'foo', id: '' })).toBe(undefined)
  expect(getTweetUrl({ username: 'foo' })).toBe(undefined)
  expect(getTweetUrl({ username: '', id: '855' })).toBe(undefined)
})

test('sanitizeTweetText', async () => {
  expect(
    sanitizeTweetText(`Lex Fridman and Guillaume Verdon discussed key topics on the Lex Fridman Podcast including:
• AI's development as an evolutionary process akin to animal domestication.
• The integration of quantum computing with deep learning via TensorFlow Quantum.
• Continuous yada
https://example.com`)
  ).toMatchSnapshot()

  expect(sanitizeTweetText('hello world')).toBe('hello world')
  expect(sanitizeTweetText('https://dexa.ai')).toBe('https://dexa.ai')
  expect(
    sanitizeTweetText(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    )
  ).toMatchSnapshot()
  expect(
    sanitizeTweetText(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum https://example.com/foo/bar'
    )
  ).toMatchSnapshot()
  expect(
    sanitizeTweetText(
      'Lorem ipsum dolor sit amet, https://nala.ai/test consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum https://example.com/foo/bar'
    )
  ).toMatchSnapshot()
})

test('sanitizeTweetText invalid', async () => {
  assert.throws(() => sanitizeTweetText(''))
  assert.throws(() => sanitizeTweetText('  '))
  assert.throws(() => sanitizeTweetText('\n \n'))
})
