function NavBar(){

    return(<>
        <ul className="nav justify-content-center sticky-top" id="Nav">
  <li className="nav-item">
    <a className="nav-link active text-decoration-none text-dark" aria-current="page" href="#"><i className="fa-solid fa-house me-1"></i>Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link  text-decoration-none text-dark" aria-current="page" href="#AboutUs"><i className="fa-solid fa-circle-info me-1 text-info"></i>About</a>
  </li>
  <li className="nav-item">
    <a className="nav-link  text-decoration-none text-dark" aria-current="page" href="#ContactUs"><i className="fa-regular fa-message me-1 text-primary"></i>countact us</a>
  </li>
 

</ul>    
    </>);
}

export default NavBar