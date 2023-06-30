import { useState } from 'react';
import Link from 'next/link';

import { wrapper } from '../../store/store';
import { useAppSelector, useAppDispatch } from '../../libraries/hooks/reduxHooks';
import { getRunningQueriesThunk, getTeam } from '../../store/services/teamApi';
import type { ITeamState } from '../../types/team';
import type { IProjectState } from '../../types/project';

import { Avatar, Button, Tab, Tabs, Typography } from '@mui/material';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PublicIcon from '@mui/icons-material/Public';

import Card from '@/components/block/card';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Team = ({ teamData }: { teamData: ITeamState }) => {
  const { isMd } = useBreakpoints();
  const [tabValue, setTabValue] = useState(0);
  const [teamProjectsData, setTeamProjectsData] = useState<IProjectState[] | undefined>(teamData?.projectId || []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    let filteredProjects;
    setTabValue(newValue);
    if (newValue === 0) {
      setTeamProjectsData(teamData.projectId);
    } else if (newValue === 2) {
      filteredProjects = teamData?.projectId?.filter((item) => item.projectForm === 0);
      setTeamProjectsData(filteredProjects);
    } else if (newValue === 4) {
      filteredProjects = teamData?.projectId?.filter((item) => item.projectForm === 1);
      setTeamProjectsData(filteredProjects);
    } else if (newValue === 6) {
      filteredProjects = teamData?.projectId?.filter((item) => Number(item.projectForm) > 1);
      setTeamProjectsData(filteredProjects);
    }

    // dispatch(setUserTabsPage(newValue));
  };
  return (
    <div className="px-5">
      <div className="max-w-screen-md mx-auto py-10 flex flex-col items-center md:items-start md:flex-row space-y-5 md:space-y-0 md:space-x-10">
        <Avatar
          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-primary"
          alt={teamData.teamName}
          src={teamData.teamAvatar || ''}
        ></Avatar>

        <div className="flex flex-col w-full">
          <Typography className="text-secondary mb-5  text-center  md:text-start" component="h2" variant="h4">
            {teamData.teamName}
          </Typography>
          <div className="mb-5  text-center  md:text-start">
            <Button variant="outlined" color="secondary" className="p-[2px] min-w-0 mr-2" aria-label="youtube">
              <PublicIcon fontSize="small" />
            </Button>
            <Button variant="outlined" color="secondary" className="p-[2px] min-w-0 mr-2" aria-label="youtube">
              <MailOutlineRoundedIcon fontSize="small" />
            </Button>
            <Button variant="outlined" color="secondary" className="p-[2px] min-w-0 mr-2" aria-label="youtube">
              <FacebookIcon fontSize="small" />
            </Button>
            <Button variant="outlined" color="secondary" className="p-[2px] min-w-0 mr-2" aria-label="youtube">
              <YouTubeIcon fontSize="small" />
            </Button>
            <Button variant="outlined" color="secondary" className="p-[2px] min-w-0 mr-2" aria-label="youtube">
              <InstagramIcon fontSize="small" />
            </Button>
            <Button variant="outlined" color="secondary" className="p-[3px] min-w-0 mr-2" aria-label="youtube">
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.75 8.49023C13.75 8.39648 13.6562 8.30273 13.5625 8.34961H13.0469C12.9531 8.34961 12.9062 8.39648 12.9062 8.49023V10.459L11.3594 8.39648C11.3594 8.34961 11.3125 8.34961 11.2656 8.34961H10.7031C10.6094 8.34961 10.5625 8.39648 10.5625 8.49023V11.8184C10.5625 11.9121 10.6094 11.959 10.7031 11.959H11.2656C11.3125 11.959 11.4062 11.9121 11.4062 11.8184V9.84961L12.9062 11.9121C12.9531 11.9121 13 11.959 13.0469 11.959H13.5625C13.6562 11.959 13.75 11.9121 13.75 11.8184V8.49023ZM9.90625 8.30273H9.34375C9.25 8.30273 9.20312 8.39648 9.20312 8.49023V11.8184C9.20312 11.9121 9.25 11.959 9.34375 11.959H9.90625C9.95312 11.959 10.0469 11.9121 10.0469 11.8184V8.49023C10.0469 8.39648 9.95312 8.30273 9.90625 8.30273ZM8.59375 11.1152H7.14062V8.49023C7.14062 8.39648 7.09375 8.30273 7 8.30273H6.4375C6.39062 8.30273 6.29688 8.39648 6.29688 8.49023V11.8184C6.29688 11.8652 6.34375 11.8652 6.34375 11.9121C6.39062 11.9121 6.39062 11.959 6.4375 11.959H8.59375C8.6875 11.959 8.73438 11.8652 8.73438 11.8184V11.2559C8.73438 11.209 8.6875 11.1152 8.59375 11.1152ZM16.5625 8.30273H14.4062C14.3125 8.30273 14.2656 8.39648 14.2656 8.49023V11.8184C14.2656 11.8652 14.3125 11.959 14.4062 11.959H16.5625C16.6094 11.959 16.7031 11.9121 16.7031 11.8184V11.2559C16.7031 11.209 16.6094 11.1152 16.5625 11.1152H15.1094V10.5527H16.5625C16.6094 10.5527 16.7031 10.5059 16.7031 10.4121V9.84961C16.7031 9.80273 16.6094 9.70898 16.5625 9.70898H15.1094V9.14648H16.5625C16.6094 9.14648 16.7031 9.09961 16.7031 9.00586V8.49023C16.7031 8.39648 16.6094 8.30273 16.5625 8.30273ZM22 4.22461C22 2.11523 20.2656 0.427734 18.2031 0.380859H4.79688C2.6875 0.380859 1 2.11523 1 4.17773V17.584C0.953125 19.6934 2.6875 21.3809 4.79688 21.3809H18.1562C20.2656 21.4277 21.9531 19.6934 22 17.584V4.22461ZM19.0938 9.99023C19.0938 11.3496 18.5781 12.5684 17.4531 13.7871C15.8594 15.6621 12.25 17.9121 11.4531 18.2402C10.6094 18.5684 10.75 18.0059 10.7969 17.8184C10.9844 16.5996 11.0781 16.2715 10.1875 16.084C6.53125 15.6152 3.8125 13.0371 3.8125 9.99023C3.8125 6.56836 7.23438 3.75586 11.4531 3.75586C15.6719 3.75586 19.0938 6.56836 19.0938 9.99023Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
          <Typography className="text-secondary-50 mb-5" component="p" variant="caption">
            {teamData.teamIntroduction}
          </Typography>
          {(teamData.companyName ||
            teamData.companyRegistrationNumber ||
            teamData.representativeName ||
            teamData.companyAddress) && (
            <div className="border border-solid border-secondary-10 p-4 rounded-md">
              {teamData.companyName && (
                <Typography className="text-secondary-50" component="p" variant="caption">
                  公司資訊： {teamData.companyName}
                </Typography>
              )}
              {teamData.companyRegistrationNumber && (
                <Typography className="text-secondary-50" component="p" variant="caption">
                  統一編號： {teamData.companyRegistrationNumber}
                </Typography>
              )}
              {teamData.representativeName && (
                <Typography className="text-secondary-50" component="p" variant="caption">
                  代表人姓名： {teamData.representativeName}
                </Typography>
              )}
              {teamData.companyAddress && (
                <Typography className="text-secondary-50" component="p" variant="caption">
                  公司所在地： {teamData.companyAddress}
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mb-5 border-0 border-b border-solid border-secondary-10 pb-[0.2px]">
        <Tabs
          centered
          value={tabValue}
          onChange={handleChange}
          aria-label="nav tabs example"
          // variant="scrollable"
          // scrollButtons
          // allowScrollButtonsMobile
        >
          <Tab label="所有專案" />
          <Tab
            disabled
            label={teamData?.projectId?.length}
            className="text-xs min-w-0 py-2 px-1 -ml-4 mt-1 bg-primary text-white min-h-0 h-2 rounded-full"
          />
          <Tab label="募資中" />
          <Tab
            disabled
            label={teamData?.projectId?.filter((item) => item.projectForm === 0).length}
            className="text-xs min-w-0 py-2 px-1 -ml-4 mt-1 bg-primary text-white min-h-0 h-2 rounded-full"
          />
          <Tab label="長期販售" />
          <Tab
            disabled
            label={teamData?.projectId?.filter((item) => item.projectForm === 1).length}
            className="text-xs min-w-0 py-2 px-1 -ml-4 mt-1 bg-primary text-white min-h-0 h-2 rounded-full"
          />
          <Tab label="已結束" />
          <Tab
            disabled
            label={teamData?.projectId?.filter((item) => Number(item.projectForm) > 1).length}
            className="text-xs min-w-0 py-2 px-1 -ml-4 mt-1 bg-primary text-white min-h-0 h-2 rounded-full"
          />
        </Tabs>
      </div>
      <div className="max-w-screen-xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
          {Array.isArray(teamProjectsData) &&
            teamProjectsData.map((project) => (
              <div key={project._id} className="w-full">
                <Card isPC={isMd} {...project} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.query;
  console.log('id', id);
  if (typeof id === 'string') {
    store.dispatch(getTeam.initiate(id));
  }
  const [res] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      teamData: (res.data as { status: string; data: ITeamState }).data,
    },
  };
});

export default Team;
