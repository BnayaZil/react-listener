import * as React from 'react'

interface Props<K extends keyof WindowEventMap> {
  event: K
  identifier?: (event: WindowEventMap[K]) => boolean
  options?: boolean | AddEventListenerOptions
  children: (
    event: WindowEventMap[K]
  ) => React.ReactNode | ((event: WindowEventMap[K]) => React.ReactNode)[]
}

export function Listener<K extends keyof WindowEventMap>({
  event,
  identifier = () => true,
  options,
  children
}: Props<K>) {
  const [_event, setEvent] =
    React.useState<WindowEventMap[keyof WindowEventMap]>()
  const setListener = React.useCallback(() => {
    window.addEventListener(
      event,
      (ev) => {
        if (!identifier(ev)) {
          return
        }
        setEvent(ev)
      },
      options
    )
  }, [event, options])
  React.useLayoutEffect(() => {
    setListener()
  }, [event, options])
  if (!_event) {
    return null
  }
  if (!Array.isArray(children)) {
    return children(_event as WindowEventMap[K])
  }
  return React.Children.map(children, (child) => {
    child(_event as WindowEventMap[K])
  })
}
