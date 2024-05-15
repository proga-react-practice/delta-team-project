import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { RentCar } from "../../../interfaces";
import { StyledTableCell } from "../styledComponents/StyledTableCell";
import { StyledTableRow } from "../styledComponents/StyledTableRow";
import { StyledButtonDelete } from "../styledComponents/StyledButtonDelete";
import { StyledButtonEdit } from "../styledComponents/StyledButtonEdit";
import { StyledButtonSave } from "../styledComponents/StyledButtonSave";
import { StyledTextField } from "../styledComponents/StyledTextField";
import { createTransform } from "../animations/animation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateTimeValidationError } from "@mui/x-date-pickers/models";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface FormResultsProps {
  forms: RentCar[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newData: RentCar) => void;
}

export const FormResults: React.FC<FormResultsProps> = ({
  forms,
  onDelete,
  onEdit,
}) => {
  const theme = useTheme();
  const Transform = createTransform(theme);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<RentCar | null>(null);
  const [error, setError] = React.useState<DateTimeValidationError | null>(
    null
  );

  const textPattern = /^[A-Z][a-z]*$/;
  const numberPattern = /^\+38\(0\d{2}\) \d{3} \d{4}$/;
  const emailPattern = /.+@.+/;

  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditingData(forms[index]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingIndex(null);
    setEditingData(null);
    setOpenDialog(false);
  };

  const handleSaveClick = () => {
    if (editingIndex !== null && editingData !== null) {
      if (!validateForm()) {
        return;
      }
      onEdit(editingIndex, editingData);
    }
    setEditingIndex(null);
    setEditingData(null);
    setOpenDialog(false);
  };

  const handleInputChange =
    (prop: keyof RentCar) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditingData(
        (prev) =>
          ({
            ...prev,
            [prop]: event.target.value,
          } as RentCar)
      );
    };

  const handleDateChange =
    (prop: keyof RentCar) => (newValue: Dayjs | null) => {
      setEditingData(
        (prev) =>
          ({
            ...prev,
            [prop]: newValue,
          } as RentCar)
      );
    };

  const validateForm = () => {
    if (editingData) {
      if (
        editingData.firstName === "" ||
        editingData.lastName === "" ||
        editingData.phoneNumber === "" ||
        editingData.email === "" ||
        editingData.placeOfIssue === "" ||
        editingData.startRentDate === null ||
        editingData.finishRentDate === null ||
        !textPattern.test(editingData.firstName) ||
        !textPattern.test(editingData.lastName) ||
        !textPattern.test(editingData.placeOfIssue) ||
        !numberPattern.test(editingData.phoneNumber) ||
        !emailPattern.test(editingData.email)
      ) {
        return false;
      }
    }
    return true;
  };

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Finish Rent Date should be at least 5 hours later than Start Rent Date";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const FormResultStyle = {
    ...Transform,
    display: "flex",
    width: "100%",
    minWidth: "820px",
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: "20px",
    marginTop: "50px",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.15)",
  };

  const DialogButtons = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const DateAndTimeStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    boxSizing: "border-box",
  };

  return (
    <TableContainer sx={FormResultStyle}>
      <Table aria-label="customize table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Phone Number</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Place Of Issue</StyledTableCell>
            <StyledTableCell>Start Rent Date</StyledTableCell>
            <StyledTableCell>End Rent Date</StyledTableCell>
            <StyledTableCell>Comments</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map((form, index) => (
            <StyledTableRow key={index}>
              {index === editingIndex ? (
                <React.Fragment>
                  <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Edit Form</DialogTitle>
                    <DialogContent>
                      {editingData && (
                        <>
                          <StyledTextField
                            label="First Name"
                            value={editingData.firstName}
                            error={
                              editingData.firstName === "" ||
                              !textPattern.test(editingData.firstName)
                            }
                            helperText={
                              editingData.firstName === ""
                                ? "This field is required"
                                : !textPattern.test(editingData.firstName)
                                ? "First Name must start with a capital letter and cannot contain numbers or special characters"
                                : ""
                            }
                            onChange={handleInputChange("firstName")}
                          />
                          <StyledTextField
                            value={editingData?.lastName || ""}
                            error={
                              editingData.lastName === "" ||
                              !textPattern.test(editingData.lastName)
                            }
                            helperText={
                              editingData.lastName === ""
                                ? "This field is required"
                                : !textPattern.test(editingData.lastName)
                                ? "Last Name must start with a capital letter and cannot contain numbers or special characters"
                                : ""
                            }
                            onChange={handleInputChange("lastName")}
                          />
                          <StyledTextField
                            value={editingData?.phoneNumber}
                            error={
                              editingData.phoneNumber === "" ||
                              !numberPattern.test(editingData.phoneNumber)
                            }
                            helperText={
                              editingData.phoneNumber === ""
                                ? "This field is required"
                                : !numberPattern.test(editingData.phoneNumber)
                                ? "Phone number must be in the format +38(0xx) xxx xxxx and contain only digits."
                                : ""
                            }
                            onChange={handleInputChange("phoneNumber")}
                          />
                          <StyledTextField
                            value={editingData?.email}
                            error={
                              editingData.email === "" ||
                              !emailPattern.test(editingData.email)
                            }
                            helperText={
                              editingData.email === ""
                                ? "This field is required"
                                : !emailPattern.test(editingData.email)
                                ? "Email must contain @"
                                : ""
                            }
                            onChange={handleInputChange("email")}
                          />
                          <StyledTextField
                            value={editingData?.placeOfIssue}
                            error={
                              editingData.placeOfIssue === "" ||
                              !textPattern.test(editingData.placeOfIssue)
                            }
                            helperText={
                              editingData.placeOfIssue === ""
                                ? "This field is required"
                                : !textPattern.test(editingData.placeOfIssue)
                                ? "Place of Issue must start with a capital letter and cannot contain numbers or special characters"
                                : ""
                            }
                            onChange={handleInputChange("placeOfIssue")}
                          />
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              value={editingData?.startRentDate || null}
                              minDateTime={dayjs()}
                              onError={(newError) => setError(newError)}
                              slotProps={{
                                textField: {
                                  helperText: errorMessage,
                                },
                              }}
                              onChange={handleDateChange("startRentDate")}
                              sx={DateAndTimeStyle}
                            />
                            <DateTimePicker
                              value={editingData?.finishRentDate || null}
                              minDateTime={
                                editingData?.startRentDate
                                  ? editingData.startRentDate.add(5, "hour")
                                  : dayjs()
                              }
                              onError={(newError) => setError(newError)}
                              slotProps={{
                                textField: {
                                  helperText: errorMessage,
                                },
                              }}
                              onChange={handleDateChange("finishRentDate")}
                              sx={DateAndTimeStyle}
                            />
                          </LocalizationProvider>
                          <StyledTextField
                            value={editingData?.comments}
                            onChange={handleInputChange("comments")}
                          />
                        </>
                      )}
                    </DialogContent>
                    <DialogActions sx={DialogButtons}>
                      <StyledButtonDelete
                        sx={{ width: "40%" }}
                        onClick={handleCloseDialog}
                      >
                        Close
                      </StyledButtonDelete>
                      <StyledButtonSave
                        sx={{ width: "40%" }}
                        onClick={handleSaveClick}
                      >
                        Save
                      </StyledButtonSave>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <StyledTableCell>{form.firstName}</StyledTableCell>
                  <StyledTableCell>{form.lastName}</StyledTableCell>
                  <StyledTableCell>{form.phoneNumber}</StyledTableCell>
                  <StyledTableCell>{form.email}</StyledTableCell>
                  <StyledTableCell>{form.placeOfIssue}</StyledTableCell>
                  <StyledTableCell>
                    {form.startRentDate.format("YYYY-MM-DD HH:mm")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {form.finishRentDate.format("YYYY-MM-DD HH:mm")}
                  </StyledTableCell>
                  <StyledTableCell>{form.comments}</StyledTableCell>
                  <StyledTableCell>
                    <StyledButtonDelete onClick={() => onDelete(index)}>
                      Delete
                    </StyledButtonDelete>
                    <StyledButtonEdit onClick={() => handleEditClick(index)}>
                      Edit
                    </StyledButtonEdit>
                  </StyledTableCell>
                </React.Fragment>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
