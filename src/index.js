import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#314F9D",
        fontFamily: "'Poppins', sans-serif",
      },
      components: {
        Form: {
          labelColor: "#696969",
          labelFontSize: 20,
        },
        Input: {
          controlHeight: 50,
          fontSize: 16,
          colorBgContainer: "#efeeee",  // background color
          // colorBgContainer: "#DBDADA",  // background color
          activeBg: "transparent",      // ✅ correct value
          hoverBg: "#DBDADA",           // optional (prevent color change on hover)
          activeBorderColor: "#314F9D", // optional focus border
          borderRadius: 10
        },
      },
    }}
  >
        <App />
      </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
