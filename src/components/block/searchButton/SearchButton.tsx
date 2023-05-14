import * as React from 'react';
import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import Button from '../button/Button';

const SearchButton = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
    // 執行搜尋邏輯，並更新 searchResults 狀態
  };

  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`relative flex items-center rounded-md border border-solid ${
        open ? 'border-secondary' : 'border-secondary-50'
      } hover:border-secondary`}
    >
      <InputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        sx={{
          ml: open ? 1 : 0,
          width: open ? '200px' : '0px',
          height: 36,
          transition: 'width 0.5s ease-in-out',
          display: 'flex',
          alignItems: 'center',
        }}
        value={searchTerm}
        onChange={handleSearch}
      />
      <Button
        onClick={handleButtonClick}
        size="small"
        variant="outlined"
        color="secondary"
        className="p-[6px] min-w-0 border-none"
        aria-label="button"
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchButton;
