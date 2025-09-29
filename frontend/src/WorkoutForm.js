import React, { useState } from 'react';
import axios from 'axios';

function WorkoutForm() {
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {
            exercise,
            sets,
            reps,
            weight,
            duration,
            date,
            user: { id: 1 } // Hardcoded pwease replace with actual user ID
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
                <input
                    type="text"
                    placeholder="Exercise"
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Sets"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Weight (lbs)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}

                />
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
