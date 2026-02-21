import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSearchParams } from "react-router";

export function TransactionPagination({
  page,
  totalElements = 0,
  totalPages = 0,
  limit = 10,
}: {
  page: number;
  limit?: number;
  totalElements?: number;
  totalPages?: number;
}) {
  const [, setSearchParams] = useSearchParams();

  const from = totalElements === 0 ? 0 : page * limit + 1;
  const to = Math.min((page + 1) * limit, totalElements);

  function handlePageChange(newPage: number) {
    if (newPage < 0 || newPage >= totalPages) return;

    setSearchParams((params) => {
      params.set("page", String(newPage + 1));
      return params;
    });
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center text-sm text-gray-700">
        <span className="font-medium mr-1">{from}</span>{" "}
        <span className="mr-1">a</span>
        <span className="font-medium mr-1">{to}</span> | {totalElements}{" "}
        {totalElements === 1 ? "resultado" : "resultados"}
      </div>

      <Pagination className="flex justify-end bg-white">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNumber = idx;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={page === pageNumber}
                >
                  {pageNumber + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              disabled={page + 1 === totalPages}
              onClick={() => handlePageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
