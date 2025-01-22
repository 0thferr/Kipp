// tests/unit/components/CameraPlayer.spec.js
import { mount } from '@vue/test-utils'
import CameraPlayer from '@/components/camera/CameraPlayer.vue'

describe('CameraPlayer', () => {
  it('renders stream', () => {
    const wrapper = mount(CameraPlayer, {
      props: {
        streamUrl: 'test-url'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})