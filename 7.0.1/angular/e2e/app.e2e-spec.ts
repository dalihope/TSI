import { DaliTemplatePage } from './app.po';

describe('Dali App', function() {
  let page: DaliTemplatePage;

  beforeEach(() => {
    page = new DaliTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
