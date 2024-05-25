import React, { useState, useEffect, useRef } from 'react';
import { useController, Control, RegisterOptions } from 'react-hook-form';
import { Button, Input, FormHelperText, Box } from '@mui/material';
import { FormData } from '../../../interfaces';

interface FileUploadProps {
  control: Control<FormData>;
  name: keyof FormData;
  label: string;
  rules?: RegisterOptions;
  error?: boolean;
  helperText?: string;
  reset?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ control, name, label, rules, error, helperText, reset }) => {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: null,
  });

  const [, setFileName] = useState<string | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    field.onChange(file);
    setFileName(file ? file.name : null);
    setIsFileSelected(!!file);
  };

  useEffect(() => {
    if (reset) {
      setFileName(null);
      setIsFileSelected(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [reset]);

  const TextFieldStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    backgroundColor: isFileSelected ? 'green' : 'black',
    '&:hover': {
      backgroundColor: isFileSelected ? 'black' : 'green',
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Input
        type="file"
        onChange={handleChange}
        inputProps={{ accept: 'image/*' }}
        style={{ display: 'none' }}
        id={`${name}-upload`}
      />
      <label htmlFor={`${name}-upload`} style={{ width: '100%' }}>
        <Button variant="contained" component="span" sx={TextFieldStyle}>
          {label}
        </Button>
      </label>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Box>
  );
};

export default FileUpload;