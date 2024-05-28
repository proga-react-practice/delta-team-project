import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { SxProps } from '@mui/system';


const RadioStyle: SxProps = {
  marginBottom: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

interface RadioFormControlLabelProps {
  value: string;
  label: string;
  required?: boolean;
}

const RadioFormControlLabel: React.FC<RadioFormControlLabelProps> = ({ value, label, required }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio color="default" />}
      label={label}
      sx={RadioStyle}
      required={required}
    />
  );
};

export default RadioFormControlLabel;