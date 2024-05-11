import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import InputMask from 'react-input-mask';
import { RentCar, initialFormState } from '../../../interfaces';
import { Button, Box, useTheme, FormHelperText } from '@mui/material';
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
        defaultValues: initialFormState,
        mode: 'onChange'
    });

    const theme = useTheme();
    const Transform = createTransform(theme);
    dayjs.extend(advancedFormat);

    const handleReset = () => {
        reset(initialFormState);
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
                                value: /^[A-Z][a-z]*$/, 
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
                                value: /^[A-Z][a-z]*$/, 
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
                    <FormHelperText error>
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
                    value: /\+38\(0\d{2}\) \d{3} \d{4}/,
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
                {...register('email', { required: 'Email is required', pattern: /.+@.+/ })}
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
                className="email"
                label="Email" 
                name="email" 
                placeholder="Email" 
                inputProps={{ pattern: ".+@.+" }}
            />
            <StyledTextField 
                {...register('placeOfIssue', { 
                    required: 'Place of Issue is required', 
                    pattern: {
                        value: /^[A-Z][a-z]*$/, 
                        message: 'Place of Issue must start with a capital letter and cannot contain numbers or special characters'
                    } 
                })}
                error={Boolean(errors.placeOfIssue)}
                helperText={errors.placeOfIssue && errors.placeOfIssue.message}
                className="placeOfIssue"
                label="Place of Issue"   
                name="placeOfIssue" 
                placeholder="Place of Issue" 
                inputProps={{ pattern: "^[A-Z][a-z]*$" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    name="startRentDate"
                    control={control}
                    rules={{ required: 'Start Rent Date is required' }}
                    render={({ field: { onChange, ref } }) => (
                        <>
                            <DateTimePicker
                                onChange={onChange}
                                value={dayjs().add(1, 'h')}
                                label="Start Rent Date"
                                ref={ref}
                                sx={DateAndTimeStyle}  
                                format="YYYY-MM-DD HH:mm"
                                minDateTime={dayjs()}
                            />
                            {errors.startRentDate && (
                                <FormHelperText error>
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
                    render={({ field: { onChange, ref } }) => (
                        <>
                            <DateTimePicker
                                onChange={onChange}
                                value={dayjs().add(6, 'h')}
                                label="Finish Rent Date"
                                ref={ref}
                                sx={DateAndTimeStyle}
                                format="YYYY-MM-DD HH:mm"
                                minDateTime={watch('startRentDate') ? dayjs(watch('startRentDate')).add(5, 'h') : dayjs()}
                            />
                            {errors.finishRentDate && (
                                <FormHelperText error>
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