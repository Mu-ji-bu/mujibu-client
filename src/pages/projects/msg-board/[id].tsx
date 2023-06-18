import { IProjectState } from '@/types/project';
import { Avatar, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ProjectsLayout from '@/components/layout/ProjectsLayout';
import Loading from '@/components/Loading';
import { useMemo } from 'react';
import { useGetCarouselDataQuery } from '@/store/services/homeApi';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import ProjectPlan from '@/components/pages/projects/ProjectPlan';
import { useRouter } from 'next/router';
import { useGetProjectByIdQuery } from '@/store/services/projectApi';
import Seo from '@/components/Seo';

// interface DetailsProps {
//   project: IProjectState;
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('https://mujibu-server-fau1.onrender.com/api/projects');
//   const response = await res.json();
//   const data: IProjectState[] = response.data;

//   const paths = data.map((project) => {
//     return {
//       params: { id: project._id as string },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false, // beyond the scope, id doesn't exist, go to 404
//   };
// };

// export const getStaticProps: GetStaticProps<DetailsProps> = async (context) => {
//   const id = context.params?.id;
//   const res = await fetch(`https://mujibu-server-fau1.onrender.com/api/projects/${id}`);
//   const response = await res.json();
//   const data: IProjectState = response.data;

//   return {
//     props: { project: data },
//   };
// };

// const MsgBoard = ({ project }: DetailsProps) => {
const MsgBoard = () => {
  const router = useRouter();
  const { id: projectId } = router.query;
  const { data, isLoading } = useGetProjectByIdQuery(projectId);

  const project = useMemo((): IProjectState => data?.data || [], [data?.data]);

  const handleProjectPlanClick = (projectId: string, projectPlanId: string) => {
    console.log(`click on plan ${projectPlanId}`);
    // router.push(`/projects/select/`);
    router.push(`/projects/select/${projectId}?projectPlanId=${projectPlanId}`);
  };

  return (
    <>
      <Seo templateTitle="留言板" />
      {isLoading ? (
        <Loading />
      ) : (
        <ProjectsLayout projectState={project} tabIndex={3}>
          <div className="details w-full flex justify-center gap-6">
            <div className="flex flex-col w-2/3 gap-8">
              <div className="send-msg flex gap-3 items-center h-[100px] p-5 border border-solid border-secondary-10">
                <Avatar className="w-[60px] h-[60px]" />
                <FormControl className="w-full" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-msg" className="text-secondary-66">
                    發表留言
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-msg"
                    type="text"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          // onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                          <SendOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="發表留言"
                  />
                </FormControl>
              </div>

              <div className="border border-solid border-secondary-10">
                <div className="msg-box flex flex-col gap-6 p-5 rounded-lg">
                  <div className="msg">
                    <div className="profile flex items-center gap-3 mb-3">
                      <Avatar className="w-[60px] h-[60px]" />
                      <div className="info flex flex-col gap-1">
                        <div className="name">
                          <Typography component="span" variant="body16" className="mr-3">
                            Elsa
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            className="py-1 px-4 border border-solid border-green-accent text-primary rounded-[20px]"
                          >
                            贊助者
                          </Typography>
                        </div>
                        <Typography component="p" variant="caption" className="text-secondary-66">
                          2023/03/10 10:00
                        </Typography>
                      </div>
                    </div>
                    <Typography component="p" variant="body16" className="text-secondary-66">
                      請問有參加超早鳥贊助，現在是否還能參加索取小夜燈活動？
                    </Typography>
                  </div>
                  <div className="msg-boxes flex flex-col gap-3">
                    <div className="msg-box p-5 bg-green-accent-10 rounded-lg">
                      <div className="msg">
                        <div className="profile flex items-center gap-3 mb-3">
                          <Avatar className="w-[60px] h-[60px]" />
                          <div className="info flex flex-col gap-1">
                            <div className="name">
                              <Typography component="span" variant="body16" className="mr-3">
                                Elsa
                              </Typography>
                              <Typography
                                component="span"
                                variant="caption"
                                className="py-1 px-4 border border-solid border-green-accent text-primary rounded-[20px]"
                              >
                                贊助者
                              </Typography>
                            </div>
                            <Typography component="p" variant="caption" className="text-secondary-66">
                              2023/03/10 10:00
                            </Typography>
                          </div>
                        </div>
                        <Typography component="p" variant="body16" className="text-secondary-66">
                          請問有參加超早鳥贊助，現在是否還能參加索取小夜燈活動？
                        </Typography>
                      </div>
                    </div>

                    <div className="msg-box p-5 bg-green-accent-10 rounded-lg">
                      <div className="msg">
                        <div className="profile flex items-center gap-3 mb-3">
                          <Avatar className="w-[60px] h-[60px]" />
                          <div className="info flex flex-col gap-1">
                            <div className="name">
                              <Typography component="span" variant="body16" className="mr-3">
                                Elsa
                              </Typography>
                              <Typography
                                component="span"
                                variant="caption"
                                className="py-1 px-4 border border-solid border-green-accent text-primary rounded-[20px]"
                              >
                                贊助者
                              </Typography>
                            </div>
                            <Typography component="p" variant="caption" className="text-secondary-66">
                              2023/03/10 10:00
                            </Typography>
                          </div>
                        </div>
                        <Typography component="p" variant="body16" className="text-secondary-66">
                          請問有參加超早鳥贊助，現在是否還能參加索取小夜燈活動？
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <FormControl className="w-full" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-msg" className="text-secondary-66">
                      回覆留言
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-msg"
                      type="text"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                            <SendOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="回覆留言"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-6">
              {project.projectPlans?.map((plan, i) => (
                <ProjectPlan
                  key={i}
                  projectId={project._id || '0'}
                  projectPlan={plan}
                  handleProjectPlanClick={handleProjectPlanClick}
                />
              ))}
            </div>
          </div>
        </ProjectsLayout>
      )}
    </>
  );
};

export default MsgBoard;
