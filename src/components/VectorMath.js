import React, { useState } from "react";
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Typography,
	Box,
	Paper,
	Grid,
	Divider,
} from "@mui/material";
import { vec3 } from "gl-matrix";

const VectorMath = ({ vector1, vector2, onOperationChange }) => {
	const [selectedOperation, setSelectedOperation] = useState("");

	// Convert the vectors to arrays
	const v1 = [vector1.x, vector1.y, vector1.z];
	const v2 = [vector2.x, vector2.y, vector2.z];

	const handleChange = (event) => {
		setSelectedOperation(event.target.value);
		onOperationChange(event.target.value);
	};

	// Calculations
	const additionResult = vec3.add(vec3.create(), v1, v2);
	const subtractionResult = vec3.subtract(vec3.create(), v1, v2);
	const dotProduct = vec3.dot(v1, v2);
	const crossProduct = vec3.cross(vec3.create(), v1, v2);
	const magnitudeV1 = vec3.length(v1);
	const magnitudeV2 = vec3.length(v2);
	const normalizeV1 = vec3.normalize(vec3.create(), v1);
	const normalizeV2 = vec3.normalize(vec3.create(), v2);

	return (
		<Box sx={{ my: 2, p: 2, border: 1, borderColor: "divider" }}>
			<Grid container justifyContent="space-between" sx={{ mb: 2 }}>
				<Grid item>
					<Paper elevation={3} sx={{ p: 1 }}>
						<Typography variant="h6">
							Vector 1: [x: {v1[0]}, y: {v1[1]}, z: {v1[2]}]
						</Typography>
					</Paper>
				</Grid>
				<Grid item>
					<Paper elevation={3} sx={{ p: 1 }}>
						<Typography variant="h6">
							Vector 2: [x: {v2[0]}, y: {v2[1]}, z: {v2[2]}]
						</Typography>
					</Paper>
				</Grid>
			</Grid>

			<FormControl fullWidth sx={{ mb: 2 }}>
				<InputLabel id="select-label">Vector Operation</InputLabel>
				<Select
					labelId="select-label"
					id="select"
					value={selectedOperation}
					onChange={handleChange}
				>
					<MenuItem value={"add"}>Vector Addition</MenuItem>
					<MenuItem value={"subtract"}>Vector Subtraction</MenuItem>
					<MenuItem value={"dot"}>Dot Product</MenuItem>
					<MenuItem value={"cross"}>Cross Product</MenuItem>
					<MenuItem value={"magnitude"}>Magnitude</MenuItem>
					<MenuItem value={"normalize"}>Normalize</MenuItem>
				</Select>
			</FormControl>

			{selectedOperation && (
				<Paper elevation={3} sx={{ p: 2 }}>
					<Typography variant="h6" align="center" sx={{ mb: 1 }}>
						{selectedOperation.charAt(0).toUpperCase() +
							selectedOperation.slice(1)}
					</Typography>
					<Divider sx={{ mb: 1 }} />
					<Box sx={{ my: 1 }}>
						<Typography sx={{ mb: 1 }}>
							<b>What is it?</b>
							{selectedOperation === "add" &&
								" Vector addition is the process of adding two vectors together. This operation is performed component-wise meaning on each value in the vector with the corresponding value of the other vector."}
							{selectedOperation === "subtract" &&
								" Vector subtraction is the process of subtracting one vector from another. This operation is also performed component-wise meaning on each value in the vector with the corresponding value of the other vector."}
							{selectedOperation === "dot" &&
								" The dot product, also known as the scalar product, is a binary operation that takes two vectors and returns a scalar which is a single real number, as opposed to a vector which is a list or array of multiple numbers"}
							{selectedOperation === "cross" &&
								" The cross product, also known as the vector product, is a binary operation on two vectors in three-dimensional space. It produces a vector that is perpendicular to the plane containing the two original vectors."}
							{selectedOperation === "magnitude" &&
								' The magnitude (or length) of a vector is the square root of the sum of the squares of its components. It gives the "length" of the vector in space.'}
							{selectedOperation === "normalize" &&
								" Normalizing a vector scales it to have a magnitude of 1, while keeping the same direction as the original vector."}
						</Typography>
						<Typography sx={{ mb: 1 }}>
							<b>Why use it?</b>
							{selectedOperation === "add" &&
								" Vector addition is used in many fields including physics and computer graphics. For example, in physics, it can be used to find the resultant force when multiple forces are acting on an object."}
							{selectedOperation === "subtract" &&
								" Vector subtraction is used in various fields including physics and computer graphics. For example, it can be used to find the displacement between two points in space."}
							{selectedOperation === "dot" &&
								" The dot product has many applications in physics, computer graphics, and machine learning. For instance, it can be used to compute the angle between two vectors, to determine if two vectors are perpendicular, or to project one vector onto another."}
							{selectedOperation === "cross" &&
								" The cross product has many applications in physics, engineering, and computer graphics. For example, it is used to find a vector that is orthogonal to two given vectors, which is useful for computing surface normals in 3D graphics."}
							{selectedOperation === "magnitude" &&
								" The magnitude of a vector is used in physics to represent quantities that have both magnitude and direction."}
							{selectedOperation === "normalize" &&
								" Normalizing a vector is useful in physics, computer graphics, and machine learning to normalize input data)."}
						</Typography>
						<Typography sx={{ mb: 1 }}>
							<b>How to calculate:</b>
							{selectedOperation === "add" &&
								" Add the corresponding components of the vectors: x-components, y-components, z-components."}
							{selectedOperation === "subtract" &&
								" Subtract the corresponding components of the vectors: x-components, y-components, z-components."}
							{selectedOperation === "dot" &&
								" Multiply the corresponding components of the vectors, then add the results."}
							{selectedOperation === "cross" &&
								" The cross product is calculated as (v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x)."}
							{selectedOperation === "magnitude" &&
								" Square each component of the vector, add them together, then take the square root of the result."}
							{selectedOperation === "normalize" &&
								" Divide each component of the vector by its magnitude."}
						</Typography>
						<Typography sx={{ mt: 1 }}>
							<b>Result:</b>
							{selectedOperation === "add" &&
								` (${additionResult[0]}, ${additionResult[1]}, ${additionResult[2]})`}
							{selectedOperation === "subtract" &&
								` (${subtractionResult[0]}, ${subtractionResult[1]}, ${subtractionResult[2]})`}
							{selectedOperation === "dot" && ` ${dotProduct}`}
							{selectedOperation === "cross" &&
								` (${crossProduct[0]}, ${crossProduct[1]}, ${crossProduct[2]})`}
							{selectedOperation === "magnitude" &&
								` Vector 1: ${magnitudeV1.toFixed(
									2
								)}, Vector 2: ${magnitudeV2.toFixed(2)}`}
							{selectedOperation === "normalize" &&
								` Vector 1: (${normalizeV1[0].toFixed(
									2
								)}, ${normalizeV1[1].toFixed(
									2
								)}, ${normalizeV1[2].toFixed(
									2
								)}), Vector 2: (${normalizeV2[0].toFixed(
									2
								)}, ${normalizeV2[1].toFixed(
									2
								)}, ${normalizeV2[2].toFixed(2)})`}
						</Typography>
					</Box>
				</Paper>
			)}
		</Box>
	);
};

export default VectorMath;
