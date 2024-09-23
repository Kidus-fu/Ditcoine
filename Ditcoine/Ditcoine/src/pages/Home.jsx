import Ditcoin from "../assets/Ditcoin.jpg"
import { useState, useEffect } from 'react'
import Footer from '../compount/Foter'
import NavBar from '../compount/NavBar'
import api from "../api"

function Home() {
  const [v, setV] = useState(true)
  useEffect(() => {
    window.addEventListener("resize", () => {

      if (window.innerWidth > 600) {
        setV(l => l = false)
      }

    })
  }, [window.innerWidth])
  useEffect(() => {
    if (window.innerWidth > 600) {
      setV(l => l = false)
    }
  }, [window.innerWidth])
  useEffect(() => {
    api
      .get("news/")
      .then(res => res.data)
      .then(data => console.log(data))
    // api 
    //   .post("news/",{
    //     "catogore": 1,
    //     "Title": "Test to React",
    //     "discrption": "front-end"
    //   })
    //   .then((res) => res.data)
    //   .then(data => console.log(data))
   
  }, [])
  return (<>
    <NavBar />
    <div className="card bg-dark text-white">
      <img className="card-img" src={Ditcoin} alt="Title" />
      <div className="card-img-overlay">
        <div className="container text-dark">

          <center className='mt-5' id='comingSoon'>
            <h2 className='mt-5'>Coming Soon...</h2>
          </center>

        </div>
        <div
          className="container text-dark mt-5"
        >

          <div className="row mt-5">
            <div className="col-5">
              <div className={v ? "visually-hidden" : "card text-center "} id='card'>
                <div className="card-body">
                  <h4 className="card-title">Telegram<i className="fa-brands fa-telegram fs-3 text-primary ms-1"></i></h4>
                  <p className="card-text">Stay Ahead in Crypto with Ditcoin</p>
                  <p>
                    Stay on top of the latest trends and developments in the world of cryptocurrency with Ditcoin.<br /> As a revolutionary digital currency, Ditcoin is your gateway to fast, secure, and decentralized financial transactions.<br /> Whether you’re new to crypto or a seasoned trader, Ditcoin provides the tools and resources you need to succeed.<br />
                    <b>Join our growing community to:</b> <br />
                    Get real-time crypto news and insights.<br />
                    Participate in exclusive Ditcoin airdrops and giveaways.<br />
                    Connect with experts and enthusiasts in the crypto space.<br />
                    Stay ahead of the curve and be part of the future of finance.<br />
                    Follow us for up-to-date news and opportunities in the world of Ditcoin:</p>
                  <a href="https://t.me/Ditcoincrypto" target="_blank" rel="noopener noreferrer" className="nav-link  text-decoration-none text-primary">Telegram Channel <i className="fa-brands fa-telegram"></i></a>
                </div>
              </div>
              {v ? <div className='card text-center card-lg' id='card'>
                <div className="card-body">
                  <p className="card-title">Telegram<i className="fa-brands fa-telegram fs-5 text-primary ms-1"></i></p>
                  ....
                  <a href="https://t.me/Ditcoincrypto" target="_blank" rel="noopener noreferrer" className="nav-link  text-decoration-none text-primary">  Join Our Telegram Channel <i className="fa-brands fa-telegram"></i></a>                </div>
              </div> : ""}
            </div>
            <div className="col-5 mb-5">
              <div className={v ? "visually-hidden" : "card text-center "} id='card'>
                <div className="card-body">
                  <h4 className="card-title">YouTube<i className="fa-brands fa-youtube fs-3 text-danger ms-1"></i></h4>
                  <p className="card-text">Stay Ahead in Crypto with Ditcoin – Subscribe to Our YouTube Channel</p>
                  <p>
                    Looking to dive deeper into the world of cryptocurrency? <br /> Ditcoin’s YouTube channel is your go-to source for in-depth insights, tutorials, and updates on everything crypto-related.<br />

                    By subscribing to our channel, you’ll get access to:<br />

                    Expert analysis on the latest crypto trends.<br />
                    Step-by-step guides on how to use Ditcoin and other digital currencies.<br />
                    Updates on upcoming Ditcoin airdrops and exclusive offers.<br />
                    Live discussions with industry leaders and Ditcoin developers.<br />
                    Stay informed and take your crypto knowledge to the next level.<br />

                    👉 Join our Telegram Channel for more: <a href="https://t.me/Ditcoincrypto" target="_blank" rel="noopener noreferrer" className="nav-link  text-decoration-none text-primary"> Ditcoin <i className="fa-brands fa-telegram"></i></a>

                    Don't forget to subscribe and hit the notification bell to stay updated with our latest videos!</p>
                  <a href="https://t.me/Ditcoincrypto" target="_blank" rel="noopener noreferrer" className="nav-link  text-decoration-none text-primary"> DitcoinYouTube <i className="fa-brands fa-youtube text-danger"></i></a>

                </div>
              </div>
              {v ? <div className='card text-center card-lg' id='card'>
                <div className="card-body">
                  <p className="card-title">YouTube<i className="fa-brands fa-youtube fs-5 text-danger ms-1"></i></p>
                  ....
                  <a href="https://t.me/Ditcoincrypto" target="_blank" rel="noopener noreferrer" className="nav-link  text-decoration-none text-primary"> DitcoinYouTube <i className="fa-brands fa-youtube text-danger"></i></a>
                </div>
              </div> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>)
}

export default Home