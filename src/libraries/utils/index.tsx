export const getRemainingDays = (startTime: string, endTime: string) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // 計算時間戳的差距（以毫秒為單位）
  const timeDiff = endDate.getTime() - startDate.getTime();

  // 將差距轉換為天數
  const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return remainingDays;
};
