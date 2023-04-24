import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;

  beforeEach(() => {
    component = new SearchBarComponent();
    jest.spyOn(component.searchCompleted, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clearSearchTerm', () => {
    beforeEach(() => {
      const testTerm = 'Nice term to search';
      component.searchTerm = testTerm;
      expect(component.searchTerm).toEqual(testTerm);
      component.clearSearchTerm();
    });

    it('should clear the search term', () => {
      expect(component.searchTerm).toEqual('');
    });

    it('should emit the new search term', () => {
      expect(component.searchCompleted.emit).toHaveBeenCalledWith('');
    });
  });

});
