import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

export default function Calendar(props) {
  const [value, onChange] = useState(new Date());
  console.log(value)
  // const { handleDate } = this.props;

  // const Child = (props) => {
  //   return (
  //     <div style={{backgroundColor: props.eyeColor}} />
  //   )
  // }

  return (
    <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
        disableClock={true}
      />
      {/* Guardar el tiempo de reserva */}
      {/* <label htmlFor="time">Specify the time you want to reserve:</label>
      <input
        type="number"
        name="time"
        id="time"
        onChange={onChange}
      /> */}
      <button onClick={()=>{props.handleDate(props.idEstablishment, value)}}>Book!</button>
    </div>
  );
}