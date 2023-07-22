import React, { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";

const VectorInput = ({ onVectorChange, initialVector, isVector1 }) => {
	const [vector, setVector] = useState(initialVector);

	const handleVectorChange = (event) => {
		let value = parseFloat(event.target.value);
		if (isNaN(value)) {
			value = 0;
		}
		const newVector = {
			...vector,
			[event.target.name]: value,
		};
		setVector(newVector);
		onVectorChange(newVector, isVector1);
	};

	return (
		<Box
			sx={{
				mb: 2,
				p: 2,
				borderRadius: 1,
				backgroundColor: "background.paper",
				boxShadow: 1,
			}}
		>
			<Typography variant="h5" align="center" sx={{ mb: 2 }}>
				{isVector1 ? "Vector 1" : "Vector 2"}
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<TextField
						name="x"
						label="X"
						variant="outlined"
						value={vector.x}
						onChange={handleVectorChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						name="y"
						label="Y"
						variant="outlined"
						value={vector.y}
						onChange={handleVectorChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						name="z"
						label="Z"
						variant="outlined"
						value={vector.z}
						onChange={handleVectorChange}
						fullWidth
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default VectorInput;
