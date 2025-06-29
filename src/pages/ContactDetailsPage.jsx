import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Avatar,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    IconButton,
    CircularProgress,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import {
    fetchContact,
    updateContact,
    getCalculationSingle,
    getQuestionSingle,
    getVideoSingle, // Import the new function
} from "../services/api";
import PageHeader from "../components/common/PageHeader";
import InvestmentCalculations from "../components/calculation/InvestmentCalculations";
import InvestorQuestionnaire from "../components/question/InvestorQuestionnaire";
import VideoFeedback from "../components/calculation/videoFeedback";

const ContactDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "",
        tags: [],
    });
    const [updating, setUpdating] = useState(false);

    // State for calculations
    const [calculations, setCalculations] = useState(null);
    const [calculationsLoading, setCalculationsLoading] = useState(true);
    const [calculationsError, setCalculationsError] = useState(null);

    // State for questionnaire
    const [questionnaire, setQuestionnaire] = useState(null);
    const [questionnaireLoading, setQuestionnaireLoading] = useState(true);
    const [questionnaireError, setQuestionnaireError] = useState(null);

    // New state for video feedback
    const [videoFeedbacks, setVideoFeedbacks] = useState(null);
    const [videoFeedbacksLoading, setVideoFeedbacksLoading] = useState(true);
    const [videoFeedbacksError, setVideoFeedbacksError] = useState(null);

    useEffect(() => {
        const loadContactDetails = async () => {
            try {
                setLoading(true);
                const response = await fetchContact(id);
                console.log("Contact response:", response);
                if (response && response.data) {
                    setContact(response.data);
                    // Initialize edit form with contact data
                    setEditFormData({
                        name: response.data.name || "",
                        email: response.data.email || "",
                        phone: response.data.phoneNumber || "",
                        address: response.data.address || "",
                        status: response.data.status || "client",
                        tags: response.data.tags || [],
                    });
                }
            } catch (error) {
                console.error(`Error loading contact ${id}:`, error);
                setError("Failed to load contact details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadContactDetails();
    }, [id]);

    // Load calculations
    useEffect(() => {
        const loadCalculations = async () => {
            if (!id) return;

            try {
                setCalculationsLoading(true);
                const response = await getCalculationSingle(id);
                console.log("Calculations response:", response);
                setCalculations(response);
            } catch (error) {
                console.error(
                    `Error loading calculations for contact ${id}:`,
                    error
                );
                setCalculationsError("Failed to load calculation data.");
            } finally {
                setCalculationsLoading(false);
            }
        };

        loadCalculations();
    }, [id]);

    // Load questionnaire data
    useEffect(() => {
        const loadQuestionnaire = async () => {
            if (!id) return;

            try {
                setQuestionnaireLoading(true);
                const response = await getQuestionSingle(id);
                console.log("Questionnaire response:", response);
                setQuestionnaire(response);
            } catch (error) {
                console.error(
                    `Error loading questionnaire for contact ${id}:`,
                    error
                );
                setQuestionnaireError("Failed to load questionnaire data.");
            } finally {
                setQuestionnaireLoading(false);
            }
        };

        loadQuestionnaire();
    }, [id]);

    // Load video feedback data
    useEffect(() => {
        const loadVideoFeedbacks = async () => {
            if (!id) return;

            try {
                setVideoFeedbacksLoading(true);
                const response = await getVideoSingle(id);
                console.log("Video feedback response:", response);
                setVideoFeedbacks(response);
            } catch (error) {
                console.error(
                    `Error loading video feedback for contact ${id}:`,
                    error
                );
                setVideoFeedbacksError("Failed to load video feedback data.");
            } finally {
                setVideoFeedbacksLoading(false);
            }
        };

        loadVideoFeedbacks();
    }, [id]);

    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleEdit = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTagInput = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            const newTag = e.target.value.trim();
            if (!editFormData.tags.includes(newTag)) {
                setEditFormData((prev) => ({
                    ...prev,
                    tags: [...prev.tags, newTag],
                }));
            }
            e.target.value = "";
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setEditFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSaveContact = async () => {
        try {
            setUpdating(true);
            const response = await updateContact(id, editFormData);
            if (response && response.data) {
                setContact(response.data);
                setOpenEditDialog(false);
            }
        } catch (error) {
            console.error("Error updating contact:", error);
            alert("Failed to update contact. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    const handleCall = () => {
        if (contact?.phone) {
            window.location.href = `tel:${contact.phone}`;
        }
    };

    const handleEmail = () => {
        if (contact?.email) {
            window.location.href = `mailto:${contact.email}`;
        }
    };

    const handleBack = () => {
        navigate("/contacts");
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 400,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error || !contact) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography color="error">
                    {error || "Contact not found"}
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleBack}
                >
                    Back to Contacts
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <PageHeader title="Contact Details" showBackButton={true} />

            <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: "16px",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 3,
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                width: 52,
                                height: 52,
                                mr: 2,
                            }}
                        >
                            {getInitials(contact.name)}
                        </Avatar>
                        <Box>
                            <Typography variant="h5">{contact.name}</Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                            >
                                {contact.status === "client"
                                    ? "Client"
                                    : contact.status === "lead"
                                    ? "Lead"
                                    : contact.status === "former_client"
                                    ? "Former Client"
                                    : "Contact"}
                            </Typography>
                            {contact.tags && contact.tags.length > 0 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        mt: 1,
                                    }}
                                >
                                    {contact.tags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            size="small"
                                            color="primary"
                                        />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                            sx={{ mr: 1 }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PhoneIcon />}
                            onClick={handleCall}
                            sx={{ mr: 1 }}
                            disabled={!contact.phoneNumber}
                        >
                            Call
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<EmailIcon />}
                            onClick={handleEmail}
                            disabled={!contact.email}
                        >
                            Email
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Contact Information
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <Grid container spacing={2}>
                                {contact.phoneNumber && (
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Phone Number
                                        </Typography>
                                        <Typography variant="body1">
                                            {contact.phoneNumber}
                                        </Typography>
                                    </Grid>
                                )}
                                {contact.email && (
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Email
                                        </Typography>
                                        <Typography variant="body1">
                                            {contact.email}
                                        </Typography>
                                    </Grid>
                                )}
                                {contact.address && (
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Address
                                        </Typography>
                                        <Typography variant="body1">
                                            {contact.address}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Recent Jobs
                        </Typography>
                        {contact.jobs && contact.jobs.length > 0 ? (
                            <List disablePadding>
                                {contact.jobs.map((job, index) => (
                                    <React.Fragment key={job.id}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemText
                                                primary={job.name}
                                                secondary={`Status: ${
                                                    job.status
                                                } • Amount: $${
                                                    job.amount?.toLocaleString() ||
                                                    "N/A"
                                                }`}
                                            />
                                        </ListItem>
                                        {index < contact.jobs.length - 1 && (
                                            <Divider />
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No recent jobs found.
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Paper>
            <InvestmentCalculations
                calculations={calculations}
                isLoading={calculationsLoading}
                error={calculationsError}
            />

            {/* Investor Questionnaire Section */}
            <InvestorQuestionnaire
                questionnaire={questionnaire}
                isLoading={questionnaireLoading}
                error={questionnaireError}
            />

            {/* Video Feedback Section */}
            <VideoFeedback
                videoFeedbacks={videoFeedbacks}
                isLoading={videoFeedbacksLoading}
                error={videoFeedbacksError}
            />

            {/* Investment Calculations Section */}

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Communication History
                </Typography>
                {contact.communications && contact.communications.length > 0 ? (
                    <List disablePadding>
                        {contact.communications.map((comm, index) => (
                            <React.Fragment key={index}>
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText
                                        primary={comm.type}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {comm.date}
                                                </Typography>
                                                <Typography
                                                    component="div"
                                                    variant="body2"
                                                >
                                                    {comm.description}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                {index < contact.communications.length - 1 && (
                                    <Divider />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No communication history found.
                    </Typography>
                )}
            </Paper>

            {/* Edit Contact Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={handleCloseEdit}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Edit Contact</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Full Name"
                                name="name"
                                value={editFormData.name}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Status"
                                name="status"
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                value={editFormData.status}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                            >
                                <option value="lead">Lead</option>
                                <option value="client">Client</option>
                                <option value="former_client">
                                    Former Client
                                </option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={editFormData.email}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Phone"
                                name="phone"
                                value={editFormData.phone}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                name="address"
                                value={editFormData.address}
                                onChange={handleFormChange}
                                fullWidth
                                multiline
                                rows={2}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Tags
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                {editFormData.tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        onDelete={() => handleRemoveTag(tag)}
                                        size="small"
                                        color="primary"
                                    />
                                ))}
                            </Box>
                            <TextField
                                placeholder="Type and press Enter to add tags"
                                onKeyPress={handleTagInput}
                                fullWidth
                                size="small"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button
                        onClick={handleSaveContact}
                        color="primary"
                        variant="contained"
                        disabled={updating}
                    >
                        {updating ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ContactDetailsPage;
