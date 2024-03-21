import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const PaginationParts = ({ pageData, path }) => {
  return (
    <Pagination>
      <PaginationContent className="">
        {pageData ? (
          <>
            {pageData.current_page - 3 >= 0 && (
              <PaginationItem className="w-8">
                <PaginationPrevious
                  href={`/${path}?page=${pageData.current_page - 1}`}
                />
              </PaginationItem>
            )}
            {3 < pageData.current_page && (
              <>
                <PaginationItem className="w-8">
                  <PaginationEllipsis className="w-8 h-8" />
                </PaginationItem>
              </>
            )}
            {pageData.current_page - 2 > 0 && (
              <PaginationItem className="w-8">
                <PaginationLink
                  className="w-8 h-8"
                  href={`/${path}?page=${pageData.current_page - 2}`}>
                  {pageData.current_page - 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {pageData.current_page - 1 > 0 && (
              <PaginationItem className="w-8">
                <PaginationLink
                  className="w-8 h-8"
                  href={`/${path}?page=${pageData.current_page - 1}`}>
                  {pageData.current_page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem className="w-8">
              <PaginationLink
                className="w-8 h-8"
                isActive
                href={`/${path}?page=${pageData.current_page}`}>
                {pageData.current_page}
              </PaginationLink>
            </PaginationItem>

            {pageData.current_page + 1 <= pageData.last_page && (
              <PaginationItem className="w-8">
                <PaginationLink
                  className="w-8 h-8"
                  href={`/${path}?page=${pageData.current_page + 1}`}>
                  {pageData.current_page + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {pageData.current_page + 2 <= pageData.last_page - 1 && (
              <PaginationItem className="w-8">
                <PaginationLink
                  className="w-8 h-8"
                  href={`/${path}?page=${pageData.current_page + 2}`}>
                  {pageData.current_page + 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {pageData.current_page < pageData.last_page - 1 && (
              <>
                <PaginationItem className="w-8">
                  <PaginationEllipsis className="w-8 h-8" />
                </PaginationItem>
              </>
            )}
            {pageData.current_page < pageData.last_page && (
              <>
                <PaginationItem className="w-8">
                  <PaginationNext
                    href={`/${path}?page=${pageData.current_page + 1}`}
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
