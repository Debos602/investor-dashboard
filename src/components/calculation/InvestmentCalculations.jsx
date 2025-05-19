import React from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    Divider,
    CircularProgress,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";

const InvestmentCalculations = ({ calculations, isLoading, error }) => {
    const renderCalculations = () => {
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
            !calculations ||
            !calculations.data ||
            calculations.data.length === 0
        ) {
            return (
                <Typography variant="body2" color="text.secondary">
                    No investment calculations available for this contact.
                </Typography>
            );
        }

        // Use the data array from the response
        const calculationItems = calculations.data;

        return (
            <List disablePadding>
                {calculationItems.map((calc, index) => (
                    <React.Fragment key={calc.id}>
                        <ListItem
                            sx={{
                                px: 0,
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}
                        >
                            <Box sx={{ width: "100%", mb: 2 }}>
                                <Typography variant="h6" color="primary">
                                    {calc.propertyType} - {calc.marketArea}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Created on{" "}
                                    {new Date(
                                        calc.createdAt
                                    ).toLocaleDateString()}
                                </Typography>
                            </Box>

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Investment Amount
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                    >
                                        $
                                        {calc.investmentAmount?.toLocaleString()}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Hold Period
                                    </Typography>
                                    <Typography variant="body1">
                                        {calc.holdPeriod}{" "}
                                        {calc.holdPeriod === 1
                                            ? "year"
                                            : "years"}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Return Rate
                                    </Typography>
                                    <Typography variant="body1">
                                        {calc.annualReturnRate}%
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        ROI
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        color="success.main"
                                    >
                                        {calc.roi}%
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Divider sx={{ width: "100%", my: 2 }} />

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Monthly Cash Flow
                                    </Typography>
                                    <Typography variant="body1">
                                        $
                                        {calc.monthlyCashFlow?.toLocaleString(
                                            undefined,
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Annual Cash Flow
                                    </Typography>
                                    <Typography variant="body1">
                                        ${calc.annualCashFlow?.toLocaleString()}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Total Return
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                    >
                                        ${calc.totalReturn?.toLocaleString()}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Fees & Rates
                                        </Typography>
                                        <Typography variant="body2">
                                            Management:{" "}
                                            {calc.propertyManagementFee}%
                                        </Typography>
                                        <Typography variant="body2">
                                            Vacancy: {calc.vacancyRate}%
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {calc.notes && (
                                <Box
                                    sx={{
                                        width: "100%",
                                        mt: 1,
                                        bgcolor: "background.default",
                                        p: 2,
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Notes:
                                    </Typography>
                                    <Typography variant="body2">
                                        {calc.notes}
                                    </Typography>
                                </Box>
                            )}
                        </ListItem>
                        {index < calculationItems.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        );
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <CalculateIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Investment Calculations</Typography>
            </Box>
            {renderCalculations()}
        </Paper>
    );
};

export default InvestmentCalculations;
