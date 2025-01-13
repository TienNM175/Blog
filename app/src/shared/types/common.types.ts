export interface PaginationParams {
    page: number;
    per_page: number;
  }
  
  export interface ApiResponse<T> {
    data: T[];
    meta: {
      pagination: {
        total: number;
        pages: number;
        page: number;
        limit: number;
      };
    };
  }