import routePath from '@routes/routePath';

export const getRoutePathLink = (memberId: string = '') => {
  const memberFavoriteLink = `${routePath.memberFavorite.replace(':id', memberId)}`;
  const memberFundingRecordLink = `${routePath.memberFundingRecord.replace(':id', memberId)}`;
  const memberPersonalSettingLink = `${routePath.memberFavorite.replace(':id', memberId)}`;
  const memberPersonalManagementLink = `${routePath.memberPersonalManagement.replace(':id', memberId)}`;
  const memberPersonalTeamSettingLink = `${routePath.memberPersonalTeamSetting.replace(':id', memberId)}`;

  return {
    memberFavoriteLink,
    memberFundingRecordLink,
    memberPersonalSettingLink,
    memberPersonalManagementLink,
    memberPersonalTeamSettingLink,
  };
};
