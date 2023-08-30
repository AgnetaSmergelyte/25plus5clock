import './App.css';
import LengthBox from "./components/LengthBox";
import CurrentBox from "./components/CurrentBox";

function App() {
    return (
        <div className="container">
            <h1>25 + 5 Clock</h1>
            <div className="d-flex">
                <LengthBox activity="Break" />
                <LengthBox activity="Session" />
            </div>
            <CurrentBox />
        </div>
    );
}

export default App;
