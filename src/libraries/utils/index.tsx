export const getRemainingDays = (startTime: string, endTime: string) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // 計算時間戳的差距（以毫秒為單位）
  const timeDiff = endDate.getTime() - startDate.getTime();

  // 將差距轉換為天數
  const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return remainingDays;
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function calculatePercentage(currentValue: number, totalValue: number) {
  const percentage = (currentValue / totalValue) * 100;
  return Math.ceil(percentage);
}

export function formatDateWithTime(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${
    hours < 10 ? '0' + hours : hours
  }:${minutes < 10 ? '0' + minutes : minutes}`;
  return formattedDate;
}
