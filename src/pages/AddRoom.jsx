import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom } from '../features/rooms/roomSlice';  // make sure path is correct
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to backend
      const response = await fetch('https://your-backend-url.com/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to add room');
      }

      const savedRoom = await response.json();

      dispatch(addRoom(savedRoom));

      navigate('/');
    } catch (error) {
      console.error('Error while adding room:', error);
      alert('Something went wrong while adding the room. Please try again.');
    }
  };

  return (
    <div>
      <h1>➕ Add Room</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Hotel Name" onChange={handleChange} required /><br />
        <input name="location" placeholder="Location" onChange={handleChange} required /><br />
        <input name="type" placeholder="Room Type" onChange={handleChange} required /><br />
        <input name="price" type="number" placeholder="Price/Night" onChange={handleChange} required /><br />
        <input name="availability" placeholder="Availability (Yes/No)" onChange={handleChange} required /><br />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
