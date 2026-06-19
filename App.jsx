import { useEffect, useState } from "react";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import "./App.css";

function App() {

  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const res = await fetch("http://localhost:5000/habits");
    const data = await res.json();
    setHabits(data);
  };

  const addHabit = async (name) => {
    await fetch("http://localhost:5000/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    fetchHabits();
  };

  const toggleHabit = async (id) => {
    await fetch(`http://localhost:5000/habits/${id}`, {
      method: "PUT"
    });

    fetchHabits();
  };

  const deleteHabit = async (id) => {
    await fetch(`http://localhost:5000/habits/${id}`, {
      method: "DELETE"
    });

    fetchHabits();
  };

  const completedCount = habits.filter(h => h.completed).length;

  let color = "red";

  if (completedCount >= habits.length * 0.8 && habits.length > 0)
    color = "green";
  else if (completedCount >= habits.length * 0.4)
    color = "yellow";

  return (
    <div className="container">
      <h1>Smart Habit Tracker</h1>

      <div className={`progress ${color}`}>
        Progress: {completedCount}/{habits.length}
      </div>

      <HabitForm addHabit={addHabit} />

      <HabitList
        habits={habits}
        toggleHabit={toggleHabit}
        deleteHabit={deleteHabit}
      />
    </div>
  );
}

export default App;
