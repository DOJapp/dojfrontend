import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { usePlacesWidget } from 'react-google-autocomplete';

export default function GooglePlacesAutocomplete() {
    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyBrLGLJ9fU5yVR_YLtW3Z_aHP9VnSw4NKg',
        onPlaceSelected: (place) => console.log(place),
    });

    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                disableClearable
                options={[]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            inputRef: ref,
                        }}
                    />
                )}
            />
        </Stack>
    );
}
