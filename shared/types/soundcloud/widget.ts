import type { SCTrack } from './track'

export interface SCWidget {
  bind: <Value extends SCEventValue>(event: Value, callback: SCEventCallback<Value>) => void
  unbind: (event: SCEventValue) => void
  load: (url: string, options?: SCLoadOptions) => void

  play: () => void
  pause: () => void
  toggle: () => void
  seekTo: (ms: number) => void
  setVolume: (volume: number) => void
  next: () => void
  prev: () => void
  skip: (index: number) => void

  getVolume: (callback: (volume: number) => void) => void
  getDuration: (callback: (duration: number) => void) => void
  getPosition: (callback: (position: number) => void) => void
  getSounds: (callback: (sounds: SCTrack[]) => void) => void
  getCurrentSound: (callback: (sound: SCTrack) => void) => void
  getCurrentSoundIndex: (callback: (index: number) => void) => void
  isPaused: (callback: (paused: boolean) => void) => void
}

export interface SCLoadOptions {
  callback?: () => void
  [param: string]: unknown
}

export interface SCAudioEvents {
  LOAD_PROGRESS: 'loadProgress'
  PLAY_PROGRESS: 'playProgress'
  PLAY: 'play'
  PAUSE: 'pause'
  FINISH: 'finish'
  SEEK: 'seek'
}

export type SCAudioEventKey = keyof SCAudioEvents
export type SCAudioEventValue = SCAudioEvents[SCAudioEventKey]
export type SCAudioEventCallback = (data: SCAudioData) => void

export interface SCAudioData {
  relativePosition: number
  loadProgress: number
  currentPosition: number
}

export interface SCUIEvents {
  READY: 'ready'
  CLICK_DOWNLOAD: 'downloadClicked'
  CLICK_BUY: 'buyClicked'
  OPEN_SHARE_PANEL: 'sharePanelOpened'
  ERROR: 'error'
}

export type SCUIEventKey = keyof SCUIEvents
export type SCUIEventValue = SCUIEvents[SCUIEventKey]
export type SCUIEventCallback = () => void

export type SCEventKey = SCAudioEventKey | SCUIEventKey
export type SCEventValue = SCAudioEventValue | SCUIEventValue
export type SCEvents = SCAudioEvents & SCUIEvents

export type SCEventCallback<Value extends SCEventValue> = Value extends SCAudioEventValue
  ? SCAudioEventCallback
  : SCUIEventCallback

declare global {
  interface Window {
    SC?: {
      Widget: {
        (element: string | HTMLIFrameElement): SCWidget
        Events: SCEvents
      }
    }
  }
}
