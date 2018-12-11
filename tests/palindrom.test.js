//https://jestjs.io/docs/en/expect.html#content
//Describejen avulla yksittäisessä tiedostossa olevat testit voidaan jaotella loogisiin kokonaisuuksiin. 
//Testituloste hyödyntää myös describe-lohkon nimeä:

const palindrom = require('../utils/for_testing').palindrom;

test('palindrom of a', () => {
  const result = palindrom('a');

  expect(result).toBe('a');
});

test('palindrom of react', () => {
  const result = palindrom('react');

  expect(result).toBe('tcaer');
});

test('palindrom of saippuakauppias', () => {
  const result = palindrom('saippuakauppias');

  expect(result).toBe('saippuakauppias');
});
