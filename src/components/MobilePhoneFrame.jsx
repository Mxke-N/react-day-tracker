import PhoneTime from "./PhoneTime.jsx";

function MobilePhoneFrame({ mainLink, mainLinkText, children }) {
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

        {children}

        <div className="iphone-bottom">
          <div className="iphone-bottom-link">
            <span>🔒</span>
            <a href={mainLink} target="_blank" rel="noopener noreferrer">
                {mainLinkText}
            </a>
          </div>
          <div className="iphone-bottom-home"></div>
        </div>
      </div>
    </div>
  )
}

export default MobilePhoneFrame