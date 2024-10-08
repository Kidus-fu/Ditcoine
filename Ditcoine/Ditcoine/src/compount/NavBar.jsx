import { useState } from "react";

function NavBar(){
  const [user,setUser] = useState("Guest")
  if (localStorage.getItem("Username") !== user){
    setUser(localStorage.getItem("Username"))
  }
    return(<>
        <ul className="nav justify-content-center sticky-top bg-light" id="Nav">
  <li className="nav-item">
    <a className="nav-link active text-decoration-none text-dark" aria-current="page" href="/"><i className="fa-solid fa-house me-1"></i>Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link  text-decoration-none text-dark" aria-current="page" href="/About"><i className="fa-solid fa-circle-info me-1 text-info"></i>About</a>
  </li>
  <li className="nav-item">
    <a className="nav-link  text-decoration-none text-dark" aria-current="page" href="#ContactUs"><i className="fa-regular fa-message me-1 text-primary"></i>countact us</a>
  </li>
  <li className="nav-item">
<button className=" btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#Navbaroffcanvas" aria-controls="Navbaroffcanvas">
<i className="fa-solid fa-bars text-dark"></i>
</button>

<div className="offcanvas offcanvas-start bg-dark text-light" tabIndex="-1" id="Navbaroffcanvas" aria-labelledby="NavbaroffcanvasLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="NavbaroffcanvasLabel">Ditcoin</h5>
    <button type="button" className="btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <p> user: {user}</p>
    <div>
     <a href="/news" className="nav-link text-decoration-none text-light bg-dark"><i className="fa-solid fa-newspaper me-1 text-light"></i>News</a>
    </div>
    
  </div>
  <div className="offcanvas-footer">
    <center>
      Developed By <b>Kidus surafel</b><br />
     <p > contect us to <a href="https://www.instagram.com/kidus_st12/" className="  text-decoration-none text-light bg-dark" target="_blank"><u>kidus_st12</u></a></p>
    </center>
  </div>
</div>
  </li>
 

</ul>    
    </>);
}

export default NavBar