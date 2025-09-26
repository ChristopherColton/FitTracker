import axios from "axios";

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [filterExercise, setFilterExercise] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/workouts/user/1')
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the workouts!', error);
      });
  }, [filterExercise]);

    

  return <div>WorkoutList</div>;
}