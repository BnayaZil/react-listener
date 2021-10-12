import * as React from 'react'
import { Listener } from '.'
import { act, render } from '@testing-library/react'

export const fireEvent = (event: any) => {
  const addEventListener = window.addEventListener as ReturnType<typeof jest.fn>
  const props = addEventListener.mock.calls.find((x) => x?.[0] === 'message')
  props?.[1]!(event)
}

describe('Listener', () => {
  let addEventListener: any
  beforeAll(() => {
    addEventListener = window.addEventListener
  })
  afterAll(() => {
    window.addEventListener = addEventListener
  })
  beforeEach(() => {
    window.addEventListener = jest.fn()
  })
  it('passing the event type', () => {
    const child = jest.fn().mockReturnValue(<></>)
    render(
      <Listener event='message'>
        {(event) => {
          return child(event)
        }}
      </Listener>
    )
    expect(window.addEventListener).toBeCalledWith(
      'message',
      expect.any(Function),
      undefined
    )
  })
  it('passing the options', () => {
    const child = jest.fn().mockReturnValue(<></>)
    const options = {
      once: true,
      passive: true
    }
    render(
      <Listener event='message' options={options}>
        {(event) => {
          return child(event)
        }}
      </Listener>
    )
    expect(window.addEventListener).toBeCalledWith(
      'message',
      expect.any(Function),
      options
    )
  })
  it('passing an event', () => {
    const child = jest.fn().mockReturnValue(<></>)
    render(
      <Listener event='message'>
        {(event) => {
          return child(event)
        }}
      </Listener>
    )
    act(() => fireEvent('mocked event'))
    expect(child).toBeCalledWith('mocked event')
  })
  describe('identifier', () => {
    it('passing the identifier', () => {
      const child = jest.fn().mockReturnValue(<></>)
      render(
        <Listener
          event='message'
          identifier={(event) => event.includes('event')}
        >
          {(event) => {
            return child(event)
          }}
        </Listener>
      )
      act(() => fireEvent('mocked event'))
      expect(child).toBeCalledWith('mocked event')
    })

    it('filtered by the identifier', () => {
      const child = jest.fn().mockReturnValue(<></>)
      render(
        <Listener
          event='message'
          identifier={(event) => event.includes('real')}
        >
          {(event) => {
            return child(event)
          }}
        </Listener>
      )
      act(() => fireEvent('mocked event'))
      expect(child).not.toBeCalledWith('mocked event')
    })
  })
})
