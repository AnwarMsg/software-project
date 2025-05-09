import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography, Avatar, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Grow, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import ReportIcon from '@mui/icons-material/Report';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CommentIcon from '@mui/icons-material/Comment';

function HomeCards({ ride, onBookCancel, isAuthenticated }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);  // For SpeedDial open state
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([
    "Great ride and clean car!",
    "Driver was on time and friendly.",
    "Good Driver",
    "Extremely Rude Driver"
  ]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likedReviews, setLikedReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedReviews") || "[]");
    setLikedReviews(savedLikes);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = (reviewIndex) => {
    const updatedLikes = JSON.parse(localStorage.getItem("likedReviews") || "[]");
    
    if (updatedLikes.includes(reviewIndex)) {
      const newLikes = updatedLikes.filter(index => index !== reviewIndex);
      localStorage.setItem("likedReviews", JSON.stringify(newLikes));
      setLikedReviews(newLikes);
    } else {
      updatedLikes.push(reviewIndex);
      localStorage.setItem("likedReviews", JSON.stringify(updatedLikes));
      setLikedReviews(updatedLikes);
    }
  };

  const handleAvatarClick = () => {
    navigate(`/driver/${ride.driverId}`);
  };

  const handleOpenReviews = () => setReviewDialogOpen(true);
  const handleCloseReviews = () => setReviewDialogOpen(false);
  const [results, setResults] = useState(null);

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      setReviews([...reviews, newReview.trim()]);
      setNewReview('');
    }
  };

  const analyzeTexts = async () => {
    const res = await fetch('http://localhost:3000/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviews }),
    });
    const data = await res.json();
    setResults(data);
    console.log(data);
    console.log(results);
  }



  const handleOpenShare = () => setShareDialogOpen(true);
  const handleCloseShare = () => {
    setCopied(false);
    setShareDialogOpen(false);
  };
  const handleCopyLink = () => {
    const link = `https://driveme.app/ride/${ride.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  // Star and Report state
  const [isStarred, setIsStarred] = useState(() => {
    const savedStars = JSON.parse(localStorage.getItem("starredRides") || "[]");
    return savedStars.includes(ride.id);
  });
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportSent, setReportSent] = useState(false);

  const handleToggleStar = () => {
    const savedStars = JSON.parse(localStorage.getItem("starredRides") || "[]");
    const updatedStars = isStarred
      ? savedStars.filter(id => id !== ride.id)
      : [...savedStars, ride.id];
    localStorage.setItem("starredRides", JSON.stringify(updatedStars));
    setIsStarred(!isStarred);
  };

  const handleOpenReport = () => setReportDialogOpen(true);
  const handleCloseReport = () => {
    setReportText('');
    setReportSent(false);
    setReportDialogOpen(false);
  };
  const handleSendReport = () => {
    if (reportText.trim()) {
      // Here you'd send reportText + ride.id to the backend/admin
      console.log("Report sent for ride ID:", ride.id, "Report:", reportText);
      setReportSent(true);
      setTimeout(handleCloseReport, 2000);
    }
  };

  return (
    <>
    <Card elevation={16} sx={{
      maxWidth: 400,
      borderRadius: '12px',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      }
    }}>
      <CardHeader
        sx={{ paddingRight: '95px' }}
        avatar={
          <Avatar sx={{ bgcolor: '#14653c' }} aria-label="ride" onClick={handleAvatarClick}>
            {ride.driver[0]}
          </Avatar>
        }
        action={
          <Box
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            sx={{ position: 'absolute', top: 9, right: 16 }}
          >
            <Grow
              in={open}
              timeout={{ enter: 300, exit: 300 }}
              style={{ transformOrigin: '70px -5px 0' }}
            >
              <SpeedDial
                ariaLabel="SpeedDial actions"
                direction="down"
                icon={<MoreVertIcon />}
                FabProps={{
                  sx: {
                    backgroundColor: '#14653c',
                    '&:hover': {
                      backgroundColor: '#0f4d2c'
                    }
                  }
                }}
              >
                <SpeedDialAction
                  icon={<StarIcon color={isStarred ? "warning" : "inherit"} />}
                  tooltipTitle={isStarred ? "Unstar" : "Star"}
                  onClick={handleToggleStar}
                />
                <SpeedDialAction
                  icon={<ReportIcon />}
                  tooltipTitle="Report"
                  onClick={handleOpenReport}
                />
              </SpeedDial>
            </Grow>
          </Box>
        }
        title={ride.city}
        subheader={`${ride.date} ${ride.hour}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={ride.picture}
        alt={ride.car}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Car: {ride.car}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capacity: {ride.capacity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {ride.price} MAD
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {ride.availability === 0 ? 'Full' : 'Open'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => setLiked(!liked)}>
          <FavoriteIcon sx={{ color: liked ? red[500] : 'default' }} />
        </IconButton>
        <IconButton aria-label="share" onClick={handleOpenShare}>
          <ShareIcon />
        </IconButton>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Availability: {ride.availability}</Typography>
          <Typography sx={{ marginBottom: 0.5 }}>
            Driver: {ride.driver} ({ride["driver-sex"]})
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RateReviewIcon />}
            onClick={handleOpenReviews}
            sx={{
              borderRadius: '20px',
              marginTop: 2,
              marginBottom: 2, // Add margin-bottom for spacing
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            View Reviews
          </Button>
          <Typography>
            {ride.availability === 0 ? 'This ride is currently full.' : 'This ride is still available.'}
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{
            backgroundColor: ride.isBooked ? '#f44336' : '#4caf50',
            color: '#fff',
            borderRadius: '18px',
            textTransform: 'none',
            padding: '10px 18px',
            fontWeight: 'bold',
            fontSize: "1rem",
            '&:hover': {
              backgroundColor: ride.isBooked ? '#d32f2f' : '#388e3c',
            },
            marginBottom: '10px',
            marginRight: '10px',
          }}
          onClick={() => onBookCancel(ride)}
        >
          {ride.isBooked ? 'Cancel' : ride.availability === 0 ? 'Full' : <>Book&nbsp;<EventAvailableIcon sx={{ fontSize: 20 }} /></>}
        </Button>
      </CardActions>
    </Card>
    <Dialog 
      open={reviewDialogOpen} 
      onClose={handleCloseReviews} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '30px',
          backgroundColor: '#2b2b2b',
          height: '60vh',
          color: '#fff'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, color: '#fff' }}>
        <CommentIcon sx={{ color: '#fff' }} />
        <Typography variant="h6" sx={{ color: '#fff' }}>Reviews</Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 8, position: 'relative' }}>
        {reviews.map((review, index) => (
          <Box key={index} sx={{ mb: 2, position: 'relative' }}>
            <Typography sx={{ color: '#fff', fontWeight: 'bold', mb: 0.5 }}>
              {`User_${index + 1}`}
            </Typography>
            <Typography sx={{ color: '#fff', pl: 2 }}>
              {review}
            </Typography>
            <IconButton 
              sx={{ color: likedReviews.includes(index) ? 'red' : 'white', position: 'absolute', right: 10, bottom: 10 }}
              onClick={() => handleLikeClick(index)}
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
        ))}
        {results && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#90caf9' }}>
              Average AI Score: {results.averageScore.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              AI: {results.results.map((r, i) => `${r.sentiment}`).join(', ')}
            </Typography>
          </Box>
        )}
        <IconButton
        onClick={analyzeTexts}
        sx={{
          backgroundColor: '#14653c',
          '&:hover': { backgroundColor: '#0f4d2c' },
          color: '#fff',
          borderRadius: '20px',
          padding: '10px',
          width: '200px',
          marginLeft: '180px',
          textAlign: 'center'
        }}
      >Analyze Reviews
      </IconButton>
        <Box sx={{
          bottom: 16,
          left: 24,
          right: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          marginTop: '20px'
        }}>
          <TextField
            placeholder="Write a review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            sx={{
              flex: 1,
              backgroundColor: '#3a3a3a',
              borderRadius: '30px',
              input: { color: '#fff', padding: '10px 14px' }
            }}
            variant="standard"
            InputProps={{
              disableUnderline: true
            }}
          />
          <IconButton
            onClick={handleReviewSubmit}
            sx={{
              backgroundColor: '#14653c',
              '&:hover': { backgroundColor: '#0f4d2c' },
              color: '#fff',
              borderRadius: '50%',
              padding: '10px'
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
    <Dialog open={shareDialogOpen} onClose={handleCloseShare} fullWidth maxWidth="xs">
      <DialogTitle>Share Ride</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>Copy the link below to share this ride:</Typography>
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            padding: 2,
            borderRadius: '8px',
            wordBreak: 'break-all'
          }}
        >
          {`https://driveme.app/ride/${ride.id}`}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseShare} sx={{ color: '#808080', backgroundColor: '#fff' }}>
          Close
        </Button>
        <Button onClick={handleCopyLink} variant="contained" startIcon={<ContentCopyIcon />} sx={{ backgroundColor: '#14653c' }}>
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </DialogActions>
    </Dialog>
    {/* Report Dialog */}
    <Dialog open={reportDialogOpen} onClose={handleCloseReport} fullWidth maxWidth="sm">
      <DialogTitle>Report Ride</DialogTitle>
      <DialogContent>
        {reportSent ? (
          <Typography sx={{ mt: 2 }}>Your report has been sent to the admin.</Typography>
        ) : (
          <>
            <Typography sx={{ mb: 2 }}>Please describe the reason for reporting this ride:</Typography>
            <TextField
              label="Your report"
              fullWidth
              multiline
              rows={4}
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseReport} sx={{ color: '#808080', backgroundColor: '#fff' }}>
          Close
        </Button>
        {!reportSent && (
          <Button
            variant="contained"
            onClick={handleSendReport}
            sx={{ backgroundColor: '#d32f2f' }}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
    </>
  );
}

export default HomeCards;