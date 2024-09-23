import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../compount/NavBar'
import Footer from '../compount/Foter';
const AboutUs = () => {
  const handleJoinTelegram = () => {
    window.open('https://t.me/Ditcoincrypto', '_blank');
  };

  return (
    <> 
    <NavBar />
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Us</h1>
      <p>
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
    <Footer />
    </>
  );
}

export default AboutUs;
