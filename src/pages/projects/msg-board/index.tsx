import ProjectsLayout from '@/components/layout/ProjectsLayout';
import ProjectPlan from '@/components/pages/projects/ProjectPlan';
import { Avatar, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Input from '@mui/material/Input';

const MsgBoard = () => {
  return (
    <ProjectsLayout>
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
          <ProjectPlan />
          <ProjectPlan />
          <ProjectPlan />
        </div>
      </div>
    </ProjectsLayout>
  );
};

export default MsgBoard;
