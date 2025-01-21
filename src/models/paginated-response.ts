export interface PaginatedResponse<T> {
  content: T[];
  size: number;
  totalElements: number;
  totalPages: number;
}
