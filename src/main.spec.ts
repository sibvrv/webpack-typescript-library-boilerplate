import {libDemo} from './main';
import {expect} from 'chai';

describe('Lib Demo Test', () => {
  it('should work', () => {
    const result = libDemo();
    expect(result).to.be.eq('working');
  });
});
