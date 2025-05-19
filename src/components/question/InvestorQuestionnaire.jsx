import React from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    Divider,
    CircularProgress,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment"; // Icon for questionnaire

const InvestorQuestionnaire = ({ questionnaire, isLoading, error }) => {
    const renderQuestionnaire = () => {
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
            !questionnaire ||
            !questionnaire.data ||
            questionnaire.data.length === 0
        ) {
            return (
                <Typography variant="body2" color="text.secondary">
                    No investor questionnaire available for this contact.
                </Typography>
            );
        }

        // Use the first questionnaire (most recent one)
        const data = questionnaire.data[0];

        return (
            <Box>
                <Grid container spacing={3}>
                    {/* Investor Status */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Investor Status
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Accredited Investor
                                    </Typography>
                                    <Typography variant="body1">
                                        {data.isAccreditedInvestor
                                            ? "Yes"
                                            : "No"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Prior Investment Experience
                                    </Typography>
                                    <Typography variant="body1">
                                        {data.hasInvestedBefore ? "Yes" : "No"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Looking Timeframe
                                    </Typography>
                                    <Typography variant="body1">
                                        {data.lookingTimeframe}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Investment Goals */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Investment Goals
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Primary Goal
                                    </Typography>
                                    <Typography variant="body1">
                                        {data.primaryInvestmentGoal}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Investment Timeline
                                    </Typography>
                                    <Typography variant="body1">
                                        {data.investmentTimeline}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Next Investment Timeframe
                                    </Typography>
                                    <Typography variant="body1">
                                        {data.investmentTimeframe}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {/* Financial Details */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Financial Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Capital to Invest (Next 12 Months)
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                    >
                                        {data.capitalToInvest}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Financing Plans
                                    </Typography>
                                    <Typography variant="body1">
                                        {data.useFinancing}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Preferences */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Investment Preferences
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2 }}
                            >
                                Markets Interested
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mb: 2,
                                    mt: 0.5,
                                }}
                            >
                                {data.marketsInterested.map((market, idx) => (
                                    <Chip
                                        key={idx}
                                        label={market}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                            </Box>

                            <Typography variant="body2" color="text.secondary">
                                Property Types
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mb: 1,
                                    mt: 0.5,
                                }}
                            >
                                {data.propertyTypesInterested.map(
                                    (type, idx) => (
                                        <Chip
                                            key={idx}
                                            label={type}
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    )
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Notes Section */}
                {data.notes && (
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Additional Notes
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: "background.default",
                                p: 2,
                                borderRadius: 1,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Typography variant="body2">
                                {data.notes}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <AssignmentIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Investor Questionnaire</Typography>
            </Box>
            {renderQuestionnaire()}
        </Paper>
    );
};

export default InvestorQuestionnaire;
