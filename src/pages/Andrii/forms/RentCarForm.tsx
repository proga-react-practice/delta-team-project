import React, { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import InputMask from 'react-input-mask';
import { RentCar, initialFormState } from '../../../interfaces';
import { Button, Box, useTheme, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StyledTextField } from '../styledComponents/StyledTextField'
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
import { createTransform } from '../animations/animation' 

interface RentCarFormProps {
    form: RentCar;
    setForm: React.Dispatch<React.SetStateAction<RentCar>>;
    onSubmit: (e: React.FormEvent) => void;
}

const RentCarForm: React.FC<RentCarFormProps> = ({ form, setForm, onSubmit}) => {

    const [error, setError] = React.useState<DateTimeValidationError | null>(null);

    const theme = useTheme();
    const Transform = createTransform(theme);
    dayjs.extend(advancedFormat);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDateChange = (name: string) => (date: Dayjs | null) => {
        if (date) {
            if (name === 'finishRentDate' && date.isBefore(dayjs(form.startRentDate).add(5, 'hours'))) {
                setFieldErrors(prevErrors => ({ ...prevErrors, finishRentDate: true }));
            } else {
                setFieldErrors(prevErrors => ({ ...prevErrors, finishRentDate: false }));
                setForm(prevForm => ({ ...prevForm, [name]: date }));
            }
        }
    };

    const handleReset = () => {
        setForm(initialFormState);
    };

    const handleStartRentDateChange = (date: Dayjs | null) => {
        if (date) {
            setForm(prevForm => ({ ...prevForm, startRentDate: date }));
        }
    };

    const handlePhoneNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const phoneNumberPattern = /^\+38\(\d{3}\) \d{3} \d{4}$/;
        setFieldErrors({
            ...fieldErrors,
            phoneNumber: !value.match(phoneNumberPattern),
        });
    };

    const errorMessage = React.useMemo(() => {
        switch (error) {
          case 'maxDate':
          case 'minDate': {
            return 'You can rent for at least 5 hours.';
          }
    
          case 'invalidDate': {
            return 'Your date is not valid';
          }
    
          default: {
            return '';
          }
        }
      }, [error]);

    const [fieldErrors, setFieldErrors] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        email: false,
        placeOfIssue: false,
        finishRentDate: false,
    });
    
    const handleFieldChange = (name: string, pattern: RegExp) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFieldErrors({
            ...fieldErrors,
            [name]: !value.match(pattern),
        });
        handleChange(e);
    }; 

    const handleSubmit = (e: React.FormEvent) => {
        onSubmit(e);
        const newStartRentDate = dayjs();
        const newFinishRentDate = newStartRentDate.add(5, 'hour');
        setForm(prevForm => ({ ...prevForm, startRentDate: newStartRentDate, finishRentDate: newFinishRentDate }));
    };

    const FormStyle = {
        minWidth: '230px',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '70px',
        backgroundColor: theme.palette.background.default,
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.20)',
    }

    const FullNameStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
    
    const DateAndTimeStyle = {
        width: '100%', 
        padding: '10px',
        marginBottom: '10px',
        boxSizing: 'border-box',
    }

    const BoxStyle = {
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-around'
    }

    const SubmitButtonStyle = {
        width: '44%',
        padding: '5px',
        marginTop: '10px',
        border: 'none',
        borderRadius: '5px',
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.info.light,
        marginRight: '10%', 
        '&:hover': {
            backgroundColor: theme.palette.info.dark,
        },
    }

    const ResetButtonStyle = {
        width: '44%',
        padding: '5px',
        marginTop: '10px',
        border: 'none',
        borderRadius: '5px',
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.error.light,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    }

    return (
        <Box 
            component="form" 
            onSubmit={ handleSubmit } 
            sx={{...FormStyle, ...Transform}}
        >
            <Box>
                <Box
                    id="fullName" 
                    sx={FullNameStyle}
                >
                    <StyledTextField 
                        error={fieldErrors.firstName}
                        className="firstName" 
                        label="First Name"
                        name="firstName" 
                        value={form.firstName} 
                        onChange={handleFieldChange('firstName', /^[A-Z][a-z]*$/)} 
                        placeholder="First Name" 
                        required
                        inputProps = {{ pattern: "^[A-Z][a-z]*$" }}
                    />
                    <StyledTextField 
                        error={fieldErrors.lastName}
                        className="lastName" 
                        label="Last Name"
                        name="lastName" 
                        value={form.lastName} 
                        onChange={handleFieldChange('lastName', /^[A-Z][a-z]*$/)} 
                        placeholder="Last Name" 
                        required
                        inputProps = {{ pattern: "^[A-Z][a-z]*$" }}
                    />
                </Box>
                    {(fieldErrors.firstName || fieldErrors.lastName) && (
                        <FormHelperText error>
                            {fieldErrors.firstName ? "First name must start with a capital letter and contain only letters." : ""}
                            {fieldErrors.firstName && fieldErrors.lastName && <br />}
                            {fieldErrors.lastName ? "Last name must start with a capital letter and contain only letters." : ""}
                        </FormHelperText>
                    )}
            </Box>
            <InputMask
                mask="+38(099) 999 9999"
                value={form.phoneNumber}
                onChange={handleChange}
                onBlur={handlePhoneNumberBlur}
            >
                <StyledTextField
                    name="phoneNumber"
                    error={fieldErrors.phoneNumber}
                    helperText={fieldErrors.phoneNumber ? "Please enter a valid phone number in the format: +38(0__) ___ ____" : ""}
                    label="Phone Number"
                    placeholder="+38(0__) ___ ____"
                    required
                    inputProps = {{ pattern: "\\+38\\(0[0-9]{2}\\) [0-9]{3} [0-9]{4}" }}
                />
            </InputMask>
            <StyledTextField 
                error={fieldErrors.email}
                helperText={fieldErrors.email ? "Email must contain '@'." : ''}
                className="email"
                label="Email" 
                name="email" 
                value={form.email} 
                onChange={handleFieldChange('email', /.+@.+/)}  
                placeholder="Email" 
                required
                inputProps={{ pattern: ".+@.+" }}
            />
            <StyledTextField 
                error={fieldErrors.placeOfIssue}
                helperText={fieldErrors.placeOfIssue ? "Place must start with a capital letter and contain only letters." : ""}
                className="placeOfIssue"
                label="Place of Issue"   
                name="placeOfIssue" 
                value={form.placeOfIssue} 
                onChange={handleFieldChange('placeOfIssue', /^[A-Z][a-z]*$/)}  
                placeholder="Place of Issue" 
                required
                inputProps={{ pattern: "^[A-Z][a-z]*$" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Start Rent Date"
                    name="startRentDate"
                    value={form.startRentDate}
                    onChange={handleStartRentDateChange}
                    format="YYYY-MM-DD HH:mm"
                    minDateTime={dayjs().subtract(1, 'minutes')}
                    sx={DateAndTimeStyle}
                />

                <DateTimePicker
                    label="Finish Rent Date"
                    name="finishRentDate"
                    value={form.finishRentDate}
                    onChange={handleDateChange('finishRentDate')}
                    format="YYYY-MM-DD HH:mm"
                    minDateTime={form.startRentDate ? dayjs(form.startRentDate).add(5, 'h') : dayjs()}
                    onError={(newError) => setError(newError)}
                    slotProps={{
                        textField: {
                          helperText: errorMessage,
                        },
                      }}
                    sx={DateAndTimeStyle}
                />
            </LocalizationProvider>
            <StyledTextField
                className="comments"
                label="Comments"
                name="comments" 
                value={form.comments} 
                onChange={handleChange} 
                placeholder="Comments" 
            />
            <Box 
                className="buttons"
                sx={BoxStyle}
            >
                <Button 
                    className="submit" 
                    type="submit"
                    sx={SubmitButtonStyle}
                >
                    Submit
                </Button>
                <Button 
                    className="reset" 
                    onClick={handleReset} 
                    type="reset"
                    sx={ResetButtonStyle}
                >
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default RentCarForm;