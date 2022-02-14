import { useEffect, useState } from "react";
import { getHours } from "./tasks";

const App = () => {
    const [time, setTime] = useState('');
    const [hours, setHours] = useState(0);

    useEffect(() => {
        setHours(getHours(time));
    }, [time]);

    return (
        <main className="container my-3">
            <div className="mb-3">
                <label htmlFor="time" className="form-label">
                    Time
                </label>

                <textarea
                    id="time"
                    className="form-control"
                    rows="4"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="hours" className="form-label">
                    Hours
                </label>

                <input
                    id="hours"
                    className="form-control"
                    value={hours}
                    readOnly
                />
            </div>

            <div className="d-flex gap-3">
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg flex-grow-1"
                    onClick={_ => setTime('')}
                >
                    Clear
                </button>

                <button
                    type="button"
                    className="btn btn-primary btn-lg flex-grow-1"
                    onClick={_ => navigator.clipboard.writeText(hours)}
                >
                    Copy
                </button>
            </div>
        </main>
    );
};

export default App;
