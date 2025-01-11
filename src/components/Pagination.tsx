import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import Chevron from "@/icons/Chevron";

interface Props {
  totalPages: number;
  baseUrl: string;
}

function Pagination({ totalPages, baseUrl }: Props) {
  const [params] = useSearchParams();
  const { t } = useTranslation();

  const currentPage = Math.min(
    Math.max(+(params.get("page") || 1), 1),
    totalPages
  );
  const renderedPages =
    currentPage < 3
      ? [1, 2, 3]
      : currentPage > totalPages - 3
      ? [totalPages - 2, totalPages - 1, totalPages]
      : [currentPage - 1, currentPage, currentPage + 1];

  const scrollIntoView = () => {
    document.getElementById("root")?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  return (
    <ShadcnPagination className="text-primary">
      <PaginationContent>
        <PaginationLink
          className={`min-w-fit px-3 ${
            currentPage === 1
              ? "hover:bg-transparent"
              : "hover:bg-primary-50/50"
          }`}
          href={
            currentPage === 1
              ? "#"
              : `${baseUrl}?page=${Math.max(1, currentPage - 1)}`
          }
          onClick={(e) => {
            if (currentPage === 1) {
              e.preventDefault();
              return;
            }
            scrollIntoView();
          }}
        >
          <Chevron className="!w-3 !h-3 rotate-180" />
          <span className="hidden sm:block">{t("pagination.previous")}</span>
        </PaginationLink>
        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`${baseUrl}?page=${1}`}
                className="hover:bg-primary-50/50"
                onClick={scrollIntoView}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 3 && <PaginationEllipsis />}
          </>
        )}
        {renderedPages.map((page, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`${baseUrl}?page=${page}`}
              isActive={page === currentPage}
              className={`${
                page === currentPage ? "border-primary-50/50" : ""
              } hover:bg-primary-50/50`}
              onClick={scrollIntoView}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages - 2 && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink
                href={`${baseUrl}?page=${totalPages}`}
                className="hover:bg-primary-50/50"
                onClick={scrollIntoView}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationLink
          className={`min-w-fit px-3 ${
            currentPage === totalPages
              ? "hover:bg-transparent"
              : "hover:bg-primary-50/50"
          }`}
          href={
            currentPage === totalPages
              ? "#"
              : `${baseUrl}?page=${Math.min(totalPages, currentPage + 1)}`
          }
          onClick={(e) => {
            if (currentPage === totalPages) {
              e.preventDefault();
              return;
            }
            scrollIntoView();
          }}
        >
          <span className="hidden sm:block">{t("pagination.next")}</span>
          <Chevron className="!w-3 !h-3" />
        </PaginationLink>
      </PaginationContent>
    </ShadcnPagination>
  );
}

export default Pagination;
