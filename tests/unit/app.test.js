import App from '@/App.vue'
import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('Counter', () => {
  let wrapper
  
  const findButtonByText = (text) => 
    wrapper.findAll('button').find(b => b.text() === text)

  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  afterEach(() => wrapper.unmount())

  test('shows 0 when initialized', () => {
    console.log(wrapper.find('#app').text())
    expect(wrapper.text()).toContain(0) 
  })

  // it('increments by 1 when plus button is clicked', async () => {
  //   // wait while Vue updates the DOM
  //   await plusBtn.trigger('click')
    
  //   expect(wrapper.text()).toContain(1)
  // })

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

})