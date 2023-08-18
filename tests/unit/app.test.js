import App from '@/App.vue'
import CounterInput from '@/components/CounterInput.vue'
import { shallowMount, mount } from '@vue/test-utils'

describe('Counter', () => {
  let wrapper
  let mWrapper
  const RESET_TEXT = 'Reset'
  const INITIAL_VALUE = 60
  const NEW_INITIAL_VALUE = 70

  const findButtonByText = (text) => 
    wrapper.findAll('button').find(b => b.text() === text)

  beforeEach(() => {
    wrapper = shallowMount(App)
    mWrapper = mount(App)
  })

  afterEach(() => wrapper.unmount())

  // App ====================================

  test('shows 0 when initialized', () => {
    expect(wrapper.text()).toContain(0) 
  })

  test.each`
    buttonText | change                 | expectedResult
    ${'+'}     | ${"increments by one"} | ${'1'}
    ${'-'}     | ${"decrements by one"} | ${'-1'}
  `(
    '$change when $buttonText button is clicked', 
    async ({ buttonText, expectedResult }) => {
      // wait while Vue updates the DOM
      await findButtonByText(buttonText).trigger('click')
      expect(wrapper.text()).toContain(expectedResult)
    }
  )

  test("shows reset button when counter is below zero", async () => {
    await findButtonByText("-").trigger('click')
    expect(wrapper.text()).toContain(-1)
    expect(findButtonByText(RESET_TEXT)).toBeTruthy()
  })

  test("does not show reset button when counter is below zero", () => {
    expect(findButtonByText(RESET_TEXT)).toBe(undefined)
  })

  test("increases and decreases by one when key is pressed", async () => {
    const plusKeyEvent = new KeyboardEvent('keyup', { key: '+' })
    await document.dispatchEvent(plusKeyEvent)
    expect(wrapper.text()).toContain(1)

    const minusKeyEvent = new KeyboardEvent('keyup', { key: '-' })
    await document.dispatchEvent(minusKeyEvent)
    expect(wrapper.text()).toContain(0)
  })

  test("removes event listener when unmount", () => {
    vi.spyOn(document, 'removeEventListener')

    expect(document.removeEventListener).not.toHaveBeenCalled()
    
    wrapper.unmount()

    expect(document.removeEventListener).toHaveBeenCalled()
  })

  test("correctly resets both counters when initialValue is changed", async () => {
    await wrapper.setProps({ initialValue: INITIAL_VALUE })
    await findButtonByText('-').trigger('click')
    await findButtonByText('dec2').trigger('click')

    expect(wrapper.text()).toContain(`${INITIAL_VALUE - 1} / -1`)

    await wrapper.setProps({ initialValue: NEW_INITIAL_VALUE })
    expect(wrapper.text()).toContain(`${NEW_INITIAL_VALUE} / 0`)
  })

  // CounterInput ====================================

  test('passes current value to CounterInput', async () => {
    await wrapper.setProps({ initialValue: INITIAL_VALUE })
    expect(wrapper.findComponent(CounterInput).props()).toEqual({ 
      modelValue: INITIAL_VALUE 
    })
  })

  test('updates current value when CounterInput provides new one', async () => {
    await wrapper.setProps({ initialValue: INITIAL_VALUE })
    await expect(wrapper.findComponent(CounterInput)
      .vm.$emit('update:modelValue', NEW_INITIAL_VALUE))
    expect(wrapper.text()).toContain(`${NEW_INITIAL_VALUE} / 0`)
  })

  test('passes counter2 to CounterInput warning slot', async () => {
    await mWrapper.findAll('button').find(b => b.text() === 'inc2').trigger('click')
    expect(mWrapper.findComponent(CounterInput).text()).toContain(1)
  })

  test('passes BETA to CounterInput warning slot', async () => {
    expect(mWrapper.findComponent(CounterInput).text()).toContain('BETA')
  })

  test('emits input event when input value changes', async () => {
    await mWrapper.find("input").setValue(NEW_INITIAL_VALUE)
    expect(mWrapper.emitted('input', NEW_INITIAL_VALUE))
  })
})