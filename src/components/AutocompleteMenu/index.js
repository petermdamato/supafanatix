import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  alwaysFloatedLabel: {
    transform: 'translate(14px, 12px) scale(1)',
  },
}));

const AutocompleteMenu = ({ options, onOptionSelect,artist }) => {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState(false);
  const classes = useStyles();

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };
  const handleInputFocus = (event, value) => {
    setSelected(true);
  };
  const handleInputBlur = (event, value) => {
    setSelected(false);
  };

  useEffect(() => {
    const selectedOption = options.find(option =>
      option.toLowerCase() === inputValue.toLowerCase()
    );

    if (selectedOption) {
      onOptionSelect(selectedOption);
    }
  }, [inputValue, options, onOptionSelect]);

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      options={options}
      value={artist&&artist.length > 0 ? artist : null}
      renderInput={(params) => (
        selected || artist && artist.length>0 ? <TextField {...params} 
            label="Artist" 
            variant="outlined" 
            InputLabelProps={{
            classes: {
              root: classes.alwaysFloatedLabel,
            },
          }}/> : <TextField {...params} label="Type to search..." variant="outlined" />
      )}
    />
  );
};

export default AutocompleteMenu;