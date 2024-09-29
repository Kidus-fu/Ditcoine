import React, { useEffect , useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../compount/NavBar'
import Footer from '../compount/Foter';
const AboutUs = () => {
  const [isFored,setisFored] = useState(false)

  const handleJoinTelegram = () => {
    window.open('https://t.me/Ditcoincrypto', '_blank');
  };
  useEffect(() => {
    if (history.forward !== null){
      setisFored(true)
    }
    document.title = "Ditcoine | About Us"
  },[])
  const handleSharePage = () => {
    const shareUrl = document.URL;
    const shareText = "Ditcoin" // Adjust the URL structure as needed

    if (navigator.share) {
      // If the Web Share API is supported
      navigator.share({
        title: shareText,
        url: shareUrl,
      })
      .then(() => console.log('Share successful'))
      .catch((error) => console.log('Share failed:', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.log('Could not copy text: ', err));
    }
  };
  return (
    <> 
    <NavBar />
    <div className="container mt-5" style={{position:"absolute"}} onContextMenu={e => {
    e.preventDefault()
    let Height = e.view.innerHeight
    let scY = e.screenY
    let box2 = document.querySelector(".box2")
    if (Height - scY > 100 && e.view.innerWidth - e.screenX > 200){ 
    box2.style.display = " block"
    box2.style.top = e.pageY + "px";
    box2.style.left = e.pageX + "px";
    }else{
      box2.style.display = " block"
      box2.style.top = (e.pageY-300) + "px";
      if (e.screenX > 600){
        box2.style.left = (e.pageX-150) + "px";
      }else{
        box2.style.left = (e.pageX-20) + "px";
      }
    }

  }} onClick={() => {
    document.querySelector(".box2").style.display = "none"
  }}>
      <h1 className="text-center mb-4">About Us</h1>
      <p>
        {history.forward() ? "yes":"no"}
        Welcome to <strong>Ditcoin</strong>, your go-to source for the latest news and updates in the world of cryptocurrency and airdrops. 
        As the digital finance space continues to evolve at a rapid pace, Ditcoin is here to keep you informed and ahead of the curve. 
        Our platform is designed to bring you timely and accurate information about new coins, blockchain developments, and exclusive airdrop opportunities.
      </p>
      
      <h2 className="mt-4">Our Mission</h2>
      <p>
        At Ditcoin, our mission is to empower the global crypto community by providing a central hub for news, insights, and airdrop notifications. 
        We aim to make sure you never miss an important update or the chance to participate in exciting airdrops from emerging blockchain projects.
      </p>
      <p>We strive to:</p>
      <ul>
        <li>Deliver up-to-date news on cryptocurrency markets, trends, and technologies.</li>
        <li>Highlight airdrop opportunities, ensuring our community stays informed about free token giveaways.</li>
        <li>Build a thriving community of crypto enthusiasts and traders who share a passion for decentralized finance.</li>
      </ul>

      <h2 className="mt-4">What We Offer</h2>
      <ul>
        <li><strong>Real-Time Crypto News:</strong> Stay informed with the latest news on Bitcoin, Ethereum, altcoins, and the broader blockchain industry.</li>
        <li><strong>Airdrop Alerts:</strong> We bring you exclusive updates on upcoming airdrops, so you can participate early and benefit from free crypto tokens.</li>
        <li><strong>Expert Insights:</strong> Get analysis and opinions from industry professionals to better navigate the crypto landscape.</li>
      </ul>

      <h2 className="mt-4">Join the Conversation</h2>
      <p>
        Crypto is more than just a technology—it’s a global movement, and we want you to be part of it. 
        Follow us on <a href="https://t.me/Ditcoincrypto" target="_blank" rel="noopener noreferrer">Telegram</a> to get instant updates on the hottest trends in the crypto world, and never miss out on a new airdrop.
      </p>
      
      <button className="btn btn-primary btn-lg mt-3" onClick={handleJoinTelegram}>
        Join Our Telegram Channel
      </button>

      <p className="mt-4">
        Together, we can unlock the full potential of digital assets and decentralized finance.
      </p>
    </div>
    <div className="box2">
            <div className="f " onClick={() => {
              history.back()
            }}><i className="fas fa-arrow-left me-2"></i>Back</div>
            {isFored ? <div className="f" onClick={() => {
              history.forward()
            }}><i className="fas fa-arrow-right me-2"></i>Forward</div>:""}
            <div className="f " onClick={() => {
              setLoading(true)
            }}><i className="fas fa-retweet me-2"></i>Refresh</div>
            <div className="f"  onClick={() => {
              const s = window.getSelection().toString()
              if(s){
                console.log(s)
              }else{
                console.log("a")
              }
            }}><i className="fas fa-copy me-2"></i>Copy-Ctrl + c</div>
            <div className="f" onClick={() => {
              handleSharePage()
            }}><i className="fas fa-share-from-square me-2"></i>Share</div>
            
            <div className="f">cut</div>
            <div className="f">cut</div>
            <hr />
            <div className="f">cut</div>
            <div className="f" onClick={() => {
              document.querySelector(".box2").style.display = "none"
            }}> <i className="fas fa-x me-2"></i> Exit</div>
   
        </div>
       
    </>
  );
}

export default AboutUs;
