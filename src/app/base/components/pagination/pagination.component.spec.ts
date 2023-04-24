import { PaginationComponent } from './pagination.component';
import { RequestParams } from '../../models/request-params';

describe('PaginationComponent', () => {
  let component: PaginationComponent;

  beforeEach(() => {
    component = new PaginationComponent();
    jest.spyOn(component.onPageChange, 'emit');
    jest.spyOn(component.onPageSizeChange, 'emit');
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the pageLimit', () => {
    expect(component.pageLimit).toEqual(component.pageSizes[0]);
  });

  describe('handlePageSizeChange', () => {
    beforeEach(() => {
      component.handlePageSizeChange('12');
    });

    it('should set the pageLimit',() => {
      expect(component.pageLimit).toBe(12);
    });

    it('should set the currentPage',() => {
      expect(component.currentPage).toBe(1);
    });

    it('should emit onPageSizeChange event',() => {
      expect(component.onPageSizeChange.emit).toHaveBeenCalledWith(new RequestParams(1, 12));
    });
  });
});
