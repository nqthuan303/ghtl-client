import { GhtlPage } from './app.po';

describe('ghtl App', () => {
  let page: GhtlPage;

  beforeEach(() => {
    page = new GhtlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
