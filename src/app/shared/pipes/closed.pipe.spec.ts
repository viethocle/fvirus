import { ClosedPipe } from './closed.pipe';

describe('ClosedPipe', () => {
  it('create an instance', () => {
    const pipe = new ClosedPipe();
    expect(pipe).toBeTruthy();
  });
});
