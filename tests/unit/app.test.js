import App from '@/App.vue'
import { shallowMount } from '@vue/test-utils'

describe('Counter', () => {
  let wrapper
  const RESET_TEXT = 'Reset'

  const findButtonByText = (text) => 
    wrapper.findAll('button').find(b => b.text() === text)

  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  afterEach(() => {
    wrapper.unmount()
  })

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
  })

  test("does not show reset button when counter is below zero", () => {
    expect(findButtonByText(RESET_TEXT)).toBe(undefined)
  })

  test("increases and decreases by one when plus key is pressed", async () => {
    const plusKeyEvent = new KeyboardEvent('keyup', { key: '+' })
    await document.dispatchEvent(plusKeyEvent)
    expect(wrapper.text()).toContain(1)

    const minusKeyEvent = new KeyboardEvent('keyup', { key: '-' })
    await document.dispatchEvent(minusKeyEvent)
    expect(wrapper.text()).toContain(0)
  })


  test("removes event listener when destroyed", async () => {
    vi.spyOn(document, 'removeEventListener')

    expect(document.removeEventListener).not.toHaveBeenCalled()
    
    wrapper.unmount()

    expect(document.removeEventListener).toHaveBeenCalled()
  })

})