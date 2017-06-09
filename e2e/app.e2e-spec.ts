import { FulltestPage } from './app.po';

describe('fulltest App', () => {
  let page: FulltestPage;

  beforeEach(() => {
    page = new FulltestPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
