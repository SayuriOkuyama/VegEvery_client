import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const PaginationParts = ({ pageData, page }) => {
  return (
    <Pagination>
      <PaginationContent>
        {pageData ? (
          <>
            {pageData.current_page - 2 >= 0 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/recipes/search/${page}?page=${
                    pageData.current_page - 1
                  }`}
                />
              </PaginationItem>
            )}
            {pageData.current_page - 1 > 0 && (
              <PaginationItem>
                <PaginationLink
                  href={`/recipes/search/${page}?page=${
                    pageData.current_page - 1
                  }`}>
                  {pageData.current_page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                isActive
                href={`/recipes/search/${page}?page=${pageData.current_page}`}>
                {pageData.current_page}
              </PaginationLink>
            </PaginationItem>

            {pageData.current_page + 1 <= pageData.last_page && (
              <PaginationItem>
                <PaginationLink
                  href={`/recipes/search/${page}?page=${
                    pageData.current_page + 1
                  }`}>
                  {pageData.current_page + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {pageData.current_page < pageData.last_page - 1 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}
            {pageData.current_page < pageData.last_page && (
              <>
                <PaginationItem>
                  <PaginationNext
                    href={`/recipes/search/${page}?page=${
                      pageData.current_page + 1
                    }`}
                  />
                </PaginationItem>
              </>
            )}
          </>
        ) : null}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationParts
