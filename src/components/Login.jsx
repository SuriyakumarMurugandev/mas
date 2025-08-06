import { Col, Image, Row } from "antd";
import LoginCard from "./LoginCard";
import './Login.css';
const background = require('../assets/handshake-businessmen 1.png')

const Login = () =>{
   return(
    <Row style={{display:'flex',overflow:'auto',scrollbarWidth:'none'}}>
        {/* <Col span={12}> */}
           <Image src={background} preview={false}  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* </Col> */}
        <Col span={12} className="fade-in-up" style={{position:'absolute',top:'20%',left:'5%',zIndex:99,fontSize:120,color:'#ffff',fontWeight:'bold'}}>
           Your <br /> Workday<br /> Starts Here... 
        </Col>
        <Col span={12}>
           <LoginCard />
        </Col>
    </Row>
   )
}

export default Login;