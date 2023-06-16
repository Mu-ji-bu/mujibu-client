import { useState, useEffect } from 'react';
import { Typography, FormLabel } from '@mui/material';
import type { IProjectState } from '@/types/project';

import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';
import {
  InputText,
  InputTextMultiline,
  InputSelect,
  InputDatepicker,
  InputTextDeco,
  InputRadio,
  Editor,
} from '@/components/block/form';
import ProposalStep1 from './ProposalStep1';

const projectTypes = ['實體產品類', '虛擬計畫類'];
const categoryItems = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

interface ProposalStep5Props {
  proposalForm: IProjectState;
}

const ProposalStep5: React.FC<ProposalStep5Props> = ({ proposalForm }) => {
  return (
    <div className="py-5 md:py-10 px-5 md:px-20  bg-white w-full rounded-md md:border md:border-solid md:border-secondary-10">
      <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
        請確認您填寫好的提案資料
      </Typography>
      <div>
        <table>
          <tbody>
            {Object.entries(proposalForm).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{JSON.stringify(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-10 w-full"></div>
    </div>
  );
};

export default ProposalStep5;
