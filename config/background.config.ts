export type BackgroundVideoSource = {
  webm: string
  mp4: string
  poster: string
}

export type BackgroundVariantConfig = {
  high: BackgroundVideoSource
  low: BackgroundVideoSource
  mobile: BackgroundVideoSource
}

export const backgroundConfig = {
  video: {
    dark: {
      high: {
        webm: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        mp4: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '/placeholder.jpg',
      },
      low: {
        webm: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        mp4: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '/placeholder.jpg',
      },
      mobile: {
        webm: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        mp4: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '/placeholder.jpg',
      },
    },
    light: {
      high: {
        webm: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        mp4: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '/placeholder.jpg',
      },
      low: {
        webm: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        mp4: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '/placeholder.jpg',
      },
      mobile: {
        webm: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        mp4: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '/placeholder.jpg',
      },
    },
  } as Record<'dark' | 'light', BackgroundVariantConfig>,

  overlay: {
    dark: 'rgba(0, 0, 0, 0.5)',
    light: 'rgba(255, 255, 255, 0.85)',
  },

  effects: {
    enabled: true,
    particles: {
      count: 32,
      minSize: 1.2,
      maxSize: 4,
      speed: 0.18,
      darkColor: '255, 255, 255',
      lightColor: '30, 58, 138',
      opacity: 0.22,
      lineOpacity: 0.1,
      lineDistance: 140,
    },
  },
}
