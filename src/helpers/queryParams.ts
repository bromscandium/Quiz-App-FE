import { QueryParams } from '@enums/queryParams';

export function getPaginationParams(
  searchParams: URLSearchParams,
  limit: number,
  total?: number
) {
  const page = getPageParam(searchParams);
  const offset = (page - 1) * limit;
  const totalPages = total ? Math.ceil(total / limit) : 1;

  return { page, offset, totalPages };
}

export function getPageParam(
  searchParams: URLSearchParams,
  defaultPage = 1
): number {
  const page = searchParams.get(QueryParams.PAGE);
  return page ? parseInt(page) : defaultPage;
}

export function getInvitationIDParam(searchParams: URLSearchParams): string {
  return searchParams.get(QueryParams.INVITATION_ID) || '';
}

export function getTabParam(
  searchParams: URLSearchParams,
  defaultTab = ''
): string {
  return searchParams.get(QueryParams.TAB) || defaultTab;
}

export function handlePageChange(
  newPage: number,
  searchParams: URLSearchParams,
  router: { push: (url: string) => void },
  baseHref: string
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(QueryParams.PAGE, String(newPage));
  router.push(`${baseHref}?${params.toString()}`);
}

export function handleTabChange(
  newTab: string,
  searchParams: URLSearchParams,
  router: { push: (url: string) => void },
  baseHref: string
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(QueryParams.TAB, newTab);
  router.push(`${baseHref}?${params.toString()}`);
}
