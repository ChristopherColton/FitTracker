import React, { useState } from 'react';
import axios from 'axios';

function WorkoutForm({ user }) {
    const [exercise, setExercise] = useState('');
    const [customExercise, setCustomExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');

    const workoutList = [
        'Bench Press',
        'Squats',
        'Deadlifts',
        'Overhead Press',
        'Barbell Rows',
        'Pull-Ups',
        'Dips',
        'Bicep Curls',
        'Tricep Extensions',
        'Custom'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalExercise = exercise === 'Custom' ? customExercise : exercise;

        if (!user || !user.id) {
            alert('User not logged in!');
            return;
        }

        const workout = {
            exercise: finalExercise,
            sets,
            reps,
            weight,
            duration,
            date,
            user: { id: user.id } // Hardcoded pwease replace with actual user ID
        };

        try {
            await axios.post('http://localhost:8080/workouts', workout);
            alert('Workout logged successfully!');

            // Clear form
            setExercise('');
            setSets('');
            setReps('');
            setWeight('');
            setDuration('');
            setDate('');
        } catch (error) {
            console.error('There was an error logging the workout!', error);
        }
    };

    return (
        <div>
            <h2>Log a New Workout</h2>
            <form onSubmit={handleSubmit}>
                {/* Exercise Selection */}
                <label>Exercise:</label>
                <select value={exercise} onChange={(e) => setExercise(e.target.value)} required>
                    <option value="">Select Exercise</option>
                    {workoutList.map((w, idx) => (
                        <option key={idx} value={w}>{w}</option>
                    ))}
                </select>

                {/*Custom Exercise Input */}
                {exercise === 'Custom' && (
                    <input
                        type="text"
                        placeholder="Enter custom exercise"
                        value={customExercise}
                        onChange={(e) => setCustomExercise(e.target.value)}
                        required
                    />
                )}

                <label>Sets:</label>
                <select value={sets} onChange={(e) => setSets(e.target.value)} required>
                    <option value="">Select Sets</option>
                    {[1 ,2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>

                <label>Reps:</label>
                <select value={reps} onChange={(e) => setReps(e.target.value)} required>
                    <option value="">Select Reps</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>   

                <label>Weight (lbs):</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight lifted"
                />

                <label>Duration (minutes):</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter duration"
                />
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Log Workout</button>
            </form>
        </div>
    );
}
export default WorkoutForm;
