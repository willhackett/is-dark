type DarkModeStateType = 'dark' | 'light'

type DarkModeSubscriberType = (mode: DarkModeStateType) => void

class DarkModeHandler {
  isNode: boolean = false;
  media?: MediaQueryList
  state: DarkModeStateType = 'light'
  subscribers: DarkModeSubscriberType[] = []
  constructor() {
    if (typeof window === 'undefined') {
      this.isNode = true;
      return;
    }
    this.media = window.matchMedia('(prefers-color-scheme: dark)')
    this.media.addListener(this.handleUiChange)
    this.handleUiChange(this.media)
  }
  public isDarkMode = () => {
    if (this.isNode) return false;
    return this.state === 'dark'
  }
  public subscribeToColorScheme = (method: DarkModeSubscriberType) => {
    this.subscribers.push(method)
  }
  public clearSubscribers = () => {
    this.subscribers = []
  }
  private handleUiChange = (e: MediaQueryList | MediaQueryListEvent) => {
    this.state = e.matches ? 'dark' : 'light'
    if (this.subscribers.length > 0) {
      this.subscribers.forEach((subscriber: DarkModeSubscriberType) => {
        subscriber(this.state)
      })
    }
  }
}

const dm = new DarkModeHandler()

export default dm.isDarkMode

export const subscribeToColorScheme = dm.subscribeToColorScheme