import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField"; 
import "./App.css";

function DateStep({ dateSelected, timeSelected }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate.toDate());    
    dateSelected(newDate.toDate());
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    timeSelected(newTime);
  };

  const disablePastDates = (date) => {
    return date.isBefore(dayjs(), "day");
  };

  const dateFormated = dayjs(selectedDate).format("MMM D YYYY")
  return (
    <>
      {/* <div>Booking Type</div> */}
      <div className="w-full flex flex-col md:flex-row h-[50vh] items-center justify-center">
        <div className="flex-1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate ? dayjs(selectedDate) : null}
              onChange={handleDateChange}
              views={["day"]}
              shouldDisableDate={disablePastDates}
              className={"datePickerClassName"}
            />
          </LocalizationProvider>
        </div>
        <div className="flex-1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="Pick a Time"
                // defaultValue={dayjs('2022-04-17T15:30')}
                className={"timePickerClassName"}

                value={selectedTime}
                onChange={handleTimeChange}
                renderInput={(params) => <TextField {...params} 
                />}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>     
    </>
  );
}

export default DateStep;
