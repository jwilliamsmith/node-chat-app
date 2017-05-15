const expect = require('expect')
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(1234) === false);
  });
  it('should reject all spaces', () => {
    expect(isRealString('     ') === false);
  });
  it('should allow valid strings', () => {
    expect(isRealString('  x        x   ') === true);
    expect(isRealString('antipasta23 doodleface #') === true);
  })
})