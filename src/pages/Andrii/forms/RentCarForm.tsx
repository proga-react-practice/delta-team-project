import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { textPattern, numberPattern, emailPattern, format } from '../../../pattern';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import InputMask from 'react-input-mask';
import { RentCar, initialFormState } from '../../../interfaces';
import { Button, Box, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StyledTextField } from '../styledComponents/StyledTextField'
import { createTransform } from '../animations/animation' 

interface RentCarFormProps {
    onSubmit: (data: RentCar) => void;
}

const RentCarForm: React.FC<RentCarFormProps> = ({ onSubmit}) => {

    const { control, register, handleSubmit, reset, watch, formState: { errors } } = useForm<RentCar>({
        defaultValues: {
            ...initialFormState,
            startRentDate: undefined,
            finishRentDate: undefined,
        },
        mode: 'onChange'
    });

    const Transform = createTransform();
    dayjs.extend(advancedFormat);

    const handleReset = () => {
        reset({
            ...initialFormState,
            startRentDate: null,
            finishRentDate: null,
        });
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
        marginTop: '70px',
        backgroundColor: "secondary.main",
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
        boxSizing: 'border-box',
    }

    const getError = (fieldName: keyof RentCar) => ({
        borderColor: errors[fieldName] ? "error.main" : '#bcbcbc',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: errors[fieldName] ? "error.main" : '#bcbcbc',
            },
            '&:hover fieldset': {
                borderColor: errors[fieldName] ? "error.main" : "secondary.dark",
            },
            '&.Mui-focused fieldset': {
                borderColor: errors[fieldName] ? "error.main" : "secondary.dark",
            },
        },
        '& .MuiFormLabel-root': {
            color: errors[fieldName] ? "error.main": '#636363',
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
            sx={{...FormStyle, ...Transform}}
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
                {...register('email', { required: 'Email is required', pattern: emailPattern })}
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
                className="email"
                label="Email" 
                name="email" 
                placeholder="Email" 
                inputProps={{ pattern: emailPattern }}
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
                inputProps={{ pattern: textPattern }}
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