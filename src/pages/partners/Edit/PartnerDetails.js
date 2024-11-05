import React from 'react'

function PartnerDetails() {
    return (

        <Grid item xs={12}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" color="secondary" gutterBottom>{`Partner ${partner.index + 1
                    }`}</Typography>
                {partner.index !== 0 && (
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                )}
            </div>
            <Divider style={{ marginBottom: "10px" }} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="PAN Number"
                        variant="outlined"
                        required
                        fullWidth
                        name="panNumber"
                        value={partner.panNumber || ""}
                        onChange={(e) =>
                            handleFileChange(e, "panNumber", partner.index, true)
                        }
                    />
                </Grid>
                <FileUpload
                    label="Upload PAN Image"
                    onChange={(e) => handleFileChange(e, "panImage", partner.index)}
                    preview={partner.panImage}
                />
                <Grid item xs={6}>
                    <TextField
                        label="Aadhar Number"
                        variant="outlined"
                        required
                        fullWidth
                        name="aadharNumber"
                        value={partner.aadharNumber || ""}
                        onChange={(e) =>
                            handleFileChange(e, "aadharNumber", partner.index, true)
                        }
                    />
                </Grid>
                <FileUpload
                    label="Upload Aadhar Front Image"
                    onChange={(e) => handleFileChange(e, "aadharFrontImage", partner.index)}
                    preview={partner.aadharFrontImage}
                />
                <FileUpload
                    label="Upload Aadhar Back Image"
                    onChange={(e) =>
                        handleFileChange(e, "aadharBackImage", partner.index)
                    }
                    preview={partner.aadharBackImage}
                />
                <Grid item xs={12}>
                    <Typography variant="h6">Bank Details</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Bank Name"
                        variant="outlined"
                        required
                        fullWidth
                        name="bankName"
                        value={partner.bankName || ""}
                        onChange={(e) =>
                            handleFileChange(e, "bankName", partner.index, true)
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Account Number"
                        variant="outlined"
                        required
                        fullWidth
                        name="accountNumber"
                        value={partner.accountNumber || ""}
                        onChange={(e) =>
                            handleFileChange(e, "accountNumber", partner.index, true)
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="IFSC Code"
                        variant="outlined"
                        fullWidth
                        name="ifscCode"
                        value={partner.ifscCode || ""}
                        onChange={(e) =>
                            handleFileChange(e, "ifscCode", partner.index, true)
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Account Holder Name"
                        variant="outlined"
                        fullWidth
                        name="accountHolderName"
                        value={partner.accountHolderName || ""}
                        onChange={(e) =>
                            handleFileChange(e, "accountHolderName", partner.index, true)
                        }
                    />
                </Grid>
            </Grid>
        </Grid>

    )
}

export default PartnerDetails
