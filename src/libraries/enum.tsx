export const projectFormOption = [
  { label: '全部', value: -1 },
  { label: '一般專案', value: 0 },
  { label: '長期販售', value: 1 },
  { label: '成功案例', value: 2 },
  { label: '失敗案例', value: 3 },
];

export const projectFormEnum: {
  TYPE: string;
  [key: number]: string;
  ALL: number;
  GENERAL: number;
  LONG_TERM: number;
  SUCCESS: number;
  FAILED: number;
} = {
  TYPE: 'projectForm',
  0: '一般專案',
  1: '長期販售',
  2: '成功案例',
  3: '失敗案例',
  ALL: -1,
  GENERAL: 0,
  LONG_TERM: 1,
  SUCCESS: 2,
  FAILED: 3,
};

export const projectCategoryOption = [
  { label: '全部', value: -1 },
  { label: '藝術', value: 0 },
  { label: '設計', value: 1 },
  { label: '電影', value: 2 },
  { label: '音樂', value: 3 },
  { label: '科技', value: 4 },
  { label: '出版', value: 5 },
];

export const projectCategoryEnum = {
  TYPE: 'projectCategory',
  0: '藝術',
  1: '設計',
  2: '電影',
  3: '音樂',
  4: '科技',
  5: '出版',
  ALL: -1,
  ARTS: 0,
  DESIGN: 1,
  MOVIE: 2,
  MUSIC: 3,
  TECH: 4,
  PUBLISH: 5,
};

export const projectSortOption = [
  { label: '最新募資', value: 'startTime' },
  { label: '最後倒數', value: 'endTime' },
  { label: '募資金額', value: 'goalAmount' },
];

export const projectSortEnum = {
  TYPE: 'sortBy',
  1: '最新募資',
  2: '最後倒數',
  3: '募資金額',
};

export const projectStatusEnum = {
  0: '提案',
  1: '審核',
  2: '退件',
  3: '募資中',
  4: '募資成功',
  5: '募資失敗',
  6: '退款中',
  7: '回饋品準備中',
  8: '回饋品寄送完成',
  9: '結案',
  PROPOSAL: 0,
  REVIEW: 1,
  REJECTED: 2,
  FUNDRAISING: 3,
  SUCCESS: 4,
  FAILED: 5,
  REFUNDING: 6,
  READY: 7,
  REWARD: 8,
  COMPLETION: 9,
};

export const searchQueryEnum = {
  SORT_START: 'startTime',
  SORT_END: 'endTime',
  // 單次搜尋要顯示的筆數,後端預設給20筆
  perPage: 20,
};
