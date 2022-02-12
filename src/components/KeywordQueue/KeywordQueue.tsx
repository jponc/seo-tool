import React, {useState} from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

const SearchField = styled(TextField)`
  margin-right: 10px;
`;



type KeywordQueueProps = {
  onQueueClick: (keyword: string) => void;
};

export const KeywordQueue: React.FunctionComponent<KeywordQueueProps> = ({ onQueueClick }) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleOnQueueClick = () => {
    onQueueClick(keyword)
    setKeyword("");
  };

  return (
    <>
      <SearchField
        variant="standard"
        label="Queue keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        inputProps={{"data-testid": "KeywordQueue__search-field-input"}}
      />
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleOnQueueClick}
        data-testid="KeywordQueue__queue-btn"
      >
        Queue
      </Button>
    </>
  );
};
