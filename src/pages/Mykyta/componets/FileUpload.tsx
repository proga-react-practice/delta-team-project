import React, { useState } from 'react';
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
}

const FileUpload: React.FC<FileUploadProps> = ({ control, name, label, rules, error, helperText }) => {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: null,
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    field.onChange(file);
    setFileName(file ? file.name : null);
  };

  const TextFieldStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
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
      {fileName && <span>{fileName}</span>}
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Box>
  );
};

export default FileUpload;