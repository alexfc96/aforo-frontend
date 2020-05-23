import React, { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'

export default function Calendar(props) {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DateTimeRangePicker
        onChange={onChange}
        value={value}
        disableClock="true"
      />
      <button onClick={()=>{props.handleDate(props.idEstablishment, value)}}>Book!</button>
    </div>
  );
}