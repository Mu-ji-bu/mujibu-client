export const projectTypeOption = [
  { label: '全部', value: 0 },
  { label: '一般專案', value: 1 },
  { label: '長期販售', value: 2 },
  { label: '成功案例', value: 3 },
];

export const projectTypeEnum = {
  PROJECT_TYPE: 'projectType',
  1: '一般專案',
  2: '長期販售',
  3: '成功案例',
  ALL: 0,
  GENERAL: 1,
  LONG_TERM: 2,
  SUCCESS: 3,
};

export const projectCategoryOption = [
  { label: '全部', value: 0 },
  { label: '藝術', value: 1 },
  { label: '設計', value: 2 },
  { label: '電影', value: 3 },
  { label: '音樂', value: 4 },
  { label: '科技', value: 5 },
  { label: '出版', value: 6 },
];

export const projectCategoryEnum = {
  CATEGORY: 'category',
  1: '藝術',
  2: '設計',
  3: '電影',
  4: '音樂',
  5: '科技',
  6: '出版',
  ALL: 0,
  ARTS: 1,
  DESIGN: 2,
  MOVIE: 3,
  MUSIC: 4,
  TECH: 5,
  PUBLISH: 6,
};

export const projectSortOption = [
  { label: '最新募資', value: 'startTime' },
  { label: '最後倒數', value: 'endTime' },
  { label: '募資金額', value: 'targetAmount' },
];

export const projectSortEnum = {
  SORT_BY: 'sortBy',
  1: '最新募資',
  2: '最後倒數',
  3: '募資金額',
};

export const projectStatusEnum = {
  1: '提案',
  2: '審核',
  3: '退件',
  4: '募資中',
  5: '募資成功',
  6: '募資失敗',
  7: '退款中',
  PROPOSAL: 1,
  REVIEW: 2,
  REJECTED: 3,
  FUNDRAISING: 4,
  FUNDRAISING_SUCCESS: 5,
  FUNDRAISING_FAILED: 6,
  REFUNDING: 7,
};

export const searchQueryEnum = {
  SORT_START: 'startTime',
  SORT_END: 'endTime',
  // 單次搜尋要顯示的筆數,後端預設給20筆
  perPage: 20,
};
