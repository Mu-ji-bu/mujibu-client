const routePath = {
  home: '/',
  aboutus: '/aboutus',
  faq: '/faq',
  forgetPassword: '/forget-password',
  login: '/login',
  member: '/member',
  memberFavorite: '/member/:id/favorite', // const memberFavoriteLink = `${routePath.memberFavorite.replace(':id', memberId)}`;
  memberFundingRecord: '/member/:id/funding-record',
  memberPersonalSetting: '/member/:id/personal-setting',
  memberPersonalManagement: '/member/:id/proposal-management',
  memberPersonalTeamSetting: '/member/:id/team-setting',
  newPassword: '/new-password',
  notifications: '/notifications',
  porposal: '/porposal',
  projects: '/projects',
  signup: '/signup',
  userPrivacy: '/user-privacy',
  userTerms: '/user-terms',
};

export default routePath;
