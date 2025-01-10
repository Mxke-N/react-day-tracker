import Home from "./pages/Home.jsx";
import PhoneTime from "./components/PhoneTime.jsx";

function App() {
  return (
    <div className="iphone-frame">
      <div className="iphone-content">
        <div className="iphone-top">
          <PhoneTime />
          <div className="iphone-notch"></div>
          <div className="iphone-status">
            <h4>📶</h4>
            <h4>🛜</h4>
            <h4 className="iphone-battery">🔋</h4>
          </div>
        </div>
        <Home />
        <div className="iphone-bottom"></div>
      </div>
    </div>
  )
}

export default App
