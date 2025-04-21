import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom } from '../features/rooms/roomSlice';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    type: '',
    price: '',
    availability: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRoom(form));
    navigate('/');
  };

  return (
    <div>
      <h1>➕ Add Room</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Hotel Name" onChange={handleChange} required /><br />
        <input name="location" placeholder="Location" onChange={handleChange} required /><br />
        <input name="type" placeholder="Room Type" onChange={handleChange} required /><br />
        <input name="price" type="number" placeholder="Price/Night" onChange={handleChange} required /><br />
        <input name="availability" placeholder="Availability (yes/no)" onChange={handleChange} required /><br />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
