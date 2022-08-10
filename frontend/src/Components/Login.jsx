import React, { useState } from 'react'
import Header from './Elements/Header'
import config from '../config'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/userSlice'
import Footer from './Elements/Footer'

export default function Login() {

  const history = useHistory()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")

  const dispatch = useDispatch()

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const formSubmit = () => {

    if (!isValidEmail(email)) {
      seterror({ variant: "danger", data: "Wrong Email Pattern" })
    } else {
      if (password.split("").length == 0) {
        seterror({ variant: "danger", data: "Enter Password" })
      } else {
        axios.post(`${config.baseURL}/login.php`, {
          email,
          password
        }).then((result) => {
          let getData = result.data
          console.log(getData);
          if (getData.status == 'false') {
            seterror({ variant: "danger", data: getData.data })
          }
          if (getData.status == 'not_verified') {
            seterror({ variant: "danger", data: getData.data })
          }
          if (getData.status == 'true') {
            seterror({ variant: "success", data: getData.data.message })
            dispatch(login({
              email,
              token: getData.data.token,
              loginStatus: 2
            }))
            history.push('/')
          }
        })
      }
    }

  }

  return (
    <div>
      {/* START LOADER */}
      <div id="loader-wrapper">
        <div id="loading-center-absolute">
          <div className="object" id="object_four" />
          <div className="object" id="object_three" />
          <div className="object" id="object_two" />
          <div className="object" id="object_one" />
        </div>
        <div className="loader-section section-left" />
        <div className="loader-section section-right" />
      </div>
      {/* END LOADER */}
      {/* START HEADER */}
      {/* END HEADER */}{/* START SECTION BANNER */}
      <section className="section_breadcrumb bg_navy_blue" data-z-index={1} data-parallax="scroll" data-image-src="assets/images/home_banner_bg.png">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="banner_text text-center">
                <h1 className="animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="1.1s" style={{ animationDelay: '1.1s', opacity: 1 }}>Login</h1>
                <ul className="breadcrumb bg-transparent justify-content-center animation m-0 p-0 animated fadeInUp" data-animation="fadeInUp" data-animation-delay="1.3s" style={{ animationDelay: '1.3s', opacity: 1 }}>
                  <li><a href="/">Home</a> </li>
                  <li><span>Login</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END SECTION BANNER */}
      {/* START SECTION LOGIN */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="authorize_box">
                <div className="title_default_dark title_border text-center">
                  <h4 className="animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="0.2s" style={{ animationDelay: '0.2s', opacity: 1 }}>Welcome</h4>
                  <p className="animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="0.4s" style={{ animationDelay: '0.4s', opacity: 1 }}>Sign in to your account</p>
                </div>
                <div className="field_form authorize_form">
                  <div>
                    {error != "" &&
                      <div className={"alert alert-" + error.variant} role="alert">
                        {error.data}
                      </div>
                    }
                    <div className="form-group col-md-12 animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="0.5s" style={{ animationDelay: '0.5s', opacity: 1 }}>
                      <input onChange={(e) => setemail(e.target.value)} type="email" className="form-control" required placeholder="Email" name="username" />
                    </div>
                    <div className="form-group col-md-12 animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="0.6s" style={{ animationDelay: '0.6s', opacity: 1 }}>
                      <input onChange={(e) => setpassword(e.target.value)} type="password" className="form-control" required placeholder="Password" name="password" />
                    </div>
                    <div className="form-group col-md-12 text-center animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="0.6s" style={{ animationDelay: '0.6s', opacity: 1 }}>
                      <button className="btn btn-default btn-radius" type="submit" name="login_user" onClick={() => formSubmit()}>Submit</button>
                    </div>
                    <div className="form-group col-md-12 text-center animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="0.6s" style={{ animationDelay: '0.6s', opacity: 1 }}>
                      <Link className="forgot_pass" to='/forget'>Forgot Password?</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider small_divider" />
              <div className="text-center">
                <span className="animation animated fadeInUp" data-animation="fadeInUp" data-animation-delay="0.6s" style={{ animationDelay: '0.6s', opacity: 1 }}>Don't have an account?<Link to='/register'> Register</Link></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="spop-container spop--bottom-left" id="spop--bottom-left" />
      <a href="#" className="scrollup btn-default" style={{ display: 'none' }}><i className="ion-ios-arrow-up" /></a>
      <Footer/>
    </div>
  )
}
