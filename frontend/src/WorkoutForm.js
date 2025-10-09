import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WorkoutForm.css';

function WorkoutForm({ user }) {
    const [exercise, setExercise] = useState('');
    const [customExercise, setCustomExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [editWorkout, setEditWorkout] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('exercise');

    //predefined workout list with custom option
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
        '(Custom)'
    ];

    //reset search bar between option changes
    useEffect(() => {
        setSearchTerm('');
    }, [searchType]);

    //get workouts for the user
    useEffect(() => {
        if(user && user.id) {
            axios.get(`http://localhost:8080/workouts/users/${user.id}`).then(response => {
                    setWorkouts(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the workouts!', error);
                });
        }
    }, [user]);

    //submit workout form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalExercise = exercise === '(Custom)' ? customExercise : exercise;

        if(!user || !user.id) {
            return alert('User not logged in!');
        }

        if(!date) {
            return alert('Please select a date for the workout.');
        }

        const localDate = new Date(date + 'T00:00:00');
        const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();

        const workout = {
            exercise: finalExercise,
            sets,
            reps,
            weight,
            duration,
            date: utcDate,
            user: { id: user.id }
        };

        //edit workout or otherwise create new workout
        try {
            if(editWorkout) {
                await axios.put(`http://localhost:8080/workouts/${editWorkout.id}`, workout);
                setEditWorkout(null);
            }else {
                await axios.post('http://localhost:8080/workouts', workout);
                alert('Workout logged successfully!');
            }

            const res = await axios.get(`http://localhost:8080/workouts/users/${user.id}`);
            setWorkouts(res.data);

            // Clear form
            setExercise('');
            setCustomExercise('');
            setSets('');
            setReps('');
            setWeight('');
            setDuration('');
            setDate('');
        }catch(error) {
            console.error('There was an error logging the workout!', error);
        }
    };
    

    const handleEdit = (workout) => {
        setEditWorkout(workout);
        setExercise(workout.exercise);
        setSets(workout.sets);
        setReps(workout.reps);
        setWeight(workout.weight);
        setDuration(workout.duration);
        setDate(workout.date);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                await axios.delete(`http://localhost:8080/workouts/${id}`);
                setWorkouts(workouts.filter(w => w.id !== id));
            } catch (error) {
                console.error('There was an error deleting the workout!', error);
            }
        }
    };

    //format header date
    const formatDateHeader = (dateString) => {
        if (!dateString || dateString === 'Unknown Date') return dateString;
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day).toLocaleDateString();
    };

    //group by date
    const groupedWorkouts = workouts.reduce((groups, workout) => {
        const localDate = workout.date ? new Date(new Date(workout.date).getTime() + new Date(workout.date).getTimezoneOffset() * 60000).toLocaleDateString('en-CA') : 'Unknown Date';

        if(!groups[localDate]) groups[localDate] = [];
        groups[localDate].push(workout);
        return groups;
    }, {});

    //filter by search term
    const filteredWorkouts = searchTerm ? Object.keys(groupedWorkouts).reduce((filtered, date) => {
        const workoutsForDate = groupedWorkouts[date].filter(workout => {
            if(searchType === 'exercise') {
                return workout.exercise.toLowerCase().includes(searchTerm.toLowerCase());
            }
            else if(searchType === 'date') {
                const localeDateString = new Date(new Date(workout.date).getTime() + new Date(workout.date).getTimezoneOffset() * 60000).toLocaleDateString('en-CA');
                return localeDateString === searchTerm;
            }

            return true;
        });

        if(workoutsForDate.length > 0) {
            filtered[date] = workoutsForDate;
        }
        return filtered;
    }, {}) : groupedWorkouts;

    //summary dash
    const [summary, setSummary] = useState({
        totalWorkoutsThisWeek: 0,
        totalWeightThisWeek: 0,
        mostFrequentExercise: 'N/A'
    });

    const calculateSummary = (workoutList) => {
        if(!workoutList.length) {
            setSummary({
                totalWorkoutsThisWeek: 0,
                totalWeightThisWeek: 0,
                mostFrequentExercise: 'N/A'
            });
            
            return;
        }

        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());

        const workoutsThisWeek = workoutList.filter(w => {
            const workoutDate = new Date(new Date(w.date).getTime() + new Date(w.date).getTimezoneOffset() * 60000);
            return workoutDate >= startOfWeek && workoutDate <= now;
        });

        const totalWeight = workoutsThisWeek.reduce((total, w) => total + (w.weight || 0) * (w.sets || 0) * (w.reps || 0), 0);
        const exerciseCount = {};

        workoutsThisWeek.forEach(w => {
            exerciseCount[w.exercise] = (exerciseCount[w.exercise] || 0) + 1;
        });

        let mostFrequent = 'N/A';
        let maxCount = 0;
        for(const [exercise, count] of Object.entries(exerciseCount)) {
            if(count > maxCount) {
                maxCount = count;
                mostFrequent = exercise;
            }
        }

        setSummary({
            totalWorkoutsThisWeek: workoutsThisWeek.length,
            totalWeightThisWeek: totalWeight,
            mostFrequentExercise: mostFrequent
        });
    }
    useEffect(() => {
        calculateSummary(workouts);
    }, [workouts]);

    return(
        <div>
            <h2>{editWorkout ? 'Edit Workout' : 'Log a New Workout'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Exercise Selection */}
                <label>Exercise:</label>
                <select value={exercise} onChange={(e) => setExercise(e.target.value)} required>
                    <option value="">Select Exercise</option>
                    {workoutList.map((w, idx) => (
                        <option key={idx} value={w}>
                            {w}
                        </option>
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
                    {[1, 2, 3, 4, 5].map((num) => (
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
                    placeholder="Enter Weight"
                />

                <label>Duration (minutes):</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter Duration"
                />
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">{editWorkout ? 'Update Workout' : 'Log Workout'} </button>
            </form>

            <h3>Logged Workouts</h3>
            <div>
                <label htmlFor="searchType">Search by: </label>
                <select id="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="exercise">Exercise</option>
                    <option value="date">Date</option>
                </select>

                {searchType === 'date' ? (
                    <input
                        type="date"
                        placeholder="Search by date"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Search by exercise"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                )}
            </div>

            <div className="dashboard-container">
                {/*left side workout log*/}
                <div className="dashboard-left">
                    {Object.keys(filteredWorkouts).length === 0 ? (
                        <p>No workouts logged yet.</p>
                    ) : (
                        Object.keys(filteredWorkouts).sort((a, b) => new Date(b) - new Date(a)).map(date => (
                            <div key={date}>
                                <h4>{formatDateHeader(date)}</h4>
                                <ul>
                                    {filteredWorkouts[date].map((w) => (
                                        <li key={w.id}>
                                            <div>
                                                <strong>{w.exercise}</strong> - {w.sets} sets × {w.reps} reps @ {w.weight} lbs ({w.date})
                                            </div>
                                            <div>
                                                <button onClick={() => handleEdit(w)}>Edit </button>
                                                <button onClick={() => handleDelete(w.id)}>Delete </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>

                {/*right side summary*/}
                <div className="dashboard-right">
                    <h3>Workout Summary (This Week)</h3>
                    <p>Total Workouts: {summary.totalWorkoutsThisWeek}</p>
                    <p>Total Weight Lifted: {summary.totalWeightThisWeek} lbs</p>
                    <p>Most Frequent Exercise: {summary.mostFrequentExercise}</p>
                </div>
            </div>
        </div>
    );
}
export default WorkoutForm;
