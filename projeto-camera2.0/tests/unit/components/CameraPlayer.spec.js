import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Hls from 'hls.js'
import CameraPlayer from '@/components/camera/CameraPlayer.vue'

vi.mock('hls.js', () => {
  class MockHls {
    static isSupported = vi.fn()
    static Events = { ERROR: 'error' }
    static ErrorTypes = { NETWORK_ERROR: 'network', MEDIA_ERROR: 'media' }
    static instances = []

    constructor() {
      MockHls.instances.push(this)
    }

    on = vi.fn()
    loadSource = vi.fn()
    attachMedia = vi.fn()
    startLoad = vi.fn()
    recoverMediaError = vi.fn()
    destroy = vi.fn()

    emitFatalError(type) {
      this.on.mock.calls[0][1](MockHls.Events.ERROR, { fatal: true, type })
    }
  }

  return { default: MockHls }
})

const FIRST_STREAM = '/first.m3u8'
const SECOND_STREAM = '/second.m3u8'

describe('CameraPlayer', () => {
  let wrapper

  async function mountPlayer(streamUrl = FIRST_STREAM) {
    wrapper = mount(CameraPlayer, { props: { streamUrl } })
    await nextTick()
    return wrapper.get('video')
  }

  beforeEach(() => {
    Hls.instances.length = 0
    Hls.isSupported.mockReturnValue(true)
    vi.spyOn(HTMLMediaElement.prototype, 'canPlayType').mockReturnValue('')
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {})
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    vi.restoreAllMocks()
  })

  it('conecta o stream ao vídeo e indica quando ele pode ser reproduzido', async () => {
    const video = await mountPlayer()
    const player = Hls.instances[0]
    expect(player.loadSource).toHaveBeenCalledWith(FIRST_STREAM)
    expect(player.attachMedia).toHaveBeenCalledWith(video.element)
    expect(wrapper.get('[role="status"]').text()).toContain('Carregando')
    await video.trigger('canplay')
    expect(wrapper.find('[role="status"]').exists()).toBe(false)
  })

  it('libera o player ao trocar a URL e ao desmontar', async () => {
    await mountPlayer()
    const firstPlayer = Hls.instances[0]
    await wrapper.setProps({ streamUrl: SECOND_STREAM })
    const secondPlayer = Hls.instances[1]
    expect(firstPlayer.destroy).toHaveBeenCalledOnce()
    expect(secondPlayer.loadSource).toHaveBeenCalledWith(SECOND_STREAM)
    firstPlayer.emitFatalError('stale')
    await nextTick()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)

    wrapper.unmount()
    wrapper = null
    expect(secondPlayer.destroy).toHaveBeenCalledOnce()
  })

  it.each([
    [Hls.ErrorTypes.NETWORK_ERROR, 'startLoad'],
    [Hls.ErrorTypes.MEDIA_ERROR, 'recoverMediaError']
  ])('limita a recuperação da falha %s', async (type, retryMethod) => {
    await mountPlayer()
    const player = Hls.instances[0]
    player.emitFatalError(type)
    player.emitFatalError(type)
    player.emitFatalError(type)
    await nextTick()

    expect(player[retryMethod]).toHaveBeenCalledOnce()
    expect(player.destroy).toHaveBeenCalledOnce()
    expect(wrapper.get('[role="alert"]').text()).toContain('Não foi possível')
  })

  it('usa HLS nativo e libera a fonte ao detectar erro', async () => {
    Hls.isSupported.mockReturnValue(false)
    HTMLMediaElement.prototype.canPlayType.mockReturnValue('maybe')
    const video = await mountPlayer()
    expect(video.attributes('src')).toBe(FIRST_STREAM)
    await video.trigger('error')
    expect(video.attributes('src')).toBeUndefined()
    expect(wrapper.get('[role="alert"]').text()).toContain('Não foi possível')
  })

  it('informa a ausência de suporte a HLS', async () => {
    Hls.isSupported.mockReturnValue(false)
    await mountPlayer()
    expect(wrapper.get('[role="alert"]').text()).toContain('não oferece suporte')
  })

  it('informa a falta de URL sem criar um player', async () => {
    await mountPlayer('')
    expect(Hls.instances).toHaveLength(0)
    expect(wrapper.get('[role="alert"]').text()).toContain('Configure a URL')
  })
})
