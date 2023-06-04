import { ReactNode, useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material/';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';

const steps = ['提案資料', '回饋方案', '團隊資料', '物流/提領設定', '畫面預覽', '送出提案'];

const ProposalLayout = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="bg-gray-light">
      <div className="border-0 border-b border-solid border-secondary-10 px-5 py-4 sticky top-0 left-0 bg-white z-10">
        <Stepper activeStep={activeStep} className="max-w-screen-md mx-auto">
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div className="max-w-screen-md mx-auto py-5">
        <div className="w-full bg-gray-dark text-secondary text-center px-5 py-3 rounded-md">
          <Typography component="h2" variant="h5">
            {steps[activeStep]}
          </Typography>
        </div>
        {children}
      </div>

      <div className="w-full border-0 border-t border-solid border-secondary-10 px-5 py-4 fixed bottom-0 left-0 bg-white z-10">
        <div className="flex justify-between max-w-screen-xl mx-auto">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            color="secondary"
            startIcon={<UndoIcon />}
          >
            返回上一步
          </Button>
          <div className="flex space-x-5">
            <Button variant="outlined" color="secondary" startIcon={<SaveIcon />}>
              儲存草稿
            </Button>
            {activeStep === steps.length - 2 && (
              <Button variant="contained" startIcon={<CheckIcon />}>
                送出提案
              </Button>
            )}
            {activeStep !== steps.length - 2 && activeStep !== steps.length - 1 && (
              <Button onClick={handleNext} variant="contained" startIcon={<RedoIcon />}>
                {`下一步：${steps[activeStep + 1]}`}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalLayout;
