import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { textPattern, numberPattern, emailPattern, format } from '../../../pattern';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import InputMask from 'react-input-mask';
import { Button, Box, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StyledTextField } from '../styledComponents/StyledTextField';
import { RentCar, initialFormState } from '../../../interfaces';

interface RentCarFormProps {
    onSubmit: (data: RentCar | null) => void;
    onClose: () => void;
}

const RentCarForm: React.FC<RentCarFormProps> = ({ onSubmit, onClose }) => {

    const { control, register, handleSubmit, reset, watch, formState: { errors } } = useForm<RentCar>({
        defaultValues: {
            ...initialFormState,
            startRentDate: undefined,
            finishRentDate: undefined,
        },
        mode: 'onChange'
    });

    const [, setOpenDialog] = useState(false);

    dayjs.extend(advancedFormat);

    const handleReset = () => {
        reset({
            ...initialFormState,
            startRentDate: null,
            finishRentDate: null,
        });
    };

    const handleCloseDialog = () => {
        onClose();
        setOpenDialog(false);
    };

    const onSubmitForm = (data: RentCar) => {
        onSubmit(data);
        handleReset();
    }; 

    const FormStyle = {
        minWidth: '230px',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
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
        boxSizing: 'border-box',
    }

    const getError = (fieldName: keyof RentCar) => ({
        borderColor: errors[fieldName] ? "error.main" : "quaternary.main",
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: errors[fieldName] ? "error.main" : "quaternary.main",
            },
            '&:hover fieldset': {
                borderColor: errors[fieldName] ? "error.main" : "secondary.dark",
            },
            '&.Mui-focused fieldset': {
                borderColor: errors[fieldName] ? "error.main" : "secondary.dark",
            },
        },
        '& .MuiFormLabel-root': {
            color: errors[fieldName] ? "error.main": "quaternary.dark",
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: errors[fieldName] ? "error.main" : "secondary.dark",
        },
    });

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
        color: "secondary.light",
        backgroundColor: "info.light",
        marginRight: '10%', 
        '&:hover': {
            backgroundColor: "info.dark",
        },
    }

    const ResetButtonStyle = {
        width: '44%',
        padding: '5px',
        marginTop: '10px',
        border: 'none',
        borderRadius: '5px',
        color: "secondary.light",
        backgroundColor: "error.light",
        '&:hover': {
            backgroundColor: "error.dark",
        },
    }

    const HelperText = {
        marginTop: '-10px',
        marginLeft: '25px',
        marginBottom: '10px'
    }

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmitForm)}
            sx={FormStyle}
        >
            <Box>
                <Box
                    id="fullName" 
                    sx={FullNameStyle}
                >
                    <StyledTextField 
                        {...register('firstName', { 
                            required: 'First name is required', 
                            pattern: {
                                value: textPattern, 
                                message: 'First name must start with a capital letter and cannot contain numbers or special characters'
                            } 
                        })}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName && errors.firstName.type === 'required' && errors.firstName.message}
                        className="firstName" 
                        label="First Name"
                        name="firstName" 
                        placeholder="First Name" 
                    />
                    <StyledTextField 
                        {...register('lastName', { 
                            required: 'Last name is required', 
                            pattern: {
                                value: textPattern, 
                                message: 'Last name must start with a capital letter and cannot contain numbers or special characters'
                            } 
                        })}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName && errors.lastName.type === 'required' && errors.lastName.message}
                        className="lastName" 
                        label="Last Name"
                        name="lastName" 
                        placeholder="Last Name" 
                    />
                </Box>
                {(errors.firstName && errors.firstName.type === 'pattern') || (errors.lastName && errors.lastName.type === 'pattern') && (
                    <FormHelperText sx={HelperText} error>
                        {errors.firstName && errors.firstName.type === 'pattern' && errors.firstName.message}
                        {errors.firstName && errors.lastName && <br />}
                        {errors.lastName && errors.lastName.type === 'pattern' && errors.lastName.message}
                    </FormHelperText>
                )}
            </Box>
            <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: 'Phone number is required', pattern: {
                    value: numberPattern,
                    message: 'Phone number must be in format: +38(0__) ___ ____'
                }}}
                render={({ field }) => (
                    <InputMask
                        mask="+38(099) 999 9999"
                        value={field.value}
                        onChange={field.onChange}
                    >
                        <StyledTextField
                            error={Boolean(errors.phoneNumber)}
                            label="Phone Number"
                            placeholder="+38(0__) ___ ____"
                            helperText={errors.phoneNumber && errors.phoneNumber.message}
                        />
                    </InputMask>
                )}
            />
            <StyledTextField 
                {...register('email', { 
                    required: 'Email is required', 
                    pattern: {
                        value: emailPattern,
                        message: 'Email must contain @'
                    } 
                })}
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
                className="email"
                label="Email" 
                name="email" 
                placeholder="Email" 
            />
            <StyledTextField 
                {...register('placeOfIssue', { 
                    required: 'Place of Issue is required', 
                    pattern: {
                        value: textPattern, 
                        message: 'Place of Issue must start with a capital letter and cannot contain numbers or special characters'
                    } 
                })}
                error={Boolean(errors.placeOfIssue)}
                helperText={errors.placeOfIssue && errors.placeOfIssue.message}
                className="placeOfIssue"
                label="Place of Issue"   
                name="placeOfIssue" 
                placeholder="Place of Issue" 
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    name="startRentDate"
                    control={control}
                    rules={{ required: 'Start Rent Date is required' }}
                    render={({ field: { onChange, value, ref } }) => (
                        <>
                            <DateTimePicker
                                onChange={onChange}
                                value={value}
                                label="Start Rent Date"
                                ref={ref}
                                sx={{...DateAndTimeStyle,
                                    ...getError('startRentDate')
                                }}  
                                format={format}
                                minDateTime={dayjs().add(5, 'h')}
                            />
                            {errors.startRentDate && (
                                <FormHelperText sx={HelperText} error>
                                    {errors.startRentDate.message}
                                </FormHelperText>
                            )}
                        </>
                    )}
                />

                <Controller
                    name="finishRentDate"
                    control={control}
                    rules={{
                        required: 'Finish Rent Date is required',
                        validate: value =>
                            dayjs(value).diff(dayjs(watch('startRentDate')), 'hour') >= 5 || 'Finish Rent Date should be at least 5 hours later than Start Rent Date'
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                        <>
                            <DateTimePicker
                                onChange={onChange}
                                value={value}
                                label="Finish Rent Date"
                                ref={ref}
                                sx={{...DateAndTimeStyle,
                                    ...getError('finishRentDate')
                                }}
                                format={format}
                                minDateTime={watch('startRentDate') ? dayjs(watch('startRentDate')).add(5, 'h') : dayjs()}
                            />
                            {errors.finishRentDate && (
                                <FormHelperText sx={HelperText} error>
                                    {errors.finishRentDate.message}
                                </FormHelperText>
                            )}
                        </>
                    )}
                />
            </LocalizationProvider>
            <StyledTextField
                className="comments"
                label="Comments"
                name="comments"  
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
                    onClick={handleCloseDialog} 
                    sx={ResetButtonStyle}
                >
                    Close
                </Button>
            </Box>
        </Box>
    );
};

export default RentCarForm;