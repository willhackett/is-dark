type DarkModeStateType = 'dark' | 'light'

type DarkModeSubscriberType = (mode: DarkModeStateType) => void

class DarkModeHandler {
  media: MediaQueryList
  state: DarkModeStateType = 'light'
  subscribers: DarkModeSubscriberType[] = []
  constructor() {
    this.media = window.matchMedia('(prefers-color-scheme: dark)')
    this.media.addListener(this.handleUiChange)
    this.handleUiChange(this.media)
  }
  public isDarkMode() {
    return this.state === 'dark'
  }
  public subscribeToColorScheme(method: DarkModeSubscriberType) {
    this.subscribers.push(method)
  }
  public clearSubscribers() {
    this.subscribers = []
  }
  private handleUiChange(e: MediaQueryList | MediaQueryListEvent) {
    this.state = e.matches ? 'dark' : 'light'
    if (this.subscribers.length > 0) {
      this.subscribers.forEach((subscriber: DarkModeSubscriberType) => {
        subscriber(this.state)
      })
    }
  }
}


const darkMode = new DarkModeHandler()

export default darkMode.isDarkMode

export const subscribeToColorScheme = darkMode.subscribeToColorScheme