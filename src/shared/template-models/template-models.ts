export interface PaginationData{
  showPagination?: boolean;
  rowsPerPage: number[];
  currentRowsPerPage: number;
  currentPage: number;
  totalRow: number
}

export interface FilterData{
  filters: string[];
  selectedFilter: string;
  filterTitle?: string;
}

export interface OrderedColData{
  name: string;
  isDescending: boolean;
  id: string
}

export interface SortingOptions{
  primaryCol: string;
  secondaryCol: string;
  isDesc: boolean
}

export interface CardOptions{
  expendHeight?: number;
  expendTime?: number;
}

export interface CardTable{
  headers?: string[];
  dataObjects: any[];
  displayableAttributes: {
    name: string, displayName: string, hide?: boolean
  }[];
  orderedAttribute?: {
    primary: string, secondary: string
  }
  filterableAttributes?: [string, string[]][];
  totalAttributes?: string[];
  displaySubtotal?: boolean;
  displayPagination?: boolean;
  displayCheckboxes?: boolean;
  singleSelectChechboxes?: boolean;
}

export interface RECard{
  expended: boolean;
  options?: CardOptions;
  table?: CardTable;
}


