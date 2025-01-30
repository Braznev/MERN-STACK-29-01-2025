const { useState } = require("react")

const WorkoutForm=()=>{
    const[title, SetTitle]=useState('')
    const[load, SetLoad]=useState('')
    const[reps, SetReps]=useState('')
    const[error, SetError]=useState(null)

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const workout = {title, load, reps}
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json=await response.json()

        if(!response.ok){
            SetError(json.error)
        }
        if(response.ok){
            SetTitle('')
            SetLoad('')
            SetReps('')
            SetError(null)
            console.log('New Workout added', json)
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3> Add a new workout</h3>
            <label> Exercise Title:</label>
            <input 
            type="text"
            onChange={(e)=>SetTitle(e.target.value)}
            value={title}
            />

            <label> Load (in kg):</label>
            <input 
            type="number"
            onChange={(e)=>SetLoad(e.target.value)}
            value={load}
            />

            <label> Reps</label>
            <input 
            type="number"
            onChange={(e)=>SetReps(e.target.value)}
            value={reps}
            />
            <button>Add Workout</button> 
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm