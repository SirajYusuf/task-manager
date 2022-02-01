const {calculateTip,celsiusToFahrenheit,fahrenheitToCelsius,add} = require('../src/math')

test('should calculate total with tip',()=>{
    const total = calculateTip(10,.3)
    expect(total).toBe(13)
})

// test('Should convert 32 F to 0 C',()=>{
//     const total =fahrenheitToCelsius(86)
//     expect(total).toBe(30)
// })

// test('Should convert 0 C to 32 F',()=>{
//     const total =  celsiusToFahrenheit(30)
//     expect(total).toBe(86)
// })

// test('Async test demo',(done)=>{
//     setTimeout(()=>{
//        expect(1).toBe(2)
//        done()
//     },2000)
// })

// test('should add two numbers',(done)=>{
//     add(2,3).then((sum)=>{
//         expect(sum).toBe(5)
//         done()
//     })
// })

// test('add two numbers async/await',async()=>{
//     const sum = await add(10,22)
//     expect(sum).toBe(32)
// })