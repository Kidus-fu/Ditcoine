import { DATE } from "mysql/lib/protocol/constants/types"

function Footer(){
    return(<>
        <footer>
        <ul className="nav justify-content-center" id="Nav">
  <li className="nav-item">
    <a className="nav-link active text-decoration-none text-dark" aria-current="page" href="#"></a>
  </li>
  <li className="nav-item">
    <h4 id="ContactUs">Contact Us</h4>
    <p><i className="fa-brands fa-tiktok text-dark fs-3 mx-2"></i>TikTok<i className="fa-brands fa-instagram  mx-2 fs-3 text-danger"></i> Instagram<i class="fa-brands fa-linkedin  mx-2 fs-3 text-primary"></i> linkedin<i class="fa-brands fa-facebook text-primary fs-3 mx-2"></i>feacebook</p>
    
  </li>
  </ul>
        </footer>
    </>)
}
export default Footer