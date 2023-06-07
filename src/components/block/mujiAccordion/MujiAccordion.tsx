import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material';
import clsxm from '@/libraries/utils/clsxm';

export interface IMujibuAccordionProps {
  q: string;
  question: string;
  answer: string;
  updateAt: string;
}

const MujibuAccordion: React.FC<IMujibuAccordionProps> = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const { q, question, answer, updateAt } = props;

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(!expanded);
  };

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ExpandMoreIcon className="text-secondary-66" />} {...props} />
  ))(({ theme }) => ({
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      paddingTop: '22.5px',
      paddingBottom: '22.5px',
      margin: 0,
    },
  }));

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange('panel1')} className={clsxm('rounded-lg')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={clsxm('pl-5 pr-[27px]', expanded ? 'border-solid border-b border-secondary-10' : '')}
        >
          <div className="q-title p-3 bg-primary rounded-lg mr-3">
            <Typography component="h6" variant="h6" className="text-white">
              {q}
            </Typography>
          </div>

          <Typography component="h5" variant="h5" className="text-secondary">
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="p-5">
          <Typography component="p" variant="body16" className="text-secondary-66 mb-3">
            {answer}
          </Typography>
          <Typography component="p" variant="caption" className="text-secondary-66">
            {updateAt}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MujibuAccordion;
