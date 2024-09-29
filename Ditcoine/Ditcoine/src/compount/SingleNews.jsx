import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; // Make sure you have your api setup
import NavBar from "./NavBar";
import Footer from "./Foter";

import { Link } from "react-router-dom";

const SingleNews = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("Guest");
  const [visibleComments, setVisibleComments] = useState({});
  const [getComment, setgetComment] = useState([]);
  const [Data,setData] = useState([])
  const [nowid,aetNowid]=useState()
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
          console.log(data);
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
  useEffect(() => {
   
    api
       .get("news/")
       .then(res => res.data)
       .then(data => {
        setData(data)
        console.log(data)
       })
       .catch(err => console.log(err))
    const fetchSingleNews = async () => {
      try {
        const response = await api.get(`news/${id}/`); // Adjust the endpoint as needed
        setNewsItem(response.data);
        aetNowid(newsItem.id)
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleNews();
  }, [id]);

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

  if (loading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle" style={{ width: "100px", height: "100px" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "80px", height: "80px" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return <div className="text-danger">News item not found.</div>;
  }

  return (<> 
    <NavBar />
    <div className="container">
    <p className="visually-hidden">{ document.title =` Ditcoin | ${newsItem.Title ? newsItem.Title : ""}`}</p>
      <h1 className="text-light">{newsItem.Title}</h1>
      <img src={newsItem.Image || "https://via.placeholder.com/150"} alt={newsItem.Title} className="img-fluid" />
      <p className="text-light">{newsItem.discrption}</p>
      <small className="text-light">Category: {newsItem.catogore === 1 ? "Airdrop" : "Crypto"}</small>
      
      <br />
      <small className="text-light">Created at: {new Date(newsItem.created_at).toLocaleDateString()}</small>
      
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
                    
      <br />
      <h4 className="mx-5 fs-2 mb-5 mt-4">More To <u>{newsItem.catogore === 1 ? "Airdrop" : "Crypto"}</u></h4>
      <div class="card-group">
      {Data
            .slice()
            .reverse() 
            .filter(data => data.catogore === newsItem.catogore && data.id !== newsItem.id)
            .map((newsItem) => 
              (

              <div class="card mx-2 ms-3 mb-3 rounded">
                <Link to={`/news/${newsItem.id}`} className="text-light">
                  <img
                    src={newsItem.Image ? newsItem.Image : "https://via.placeholder.com/150"}
                    className="card-img-top img-fluid"
                    alt={newsItem.Title}
                    style={{ objectFit: "cover", height: "150px" }} // Ensures consistent image size
                  />
                  </Link>
                <div class="card-body">
                  <h5 class="card-title">
                  {newsItem.Title}{" "}
                  <small>{newsItem.catogore === 1 ? "Airdrop" : "Crypto"}</small>
                  </h5>
                  <p class="card-text">{newsItem.discrption}</p>
                 
                  
                </div>
              </div>
      
            ))}
            </div>
            
    </div>
    <Footer />
  </>);
};

export default SingleNews;
