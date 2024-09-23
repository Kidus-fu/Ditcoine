import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from 'react-icons/fa';
import NavBar from "./NavBar"
function NewsCard(news){

    return(<>
    <NavBar />
    <div class="card-group mt-2" >
        <div class="card">
            
            <div class="card-body">
                <h4 class="card-title">Hamster Kompact 🐹</h4>
                <p class="card-text">In a recent surge, Hamster Coin has emerged as one of the fastest-growing meme tokens, following in the footsteps of Dogecoin and Shiba Inu. With a focus on community-driven growth and decentralization, the Hamster community has been actively participating in various airdrop events and token burns. Experts suggest this surge is likely due to Hamster's low market cap, giving early investors the chance for higher returns. Stay tuned for updates on upcoming Hamster airdrops!</p>
                <hr />
        <i class="fa-solid fa-heart fs-4 text-danger"></i>
        <i class="fa-solid fa-comment  ms-2 fs-4"></i>
       <i className='fs-4 text-primary'> <FaShare /> </i>
        <div class="input-group mb-3">
  <input type="text" class="form-control borderd rounded-pill" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="send" />
  <button className="btn"><i class="fa-solid fa-paper-plane" id="send"></i></button>
</div>
            </div>
        </div>
    </div>

    
        
    </>)
}
export default NewsCard