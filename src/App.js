// import logo from './logo.svg';
// import './App.css';
import Login from '../src/components/Login';
import Layout from '../src/components/Layout/Layout';
import SignUp from './components/SignUp';
import AppRouter from './routes/AppRouter.jsx';

function App() {
  return (
    <div style={styles.container}>
      <AppRouter />
      {/* <SignUp /> */}
     {/* <Login /> */}
     {/* <Layout /> */}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",   // use full viewport height
    // overflow: "hidden", // prevent scroll
    scrollBarWidth:'none !important',
    fontFamily: "'Poppins', sans-serif",
  }
}
export default App;
