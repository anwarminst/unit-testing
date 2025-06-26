import {Common} from './common'

describe('Common Service', () => {

  let common :Common
  beforeEach(()=>{
    common = new Common
  })

  it("it should create common service", ()=>{
    expect(common).toBeTruthy();
  })

  it("it should add two number", ()=>{
    const result = common.add(10,40)
    expect(result).toEqual(50)
  })
  it("it should subtract two number", ()=>{
    const result = common.subtract(90,40)
    expect(result).toEqual(50)
  })
  it("it should multiply two number", ()=>{
    const result = common.multiply(25,2)
    expect(result).toEqual(50)
  })
  it("it should devide two number", ()=>{
    const result = common.divide(100,2)
    expect(result).toEqual(50)
  })

  it("it should throw a error if it devide by zero", ()=>{
      expect(()=> common.divide(22, 0)).toThrowError('Division by zero is not allowed')
  })

})