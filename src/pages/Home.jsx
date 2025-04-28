import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.css';
import { fetchRooms, deleteRoom } from '../features/rooms/roomSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { list: rooms, loading } = useSelector((state) => state.rooms);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [searchLocation, setSearchLocation] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const filteredRooms = rooms.filter((room) => {
    const locationMatch = room.location.toLowerCase().includes(searchLocation.toLowerCase());
    const availabilityMatch = availability ? room.availability === availability : true;
    return locationMatch && availabilityMatch;
  });

  const handleEdit = (roomId) => {
    alert(`Edit Room ID: ${roomId} (implement later)`);
  };

  // ⬇️ FULL ROOM DELETE - send complete room object
  const handleDelete = async (room) => {
    console.log(room);
    if (window.confirm(`Are you sure you want to delete room: ${room.hotelName}?`)) {
      try {
        const response = await fetch(`https://your-backend-url.com/rooms/delete`, {
          method: 'POST', // Using POST because we are sending body
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(room), // Send full room
        });

        if (!response.ok) {
          throw new Error('Failed to delete room');
        }

        // If successful delete from Redux store
        dispatch(deleteRoom(room.id));
        alert('Room deleted successfully!');
      } catch (error) {
        console.error('Error deleting room:', error);
        alert('Failed to delete room. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h1>🏨 Hotel Room List 🏨</h1>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="">All</option>
          <option value="Yes">Available</option>
          <option value="No">Not Available</option>
        </select>

        <Link to="/add">
          <button className="add-btn">Add Room</button>
        </Link>
      </div>

      <div className="grid">
        {loading ? (
          <p>Loading rooms...</p>
        ) : filteredRooms.length === 0 ? (
          <p>No matching rooms</p>
        ) : (
          filteredRooms.map((room) => (
            <div key={room.id} className="card">
              <h3>{room.name}</h3>
              <p><strong>📍 Location:</strong> {room.location}</p>
              <p><strong>🛏️ Type:</strong> {room.type}</p>
              <p><strong>💰 Price:</strong> ₹{room.price}</p>
              <p><strong>✅ Available:</strong> {room.availability}</p>

              {isAdmin && (
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(room.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(room)}>Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
