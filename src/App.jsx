import MobilePhoneFrame from "./components/MobilePhoneFrame.jsx";
import TimeTrackerApp from "./pages/TimeTrackerApp.jsx";

function App() {
  return (
    <MobilePhoneFrame
      mainLink="https://github.com/Mxke-N/react-day-tracker"
      mainLinkText="mxke-n.github.io"
    >
      <TimeTrackerApp />
    </MobilePhoneFrame>
  )
}

export default App
