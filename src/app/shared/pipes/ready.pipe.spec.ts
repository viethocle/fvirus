import { ReadyPipe } from './ready.pipe';

describe('ReadyPipe', () => {
  it('create an instance', () => {
    const pipe = new ReadyPipe();
    expect(pipe).toBeTruthy();
  });
});
