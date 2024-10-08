import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from "react-icons/fa";
import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";

import Footer from "./Foter";
import "../App.css"
import api from "../api";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const NewsCard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [getComment, setgetComment] = useState([]);
  const [user, setUser] = useState("Guest");
  const [visibleComments, setVisibleComments] = useState({});
  const [erro , setError] = useState("")
  const [isFored,setisFored] = useState(false)
  const [Filter,setFilter] = useState(false)

  if (localStorage.getItem("Username") !== user) {
    setUser(localStorage.getItem("Username"));
  }

  const GetComment = () => {
    api
      .get("comment/")
      .then((res) => res.data)
      .then((data) => {
        setgetComment(data);
        
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    document.title =" Ditcoine | News"
    GetComment()
    api
      .get("news/")
      .then((res) => res.data)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err)
        console.error("Error fetching news data:", err);
        setLoading(false);
      });
       // Set an interval to fetch comments every minute
 
  }, []);

  const handleCommentSubmit = (event) => {
    const newsid = event.target.dataset.newsid;
    let commentInput = document.querySelector(`#Comment${newsid}`);
    let commentData = commentInput.value;

    if (commentData.length !== 0) {
      api
        .post("comment/", {
          NewsComment: newsid,
          comment: commentData,
          user: user,
        })
        .then(res => res.data)
        .then(data => {
          
          GetComment(); // Refreshes comments after posting
          setVisibleComments((prevState) => ({
            ...prevState,
            [newsid]: true, // Automatically show comments after adding
            
          }));
          setTimeout(() => {
            document.querySelector(`#Collapse${newsid}`).scrollIntoView({ behavior: 'smooth' }); // Auto-scroll to the comment section
          }, 500);
        })
        .catch(err => console.log(err));
    }

    commentInput.value = ""; // Clear the input field after submitting
  };
  useEffect(() => {
    GetComment(); // Initial fetch for comments
    
    // Function to refresh comments every minute
    const refreshComments = () => {
        GetComment();
        setTimeout(refreshComments,1000); // Refresh every 1 minute
    };

    refreshComments(); // Start the refreshing process

    return () => clearTimeout(refreshComments); // Cleanup on unmount
}, []);
  useEffect(() => {
    if (history.forward !== null){
      setisFored(true)
    }
    api
      .get("news/")
      .then((res) => res.data)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err)
        console.error("Error fetching news data:", err);
        setLoading(false);
      });
    // Function to refresh comments every minute
    const refreshComments = () => {
      api
      .get("news/")
      .then((res) => res.data)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err)
        console.error("Error fetching news data:", err);
        setLoading(false);
      });
        setTimeout(refreshComments,1000); // Refresh every 1 minute
    };

    refreshComments(); // Start the refreshing process

    return () => clearTimeout(refreshComments); // Cleanup on unmount
}, []);

  const handleEnterPress = (event, newsid) => {
    if (event.key === "Enter") {
      handleCommentSubmit({ target: { dataset: { newsid } } });
    }
  };

  const handleDeleteComment = (id) => {
    api
      .delete(`comment/${id}/`)
      .then((res) => res.data)
      .then(() => {
        GetComment();
      })
      .catch((err) => console.log(err));
  };
 
  // Function to handle sharing
  const handleShare = (newsItem) => {
    const shareUrl = `http://localhost:5173/news/${newsItem.id}`; // Adjust the URL structure as needed
    const shareText = `${newsItem.Title} - ${newsItem.discrption}`;

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



  if (loading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle" style={{ width: "100px", height: "100px" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "80px", height: "80px" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
     
      <div className="container" style={{position:"absolute"}} onContextMenu={e => {
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
          box2.style.left = (e.pageX-250) + "px";
        }else{
          box2.style.left = (e.pageX-90) + "px";
        }
      }

  }} onClick={() => {
    document.querySelector(".box2").style.display = "none"
  }}>
        <div className="row" style={{position:"absolute"}}>
       <div>
        <button
          type="button"
          class="btn btn-primary rounded-pill mt-2 mb-3"
          onClick={() => {
            setFilter(1)
          }}
        >
          AirDrop
        </button>
        <button
          type="button"
          class="btn btn-dark rounded-pill  me-2 mt-2 mb-3"
          onClick={() => {
            setFilter(2)
          }}
        >
          Crypto 
        </button>
        <button
          type="button"
          class="btn btn-light rounded-pill  me-2 mt-2 mb-3"
          onClick={() => {
            setFilter(false)
          }}
        >
          All 
        </button>
        
       </div>
          {data
            .slice()
            .filter(ne => Filter ? ne.catogore === Filter : ne === ne)
            .reverse() // Reverses the order of news items
            .map((newsItem) => (
              <>
              <div className="col-12 col-md-6 col-lg-4 mb-4"  key={newsItem.id}>
                <div className="card bg-dark border border-secondary rounded" id="NewsCard" >
                  
                <Link to={`/news/${newsItem.id}`} className="text-light" >
                  <img
                    src={newsItem.Image ? newsItem.Image : "https://via.placeholder.com/150"}
                    className="card-img-top img-fluid"
                    alt={newsItem.Title}
                    style={{ objectFit: "cover", height: "200px" }} // Ensures consistent image size
                  />
                  </Link>
                

 
                  <div className="card-body">
                    <h4 className="card-title text-light">
                      {newsItem.Title}{" "}
                      <small>{newsItem.catogore === 1 ? "Airdrop" : "Crypto"}</small>
                    </h4>
                    <p className="card-text text-light mb-3">{newsItem.discrption}</p>
                    <small className="text-light">
                      News Category: <u>{newsItem.catogore === 1 ? "Airdrop" : "Crypto currency"}</u>
                    </small>
                    
                    <br />
                    <span className="text-light">
                      Created at: {formatDate(newsItem.created_at)}
                    </span>
                    <br />
                    <div className="d-flex mt-3">
                      <i className="fa-solid fa-heart text-danger me-3"></i>
                      <i
                        className="fa-solid fa-comment ms-2 text-secondary me-3"
                        data-bs-toggle="collapse"
                        data-bs-target={`#Collapse${newsItem.id}`}
                        aria-expanded={visibleComments[newsItem.id] || false}
                        aria-controls={`Collapse${newsItem.id}`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setVisibleComments((prevState) => ({
                            ...prevState,
                            [newsItem.id]: !prevState[newsItem.id],
                          }))
                        }
                      ></i>
                      <i
                        className="fas fa-share-from-square text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleShare(newsItem) } // Add the share functionality
                      ></i>
                    </div>

                    <div className="collapse" id={`Collapse${newsItem.id}`} style={{ display: visibleComments[newsItem.id] ? "block" : "none" }}>
                      <div className="card card-body bg-dark">
                        {getComment
                        .slice()
                        .reverse() 
                          .filter((com) => newsItem.id === com.NewsComment) // Filters comments for the current news item
                          .map((com) => (
                            <div key={com.id} className="container bg-dark">
                              <div className="border-primary border-bottom mx-2 mb-3 rounded text-light">
                                <i className="fas fa-circle-user fs-1 mx-3 mt-3 text-info"></i>
                                {com.user === user ? "You" : com.user}
                                <p className="mx-5">
                                  {com.comment}{" "}
                                  {com.user === user ? (
                                    <span
                                      className="position-absolute start-100 me-5 fas fa-trash text-danger"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleDeleteComment(com.id)}
                                    ></span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        <p
                          className="text-light"
                          data-bs-toggle="collapse"
                          data-bs-target={`#Collapse${newsItem.id}`}
                          aria-expanded="false"
                          aria-controls={`Collapse${newsItem.id}`}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fas fa-angle-up ms-2 fs-3 me-1 text-light"></i>
                          Show less
                        </p>
                      </div>
                    </div>
                    <div className="input-group mb-3 mt-3">
                      <input
                        type="text"
                        className="form-control border rounded-pill"
                        placeholder="Add a comment..."
                        aria-label="Add a comment..."
                        aria-describedby="send"
                        id={`Comment${newsItem.id}`}
                        onKeyPress={(event) => handleEnterPress(event, newsItem.id)}
                      />
                      <i    
                        className="fa-solid fa-paper-plane text-secondary fs-4 mt-1 ms-2"
                        id="send"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCommentSubmit({ target: { dataset: { newsid: newsItem.id } } })}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              </>
            ))}
        </div>
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
              setFilter(false)
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
            <div class=" f">
              
              <div
                class="dropdown-toggle"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <small>dropdown</small>
                
              </div>
              <div
                class="dropdown-menu dropdown-menu-start"
                aria-labelledby="triggerId"
              >
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item disabled" href="#">Disabled action</a>
                <h6 class="dropdown-header">Section header</h6>
                <a class="dropdown-item" href="#">Action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">After divider action</a>
              </div>
            </div>
            <hr />
            <div className="f">cut</div>
            <div className="f" onClick={() => {
              document.querySelector(".box2").style.display = "none"
            }}> <i className="fas fa-x me-2"></i> Exit</div>
        </div>
    </>
  );
  
};

export default NewsCard;
