import React from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Rating,
    Divider,
    CircularProgress,
    Link,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import FeedbackIcon from "@mui/icons-material/Feedback";

const VideoFeedback = ({ videoFeedbacks, isLoading, error }) => {
    // Format date to a readable format
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Extract YouTube video ID from URL
    const getYouTubeId = (url) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const renderVideoFeedback = () => {
        if (isLoading) {
            return (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            );
        }

        if (error) {
            return (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            );
        }

        if (
            !videoFeedbacks ||
            !videoFeedbacks.data ||
            videoFeedbacks.data.length === 0
        ) {
            return (
                <Typography variant="body2" color="text.secondary">
                    No video feedback available for this contact.
                </Typography>
            );
        }

        return (
            <Box>
                {videoFeedbacks.data.map((feedback) => (
                    <Card key={feedback.id} sx={{ mb: 3, overflow: "visible" }}>
                        <Grid container>
                            {/* Video Information */}
                            <Grid item xs={12} md={4}>
                                {feedback.video?.thumbnailUrl ? (
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={feedback.video.thumbnailUrl}
                                        alt={feedback.video.title}
                                        sx={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            height: 180,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "action.hover",
                                        }}
                                    >
                                        <VideocamIcon
                                            sx={{
                                                fontSize: 64,
                                                color: "text.secondary",
                                            }}
                                        />
                                    </Box>
                                )}
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {feedback.video?.title ||
                                            "Video Title Not Available"}
                                    </Typography>
                                    <Link
                                        href={feedback.video?.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ display: "block", mb: 2 }}
                                    >
                                        View Video
                                    </Link>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Feedback provided on{" "}
                                        {formatDate(feedback.createdAt)}
                                    </Typography>
                                </CardContent>
                            </Grid>

                            {/* Feedback Responses */}
                            <Grid item xs={12} md={8}>
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        gutterBottom
                                    >
                                        Video Feedback Responses
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {Object.entries(feedback.responses).map(
                                            ([key, value]) => (
                                                <Grid item xs={12} key={key}>
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {value.question}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {value.answer}
                                                        </Typography>
                                                        {value.rating !==
                                                            undefined && (
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    mt: 1,
                                                                }}
                                                            >
                                                                <Rating
                                                                    value={
                                                                        value.rating
                                                                    }
                                                                    readOnly
                                                                    size="small"
                                                                    precision={
                                                                        1
                                                                    }
                                                                />
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                    sx={{
                                                                        ml: 1,
                                                                    }}
                                                                >
                                                                    (
                                                                    {
                                                                        value.rating
                                                                    }
                                                                    /5)
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                    {key !==
                                                        Object.keys(
                                                            feedback.responses
                                                        ).pop() && (
                                                        <Divider
                                                            sx={{ my: 1 }}
                                                        />
                                                    )}
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
            </Box>
        );
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <FeedbackIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Video Feedback</Typography>
            </Box>
            {renderVideoFeedback()}
        </Paper>
    );
};

export default VideoFeedback;
